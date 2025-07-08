"use client"

import { useState, useEffect, useCallback } from "react"

interface LocationState {
  latitude: number
  longitude: number
  accuracy?: number
  timestamp: number
}

interface UseLocationReturn {
  location: LocationState | null
  loading: boolean
  error: string | null
  requestLocation: () => void
  clearLocation: () => void
  isSupported: boolean
}

export function useLocation(): UseLocationReturn {
  const [location, setLocation] = useState<LocationState | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [isSupported] = useState(() => "geolocation" in navigator)

  // Load stored location on mount
  useEffect(() => {
    const storedLocation = localStorage.getItem("userLocation")
    const storedTime = localStorage.getItem("userLocationTime")

    if (storedLocation && storedTime) {
      try {
        const locationData = JSON.parse(storedLocation)
        const timestamp = Number.parseInt(storedTime)
        const now = Date.now()

        // Use stored location if it's less than 10 minutes old
        if (now - timestamp < 600000) {
          setLocation({
            latitude: locationData.lat,
            longitude: locationData.lng,
            timestamp,
          })
        } else {
          // Clear old location data
          localStorage.removeItem("userLocation")
          localStorage.removeItem("userLocationTime")
        }
      } catch (error) {
        console.error("Error loading stored location:", error)
        localStorage.removeItem("userLocation")
        localStorage.removeItem("userLocationTime")
      }
    }
  }, [])

  const requestLocation = useCallback(() => {
    if (!isSupported) {
      setError("Geolocation is not supported by this browser")
      return
    }

    setLoading(true)
    setError(null)

    const options: PositionOptions = {
      enableHighAccuracy: true,
      timeout: 15000,
      maximumAge: 300000, // 5 minutes
    }

    const successCallback = (position: GeolocationPosition) => {
      const newLocation: LocationState = {
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
        accuracy: position.coords.accuracy,
        timestamp: Date.now(),
      }

      setLocation(newLocation)
      setLoading(false)
      setError(null)

      // Store location data
      localStorage.setItem(
        "userLocation",
        JSON.stringify({
          lat: newLocation.latitude,
          lng: newLocation.longitude,
        }),
      )
      localStorage.setItem("userLocationTime", newLocation.timestamp.toString())

      console.log("Location detected successfully:", newLocation)
    }

    const errorCallback = (error: GeolocationPositionError) => {
      setLoading(false)

      let errorMessage: string
      switch (error.code) {
        case error.PERMISSION_DENIED:
          errorMessage = "Location access denied. Please enable location permissions in your browser settings."
          break
        case error.POSITION_UNAVAILABLE:
          errorMessage = "Location information is unavailable. Please check your GPS or internet connection."
          break
        case error.TIMEOUT:
          errorMessage = "Location request timed out. Please try again."
          break
        default:
          errorMessage = "An unknown error occurred while detecting location."
          break
      }

      setError(errorMessage)
      console.error("Geolocation error:", error, errorMessage)
    }

    // Check permissions first if available
    if (navigator.permissions) {
      navigator.permissions
        .query({ name: "geolocation" })
        .then((result) => {
          if (result.state === "denied") {
            errorCallback({
              code: 1,
              message: "Permission denied",
              PERMISSION_DENIED: 1,
              POSITION_UNAVAILABLE: 2,
              TIMEOUT: 3,
            } as GeolocationPositionError)
            return
          }

          navigator.geolocation.getCurrentPosition(successCallback, errorCallback, options)
        })
        .catch(() => {
          // Fallback if permissions API is not available
          navigator.geolocation.getCurrentPosition(successCallback, errorCallback, options)
        })
    } else {
      navigator.geolocation.getCurrentPosition(successCallback, errorCallback, options)
    }
  }, [isSupported])

  const clearLocation = useCallback(() => {
    setLocation(null)
    setError(null)
    localStorage.removeItem("userLocation")
    localStorage.removeItem("userLocationTime")
  }, [])

  return {
    location,
    loading,
    error,
    requestLocation,
    clearLocation,
    isSupported,
  }
}
