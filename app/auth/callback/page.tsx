"use client"

import { useEffect, useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Loader2, CheckCircle, AlertCircle } from "lucide-react"
import { supabase } from "@/lib/supabase"
import { useToast } from "@/hooks/use-toast"

export default function AuthCallbackPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const { toast } = useToast()
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)

  useEffect(() => {
    const handleAuthCallback = async () => {
      try {
        // Handle both URL search params and hash params
        const code = searchParams.get("code")
        const error = searchParams.get("error")
        const errorDescription = searchParams.get("error_description")

        // Parse hash parameters (for implicit flow)
        const hashParams = new URLSearchParams(window.location.hash.substring(1))
        const accessToken = hashParams.get("access_token")
        const refreshToken = hashParams.get("refresh_token")
        const tokenType = hashParams.get("token_type")
        const expiresIn = hashParams.get("expires_in")
        const hashError = hashParams.get("error")
        const hashErrorDescription = hashParams.get("error_description")

        console.log("Auth callback debug:", {
          searchParams: {
            code,
            error,
            errorDescription,
          },
          hashParams: {
            accessToken: accessToken ? `${accessToken.substring(0, 20)}...` : null,
            refreshToken: refreshToken ? `${refreshToken.substring(0, 20)}...` : null,
            tokenType,
            expiresIn,
            error: hashError,
            errorDescription: hashErrorDescription,
          },
          fullUrl: window.location.href,
          hash: window.location.hash,
          search: window.location.search,
        })

        // Check for errors first
        const authError = error || hashError
        const authErrorDescription = errorDescription || hashErrorDescription

        if (authError) {
          console.error("OAuth error:", authError, authErrorDescription)
          setError(authErrorDescription || authError)
          setLoading(false)
          return
        }

        // Handle implicit flow (access token in hash)
        if (accessToken && tokenType) {
          console.log("Handling implicit flow with access token")

          try {
            // Set the session using the tokens from the hash
            const { data, error: sessionError } = await supabase.auth.setSession({
              access_token: accessToken,
              refresh_token: refreshToken || "",
            })

            if (sessionError) {
              console.error("Session error:", sessionError)
              setError(`Failed to establish session: ${sessionError.message}`)
              setLoading(false)
              return
            }

            if (data.user && data.session) {
              console.log("User authenticated via implicit flow:", data.user.email)
              await handleSuccessfulAuth(data.user, data.session)
              return
            } else {
              setError("Authentication succeeded but no user data received")
              setLoading(false)
              return
            }
          } catch (implicitError) {
            console.error("Implicit flow error:", implicitError)
            setError("Failed to process authentication tokens")
            setLoading(false)
            return
          }
        }

        // Handle authorization code flow
        if (code) {
          console.log("Handling authorization code flow")

          try {
            const { data, error: exchangeError } = await supabase.auth.exchangeCodeForSession(code)

            if (exchangeError) {
              console.error("Code exchange error:", exchangeError)
              setError(`Failed to exchange code: ${exchangeError.message}`)
              setLoading(false)
              return
            }

            if (data.user && data.session) {
              console.log("User authenticated via code flow:", data.user.email)
              await handleSuccessfulAuth(data.user, data.session)
              return
            } else {
              setError("Code exchange succeeded but no user data received")
              setLoading(false)
              return
            }
          } catch (codeError) {
            console.error("Code flow error:", codeError)
            setError("Failed to process authorization code")
            setLoading(false)
            return
          }
        }

        // Fallback: check for existing session
        console.log("No code or token found, checking existing session...")
        try {
          const {
            data: { session },
            error: sessionError,
          } = await supabase.auth.getSession()

          if (sessionError) {
            console.error("Session check error:", sessionError)
            setError("Failed to retrieve session")
            setLoading(false)
            return
          }

          if (session?.user) {
            console.log("Found existing session for:", session.user.email)
            await handleSuccessfulAuth(session.user, session)
            return
          } else {
            console.log("No existing session found")
            setError("No authorization code or access token received. Please try signing in again.")
            setLoading(false)
            return
          }
        } catch (fallbackError) {
          console.error("Fallback session check error:", fallbackError)
          setError("Failed to verify authentication status")
          setLoading(false)
          return
        }
      } catch (error) {
        console.error("Auth callback error:", error)
        setError("An unexpected error occurred during authentication")
        setLoading(false)
      }
    }

    const handleSuccessfulAuth = async (user: any, session: any) => {
      try {
        console.log("Creating user profile for:", user.email)

        // Create user profile via API route (bypasses RLS)
        const response = await fetch("/api/auth/create-profile", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${session.access_token}`,
          },
          body: JSON.stringify({
            id: user.id,
            email: user.email,
            name: user.user_metadata?.full_name || user.user_metadata?.name || user.email?.split("@")[0] || "User",
          }),
        })

        if (!response.ok) {
          const errorText = await response.text()
          console.error("Profile creation failed:", errorText)
          // Don't fail the auth flow for profile creation errors
        } else {
          console.log("Profile created successfully")
        }

        setSuccess(true)
        toast({
          title: "Welcome to Labify!",
          description: "You have been successfully signed in with Google.",
        })

        // Clear the URL hash to prevent issues on refresh
        if (window.location.hash) {
          window.history.replaceState(null, "", window.location.pathname + window.location.search)
        }

        // Redirect after a short delay
        setTimeout(() => {
          router.push("/")
        }, 2000)
      } catch (profileError) {
        console.error("Profile creation error:", profileError)
        // Still consider auth successful even if profile creation fails
        setSuccess(true)
        toast({
          title: "Welcome to Labify!",
          description: "You have been successfully signed in.",
        })
        setTimeout(() => {
          router.push("/")
        }, 2000)
      }
    }

    handleAuthCallback()
  }, [searchParams, router, toast])

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center p-4">
        <Card className="w-full max-w-md shadow-xl border-0 bg-white/80 backdrop-blur-sm">
          <CardHeader className="text-center">
            <div className="flex items-center justify-center gap-2 mb-4">
              <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold">L</span>
              </div>
              <span className="text-2xl font-bold text-blue-600">Labify</span>
            </div>
            <CardTitle>Completing Sign In</CardTitle>
            <CardDescription>Please wait while we set up your account...</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col items-center space-y-4">
            <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
            <p className="text-sm text-gray-600">Authenticating with Google...</p>
          </CardContent>
        </Card>
      </div>
    )
  }

  if (success) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-50 flex items-center justify-center p-4">
        <Card className="w-full max-w-md shadow-xl border-0 bg-white/80 backdrop-blur-sm">
          <CardHeader className="text-center">
            <div className="flex items-center justify-center gap-2 mb-4">
              <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold">L</span>
              </div>
              <span className="text-2xl font-bold text-blue-600">Labify</span>
            </div>
            <CardTitle className="text-green-600">Welcome to Labify!</CardTitle>
            <CardDescription>You have been successfully signed in</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col items-center space-y-4">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
              <CheckCircle className="w-8 h-8 text-green-600" />
            </div>
            <p className="text-sm text-gray-600 text-center">Redirecting you to the dashboard...</p>
          </CardContent>
        </Card>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-orange-50 flex items-center justify-center p-4">
        <Card className="w-full max-w-md shadow-xl border-0 bg-white/80 backdrop-blur-sm">
          <CardHeader className="text-center">
            <div className="flex items-center justify-center gap-2 mb-4">
              <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold">L</span>
              </div>
              <span className="text-2xl font-bold text-blue-600">Labify</span>
            </div>
            <CardTitle className="text-red-600">Authentication Failed</CardTitle>
            <CardDescription>There was an issue signing you in</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
            <div className="space-y-2">
              <Button onClick={() => router.push("/auth/login")} className="w-full">
                Try Again
              </Button>
              <Button onClick={() => router.push("/")} variant="outline" className="w-full">
                Back to Home
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  return null
}
