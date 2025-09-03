"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect, useCallback, useRef } from "react"
import { useToast } from "@/hooks/use-toast"

interface LocationData {
  latitude: number
  longitude: number
  address: string
  city: string
  state: string
  country: string
  pincode: string
}

interface LocationServiceContextType {
  location: LocationData | null
  isLoading: boolean
  error: string | null
  accuracy: number | null
  permissionState: PermissionState | null
  requestLocation: () => Promise<void>
  clearLocation: () => void
  hasLocationPermission: boolean
}

const LocationServiceContext = createContext<LocationServiceContextType | undefined>(undefined)

export function LocationServiceProvider({ children }: { children: React.ReactNode }) {
  const [location, setLocation] = useState<LocationData | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [accuracy, setAccuracy] = useState<number | null>(null)
  const [permissionState, setPermissionState] = useState<PermissionState | null>(null)
  const [hasLocationPermission, setHasLocationPermission] = useState(false)
  const { toast } = useToast()
  const abortControllerRef = useRef<AbortController | null>(null)
  const isMountedRef = useRef(true)

  // Check permission state on mount
  useEffect(() => {
    if (typeof window !== "undefined" && "permissions" in navigator) {
      navigator.permissions
        .query({ name: "geolocation" })
        .then((result) => {
          if (isMountedRef.current) {
            setPermissionState(result.state)
            setHasLocationPermission(result.state === "granted")

            result.addEventListener("change", () => {
              if (isMountedRef.current) {
                setPermissionState(result.state)
                setHasLocationPermission(result.state === "granted")
              }
            })
          }
        })
        .catch(() => {
          // Permissions API not supported, fallback to checking geolocation
          setHasLocationPermission("geolocation" in navigator)
        })
    }

    // Load saved location from localStorage
    try {
      const savedLocation = localStorage.getItem("userLocation")
      if (savedLocation && isMountedRef.current) {
        setLocation(JSON.parse(savedLocation))
      }
    } catch (error) {
      console.warn("Failed to load saved location:", error)
    }

    return () => {
      isMountedRef.current = false
    }
  }, [])

  const reverseGeocode = useCallback(async (lat: number, lng: number, signal: AbortSignal): Promise<LocationData> => {
    try {
      // Using BigDataCloud API for reverse geocoding (free tier available)
      const response = await fetch(
        `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lng}&localityLanguage=en`,
        { signal },
      )

      if (!response.ok) {
        throw new Error("Failed to fetch address")
      }

      const data = await response.json()

      return {
        latitude: lat,
        longitude: lng,
        address: data.locality || data.city || "Unknown location",
        city: data.city || data.locality || "Unknown city",
        state: data.principalSubdivision || "Unknown state",
        country: data.countryName || "Unknown country",
        pincode: data.postcode || "000000",
      }
    } catch (error) {
      if (error instanceof Error && error.name === "AbortError") {
        throw error
      }

      // Fallback location data
      return {
        latitude: lat,
        longitude: lng,
        address: "Location detected",
        city: "Unknown city",
        state: "Unknown state",
        country: "Unknown country",
        pincode: "000000",
      }
    }
  }, [])

  const requestLocation = useCallback(async () => {
    if (!("geolocation" in navigator)) {
      const errorMsg = "Geolocation is not supported by this browser"
      setError(errorMsg)
      toast({
        title: "Location Error",
        description: errorMsg,
        variant: "destructive",
      })
      return
    }

    // Cancel any existing request
    if (abortControllerRef.current) {
      abortControllerRef.current.abort()
    }

    abortControllerRef.current = new AbortController()
    const signal = abortControllerRef.current.signal

    setIsLoading(true)
    setError(null)

    try {
      const position = await new Promise<GeolocationPosition>((resolve, reject) => {
        const timeoutId = setTimeout(() => {
          reject(new Error("Location request timed out"))
        }, 15000)

        navigator.geolocation.getCurrentPosition(
          (pos) => {
            clearTimeout(timeoutId)
            resolve(pos)
          },
          (err) => {
            clearTimeout(timeoutId)
            reject(err)
          },
          {
            enableHighAccuracy: true,
            timeout: 10000,
            maximumAge: 300000, // 5 minutes
          },
        )
      })

      if (signal.aborted) return

      const { latitude, longitude, accuracy: posAccuracy } = position.coords

      if (isMountedRef.current) {
        setAccuracy(posAccuracy)
      }

      // Get address information
      const locationData = await reverseGeocode(latitude, longitude, signal)

      if (signal.aborted) return

      if (isMountedRef.current) {
        setLocation(locationData)
        setError(null)

        // Save to localStorage
        try {
          localStorage.setItem("userLocation", JSON.stringify(locationData))
          localStorage.setItem("locationPermissionGranted", "true")
        } catch (error) {
          console.warn("Failed to save location to localStorage:", error)
        }

        toast({
          title: "Location Updated",
          description: `Location set to ${locationData.city}, ${locationData.state}`,
        })
      }
    } catch (error) {
      if (error instanceof Error && error.name === "AbortError") {
        console.log("Location request was aborted")
        return
      }

      let errorMessage = "Failed to get location"

      if (error instanceof GeolocationPositionError) {
        switch (error.code) {
          case error.PERMISSION_DENIED:
            errorMessage = "Location access denied by user"
            break
          case error.POSITION_UNAVAILABLE:
            errorMessage = "Location information unavailable"
            break
          case error.TIMEOUT:
            errorMessage = "Location request timed out"
            break
        }
      } else if (error instanceof Error) {
        errorMessage = error.message
      }

      if (isMountedRef.current) {
        setError(errorMessage)
        toast({
          title: "Location Error",
          description: errorMessage,
          variant: "destructive",
        })
      }
    } finally {
      if (isMountedRef.current) {
        setIsLoading(false)
      }
    }
  }, [reverseGeocode, toast])

  const clearLocation = useCallback(() => {
    setLocation(null)
    setError(null)
    setAccuracy(null)

    try {
      localStorage.removeItem("userLocation")
      localStorage.removeItem("locationPermissionGranted")
    } catch (error) {
      console.warn("Failed to clear location from localStorage:", error)
    }

    toast({
      title: "Location Cleared",
      description: "Location data has been removed",
    })
  }, [toast])

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort()
      }
      isMountedRef.current = false
    }
  }, [])

  const value: LocationServiceContextType = {
    location,
    isLoading,
    error,
    accuracy,
    permissionState,
    requestLocation,
    clearLocation,
    hasLocationPermission,
  }

  return <LocationServiceContext.Provider value={value}>{children}</LocationServiceContext.Provider>
}

export function useLocationService() {
  const context = useContext(LocationServiceContext)
  if (context === undefined) {
    throw new Error("useLocationService must be used within a LocationServiceProvider")
  }
  return context
}
