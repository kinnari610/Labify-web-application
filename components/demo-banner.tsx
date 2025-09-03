"use client"

import { useState, useEffect } from "react"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import { X, Info } from "lucide-react"
import { isDemoMode } from "@/lib/supabase"

export function DemoBanner() {
  const [isVisible, setIsVisible] = useState(false)
  const [isDismissed, setIsDismissed] = useState(false)

  useEffect(() => {
    // Check if banner was previously dismissed
    const dismissed = localStorage.getItem("demo-banner-dismissed")
    if (!dismissed && isDemoMode) {
      setIsVisible(true)
    }
  }, [])

  const handleDismiss = () => {
    setIsVisible(false)
    setIsDismissed(true)
    localStorage.setItem("demo-banner-dismissed", "true")
  }

  if (!isVisible || !isDemoMode || isDismissed) {
    return null
  }

  return (
    <Alert className="rounded-none border-x-0 border-t-0 bg-blue-50 border-blue-200">
      <Info className="h-4 w-4 text-blue-600" />
      <AlertDescription className="flex items-center justify-between w-full">
        <span className="text-blue-800">
          <strong>Demo Mode:</strong> This is a demonstration version. Configure your Supabase environment variables for
          full functionality.
        </span>
        <Button
          variant="ghost"
          size="sm"
          onClick={handleDismiss}
          className="text-blue-600 hover:text-blue-800 hover:bg-blue-100 ml-4"
        >
          <X className="h-4 w-4" />
        </Button>
      </AlertDescription>
    </Alert>
  )
}
