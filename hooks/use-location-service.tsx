"use client"

import type React from "react"

import { useState, useEffect, useCallback, useRef } from "react"
import { createContext, useContext } from "react"

interface LocationCoordinates {
  latitude: number
  longitude: number
  accuracy?: number
  altitude?: number | null
  altitudeAccuracy?: number | null
  heading?: number | null
  speed?: number | null
}

interface LocationData {
  coordinates: LocationCoordinates
  address?: string
  city?: string
  country?: string
  timestamp: number
}

interface LocationError {
  code: "PERMISSION_DENIED" | "POSITION_UNAVAILABLE" | "TIMEOUT" | "NOT_SUPPORTED" | "NETWORK_ERROR"
  message: string
  details?: string
}

interface LocationServiceState {
  currentLocation: LocationData | null
  isLoading: boolean
  error: LocationError | null
  permissionState: "prompt" | "granted" | "denied" | "unknown"
  isSupported: boolean
  accuracy: "high" | "medium" | "low" | null
}

interface LocationServiceActions {
  requestLocation: (options?: LocationRequestOptions) => Promise<LocationData | null>
  clearLocation: () => void
  watchLocation: () => number | null
  clearWatch: (watchId: number) => void
  checkPermissions: () => Promise<PermissionState>
  reverseGeocode: (lat: number, lng: number) => Promise<string | null>
}

interface LocationRequestOptions {
  enableHighAccuracy?: boolean
  timeout?: number
  maximumAge?: number
  fallbackToIP?: boolean
}

type LocationServiceContextType = LocationServiceState & LocationServiceActions

const LocationServiceContext = createContext<LocationServiceContextType | null>(null)

const LOCATION_CACHE_KEY = "labify_user_location"
const LOCATION_CACHE_DURATION = 10 * 60 * 1000 // 10 minutes
const DEFAULT_TIMEOUT = 30000 // 30 seconds

