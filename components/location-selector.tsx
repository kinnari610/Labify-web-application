"use client"

import { useState, useEffect } from "react"
import { MapPin, ChevronDown, Loader2, AlertCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { LocationModal } from "@/components/location-modal"
import { useLocationService } from "@/hooks/use-location-service"

export function LocationSelector() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedLocation, setSelectedLocation] = useState("Select location")
  const { currentLocation, isLoading, error, requestLocation } = useLocationService()

  useEffect(() => {
    // Auto-detect location on mount
    if (!currentLocation && !error) {
      requestLocation({ enableHighAccuracy: true, timeout: 10000 })
    }
  }, [currentLocation, error, requestLocation])

  useEffect(() => {
    if (currentLocation?.address) {
      setSelectedLocation(currentLocation.address)
    } else if (isLoading) {
      setSelectedLocation("Detecting location...")
    } else if (error) {
      setSelectedLocation("Select location")
    }
  }, [currentLocation, isLoading, error])

  const handleLocationSelect = (location: { name: string; coordinates?: { lat: number; lng: number } }) => {
    setSelectedLocation(location.name)

    // Store selected location for other components
    if (location.coordinates) {
      localStorage.setItem(
        "selectedLocation",
        JSON.stringify({
          name: location.name,
          coordinates: location.coordinates,
          timestamp: Date.now(),
        }),
      )
    }
  }

  const getButtonIcon = () => {
    if (isLoading) return <Loader2 className="w-4 h-4 animate-spin" />
    if (error) return <AlertCircle className="w-4 h-4 text-orange-500" />
    return <MapPin className="w-4 h-4" />
  }

  return (
    <>
      <Button
        variant="ghost"
        onClick={() => setIsModalOpen(true)}
        className="flex items-center gap-2 text-gray-700 hover:bg-gray-100 max-w-full"
      >
        {getButtonIcon()}
        <span className="truncate flex-1 text-left">{selectedLocation}</span>
        <ChevronDown className="w-4 h-4 flex-shrink-0" />
      </Button>

      <LocationModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onLocationSelect={handleLocationSelect}
      />
    </>
  )
}
