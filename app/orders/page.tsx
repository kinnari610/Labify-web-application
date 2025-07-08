import Link from "next/link"
import { Header } from "@/components/header"
import { BottomNavigation } from "@/components/bottom-navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Calendar, MapPin, TestTube, Download } from "lucide-react"

const orders = [
  {
    id: "LAB123456",
    testName: "Full Body Checkup Premium",
    date: "2024-01-15",
    time: "10:00 AM",
    status: "completed",
    serviceType: "home_service",
    amount: 270,
    reportAvailable: true,
  },
  {
    id: "LAB123457",
    testName: "Diabetes Care Package",
    date: "2024-01-20",
    time: "2:00 PM",
    status: "scheduled",
    serviceType: "lab_visit",
    amount: 450,
    reportAvailable: false,
  },
]

export default function OrdersPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="pb-20">
        <div className="px-4 py-6 space-y-6">
          <h1 className="text-xl font-bold text-gray-900">My Orders</h1>

          <div className="space-y-4">
            {orders.map((order) => (
              <Card key={order.id}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg">{order.testName}</CardTitle>
                    <Badge
                      variant={order.status === "completed" ? "default" : "secondary"}
                      className={order.status === "completed" ? "bg-green-100 text-green-800" : ""}
                    >
                      {order.status === "completed" ? "Completed" : "Scheduled"}
                    </Badge>
                  </div>
                  <p className="text-sm text-gray-600">Order ID: {order.id}</p>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center gap-4 text-sm">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-gray-600" />
                      <span>
                        {order.date} at {order.time}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-gray-600" />
                      <span>{order.serviceType === "home_service" ? "Home Service" : "Lab Visit"}</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="text-lg font-semibold">₹{order.amount}</div>
                    <div className="flex gap-2">
                      {order.reportAvailable && (
                        <Button size="sm" variant="outline" className="flex items-center gap-2 bg-transparent">
                          <Download className="w-4 h-4" />
                          Download Report
                        </Button>
                      )}
                      <Button size="sm">View Details</Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {orders.length === 0 && (
            <div className="text-center py-12">
              <TestTube className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">No Orders Yet</h3>
              <p className="text-gray-600 mb-4">You haven't booked any lab tests yet</p>
              <Button asChild>
                <Link href="/lab-tests">Browse Lab Tests</Link>
              </Button>
            </div>
          )}
        </div>
      </main>
      <BottomNavigation />
    </div>
  )
}
