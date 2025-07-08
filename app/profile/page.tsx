"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Header } from "@/components/header"
import { BottomNavigation } from "@/components/bottom-navigation"
import { ProfileInfo } from "@/components/profile-info"
import { QuickActions } from "@/components/quick-actions"
import { Button } from "@/components/ui/button"
import { useAuth } from "@/hooks/use-auth"
import { useToast } from "@/hooks/use-toast"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Calendar, TestTube, CreditCard, Settings } from "lucide-react"

export default function ProfilePage() {
  const { user, signOut, loading } = useAuth()
  const { toast } = useToast()
  const router = useRouter()
  const [userStats, setUserStats] = useState({
    totalAppointments: 0,
    completedTests: 0,
    totalSpent: 0,
  })

  useEffect(() => {
    if (!loading && !user) {
      router.push("/auth/login")
    }
  }, [user, loading, router])

  const handleSignOut = async () => {
    try {
      await signOut()
      toast({
        title: "Signed out successfully",
        description: "You have been logged out of your account.",
      })
      router.push("/")
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to sign out. Please try again.",
        variant: "destructive",
      })
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-white font-bold text-sm">⚡</span>
          </div>
          <p>Loading...</p>
        </div>
      </div>
    )
  }

  if (!user) {
    return null
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="pb-20">
        <div className="px-4 py-6 space-y-6">
          <div className="flex items-center gap-2 mb-6">
            <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-sm">⚡</span>
            </div>
            <h1 className="text-xl font-bold text-gray-900">Profile</h1>
          </div>

          {/* User Stats */}
          <div className="grid grid-cols-3 gap-4">
            <Card className="text-center">
              <CardContent className="p-4">
                <Calendar className="w-6 h-6 text-blue-600 mx-auto mb-2" />
                <div className="text-2xl font-bold text-gray-900">{userStats.totalAppointments}</div>
                <div className="text-xs text-gray-600">Appointments</div>
              </CardContent>
            </Card>
            <Card className="text-center">
              <CardContent className="p-4">
                <TestTube className="w-6 h-6 text-green-600 mx-auto mb-2" />
                <div className="text-2xl font-bold text-gray-900">{userStats.completedTests}</div>
                <div className="text-xs text-gray-600">Tests Done</div>
              </CardContent>
            </Card>
            <Card className="text-center">
              <CardContent className="p-4">
                <CreditCard className="w-6 h-6 text-purple-600 mx-auto mb-2" />
                <div className="text-2xl font-bold text-gray-900">₹{userStats.totalSpent}</div>
                <div className="text-xs text-gray-600">Total Spent</div>
              </CardContent>
            </Card>
          </div>

          <ProfileInfo user={user} />
          <QuickActions />

          {/* Account Settings */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Settings className="w-5 h-5" />
                Account Settings
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button variant="outline" className="w-full justify-start bg-transparent">
                Edit Profile Information
              </Button>
              <Button variant="outline" className="w-full justify-start bg-transparent">
                Change Password
              </Button>
              <Button variant="outline" className="w-full justify-start bg-transparent">
                Notification Preferences
              </Button>
              <Button variant="outline" className="w-full justify-start bg-transparent">
                Privacy Settings
              </Button>
            </CardContent>
          </Card>

          {/* Membership Status */}
          <Card>
            <CardHeader>
              <CardTitle>Membership Status</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div>
                  <Badge variant="secondary">Free Member</Badge>
                  <p className="text-sm text-gray-600 mt-1">Upgrade to Plus for exclusive benefits</p>
                </div>
                <Button size="sm">Upgrade</Button>
              </div>
            </CardContent>
          </Card>

          <div className="pt-4">
            <Button
              onClick={handleSignOut}
              variant="outline"
              className="w-full text-red-600 border-red-200 hover:bg-red-50 bg-transparent"
            >
              Sign Out
            </Button>
          </div>
        </div>
      </main>
      <BottomNavigation />
    </div>
  )
}
