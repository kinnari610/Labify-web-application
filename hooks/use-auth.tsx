"use client"

import type React from "react"

import { createContext, useContext, useEffect, useState } from "react"
import type { User } from "@supabase/supabase-js"
import { supabase, isDemoMode } from "@/lib/supabase"

interface AuthContextType {
  user: User | null
  loading: boolean
  signIn: (email: string, password: string) => Promise<{ error?: string; needsConfirmation?: boolean }>
  signUp: (email: string, password: string, name: string) => Promise<{ error?: string; needsConfirmation?: boolean }>
  signOut: () => Promise<void>
  resendConfirmation: (email: string) => Promise<{ error?: string; success?: boolean }>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

// Demo user for development
const demoUser = {
  id: "demo-user-id",
  email: "demo@labify.com",
  created_at: new Date().toISOString(),
  updated_at: new Date().toISOString(),
  email_confirmed_at: new Date().toISOString(),
  last_sign_in_at: new Date().toISOString(),
  app_metadata: {},
  user_metadata: { name: "Demo User" },
  aud: "authenticated",
  role: "authenticated",
} as User

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (isDemoMode) {
      // In demo mode, check localStorage for demo auth state
      const demoAuth = localStorage.getItem("demo-auth")
      if (demoAuth === "true") {
        setUser(demoUser)
      }
      setLoading(false)
      return
    }

    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null)
      setLoading(false)
    })

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null)
      setLoading(false)
    })

    return () => subscription.unsubscribe()
  }, [])

  const signIn = async (email: string, password: string) => {
    if (isDemoMode) {
      // Demo mode - simulate successful login
      if (email === "demo@labify.com" && password === "demo123") {
        localStorage.setItem("demo-auth", "true")
        setUser(demoUser)
        return {}
      } else {
        return { error: "Invalid credentials. Use demo@labify.com / demo123" }
      }
    }

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (error) {
      // Handle specific error cases
      if (error.message.includes("Email not confirmed")) {
        return {
          error: "Please check your email and click the confirmation link before signing in.",
          needsConfirmation: true,
        }
      }
      if (error.message.includes("Invalid login credentials")) {
        return { error: "Invalid email or password. Please check your credentials and try again." }
      }
      return { error: error.message }
    }

    return {}
  }

  const signUp = async (email: string, password: string, name: string) => {
    if (isDemoMode) {
      // Demo mode - simulate successful signup
      localStorage.setItem("demo-auth", "true")
      setUser({ ...demoUser, email, user_metadata: { name } })
      return {}
    }

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          name: name,
        },
      },
    })

    if (error) {
      return { error: error.message }
    }

    // Create user profile
    if (data.user) {
      const { error: profileError } = await supabase.from("users").upsert(
        [
          {
            id: data.user.id,
            email,
            name,
          },
        ],
        {
          onConflict: "id",
          ignoreDuplicates: true,
        },
      )

      if (profileError) {
        console.error("Profile creation error:", profileError)
      }
    }

    // Check if email confirmation is needed
    if (data.user && !data.session) {
      return { needsConfirmation: true }
    }

    return {}
  }

  const resendConfirmation = async (email: string) => {
    if (isDemoMode) {
      return { success: true }
    }

    const { error } = await supabase.auth.resend({
      type: "signup",
      email: email,
    })

    if (error) {
      return { error: error.message }
    }

    return { success: true }
  }

  const signOut = async () => {
    if (isDemoMode) {
      localStorage.removeItem("demo-auth")
      setUser(null)
      return
    }

    await supabase.auth.signOut()
  }

  return (
    <AuthContext.Provider value={{ user, loading, signIn, signUp, signOut, resendConfirmation }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
