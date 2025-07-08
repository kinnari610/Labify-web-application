"use client"

import { useState, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Header } from "@/components/header"
import { BottomNavigation } from "@/components/bottom-navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Calendar, Clock, MapPin, Home } from "lucide-react"
import { useAuth } from "@/hooks/use-auth"
import { useToast } from "@/hooks/use-toast"
import { supabase } from "@/lib/supabase"

interface TestPackage {
  id: string
  name: string
  price: number
  description: string
}

export default function BookingPage() {
  const [bookingType, setBookingType] = useState<"lab_visit" | "home_service">("lab_visit")
  const [selectedDate, setSelectedDate] = useState("")
  const [selectedTime, setSelectedTime] = useState("")
  const [phone, setPhone] = useState("")
  const [address, setAddress] = useState("")
  const [notes, setNotes] = useState("")
  const [selectedPackage, setSelectedPackage] = useState<TestPackage | null>(null)
  const [loading, setLoading] = useState(false)

  const { user } = useAuth()
  const { toast } = useToast()
  const router = useRouter()
  const searchParams = useSearchParams()

  useEffect(() => {
    if (!user) {
      router.push("/auth/login")
      return
    }

    const packageId = searchParams.get("package")
    if (packageId) {
      fetchPackage(packageId)
    }
  }, [user, searchParams, router])

  const fetchPackage = async (packageId: string) => {
    try {
      const { data, error } = await supabase
        .from("test_packages")
        .select("id, name, price, description")
        .eq("id", packageId)
        .single()

      if (error) throw error

      setSelectedPackage(data)
    } catch (error) {
      console.error("Error fetching package:", error)
      toast({
        title: "Error",
        description: "Failed to load package details.",
        variant: "destructive",
      })
    }
  }

  const handleBooking = async () => {
    if (!user || !selectedPackage) return

    if (!selectedDate || !selectedTime || !phone) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive",
      })
      return
    }

    if (bookingType === "home_service" && !address) {
      toast({
        title: "Address Required",
        description: "Please provide your home address for home service.",
        variant: "destructive",
      })
      return
    }

    setLoading(true)

    try {
      // Create appointment
      const appointmentData = {
        user_id: user.id,
        test_package_id: selectedPackage.id,
        appointment_date: selectedDate,
        appointment_time: selectedTime,
        service_type: bookingType,
        phone,
        home_address: bookingType === "home_service" ? address : null,
        notes,
        total_amount: selectedPackage.price + (bookingType === "home_service" ? 150 : 0),
        status: "scheduled",
      }

      const { data, error } = await supabase.from("appointments").insert([appointmentData]).select().single()

      if (error) throw error

      toast({
        title: "Appointment Booked!",
        description: "Your appointment has been scheduled successfully.",
      })

      // Redirect to payment
      router.push(`/payment?appointment=${data.id}`)
    } catch (error) {
      console.error("Booking error:", error)
      toast({
        title: "Booking Failed",
        description: "Failed to book appointment. Please try again.",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  if (!user) {
    return null
  }

  const serviceFee = bookingType === "home_service" ? 150 : 0
  const totalAmount = (selectedPackage?.price || 0) + serviceFee

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="pb-20">
        <div className="px-4 py-6 space-y-6">
          <h1 className="text-xl font-bold text-gray-900">Book Appointment</h1>

          {selectedPackage && (
            <Card>
              <CardHeader>
                <CardTitle>Selected Package</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <h3 className="font-semibold">{selectedPackage.name}</h3>
                  <p className="text-sm text-gray-600">{selectedPackage.description}</p>
                  <p className="text-lg font-bold text-blue-600">₹{selectedPackage.price}</p>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Service Type Selection */}
          <Card>
            <CardHeader>
              <CardTitle>Select Service Type</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4">
                <Button
                  variant={bookingType === "lab_visit" ? "default" : "outline"}
                  onClick={() => setBookingType("lab_visit")}
                  className="flex items-center gap-2 h-16"
                >
                  <MapPin className="w-5 h-5" />
                  <div className="text-left">
                    <div className="font-semibold">Lab Visit</div>
                    <div className="text-xs opacity-70">Visit our lab</div>
                  </div>
                </Button>
                <Button
                  variant={bookingType === "home_service" ? "default" : "outline"}
                  onClick={() => setBookingType("home_service")}
                  className="flex items-center gap-2 h-16"
                >
                  <Home className="w-5 h-5" />
                  <div className="text-left">
                    <div className="font-semibold">Home Service</div>
                    <div className="text-xs opacity-70">We come to you</div>
                  </div>
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Date & Time Selection */}
          <Card>
            <CardHeader>
              <CardTitle>Select Date & Time</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="date">Preferred Date</Label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <Input
                    id="date"
                    type="date"
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
                    className="pl-10"
                    min={new Date().toISOString().split("T")[0]}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="time">Preferred Time</Label>
                <div className="relative">
                  <Clock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <Input
                    id="time"
                    type="time"
                    value={selectedTime}
                    onChange={(e) => setSelectedTime(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Contact Information */}
          <Card>
            <CardHeader>
              <CardTitle>Contact Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number *</Label>
                <Input
                  id="phone"
                  type="tel"
                  placeholder="Enter your phone number"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  required
                />
              </div>
              {bookingType === "home_service" && (
                <div className="space-y-2">
                  <Label htmlFor="address">Home Address *</Label>
                  <Textarea
                    id="address"
                    placeholder="Enter your complete address"
                    rows={3}
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    required
                  />
                </div>
              )}
              <div className="space-y-2">
                <Label htmlFor="notes">Additional Notes (Optional)</Label>
                <Textarea
                  id="notes"
                  placeholder="Any special instructions or requirements"
                  rows={2}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                />
              </div>
            </CardContent>
          </Card>

          {/* Booking Summary */}
          <Card>
            <CardHeader>
              <CardTitle>Booking Summary</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Service Type:</span>
                  <span className="font-semibold">{bookingType === "lab_visit" ? "Lab Visit" : "Home Service"}</span>
                </div>
                <div className="flex justify-between">
                  <span>Date:</span>
                  <span className="font-semibold">{selectedDate || "Not selected"}</span>
                </div>
                <div className="flex justify-between">
                  <span>Time:</span>
                  <span className="font-semibold">{selectedTime || "Not selected"}</span>
                </div>
                {selectedPackage && (
                  <div className="flex justify-between">
                    <span>Package Price:</span>
                    <span className="font-semibold">₹{selectedPackage.price}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>Service Fee:</span>
                  <span className="font-semibold">₹{serviceFee}</span>
                </div>
                <hr />
                <div className="flex justify-between font-bold text-lg">
                  <span>Total Amount:</span>
                  <span>₹{totalAmount}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Button
            onClick={handleBooking}
            disabled={loading || !selectedDate || !selectedTime || !phone}
            className="w-full bg-blue-600 hover:bg-blue-700 h-12"
          >
            {loading ? "Booking..." : "Proceed to Payment"}
          </Button>
        </div>
      </main>
      <BottomNavigation />
    </div>
  )
}
