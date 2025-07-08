import { type NextRequest, NextResponse } from "next/server"
import { supabase } from "@/lib/supabase"

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const city = searchParams.get("city")
    const latitude = searchParams.get("lat")
    const longitude = searchParams.get("lng")
    const radius = searchParams.get("radius") || "10" // Default 10km radius

    let query = supabase.from("labs").select("*")

    if (city) {
      query = query.ilike("city", `%${city}%`)
    }

    // If coordinates provided, find labs within radius
    if (latitude && longitude) {
      // Using PostGIS functions for distance calculation
      // This is a simplified version - in production, use proper spatial queries
      query = query.not("latitude", "is", null).not("longitude", "is", null)
    }

    const { data: labs, error } = await query.limit(50)

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 400 })
    }

    // If coordinates provided, calculate distances and filter
    if (latitude && longitude && labs) {
      const lat1 = Number.parseFloat(latitude)
      const lng1 = Number.parseFloat(longitude)
      const maxRadius = Number.parseFloat(radius)

      const labsWithDistance = labs
        .filter((lab) => lab.latitude && lab.longitude)
        .map((lab) => {
          const distance = calculateDistance(lat1, lng1, lab.latitude, lab.longitude)
          return { ...lab, distance }
        })
        .filter((lab) => lab.distance <= maxRadius)
        .sort((a, b) => a.distance - b.distance)

      return NextResponse.json({ labs: labsWithDistance })
    }

    return NextResponse.json({ labs })
  } catch (error) {
    console.error("Labs fetch error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

// Helper function to calculate distance between two coordinates
function calculateDistance(lat1: number, lng1: number, lat2: number, lng2: number): number {
  const R = 6371 // Earth's radius in kilometers
  const dLat = ((lat2 - lat1) * Math.PI) / 180
  const dLng = ((lng2 - lng1) * Math.PI) / 180
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) * Math.cos((lat2 * Math.PI) / 180) * Math.sin(dLng / 2) * Math.sin(dLng / 2)
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
  return R * c
}
