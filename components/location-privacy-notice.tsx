"use client"

import { useState } from "react"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import { Shield, X, Eye, Lock } from "lucide-react"

export function LocationPrivacyNotice() {
  const [isVisible, setIsVisible] = useState(() => {
    if (typeof window !== "undefined") {
      return !localStorage.getItem("location_privacy_acknowledged")
    }
    return true
  })

  const handleAcknowledge = () => {
    localStorage.setItem("location_privacy_acknowledged", "true")
    setIsVisible(false)
  }

  if (!isVisible) return null

  return (
    <Alert className="border-blue-200 bg-blue-50">
      <Shield className="h-4 w-4 text-blue-600" />
      <AlertDescription className="text-blue-800">
        <div className="flex items-start justify-between">
          <div className="flex-1 pr-2">
            <p className="font-medium mb-2">Your Privacy Matters</p>
            <div className="text-sm space-y-1">
              <div className="flex items-center gap-2">
                <Lock className="w-3 h-3" />
                <span>Location data is stored locally on your device</span>
              </div>
              <div className="flex items-center gap-2">
                <Eye className="w-3 h-3" />
                <span>We only use location to find nearby labs and services</span>
              </div>
              <div className="flex items-center gap-2">
                <Shield className="w-3 h-3" />
                <span>You can disable location access anytime in settings</span>
              </div>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={handleAcknowledge}
              className="mt-3 bg-transparent border-blue-300 text-blue-700 hover:bg-blue-100"
            >
              I Understand
            </Button>
          </div>
          <Button variant="ghost" size="sm" onClick={handleAcknowledge} className="text-blue-600 hover:bg-blue-100 p-1">
            <X className="h-4 w-4" />
          </Button>
        </div>
      </AlertDescription>
    </Alert>
  )
}
