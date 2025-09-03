import { createClient } from "@supabase/supabase-js"

// Environment variables with proper validation
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY

// Check if we have valid Supabase credentials
const hasValidCredentials =
  supabaseUrl && supabaseAnonKey && supabaseUrl.startsWith("https://") && supabaseAnonKey.length > 20

// Demo mode flag
export const isDemoMode = !hasValidCredentials

// Use valid fallback URLs for demo mode
const validSupabaseUrl = hasValidCredentials ? supabaseUrl : "https://demo.supabase.co"
const validSupabaseAnonKey = hasValidCredentials
  ? supabaseAnonKey
  : "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6ImFub24iLCJleHAiOjE5ODM4MTI5OTZ9.CRXP1A7WOeoJeXxjNni43kdQwgnWNReilDMblYTn_I0"
const validServiceRoleKey = hasValidCredentials
  ? supabaseServiceRoleKey
  : "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImV4cCI6MTk4MzgxMjk5Nn0.EGIM96RAZx35lJzdJsyH-qQwv8Hdp7fsn3W0YpN81IU"

if (isDemoMode) {
  console.warn("⚠️ Running in demo mode - Supabase environment variables not configured")
}

// Re-export createClient for compatibility
export { createClient }

// Regular client for client-side operations
export const supabase = createClient(validSupabaseUrl, validSupabaseAnonKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true,
  },
})

// Admin client for server-side operations (bypasses RLS)
export const supabaseAdmin = createClient(validSupabaseUrl, validServiceRoleKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false,
  },
})

// Database types
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
