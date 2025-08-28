import { type NextRequest, NextResponse } from "next/server"
import { createClient } from "@supabase/supabase-js"

// Use service role key for server-side operations
const supabaseAdmin = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!, {
  auth: {
    autoRefreshToken: false,
    persistSession: false,
  },
})

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const {
      user_id,
      test_package_id,
      lab_id,
      appointment_date,
      appointment_time,
      patient_name,
      patient_phone,
      patient_age,
      patient_gender,
      address,
      notes,
      total_amount,
    } = body

    // Validate required fields
    if (!user_id || !test_package_id || !lab_id || !appointment_date || !appointment_time) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    // Verify user exists
    const { data: userData, error: userError } = await supabaseAdmin
      .from("users")
      .select("id")
      .eq("id", user_id)
      .single()

    if (userError || !userData) {
      return NextResponse.json({ error: "User not found. Please ensure you are logged in." }, { status: 404 })
    }

    // Verify test package exists
    const { data: packageData, error: packageError } = await supabaseAdmin
      .from("test_packages")
      .select("id, name, price")
      .eq("id", test_package_id)
      .single()

    if (packageError || !packageData) {
      return NextResponse.json({ error: "Test package not found" }, { status: 404 })
    }

    // Verify lab exists
    const { data: labData, error: labError } = await supabaseAdmin
      .from("labs")
      .select("id, name")
      .eq("id", lab_id)
      .single()

    if (labError || !labData) {
      return NextResponse.json({ error: "Lab not found" }, { status: 404 })
    }

    // Create appointment using service role (bypasses RLS)
    const { data, error } = await supabaseAdmin
      .from("appointments")
      .insert([
        {
          user_id,
          test_package_id,
          lab_id,
          appointment_date,
          appointment_time,
          patient_name: patient_name || "Patient",
          patient_phone: patient_phone || "",
          patient_age: patient_age || null,
          patient_gender: patient_gender || "not_specified",
          address: address || "",
          notes: notes || "",
          total_amount: total_amount || packageData.price,
          status: "pending",
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        },
      ])
      .select()

    if (error) {
      console.error("Appointment creation error:", error)
      return NextResponse.json(
        {
          error: "Failed to create appointment",
          details: error.message,
          code: error.code,
        },
        { status: 500 },
      )
    }

    return NextResponse.json({
      success: true,
      appointment: data[0],
      message: "Appointment booked successfully",
    })
  } catch (error) {
    console.error("API error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const userId = searchParams.get("user_id")

    if (!userId) {
      return NextResponse.json({ error: "User ID is required" }, { status: 400 })
    }

    // Get user appointments
    const { data, error } = await supabaseAdmin
      .from("appointments")
      .select(`
        *,
        test_packages (name, description, price),
        labs (name, address, phone)
      `)
      .eq("user_id", userId)
      .order("created_at", { ascending: false })

    if (error) {
      console.error("Error fetching appointments:", error)
      return NextResponse.json({ error: "Failed to fetch appointments" }, { status: 500 })
    }

    return NextResponse.json({ appointments: data })
  } catch (error) {
    console.error("API error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
