"use client"

import { useState } from "react"
import { ZoomIn, ZoomOut, Navigation } from "lucide-react"
import { Button } from "@/components/ui/button"

interface Lab {
  id: string
  name: string
  latitude?: number
  longitude?: number
}

interface MapComponentProps {
  userLocation?: { lat: number; lng: number } | null
  labs?: Lab[]
}

export function MapComponent({ userLocation, labs = [] }: MapComponentProps) {
  const [zoom, setZoom] = useState(12)

  return (
    <div className="relative bg-green-100 rounded-xl h-80 overflow-hidden">
      {/* Map placeholder - In production, integrate with Google Maps */}
      <div className="w-full h-full flex items-center justify-center text-gray-500">
        <div className="text-center">
          <div className="text-4xl mb-2">🗺️</div>
          <p>Google Maps Integration</p>
          <p className="text-sm">
            {userLocation
              ? `Location: ${userLocation.lat.toFixed(4)}, ${userLocation.lng.toFixed(4)}`
              : "Location not available"}
          </p>
          <p className="text-xs mt-1">{labs.length} labs found</p>
        </div>
      </div>

      {/* Map controls */}
      <div className="absolute right-4 top-4 flex flex-col gap-2">
        <Button size="sm" variant="secondary" onClick={() => setZoom(Math.min(zoom + 1, 20))} className="w-10 h-10 p-0">
          <ZoomIn className="w-4 h-4" />
        </Button>
        <Button size="sm" variant="secondary" onClick={() => setZoom(Math.max(zoom - 1, 1))} className="w-10 h-10 p-0">
          <ZoomOut className="w-4 h-4" />
        </Button>
        <Button size="sm" variant="secondary" className="w-10 h-10 p-0">
          <Navigation className="w-4 h-4" />
        </Button>
      </div>

      <div className="absolute bottom-4 left-4 bg-white px-3 py-1 rounded-lg shadow-sm text-sm">Zoom: {zoom}</div>
    </div>
  )
}
