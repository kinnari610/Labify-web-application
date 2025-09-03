"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect, useCallback } from "react"
import type { User, AuthError, Session } from "@supabase/supabase-js"
import { supabase, isDemoMode, type Profile } from "@/lib/supabase"
import { useToast } from "@/hooks/use-toast"
import { useRouter } from "next/navigation"

interface AuthContextType {
  user: User | null
  profile: Profile | null
  session: Session | null
  isLoading: boolean
  isSigningIn: boolean
  isSigningUp: boolean
  isSigningOut: boolean
  signIn: (email: string, password: string) => Promise<{ error: AuthError | null }>
  signUp: (email: string, password: string, fullName?: string) => Promise<{ error: AuthError | null }>
  signOut: () => Promise<void>
  signInWithGoogle: () => Promise<{ error: AuthError | null }>
  updateProfile: (updates: Partial<Profile>) => Promise<{ error: Error | null }>
  refreshProfile: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [profile, setProfile] = useState<Profile | null>(null)
  const [session, setSession] = useState<Session | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isSigningIn, setIsSigningIn] = useState(false)
  const [isSigningUp, setIsSigningUp] = useState(false)
  const [isSigningOut, setIsSigningOut] = useState(false)
  const { toast } = useToast()
  const router = useRouter()

  // Fetch user profile
  const fetchProfile = useCallback(async (userId: string): Promise<Profile | null> => {
    if (isDemoMode) {
      // Return demo profile
      return {
        id: userId,
        email: "demo@example.com",
        full_name: "Demo User",
        avatar_url: null,
        phone: null,
        date_of_birth: null,
        gender: null,
        address: null,
        city: null,
        state: null,
        pincode: null,
        emergency_contact_name: null,
        emergency_contact_phone: null,
        medical_conditions: null,
        allergies: null,
        medications: null,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      }
    }

    try {
      const { data, error } = await supabase.from("profiles").select("*").eq("id", userId).single()

      if (error) {
        console.error("Error fetching profile:", error)
        return null
      }

      return data
    } catch (error) {
      console.error("Error fetching profile:", error)
      return null
    }
  }, [])

  // Create profile for new users
  const createProfile = useCallback(
    async (user: User, fullName?: string): Promise<void> => {
      if (isDemoMode) {
        console.log("Demo mode: Skipping profile creation")
        return
      }

      try {
        const response = await fetch("/api/auth/create-profile", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            id: user.id,
            email: user.email,
            full_name: fullName || user.user_metadata?.full_name || null,
            avatar_url: user.user_metadata?.avatar_url || null,
          }),
        })

        if (!response.ok) {
          const errorData = await response.json()
          throw new Error(errorData.error || "Failed to create profile")
        }

        console.log("Profile created successfully")
      } catch (error) {
        console.error("Error creating profile:", error)
        toast({
          title: "Profile Creation Error",
          description: "There was an issue creating your profile. Please try again.",
          variant: "destructive",
        })
      }
    },
    [toast],
  )

  // Initialize auth state
  useEffect(() => {
    let mounted = true

    const initializeAuth = async () => {
      try {
        const {
          data: { session: initialSession },
        } = await supabase.auth.getSession()

        if (mounted) {
          setSession(initialSession)
          setUser(initialSession?.user ?? null)

          if (initialSession?.user) {
            const userProfile = await fetchProfile(initialSession.user.id)
            if (mounted) {
              setProfile(userProfile)
            }
          }
        }
      } catch (error) {
        console.error("Error initializing auth:", error)
      } finally {
        if (mounted) {
          setIsLoading(false)
        }
      }
    }

    initializeAuth()

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (!mounted) return

      console.log("Auth state changed:", event, session?.user?.email)

      setSession(session)
      setUser(session?.user ?? null)

      if (session?.user) {
        const userProfile = await fetchProfile(session.user.id)
        if (mounted) {
          setProfile(userProfile)
        }
      } else {
        if (mounted) {
          setProfile(null)
        }
      }

      if (mounted) {
        setIsLoading(false)
      }
    })

    return () => {
      mounted = false
      subscription.unsubscribe()
    }
  }, [fetchProfile])

  const signIn = useCallback(
    async (email: string, password: string) => {
      if (isDemoMode) {
        // Demo mode sign in
        toast({
          title: "Demo Mode",
          description: "Sign in successful in demo mode",
        })
        return { error: null }
      }

      setIsSigningIn(true)
      try {
        const { error } = await supabase.auth.signInWithPassword({
          email,
          password,
        })

        if (error) {
          toast({
            title: "Sign In Error",
            description: error.message,
            variant: "destructive",
          })
        } else {
          toast({
            title: "Welcome back!",
            description: "You have been signed in successfully.",
          })
        }

        return { error }
      } catch (error) {
        const authError = error as AuthError
        toast({
          title: "Sign In Error",
          description: authError.message || "An unexpected error occurred",
          variant: "destructive",
        })
        return { error: authError }
      } finally {
        setIsSigningIn(false)
      }
    },
    [toast],
  )

  const signUp = useCallback(
    async (email: string, password: string, fullName?: string) => {
      if (isDemoMode) {
        // Demo mode sign up
        toast({
          title: "Demo Mode",
          description: "Account created successfully in demo mode",
        })
        return { error: null }
      }

      setIsSigningUp(true)
      try {
        const { data, error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            data: {
              full_name: fullName,
            },
          },
        })

        if (error) {
          toast({
            title: "Sign Up Error",
            description: error.message,
            variant: "destructive",
          })
        } else if (data.user) {
          // Create profile for new user
          await createProfile(data.user, fullName)

          toast({
            title: "Account Created!",
            description: "Please check your email to verify your account.",
          })
        }

        return { error }
      } catch (error) {
        const authError = error as AuthError
        toast({
          title: "Sign Up Error",
          description: authError.message || "An unexpected error occurred",
          variant: "destructive",
        })
        return { error: authError }
      } finally {
        setIsSigningUp(false)
      }
    },
    [toast, createProfile],
  )

  const signInWithGoogle = useCallback(async () => {
    if (isDemoMode) {
      toast({
        title: "Demo Mode",
        description: "Google sign in not available in demo mode",
        variant: "destructive",
      })
      return { error: new Error("Demo mode") as AuthError }
    }

    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
          redirectTo: `${window.location.origin}/auth/callback`,
        },
      })

      if (error) {
        toast({
          title: "Google Sign In Error",
          description: error.message,
          variant: "destructive",
        })
      }

      return { error }
    } catch (error) {
      const authError = error as AuthError
      toast({
        title: "Google Sign In Error",
        description: authError.message || "An unexpected error occurred",
        variant: "destructive",
      })
      return { error: authError }
    }
  }, [toast])

  const signOut = useCallback(async () => {
    setIsSigningOut(true)
    try {
      if (!isDemoMode) {
        const { error } = await supabase.auth.signOut()
        if (error) {
          console.error("Sign out error:", error)
          toast({
            title: "Sign Out Error",
            description: error.message,
            variant: "destructive",
          })
          return
        }
      }

      // Clear local state
      setUser(null)
      setProfile(null)
      setSession(null)

      toast({
        title: "Signed Out",
        description: "You have been signed out successfully.",
      })

      // Redirect to home page
      router.push("/")
    } catch (error) {
      console.error("Sign out error:", error)
      toast({
        title: "Sign Out Error",
        description: "An unexpected error occurred while signing out.",
        variant: "destructive",
      })
    } finally {
      setIsSigningOut(false)
    }
  }, [toast, router])

  const updateProfile = useCallback(
    async (updates: Partial<Profile>) => {
      if (!user) {
        return { error: new Error("No user logged in") }
      }

      if (isDemoMode) {
        // Update local state in demo mode
        setProfile((prev) => (prev ? { ...prev, ...updates } : null))
        toast({
          title: "Profile Updated",
          description: "Profile updated successfully in demo mode.",
        })
        return { error: null }
      }

      try {
        const { error } = await supabase
          .from("profiles")
          .update({ ...updates, updated_at: new Date().toISOString() })
          .eq("id", user.id)

        if (error) {
          toast({
            title: "Update Error",
            description: error.message,
            variant: "destructive",
          })
          return { error: new Error(error.message) }
        }

        // Refresh profile
        await refreshProfile()

        toast({
          title: "Profile Updated",
          description: "Your profile has been updated successfully.",
        })

        return { error: null }
      } catch (error) {
        const err = error as Error
        toast({
          title: "Update Error",
          description: err.message || "An unexpected error occurred",
          variant: "destructive",
        })
        return { error: err }
      }
    },
    [user, toast],
  )

  const refreshProfile = useCallback(async () => {
    if (!user) return

    const userProfile = await fetchProfile(user.id)
    setProfile(userProfile)
  }, [user, fetchProfile])

  const value: AuthContextType = {
    user,
    profile,
    session,
    isLoading,
    isSigningIn,
    isSigningUp,
    isSigningOut,
    signIn,
    signUp,
    signOut,
    signInWithGoogle,
    updateProfile,
    refreshProfile,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
