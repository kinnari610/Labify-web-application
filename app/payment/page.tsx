"use client"

import { useState } from "react"
import { Header } from "@/components/header"
import { BottomNavigation } from "@/components/bottom-navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { CreditCard, Smartphone, Building, Shield } from "lucide-react"

export default function PaymentPage() {
  const [paymentMethod, setPaymentMethod] = useState("card")
  const [loading, setLoading] = useState(false)
  const totalAmount = 270 // INR, displayed to user

  const handlePayment = async () => {
    setLoading(true)
    try {
      // Create order server-side (amount in paise)
      const res = await fetch("/api/payments/razorpay/order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount: totalAmount * 100, currency: "INR" }),
      })

      if (!res.ok) {
        const err = await res.json().catch(() => ({}))
        throw new Error(err.error || "Unable to initiate payment")
      }

      const data: {
        keyId: string
        order: { id: string; amount: number; currency: string }
        demo?: boolean
      } = await res.json()

      // In production, load Razorpay Checkout and open with data.keyId and data.order.id
      // For now, simulate success to keep the UX flowing:
      console.log("Order created:", data)
      await new Promise((r) => setTimeout(r, 1000))
      window.location.href = "/payment/success"
    } catch (error) {
      console.error("Payment error:", error)
      alert("Payment failed to start. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="pb-20">
        <div className="px-4 py-6 space-y-6">
          <h1 className="text-xl font-bold text-gray-900">Payment</h1>

          <Card>
            <CardHeader>
              <CardTitle>Order Summary</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span>Full Body Checkup Premium</span>
                  <span>₹360</span>
                </div>
                <div className="flex justify-between">
                  <span>Home Service Fee</span>
                  <span>₹150</span>
                </div>
                <div className="flex justify-between text-sm text-gray-600">
                  <span>Discount</span>
                  <span>-₹240</span>
                </div>
                <hr />
                <div className="flex justify-between font-semibold text-lg">
                  <span>Total Amount</span>
                  <span>₹{totalAmount}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Select Payment Method</CardTitle>
            </CardHeader>
            <CardContent>
              <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod}>
                <div className="flex items-center space-x-3 p-3 border rounded-lg">
                  <RadioGroupItem value="card" id="card" />
                  <CreditCard className="w-5 h-5 text-gray-600" />
                  <Label htmlFor="card" className="flex-1 cursor-pointer">
                    Credit/Debit Card
                  </Label>
                </div>
                <div className="flex items-center space-x-3 p-3 border rounded-lg">
                  <RadioGroupItem value="upi" id="upi" />
                  <Smartphone className="w-5 h-5 text-gray-600" />
                  <Label htmlFor="upi" className="flex-1 cursor-pointer">
                    UPI Payment
                  </Label>
                </div>
                <div className="flex items-center space-x-3 p-3 border rounded-lg">
                  <RadioGroupItem value="netbanking" id="netbanking" />
                  <Building className="w-5 h-5 text-gray-600" />
                  <Label htmlFor="netbanking" className="flex-1 cursor-pointer">
                    Net Banking
                  </Label>
                </div>
              </RadioGroup>
            </CardContent>
          </Card>

          {paymentMethod === "card" && (
            <Card>
              <CardHeader>
                <CardTitle>Card Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="cardNumber">Card Number</Label>
                  <Input id="cardNumber" placeholder="1234 5678 9012 3456" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="expiry">Expiry Date</Label>
                    <Input id="expiry" placeholder="MM/YY" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="cvv">CVV</Label>
                    <Input id="cvv" placeholder="123" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="cardName">Cardholder Name</Label>
                  <Input id="cardName" placeholder="John Doe" />
                </div>
              </CardContent>
            </Card>
          )}

          {paymentMethod === "upi" && (
            <Card>
              <CardHeader>
                <CardTitle>UPI Payment</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <Label htmlFor="upiId">UPI ID</Label>
                  <Input id="upiId" placeholder="yourname@paytm" />
                </div>
              </CardContent>
            </Card>
          )}

          <div className="flex items-center gap-2 p-3 bg-green-50 border border-green-200 rounded-lg">
            <Shield className="w-5 h-5 text-green-600" />
            <span className="text-sm text-green-800">Your payment information is secure and encrypted</span>
          </div>

          <Button onClick={handlePayment} disabled={loading} className="w-full bg-blue-600 hover:bg-blue-700 h-12">
            {loading ? "Processing Payment..." : `Pay ₹${totalAmount}`}
          </Button>
        </div>
      </main>
      <BottomNavigation />
    </div>
  )
}
