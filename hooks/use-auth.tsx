"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect, useCallback } from "react"
import type { User } from "@supabase/supabase-js"
import { supabase, isDemoMode } from "@/lib/supabase"
import { toast } from "@/hooks/use-toast"

interface AuthContextType {
  user: User | null
  loading: boolean
  signUp: (email: string, password: string, fullName: string) => Promise<{ error?: string }>
  signIn: (email: string, password: string) => Promise<{ error?: string }>
  signInWithGoogle: () => Promise<{ error?: string }>
  signOut: () => Promise<void>
  resetPassword: (email: string) => Promise<{ error?: string }>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

const isStubClient = () => Boolean((supabase as any).__isStub)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let mounted = true

    const initializeAuth = async () => {
      try {
        // If using a stub or demo mode, skip calling Supabase and end loading.
        if (isDemoMode || isStubClient() || !(supabase as any).auth?.getSession) {
          if (mounted) setLoading(false)
          return
        }

        const {
          data: { session },
        } = await (supabase as any).auth.getSession()

        if (mounted) setUser(session?.user ?? null)
      } catch (error) {
        console.error("Error initializing auth:", error)
      } finally {
        if (mounted) setLoading(false)
      }
    }

    initializeAuth()

    if (!(isDemoMode || isStubClient()) && (supabase as any).auth?.onAuthStateChange) {
      const { data } = (supabase as any).auth.onAuthStateChange(async (event: string, session: any) => {
        if (!mounted) return
        setUser(session?.user ?? null)
        setLoading(false)

        if (event === "SIGNED_IN" && session?.user) {
          try {
            await fetch("/api/auth/create-profile", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                userId: session.user.id,
                email: session.user.email,
                fullName: session.user.user_metadata?.full_name || session.user.user_metadata?.name,
                avatarUrl: session.user.user_metadata?.avatar_url,
              }),
            })
          } catch (e) {
            console.error("Error creating profile:", e)
          }
        }
      })

      return () => data.subscription.unsubscribe()
    }

    return () => {
      mounted = false
    }
  }, [])

  const signUp = useCallback(async (email: string, password: string, fullName: string) => {
    if (isDemoMode || isStubClient()) {
      toast({
        title: "Demo Mode",
        description: "Sign up is not available in demo mode. Please configure Supabase.",
        variant: "destructive",
      })
      return { error: "Demo mode - sign up not available" }
    }

    try {
      const { error } = await (supabase as any).auth.signUp({
        email,
        password,
        options: { data: { full_name: fullName } },
      })
      if (error) return { error: error.message }

      toast({
        title: "Check your email",
        description: "We've sent you a confirmation link to complete your registration.",
      })
      return {}
    } catch (e) {
      console.error("Sign up error:", e)
      return { error: "An unexpected error occurred" }
    }
  }, [])

  const signIn = useCallback(async (email: string, password: string) => {
    if (isDemoMode || isStubClient()) {
      toast({
        title: "Demo Mode",
        description: "Sign in is not available in demo mode. Please configure Supabase.",
        variant: "destructive",
      })
      return { error: "Demo mode - sign in not available" }
    }

    try {
      const { error } = await (supabase as any).auth.signInWithPassword({ email, password })
      if (error) return { error: error.message }

      toast({ title: "Welcome back!", description: "You have been signed in successfully." })
      return {}
    } catch (e) {
      console.error("Sign in error:", e)
      return { error: "An unexpected error occurred" }
    }
  }, [])

  const signInWithGoogle = useCallback(async () => {
    if (isDemoMode || isStubClient()) {
      toast({
        title: "Demo Mode",
        description: "Google sign in is not available in demo mode. Please configure Supabase.",
        variant: "destructive",
      })
      return { error: "Demo mode - Google sign in not available" }
    }

    try {
      const { error } = await (supabase as any).auth.signInWithOAuth({
        provider: "google",
        options: { redirectTo: `${window.location.origin}/auth/callback` },
      })
      if (error) return { error: error.message }
      return {}
    } catch (e) {
      console.error("Google sign in error:", e)
      return { error: "An unexpected error occurred" }
    }
  }, [])

  const signOut = useCallback(async () => {
    if (isDemoMode || isStubClient()) {
      toast({
        title: "Demo Mode",
        description: "Sign out is not available in demo mode.",
        variant: "destructive",
      })
      return
    }

    try {
      const { error } = await (supabase as any).auth.signOut()
      if (error) {
        console.error("Sign out error:", error)
        toast({ title: "Error", description: "Failed to sign out. Please try again.", variant: "destructive" })
      } else {
        toast({ title: "Signed out", description: "You have been signed out successfully." })
      }
    } catch (e) {
      console.error("Sign out error:", e)
      toast({ title: "Error", description: "An unexpected error occurred while signing out.", variant: "destructive" })
    }
  }, [])

  const resetPassword = useCallback(async (email: string) => {
    if (isDemoMode || isStubClient()) {
      toast({
        title: "Demo Mode",
        description: "Password reset is not available in demo mode. Please configure Supabase.",
        variant: "destructive",
      })
      return { error: "Demo mode - password reset not available" }
    }

    try {
      const { error } = await (supabase as any).auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/auth/reset-password`,
      })
      if (error) return { error: error.message }

      toast({ title: "Check your email", description: "We've sent you a password reset link." })
      return {}
    } catch (e) {
      console.error("Password reset error:", e)
      return { error: "An unexpected error occurred" }
    }
  }, [])

  const value: AuthContextType = {
    user,
    loading,
    signUp,
    signIn,
    signInWithGoogle,
    signOut,
    resetPassword,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error("useAuth must be used within an AuthProvider")
  return ctx
}
