/**
 * Supabase client setup that never crashes at import time.
 * - Validates env vars before creating a real client.
 * - Provides a shape-compatible stub on the client when not configured.
 * - Exports isDemoMode and supabaseAdmin (named exports) as required.
 */

import { createClient, type SupabaseClient } from "@supabase/supabase-js"

type AnyClient = SupabaseClient<any, "public", any>
const isBrowser = typeof window !== "undefined"

function isValidUrl(url?: string | null): url is string {
  if (!url || typeof url !== "string") return false
  try {
    new URL(url)
    return true
  } catch {
    return false
  }
}

/**
 * Shape-compatible Supabase stub to avoid "not a function" crashes when envs are missing.
 */
function createSupabaseStub(reason: string): AnyClient {
  const stubAuth = {
    async getSession() {
      // Match Supabase v2 return shape
      return { data: { session: null }, error: null } as any
    },
    onAuthStateChange(_cb: any) {
      const subscription = { unsubscribe: () => void 0 }
      return { data: { subscription }, error: null } as any
    },
    async signInWithPassword(_args: any) {
      return { data: { session: null, user: null }, error: { message: `Supabase not configured: ${reason}` } } as any
    },
    async signUp(_args: any) {
      return { data: { user: null }, error: { message: `Supabase not configured: ${reason}` } } as any
    },
    async signInWithOAuth(_args: any) {
      return { data: { url: null }, error: { message: `Supabase not configured: ${reason}` } } as any
    },
    async signOut() {
      return { error: null } as any
    },
    async resetPasswordForEmail(_email: string) {
      return { data: {}, error: { message: `Supabase not configured: ${reason}` } } as any
    },
  }

  const tableApi = {
    select: async () => ({ data: null, error: new Error(`Supabase not configured: ${reason}`) }),
    insert: async () => ({ data: null, error: new Error(`Supabase not configured: ${reason}`) }),
    update: async () => ({ data: null, error: new Error(`Supabase not configured: ${reason}`) }),
    delete: async () => ({ data: null, error: new Error(`Supabase not configured: ${reason}`) }),
    eq: () => tableApi,
    single: async () => ({ data: null, error: new Error(`Supabase not configured: ${reason}`) }),
  }

  const stub: any = {
    __isStub: true,
    auth: stubAuth,
    from: (_table: string) => tableApi,
  }

  return stub as AnyClient
}

/**
 * Demo mode is true when public envs are missing/invalid.
 * Safe to evaluate on both client and server.
 */
const publicUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const publicAnon = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
const hasClientCreds = isValidUrl(publicUrl) && typeof publicAnon === "string" && publicAnon.length > 20
export const isDemoMode = !hasClientCreds

function getSupabaseBrowser(): AnyClient {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const anon = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  if (isValidUrl(url) && typeof anon === "string" && anon.length > 20) {
    try {
      return createClient(url, anon, {
        auth: {
          persistSession: true,
          autoRefreshToken: true,
          storage: isBrowser ? window.localStorage : undefined,
        },
      }) as AnyClient
    } catch (e) {
      return createSupabaseStub(`createClient failed: ${(e as Error)?.message ?? "unknown error"}`)
    }
  }

  return createSupabaseStub("missing or invalid NEXT_PUBLIC_SUPABASE_URL / NEXT_PUBLIC_SUPABASE_ANON_KEY")
}

/**
 * Server-side client creator. Prefer service role for secure operations.
 */
export function getSupabaseServer(): AnyClient {
  const url = process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY
  const anon = process.env.SUPABASE_ANON_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  const key = serviceKey || anon

  if (!isValidUrl(url) || !key) {
    throw new Error(
      "Supabase server client is not configured. Please set SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY (or SUPABASE_ANON_KEY).",
    )
  }

  return createClient(url, key, {
    auth: { persistSession: false, autoRefreshToken: false },
  }) as AnyClient
}

/**
 * Admin client (bypasses RLS) — SERVER ONLY.
 * Returns a stub in the browser to avoid leaking secrets or crashing.
 */
export function supabaseAdmin(): AnyClient {
  if (isBrowser) {
    return createSupabaseStub("admin client is server-only")
  }
  const url = process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY
  if (!isValidUrl(url) || !serviceKey) {
    throw new Error("supabaseAdmin requires SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY")
  }
  return createClient(url, serviceKey, {
    auth: { persistSession: false, autoRefreshToken: false },
  }) as AnyClient
}

/**
 * Default client for client components.
 * In SSR it stays a stub; use getSupabaseServer()/supabaseAdmin() server-side.
 */
