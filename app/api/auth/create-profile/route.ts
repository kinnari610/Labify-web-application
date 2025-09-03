import { type NextRequest, NextResponse } from "next/server"
import { supabaseAdmin, isDemoMode } from "@/lib/supabase"

export async function POST(request: NextRequest) {
  try {
    if (isDemoMode) {
      return NextResponse.json(
        {
          message: "Profile creation skipped in demo mode",
        },
        { status: 200 },
      )
    }

    const body = await request.json()
    const { id, email, full_name, avatar_url } = body

    if (!id || !email) {
      return NextResponse.json({ error: "User ID and email are required" }, { status: 400 })
    }

    // Check if profile already exists
    const { data: existingProfile, error: fetchError } = await supabaseAdmin
      .from("profiles")
      .select("id")
      .eq("id", id)
      .single()

    if (fetchError && fetchError.code !== "PGRST116") {
      console.error("Error checking existing profile:", fetchError)
      return NextResponse.json({ error: "Failed to check existing profile" }, { status: 500 })
    }

    if (existingProfile) {
      return NextResponse.json(
        {
          message: "Profile already exists",
        },
        { status: 200 },
      )
    }

    // Create new profile
    const { data, error } = await supabaseAdmin
      .from("profiles")
      .insert({
        id,
        email,
        full_name,
        avatar_url,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      })
      .select()
      .single()

    if (error) {
      console.error("Error creating profile:", error)
      return NextResponse.json({ error: "Failed to create profile" }, { status: 500 })
    }

    return NextResponse.json(
      {
        message: "Profile created successfully",
        profile: data,
      },
      { status: 201 },
    )
  } catch (error) {
    console.error("Profile creation error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
