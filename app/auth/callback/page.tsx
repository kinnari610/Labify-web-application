"use client"

import { useEffect, useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Loader2, CheckCircle, XCircle, ArrowRight } from "lucide-react"
import { supabase, isDemoMode } from "@/lib/supabase"
import { useAuth } from "@/hooks/use-auth"

export default function AuthCallbackPage() {
  const [status, setStatus] = useState<"loading" | "success" | "error">("loading")
  const [message, setMessage] = useState("")
  const router = useRouter()
  const searchParams = useSearchParams()
  const { refreshProfile } = useAuth()

  useEffect(() => {
    const handleAuthCallback = async () => {
      try {
        if (isDemoMode) {
          setStatus("success")
          setMessage("Authentication successful in demo mode!")
          setTimeout(() => router.push("/"), 2000)
          return
        }

        // Handle the auth callback
        const { data, error } = await supabase.auth.getSession()

        if (error) {
          console.error("Auth callback error:", error)
          setStatus("error")
          setMessage(error.message || "Authentication failed")
          return
        }

        if (data.session?.user) {
          // Create profile if it doesn't exist
          try {
            const response = await fetch("/api/auth/create-profile", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                id: data.session.user.id,
                email: data.session.user.email,
                full_name: data.session.user.user_metadata?.full_name || null,
                avatar_url: data.session.user.user_metadata?.avatar_url || null,
              }),
            })

            if (!response.ok) {
              const errorData = await response.json()
              console.warn("Profile creation warning:", errorData.error)
            }

            // Refresh profile data
            await refreshProfile()

            setStatus("success")
            setMessage("Authentication successful! Redirecting...")

            // Redirect to the intended page or home
            const redirectTo = searchParams.get("redirect") || "/"
            setTimeout(() => router.push(redirectTo), 2000)
          } catch (profileError) {
            console.error("Profile creation error:", profileError)
            // Still consider auth successful even if profile creation fails
            setStatus("success")
            setMessage("Authentication successful! Redirecting...")
            setTimeout(() => router.push("/"), 2000)
          }
        } else {
          setStatus("error")
          setMessage("No user session found")
        }
      } catch (error) {
        console.error("Callback handling error:", error)
        setStatus("error")
        setMessage("An unexpected error occurred during authentication")
      }
    }

    handleAuthCallback()
  }, [router, searchParams, refreshProfile])

  const handleRetry = () => {
    router.push("/auth/login")
  }

  const handleGoHome = () => {
    router.push("/")
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full">
        <Card>
          <CardHeader className="text-center">
            <div className="mx-auto mb-4">
              {status === "loading" && <Loader2 className="h-12 w-12 animate-spin text-primary" />}
              {status === "success" && <CheckCircle className="h-12 w-12 text-green-600" />}
              {status === "error" && <XCircle className="h-12 w-12 text-red-600" />}
            </div>
            <CardTitle>
              {status === "loading" && "Authenticating..."}
              {status === "success" && "Authentication Successful!"}
              {status === "error" && "Authentication Failed"}
            </CardTitle>
            <CardDescription>
              {status === "loading" && "Please wait while we complete your authentication"}
              {status === "success" && "You have been successfully signed in"}
              {status === "error" && "There was a problem with your authentication"}
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-4">
            {message && (
              <Alert variant={status === "error" ? "destructive" : "default"}>
                <AlertDescription>{message}</AlertDescription>
              </Alert>
            )}

            {status === "success" && (
              <div className="text-center">
                <p className="text-sm text-muted-foreground mb-4">
                  You will be redirected automatically in a few seconds...
                </p>
                <Button onClick={handleGoHome} className="w-full">
                  Continue to App
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            )}

            {status === "error" && (
              <div className="space-y-2">
                <Button onClick={handleRetry} className="w-full">
                  Try Again
                </Button>
                <Button onClick={handleGoHome} variant="outline" className="w-full bg-transparent">
                  Go to Home
                </Button>
              </div>
            )}

            {status === "loading" && (
              <div className="text-center">
                <p className="text-sm text-muted-foreground">This may take a few moments...</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
