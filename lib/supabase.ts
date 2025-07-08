import { createClient } from "@supabase/supabase-js"

// Provide fallback values for development
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://your-project.supabase.co"
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "your-anon-key"

// Check if we have valid Supabase credentials
if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
  console.warn("Supabase environment variables are missing. Using demo mode.")
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Demo mode flag
export const isDemoMode = !process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

// Types for our database tables
export interface User {
  id: string
  email: string
  name: string
  phone?: string
  address?: string
  created_at: string
  updated_at: string
}

export interface Lab {
  id: string
  name: string
  address: string
  city: string
  state: string
  pincode: string
  phone?: string
  email?: string
  latitude?: number
  longitude?: number
  operating_hours?: Record<string, string>
  services?: string[]
  created_at: string
  updated_at: string
}

export interface TestPackage {
  id: string
  name: string
  description?: string
  price: number
  original_price?: number
  category?: string
  tests_included?: string[]
  preparation_required?: string
  sample_type?: string
  report_time?: string
  created_at: string
  updated_at: string
}

export interface Appointment {
  id: string
  user_id: string
  lab_id?: string
  test_package_id: string
  appointment_date: string
  appointment_time: string
  service_type: "lab_visit" | "home_service"
  status: "scheduled" | "confirmed" | "completed" | "cancelled"
  home_address?: string
  phone?: string
  notes?: string
  total_amount?: number
  created_at: string
  updated_at: string
}

export interface Payment {
  id: string
  appointment_id: string
  user_id: string
  amount: number
  payment_method?: string
  payment_status: "pending" | "completed" | "failed" | "refunded"
  transaction_id?: string
  payment_gateway_response?: Record<string, any>
  created_at: string
  updated_at: string
}
