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

    if (!keyId || !keySecret) {
      console.log("[v0] Razorpay keys not configured. Using demo mode.")
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

    if (keyId.length === 0 || keySecret.length === 0) {
      console.log("[v0] Razorpay keys are empty strings. Using demo mode.")
      return NextResponse.json({
        demo: true,
        message: "Razorpay keys empty, returning mock order.",
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
      console.error("[v0] Razorpay API error:", res.status, err)

      if (res.status === 401) {
        console.log("[v0] Razorpay authentication failed. Check your keys in Vercel project settings.")
        return NextResponse.json({
          demo: true,
          message: "Razorpay authentication failed. Using demo mode.",
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

      return NextResponse.json({ error: "Failed to create order", details: err }, { status: 502 })
    }

    const order = await res.json()

    // Return only the necessary data; keyId is needed by Razorpay Checkout on the client
    return NextResponse.json({ keyId, order })
  } catch (error) {
    console.error("[v0] Razorpay order creation error:", error)
    return NextResponse.json({ error: "Unexpected error", details: String(error) }, { status: 500 })
  }
}
