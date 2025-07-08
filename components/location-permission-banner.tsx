"use client"

import { useState } from "react"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import { MapPin, X, Settings } from "lucide-react"

interface LocationPermissionBannerProps {
  onRequestLocation: () => void
  onDismiss: () => void
  error?: string | null
}

export function LocationPermissionBanner({ onRequestLocation, onDismiss, error }: LocationPermissionBannerProps) {
  const [dismissed, setDismissed] = useState(false)

  if (dismissed) return null

  const handleDismiss = () => {
    setDismissed(true)
    onDismiss()
  }

  if (error) {
    return (
      <Alert className="border-red-200 bg-red-50">
        <MapPin className="h-4 w-4 text-red-600" />
        <AlertDescription className="text-red-800">
          <div className="flex items-start justify-between">
            <div className="flex-1 pr-2">
              <p className="font-medium mb-1">Location Error</p>
              <p className="text-sm">{error}</p>
              {error.includes("denied") && (
                <div className="mt-2 text-xs">
                  <p>To enable location access:</p>
                  <p>1. Click the location icon in your browser's address bar</p>
                  <p>2. Select "Allow" for location permissions</p>
                  <p>3. Refresh the page and try again</p>
                </div>
              )}
            </div>
            <Button variant="ghost" size="sm" onClick={handleDismiss} className="text-red-600 hover:bg-red-100 p-1">
              <X className="h-4 w-4" />
            </Button>
          </div>
        </AlertDescription>
      </Alert>
    )
  }

  return (
    <Alert className="border-blue-200 bg-blue-50">
      <MapPin className="h-4 w-4 text-blue-600" />
      <AlertDescription className="text-blue-800">
        <div className="flex items-center justify-between">
          <div className="flex-1 pr-2">
            <p className="font-medium mb-1">Enable Location for Better Results</p>
            <p className="text-sm">Allow location access to find labs near you and get accurate distances.</p>
          </div>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={onRequestLocation}
              className="bg-transparent border-blue-300 text-blue-700 hover:bg-blue-100"
            >
              <Settings className="w-4 h-4 mr-1" />
              Enable
            </Button>
            <Button variant="ghost" size="sm" onClick={handleDismiss} className="text-blue-600 hover:bg-blue-100 p-1">
              <X className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </AlertDescription>
    </Alert>
  )
}
