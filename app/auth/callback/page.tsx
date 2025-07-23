"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { supabase } from "@/lib/supabase"
import { Card, CardContent } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import { Loader2, CheckCircle, XCircle } from "lucide-react"
import Image from "next/image"

export default function AuthCallbackPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)

  useEffect(() => {
    const handleAuthCallback = async () => {
      try {
        // Get the current URL and extract the hash fragment
        const hashFragment = window.location.hash.substring(1)
        const params = new URLSearchParams(hashFragment)

        // Check for error in URL params
        const errorParam = params.get("error")
        const errorDescription = params.get("error_description")

        if (errorParam) {
          setError(errorDescription || errorParam)
          setLoading(false)
          return
        }

        // Handle the auth callback
        const { data, error: authError } = await supabase.auth.getSession()

        if (authError) {
          console.error("Auth callback error:", authError)
          setError(authError.message)
          setLoading(false)
          return
        }

        if (data.session?.user) {
          setSuccess(true)
          setLoading(false)

          // Redirect to home page after a short delay
          setTimeout(() => {
            router.push("/")
          }, 2000)
        } else {
          setError("No session found. Please try signing in again.")
          setLoading(false)
        }
      } catch (err) {
        console.error("Callback handling error:", err)
        setError("An unexpected error occurred. Please try again.")
        setLoading(false)
      }
    }

    handleAuthCallback()
  }, [router])

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-md backdrop-blur-sm bg-white/80 border-0 shadow-2xl">
        <CardContent className="p-8">
          {/* Logo */}
          <div className="text-center mb-8">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="relative">
                <Image
                  src="/placeholder-logo.png"
                  alt="Labify Logo"
                  width={48}
                  height={48}
                  className="rounded-2xl shadow-lg"
                />
                <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full animate-pulse"></div>
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-teal-600 bg-clip-text text-transparent">
                  Labify
                </h1>
                <p className="text-sm text-gray-500 -mt-1">Health at your fingertips</p>
              </div>
            </div>
          </div>

          {loading && (
            <div className="text-center space-y-4">
              <div className="flex justify-center">
                <Loader2 className="w-12 h-12 animate-spin text-blue-500" />
              </div>
              <div>
                <h2 className="text-xl font-semibold text-gray-800 mb-2">Completing Sign-In</h2>
                <p className="text-gray-600">Please wait while we set up your account...</p>
              </div>
            </div>
          )}

          {success && (
            <div className="text-center space-y-4">
              <div className="flex justify-center">
                <CheckCircle className="w-12 h-12 text-green-500" />
              </div>
              <div>
                <h2 className="text-xl font-semibold text-gray-800 mb-2">Welcome to Labify!</h2>
                <p className="text-gray-600">Sign-in successful. Redirecting to your dashboard...</p>
              </div>
            </div>
          )}

          {error && (
            <div className="space-y-4">
              <div className="text-center">
                <div className="flex justify-center mb-4">
                  <XCircle className="w-12 h-12 text-red-500" />
                </div>
                <h2 className="text-xl font-semibold text-gray-800 mb-2">Sign-In Failed</h2>
              </div>

              <Alert className="border-red-200 bg-red-50">
                <AlertDescription className="text-red-700">{error}</AlertDescription>
              </Alert>

              <div className="flex gap-2">
                <Button
                  onClick={() => router.push("/auth/login")}
                  className="flex-1 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-semibold rounded-xl"
                >
                  Try Again
                </Button>
                <Button onClick={() => router.push("/")} variant="outline" className="flex-1 rounded-xl">
                  Go Home
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
