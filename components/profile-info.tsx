"use client"

import { useState, useEffect } from "react"
import type { User } from "@supabase/supabase-js"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { supabase, isDemoMode } from "@/lib/supabase"
import { useToast } from "@/hooks/use-toast"
import { Edit, Save, X } from "lucide-react"

interface ProfileInfoProps {
  user: User
}

interface UserProfile {
  name: string
  phone?: string
  address?: string
}

export function ProfileInfo({ user }: ProfileInfoProps) {
  const [profile, setProfile] = useState<UserProfile>({
    name: user.user_metadata?.name || "Demo User",
  })
  const [isEditing, setIsEditing] = useState(false)
  const [loading, setLoading] = useState(false)
  const { toast } = useToast()

  useEffect(() => {
    if (!isDemoMode) {
      fetchProfile()
    } else {
      // Set demo data
      setProfile({
        name: user.user_metadata?.name || "Demo User",
        phone: "+91-9876543210",
        address: "123 Demo Street, Mumbai, Maharashtra 400001",
      })
    }
  }, [user.id])

  const fetchProfile = async () => {
    try {
      const { data, error } = await supabase.from("users").select("name, phone, address").eq("id", user.id).single()

      if (error) throw error

      if (data) {
        setProfile(data)
      }
    } catch (error) {
      console.error("Error fetching profile:", error)
    }
  }

  const handleSave = async () => {
    setLoading(true)
    try {
      if (isDemoMode) {
        // Simulate save in demo mode
        await new Promise((resolve) => setTimeout(resolve, 1000))
        toast({
          title: "Profile Updated (Demo)",
          description: "Your profile information has been saved in demo mode.",
        })
        setIsEditing(false)
        setLoading(false)
        return
      }

      const { error } = await supabase
        .from("users")
        .update({
          name: profile.name,
          phone: profile.phone,
          address: profile.address,
        })
        .eq("id", user.id)

      if (error) throw error

      toast({
        title: "Profile Updated",
        description: "Your profile information has been saved successfully.",
      })
      setIsEditing(false)
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update profile. Please try again.",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const handleCancel = () => {
    if (!isDemoMode) {
      fetchProfile() // Reset to original values
    }
    setIsEditing(false)
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Account Information</CardTitle>
          {!isEditing ? (
            <Button variant="outline" size="sm" onClick={() => setIsEditing(true)} className="bg-transparent">
              <Edit className="w-4 h-4 mr-2" />
              Edit
            </Button>
          ) : (
            <div className="flex gap-2">
              <Button variant="outline" size="sm" onClick={handleCancel} className="bg-transparent">
                <X className="w-4 h-4" />
              </Button>
              <Button size="sm" onClick={handleSave} disabled={loading}>
                <Save className="w-4 h-4 mr-2" />
                {loading ? "Saving..." : "Save"}
              </Button>
            </div>
          )}
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input id="email" value={user.email || ""} disabled className="bg-gray-50" />
        </div>

        <div className="space-y-2">
          <Label htmlFor="name">Full Name</Label>
          {isEditing ? (
            <Input
              id="name"
              value={profile.name}
              onChange={(e) => setProfile({ ...profile, name: e.target.value })}
              placeholder="Enter your full name"
            />
          ) : (
            <Input id="name" value={profile.name || "Not provided"} disabled className="bg-gray-50" />
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="phone">Phone Number</Label>
          {isEditing ? (
            <Input
              id="phone"
              value={profile.phone || ""}
              onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
              placeholder="Enter your phone number"
            />
          ) : (
            <Input id="phone" value={profile.phone || "Not provided"} disabled className="bg-gray-50" />
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="address">Address</Label>
          {isEditing ? (
            <Input
              id="address"
              value={profile.address || ""}
              onChange={(e) => setProfile({ ...profile, address: e.target.value })}
              placeholder="Enter your address"
            />
          ) : (
            <Input id="address" value={profile.address || "Not provided"} disabled className="bg-gray-50" />
          )}
        </div>
      </CardContent>
    </Card>
  )
}