export const supabase: AnyClient = isBrowser ? getSupabaseBrowser() : createSupabaseStub("running on the server")
export default supabase

// Re-export for compatibility with any legacy imports.
export { createClient }

// Database types (kept for compatibility with the rest of the app)
export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string
          email: string
          full_name: string | null
          avatar_url: string | null
          phone: string | null
          date_of_birth: string | null
          gender: string | null
          address: string | null
          city: string | null
          state: string | null
          pincode: string | null
          emergency_contact_name: string | null
          emergency_contact_phone: string | null
          medical_conditions: string[] | null
          allergies: string[] | null
          medications: string[] | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          email: string
          full_name?: string | null
          avatar_url?: string | null
          phone?: string | null
          date_of_birth?: string | null
          gender?: string | null
          address?: string | null
          city?: string | null
          state?: string | null
          pincode?: string | null
          emergency_contact_name?: string | null
          emergency_contact_phone?: string | null
          medical_conditions?: string[] | null
          allergies?: string[] | null
          medications?: string[] | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          email?: string
          full_name?: string | null
          avatar_url?: string | null
          phone?: string | null
          date_of_birth?: string | null
          gender?: string | null
          address?: string | null
          city?: string | null
          state?: string | null
          pincode?: string | null
          emergency_contact_name?: string | null
          emergency_contact_phone?: string | null
          medical_conditions?: string[] | null
          allergies?: string[] | null
          medications?: string[] | null
          created_at?: string
          updated_at?: string
        }
      }
      labs: {
        Row: {
          id: string
          name: string
          address: string
          city: string
          state: string
          pincode: string
          phone: string
          email: string | null
          website: string | null
          latitude: number | null
          longitude: number | null
          rating: number | null
          total_reviews: number | null
          is_verified: boolean
          operating_hours: any | null
          services: string[] | null
          certifications: string[] | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          name: string
          address: string
          city: string
          state: string
          pincode: string
          phone: string
          email?: string | null
          website?: string | null
          latitude?: number | null
          longitude?: number | null
          rating?: number | null
          total_reviews?: number | null
          is_verified?: boolean
          operating_hours?: any | null
          services?: string[] | null
          certifications?: string[] | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string
          address?: string
          city?: string
          state?: string
          pincode?: string
          phone?: string
          email?: string | null
          website?: string | null
          latitude?: number | null
          longitude?: number | null
          rating?: number | null
          total_reviews?: number | null
          is_verified?: boolean
          operating_hours?: any | null
          services?: string[] | null
          certifications?: string[] | null
          created_at?: string
          updated_at?: string
        }
      }
      test_packages: {
        Row: {
          id: string
          name: string
          description: string | null
          category: string
          price: number
          discounted_price: number | null
          tests_included: string[]
          preparation_required: boolean
          fasting_required: boolean
          sample_type: string
          report_delivery_time: string
          is_popular: boolean
          is_featured: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          name: string
          description?: string | null
          category: string
          price: number
          discounted_price?: number | null
          tests_included: string[]
          preparation_required?: boolean
          fasting_required?: boolean
          sample_type: string
          report_delivery_time: string
          is_popular?: boolean
          is_featured?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string
          description?: string | null
          category?: string
          price?: number
          discounted_price?: number | null
          tests_included?: string[]
          preparation_required?: boolean
          fasting_required?: boolean
          sample_type?: string
          report_delivery_time?: string
          is_popular?: boolean
          is_featured?: boolean
          created_at?: string
          updated_at?: string
        }
      }
      appointments: {
        Row: {
          id: string
          user_id: string
          lab_id: string
          test_package_id: string
          appointment_date: string
          appointment_time: string
          status: string
          total_amount: number
          payment_status: string
          payment_id: string | null
          notes: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          lab_id: string
          test_package_id: string
          appointment_date: string
          appointment_time: string
          status?: string
          total_amount: number
          payment_status?: string
          payment_id?: string | null
          notes?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          lab_id?: string
          test_package_id?: string
          appointment_date?: string
          appointment_time?: string
          status?: string
          total_amount?: number
          payment_status?: string
          payment_id?: string | null
          notes?: string | null
          created_at?: string
          updated_at?: string
        }
      }
    }
  }
}

export type Profile = Database["public"]["Tables"]["profiles"]["Row"]
export type Lab = Database["public"]["Tables"]["labs"]["Row"]
export type TestPackage = Database["public"]["Tables"]["test_packages"]["Row"]
export type Appointment = Database["public"]["Tables"]["appointments"]["Row"]
