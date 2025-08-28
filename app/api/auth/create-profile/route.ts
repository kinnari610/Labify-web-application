import { type NextRequest, NextResponse } from "next/server"
import { createClient } from "@supabase/supabase-js"

// Use service role key to bypass RLS
const supabaseAdmin = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!, {
  auth: {
    autoRefreshToken: false,
    persistSession: false,
  },
})

export async function POST(request: NextRequest) {
  try {
    const { id, email, name } = await request.json()

    if (!id || !email || !name) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    // Create user profile using service role (bypasses RLS)
    const { data, error } = await supabaseAdmin.from("users").upsert(
      [
        {
          id,
          email,
          name,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        },
      ],
      {
        onConflict: "id",
        ignoreDuplicates: false,
      },
    )

    if (error) {
      console.error("Profile creation error:", error)
      return NextResponse.json({ error: "Failed to create user profile" }, { status: 500 })
    }

    return NextResponse.json({ success: true, data })
  } catch (error) {
    console.error("API error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