export function LocationServiceProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<LocationServiceState>({
    currentLocation: null,
    isLoading: false,
    error: null,
    permissionState: "unknown",
    isSupported: typeof navigator !== "undefined" && "geolocation" in navigator,
    accuracy: null,
  })

  const watchIdRef = useRef<number | null>(null)
  const abortControllerRef = useRef<AbortController | null>(null)

  // Load cached location on mount
  useEffect(() => {
    loadCachedLocation()
    checkInitialPermissions()
  }, [])

  const loadCachedLocation = useCallback(() => {
    try {
      const cached = localStorage.getItem(LOCATION_CACHE_KEY)
      if (cached) {
        const locationData: LocationData = JSON.parse(cached)
        const now = Date.now()

        // Check if cached location is still valid
        if (now - locationData.timestamp < LOCATION_CACHE_DURATION) {
          setState((prev) => ({
            ...prev,
            currentLocation: locationData,
            accuracy: getAccuracyLevel(locationData.coordinates.accuracy),
          }))
        } else {
          localStorage.removeItem(LOCATION_CACHE_KEY)
        }
      }
    } catch (error) {
      console.error("Error loading cached location:", error)
      localStorage.removeItem(LOCATION_CACHE_KEY)
    }
  }, [])

  const checkInitialPermissions = useCallback(async () => {
    if (!state.isSupported) return

    try {
      if ("permissions" in navigator) {
        const permission = await navigator.permissions.query({ name: "geolocation" })
        setState((prev) => ({ ...prev, permissionState: permission.state }))

        // Listen for permission changes
        permission.addEventListener("change", () => {
          setState((prev) => ({ ...prev, permissionState: permission.state }))
        })
      }
    } catch (error) {
      console.error("Error checking permissions:", error)
    }
  }, [state.isSupported])

  const getAccuracyLevel = (accuracy?: number): "high" | "medium" | "low" | null => {
    if (!accuracy) return null
    if (accuracy <= 10) return "high"
    if (accuracy <= 100) return "medium"
    return "low"
  }

  const createLocationError = (error: GeolocationPositionError | Error): LocationError => {
    if (error instanceof GeolocationPositionError) {
      switch (error.code) {
        case error.PERMISSION_DENIED:
          return {
            code: "PERMISSION_DENIED",
            message: "Location access denied",
            details: "Please enable location permissions in your browser settings to use location-based features.",
          }
        case error.POSITION_UNAVAILABLE:
          return {
            code: "POSITION_UNAVAILABLE",
            message: "Location unavailable",
            details: "Your location could not be determined. Please check your GPS settings and internet connection.",
          }
        case error.TIMEOUT:
          return {
            code: "TIMEOUT",
            message: "Location request timed out",
            details: "The location request took too long. Please try again or check your connection.",
          }
        default:
          return {
            code: "POSITION_UNAVAILABLE",
            message: "Unknown location error",
            details: error.message,
          }
      }
    }
    // Handle generic Error objects produced by our timeout / abort
    if (error instanceof Error) {
      if (error.message.includes("timed out")) {
        return {
          code: "TIMEOUT",
          message: "Location request timed out",
          details: "The location request took too long. Please try again or check your connection.",
        }
      }
      if (error.message.includes("aborted")) {
        return {
          code: "NETWORK_ERROR",
          message: "Location request was aborted",
          details: error.message,
        }
      }
    }

    return {
      code: "NETWORK_ERROR",
      message: "Network error",
      details: error.message,
    }
  }

  const reverseGeocode = useCallback(async (lat: number, lng: number): Promise<string | null> => {
    try {
      // In a real app, you'd use Google Maps Geocoding API or similar
      // For demo purposes, we'll use a simple city detection based on coordinates
      const indianCities = [
        { name: "Vadodara, Gujarat", lat: 22.3072, lng: 73.1812, radius: 0.5 },
        { name: "Mumbai, Maharashtra", lat: 19.076, lng: 72.8777, radius: 0.5 },
        { name: "Delhi, Delhi", lat: 28.6139, lng: 77.209, radius: 0.5 },
        { name: "Bangalore, Karnataka", lat: 12.9716, lng: 77.5946, radius: 0.5 },
        { name: "Chennai, Tamil Nadu", lat: 13.0827, lng: 80.2707, radius: 0.5 },
      ]

      for (const city of indianCities) {
        const distance = Math.sqrt(Math.pow(lat - city.lat, 2) + Math.pow(lng - city.lng, 2))
        if (distance < city.radius) {
          return city.name
        }
      }

      return `Location (${lat.toFixed(4)}, ${lng.toFixed(4)})`
    } catch (error) {
      console.error("Reverse geocoding error:", error)
      return null
    }
  }, [])

  const cacheLocation = useCallback((locationData: LocationData) => {
    try {
      localStorage.setItem(LOCATION_CACHE_KEY, JSON.stringify(locationData))
    } catch (error) {
      console.error("Error caching location:", error)
    }
  }, [])

  // Fallback: fetch coarse location from public IP
  const fetchIpLocation = async (): Promise<LocationData | null> => {
    try {
      // You can swap this endpoint with any other free IP-geo service
      const res = await fetch("https://ipapi.co/json/")
      if (!res.ok) throw new Error("IP lookup failed")
      const json = await res.json()
      if (!json.latitude || !json.longitude) throw new Error("IP lookup missing coords")

      const coordinates: LocationCoordinates = {
        latitude: Number(json.latitude),
        longitude: Number(json.longitude),
        accuracy: 50000, // IP geo is coarse (~50 km)
      }

      const address = await reverseGeocode(coordinates.latitude, coordinates.longitude)

      const locationData: LocationData = {
        coordinates,
        address: address || json.city || undefined,
        timestamp: Date.now(),
      }

      cacheLocation(locationData)
      return locationData
    } catch (e) {
      console.error("IP location fallback failed:", e)
      return null
    }
  }

  const requestLocation = useCallback(
    async (options: LocationRequestOptions = {}): Promise<LocationData | null> => {
      if (!state.isSupported) {
        const error: LocationError = {
          code: "NOT_SUPPORTED",
          message: "Geolocation not supported",
          details: "Your browser does not support location services.",
        }
        setState((prev) => ({ ...prev, error }))
        return null
      }

      // Cancel any existing request
      if (abortControllerRef.current) {
        abortControllerRef.current.abort()
      }
      abortControllerRef.current = new AbortController()

      setState((prev) => ({ ...prev, isLoading: true, error: null }))

      const {
        enableHighAccuracy = true,
        timeout = DEFAULT_TIMEOUT,
        maximumAge = 60000, // 1 minute
        fallbackToIP = false,
      } = options

      try {
        const position = await new Promise<GeolocationPosition>((resolve, reject) => {
          const timeoutId = setTimeout(() => {
            reject(new Error("Location request timed out"))
          }, timeout)

          navigator.geolocation.getCurrentPosition(
            (position) => {
              clearTimeout(timeoutId)
              resolve(position)
            },
            (error) => {
              clearTimeout(timeoutId)
              reject(error)
            },
            {
              enableHighAccuracy,
              timeout,
              maximumAge,
            },
          )

          // Handle abort
          abortControllerRef.current?.signal.addEventListener("abort", () => {
            clearTimeout(timeoutId)
            reject(new Error("Request aborted"))
          })
        })

        const coordinates: LocationCoordinates = {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          accuracy: position.coords.accuracy,
          altitude: position.coords.altitude,
          altitudeAccuracy: position.coords.altitudeAccuracy,
          heading: position.coords.heading,
          speed: position.coords.speed,
        }

        // Get address through reverse geocoding
        const address = await reverseGeocode(coordinates.latitude, coordinates.longitude)

        const locationData: LocationData = {
          coordinates,
          address: address || undefined,
          timestamp: Date.now(),
        }

        // Cache the location
        cacheLocation(locationData)

        setState((prev) => ({
          ...prev,
          currentLocation: locationData,
          isLoading: false,
          error: null,
          accuracy: getAccuracyLevel(coordinates.accuracy),
          permissionState: "granted",
        }))

        return locationData
      } catch (error) {
        console.error("Location request error:", error)

        const locationError = createLocationError(error as GeolocationPositionError)
        setState((prev) => ({
          ...prev,
          isLoading: false,
          error: locationError,
          permissionState: locationError.code === "PERMISSION_DENIED" ? "denied" : prev.permissionState,
        }))

        // Fallback to IP-based location if enabled and user didn't deny permission
        if (fallbackToIP && locationError.code !== "PERMISSION_DENIED") {
          const ipLocation = await fetchIpLocation()
          if (ipLocation) {
            setState((prev) => ({
              ...prev,
              currentLocation: ipLocation,
              error: null,
              accuracy: getAccuracyLevel(ipLocation.coordinates.accuracy),
            }))
            return ipLocation
          }
        }

        return null
      }
    },
    [state.isSupported, reverseGeocode, cacheLocation],
  )

  const clearLocation = useCallback(() => {
    localStorage.removeItem(LOCATION_CACHE_KEY)
    setState((prev) => ({
      ...prev,
      currentLocation: null,
      error: null,
      accuracy: null,
    }))
  }, [])

  const watchLocation = useCallback((): number | null => {
    if (!state.isSupported) return null

    const watchId = navigator.geolocation.watchPosition(
      (position) => {
        const coordinates: LocationCoordinates = {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          accuracy: position.coords.accuracy,
          altitude: position.coords.altitude,
          altitudeAccuracy: position.coords.altitudeAccuracy,
          heading: position.coords.heading,
          speed: position.coords.speed,
        }

        reverseGeocode(coordinates.latitude, coordinates.longitude).then((address) => {
          const locationData: LocationData = {
            coordinates,
            address: address || undefined,
            timestamp: Date.now(),
          }

          cacheLocation(locationData)
          setState((prev) => ({
            ...prev,
            currentLocation: locationData,
            accuracy: getAccuracyLevel(coordinates.accuracy),
          }))
        })
      },
      (error) => {
        const locationError = createLocationError(error)
        setState((prev) => ({ ...prev, error: locationError }))
      },
      {
        enableHighAccuracy: true,
        timeout: 30000,
        maximumAge: 60000,
      },
    )

    watchIdRef.current = watchId
    return watchId
  }, [state.isSupported, reverseGeocode, cacheLocation])

  const clearWatch = useCallback((watchId: number) => {
    navigator.geolocation.clearWatch(watchId)
    if (watchIdRef.current === watchId) {
      watchIdRef.current = null
    }
  }, [])

  const checkPermissions = useCallback(async (): Promise<PermissionState> => {
    if (!state.isSupported) return "denied"

    try {
      if ("permissions" in navigator) {
        const permission = await navigator.permissions.query({ name: "geolocation" })
        setState((prev) => ({ ...prev, permissionState: permission.state }))
        return permission.state
      }
      return "prompt"
    } catch (error) {
      console.error("Error checking permissions:", error)
      return "prompt"
    }
  }, [state.isSupported])

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (watchIdRef.current) {
        navigator.geolocation.clearWatch(watchIdRef.current)
      }
      if (abortControllerRef.current) {
        abortControllerRef.current.abort()
      }
    }
  }, [])

  const contextValue: LocationServiceContextType = {
    ...state,
    requestLocation,
    clearLocation,
    watchLocation,
    clearWatch,
    checkPermissions,
    reverseGeocode,
  }

  return <LocationServiceContext.Provider value={contextValue}>{children}</LocationServiceContext.Provider>
}

export function useLocationService() {
  const context = useContext(LocationServiceContext)
  if (!context) {
    throw new Error("useLocationService must be used within a LocationServiceProvider")
  }
  return context
}
