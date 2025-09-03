import { NextResponse } from "next/server"

type CreateOrderBody = {
  amount: number // in paise
  currency?: string
  receipt?: string
  notes?: Record<string, string>
}

export async function POST(req: Request) {
  try {
    const body = (await req.json()) as CreateOrderBody
    const amount = Number(body.amount)
    const currency = body.currency ?? "INR"
    const receipt = body.receipt ?? `rcpt_${Date.now()}`

    if (!Number.isFinite(amount) || amount <= 0) {
      return NextResponse.json({ error: "Invalid amount" }, { status: 400 })
    }

    const keyId = process.env.RAZORPAY_KEY_ID
    const keySecret = process.env.RAZORPAY_KEY_SECRET

    // Demo mode: if keys are not set, return a mock order response
    if (!keyId || !keySecret) {
      return NextResponse.json({
        demo: true,
        message: "Razorpay keys missing, returning mock order.",
        keyId: "rzp_test_demo_key",
        order: {
          id: `order_demo_${Date.now()}`,
          amount,
          currency,
          receipt,
          status: "created",
        },
      })
    }

    const credentials = Buffer.from(`${keyId}:${keySecret}`).toString("base64")

    const res = await fetch("https://api.razorpay.com/v1/orders", {
      method: "POST",
      headers: {
        Authorization: `Basic ${credentials}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        amount,
        currency,
        receipt,
        notes: body.notes ?? {},
      }),
    })

    if (!res.ok) {
      const err = await res.text()
      return NextResponse.json({ error: "Failed to create order", details: err }, { status: 502 })
    }

    const order = await res.json()

    // Return only the necessary data; keyId is needed by Razorpay Checkout on the client
    return NextResponse.json({ keyId, order })
  } catch (error) {
    return NextResponse.json({ error: "Unexpected error", details: String(error) }, { status: 500 })
  }
}
