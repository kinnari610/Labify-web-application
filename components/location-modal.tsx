"use client"

import { useState, useEffect } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { useLocationService } from "@/hooks/use-location-service"
import { MapPin, Search, Navigation, Loader2, AlertCircle, CheckCircle } from "lucide-react"

interface LocationModalProps {
  isOpen: boolean
  onClose: () => void
  onLocationSelect: (location: { name: string; coordinates?: { lat: number; lng: number } }) => void
}

const popularLocations = [
  { name: "Mumbai, Maharashtra", coordinates: { lat: 19.076, lng: 72.8777 } },
  { name: "Delhi, Delhi", coordinates: { lat: 28.6139, lng: 77.209 } },
  { name: "Bangalore, Karnataka", coordinates: { lat: 12.9716, lng: 77.5946 } },
  { name: "Chennai, Tamil Nadu", coordinates: { lat: 13.0827, lng: 80.2707 } },
  { name: "Kolkata, West Bengal", coordinates: { lat: 22.5726, lng: 88.3639 } },
  { name: "Hyderabad, Telangana", coordinates: { lat: 17.385, lng: 78.4867 } },
  { name: "Pune, Maharashtra", coordinates: { lat: 18.5204, lng: 73.8567 } },
  { name: "Ahmedabad, Gujarat", coordinates: { lat: 23.0225, lng: 72.5714 } },
  { name: "Vadodara, Gujarat", coordinates: { lat: 22.3072, lng: 73.1812 } },
  { name: "Jaipur, Rajasthan", coordinates: { lat: 26.9124, lng: 75.7873 } },
]

export function LocationModal({ isOpen, onClose, onLocationSelect }: LocationModalProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const [filteredLocations, setFilteredLocations] = useState(popularLocations)
  const {
    currentLocation,
    isLoading,
    error,
    permissionState,
    isSupported,
    accuracy,
    requestLocation,
    checkPermissions,
  } = useLocationService()

  useEffect(() => {
    if (searchQuery.trim()) {
      const filtered = popularLocations.filter((location) =>
        location.name.toLowerCase().includes(searchQuery.toLowerCase()),
      )
      setFilteredLocations(filtered)
    } else {
      setFilteredLocations(popularLocations)
    }
  }, [searchQuery])

  const handleUseCurrentLocation = async () => {
    if (!isSupported) {
      return
    }

    // Check permissions first
    const permission = await checkPermissions()
    if (permission === "denied") {
      return
    }

    const location = await requestLocation({
      enableHighAccuracy: true,
      timeout: 15000,
      fallbackToIP: true,
    })

    if (location && location.address) {
      onLocationSelect({
        name: location.address,
        coordinates: {
          lat: location.coordinates.latitude,
          lng: location.coordinates.longitude,
        },
      })
      onClose()
    }
  }

  const handleLocationSelect = (location: (typeof popularLocations)[0]) => {
    onLocationSelect(location)
    onClose()
  }

  const getLocationButtonContent = () => {
    if (!isSupported) {
      return (
        <>
          <AlertCircle className="w-5 h-5" />
          Location Not Supported
        </>
      )
    }

    if (isLoading) {
      return (
        <>
          <Loader2 className="w-5 h-5 animate-spin" />
          Detecting Location...
        </>
      )
    }

    if (error) {
      return (
        <>
          <AlertCircle className="w-5 h-5" />
          {error.code === "PERMISSION_DENIED" ? "Permission Denied" : "Try Again"}
        </>
      )
    }

    if (currentLocation) {
      return (
        <>
          <CheckCircle className="w-5 h-5" />
          Use Current Location
        </>
      )
    }

    return (
      <>
        <Navigation className="w-5 h-5" />
        Use Current Location
      </>
    )
  }

  const getLocationButtonVariant = () => {
    if (!isSupported || (error && error.code === "PERMISSION_DENIED")) {
      return "secondary"
    }
    return "default"
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <MapPin className="w-5 h-5 text-blue-600" />
            Select Location
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          {/* Current Location Button */}
          <Button
            onClick={handleUseCurrentLocation}
            disabled={!isSupported || isLoading || error?.code === "PERMISSION_DENIED"}
            variant={getLocationButtonVariant()}
            className="w-full h-12 text-base"
          >
            {getLocationButtonContent()}
          </Button>

          {/* Location Status */}
          {currentLocation && (
            <div className="flex items-center gap-2 p-3 bg-green-50 border border-green-200 rounded-lg">
              <CheckCircle className="w-4 h-4 text-green-600" />
              <div className="flex-1">
                <p className="text-sm font-medium text-green-900">Location Detected</p>
                <p className="text-xs text-green-700">{currentLocation.address}</p>
              </div>
              {accuracy && (
                <Badge variant="secondary" className="text-xs">
                  {accuracy === "high" ? "High" : accuracy === "medium" ? "Medium" : "Low"} Accuracy
                </Badge>
              )}
            </div>
          )}

          {/* Error Display */}
          {error && (
            <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
              <div className="flex items-start gap-2">
                <AlertCircle className="w-4 h-4 text-red-600 mt-0.5" />
                <div className="flex-1">
                  <p className="text-sm font-medium text-red-900">{error.message}</p>
                  {error.details && <p className="text-xs text-red-700 mt-1">{error.details}</p>}
                  {error.code === "PERMISSION_DENIED" && (
                    <div className="mt-2 text-xs text-red-700">
                      <p className="font-medium">To enable location access:</p>
                      <ol className="list-decimal list-inside mt-1 space-y-0.5">
                        <li>Click the location icon in your browser's address bar</li>
                        <li>Select "Allow" for location permissions</li>
                        <li>Refresh the page and try again</li>
                      </ol>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Search Input */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              placeholder="Search for a location..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>

          {/* Popular Locations */}
          <div>
            <h3 className="text-sm font-medium text-gray-900 mb-3">Popular Locations</h3>
            <div className="space-y-2 max-h-64 overflow-y-auto">
              {filteredLocations.map((location) => (
                <button
                  key={location.name}
                  onClick={() => handleLocationSelect(location)}
                  className="w-full flex items-center gap-3 p-3 text-left hover:bg-gray-50 rounded-lg transition-colors"
                >
                  <MapPin className="w-4 h-4 text-gray-400" />
                  <span className="text-sm text-gray-900">{location.name}</span>
                </button>
              ))}
              {filteredLocations.length === 0 && (
                <div className="text-center py-8 text-gray-500">
                  <MapPin className="w-8 h-8 mx-auto mb-2 opacity-50" />
                  <p className="text-sm">No locations found</p>
                  <p className="text-xs">Try a different search term</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
