"use client"

import { isDemoMode } from "@/lib/supabase"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Info } from "lucide-react"

export function DemoBanner() {
  if (!isDemoMode) return null

  return (
    <Alert className="mb-4 border-blue-200 bg-blue-50">
      <Info className="h-4 w-4 text-blue-600" />
      <AlertDescription className="text-blue-800">
        <strong>Demo Mode:</strong> Use email: <code className="bg-white px-1 rounded">demo@labify.com</code> and
        password: <code className="bg-white px-1 rounded">demo123</code> to login.
      </AlertDescription>
    </Alert>
  )
}
