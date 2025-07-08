"use client"

import { useState, useEffect } from "react"
import { Header } from "@/components/header"
import { BottomNavigation } from "@/components/bottom-navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { MapComponent } from "@/components/map-component"
import { LocationAccuracyIndicator } from "@/components/location-accuracy-indicator"
import { useLocationService } from "@/hooks/use-location-service"
import { Filter, MapPin, Phone, Clock, Star, Loader2, Navigation } from "lucide-react"
import { supabase, isDemoMode } from "@/lib/supabase"

interface Lab {
  id: string
  name: string
  address: string
  city: string
  phone?: string
  latitude?: number
  longitude?: number
  operating_hours?: Record<string, string>
  services?: string[]
  distance?: number
  rating?: number
}

export default function FindLabsPage() {
  const [labs, setLabs] = useState<Lab[]>([])
  const [loading, setLoading] = useState(true)
  const {
    currentLocation,
    isLoading: locationLoading,
    error: locationError,
    requestLocation,
    watchLocation,
    clearWatch,
  } = useLocationService()

  useEffect(() => {
    // Fetch labs when component mounts or location changes
    if (currentLocation) {
      fetchNearbyLabs({
        lat: currentLocation.coordinates.latitude,
        lng: currentLocation.coordinates.longitude,
      })
    } else {
      fetchNearbyLabs()
    }
  }, [currentLocation])

  // Start watching location for real-time updates
  useEffect(() => {
    const watchId = watchLocation()
    return () => {
      if (watchId) clearWatch(watchId)
    }
  }, [watchLocation, clearWatch])

  const fetchNearbyLabs = async (location?: { lat: number; lng: number }) => {
    setLoading(true)
    try {
      if (isDemoMode) {
        // Enhanced demo data with Vadodara labs
        const vadodaraLabs = [
          {
            id: "lab1",
            name: "Grace Laboratory",
            address: "67 Silver Coin Complex, Lalbaug Road, Makarpura",
            city: "Vadodara",
            phone: "+91-265-2234567",
            latitude: 22.3072,
            longitude: 73.1812,
            services: ["Blood Tests", "Urine Tests", "Pathology", "Biochemistry"],
            rating: 4.5,
          },
          {
            id: "lab2",
            name: "Makarpura Diagnostics & Research",
            address: "Indulal Yagnik Road, GIDC Industrial Area, Makarpura",
            city: "Vadodara",
            phone: "+91-265-2345678",
            latitude: 22.3082,
            longitude: 73.1822,
            services: ["Blood Tests", "Radiology", "CT Scan", "MRI", "Research"],
            rating: 4.6,
          },
          {
            id: "lab3",
            name: "Dr. Rakesh N Shah",
            address: "Patel Pen Center Gali, Raopura",
            city: "Vadodara",
            phone: "+91-265-2456789",
            latitude: 22.3062,
            longitude: 73.1802,
            services: ["Blood Tests", "Consultation", "General Medicine"],
            rating: 4.3,
          },
          {
            id: "lab4",
            name: "Shubh Aarogyam Pvt Ltd",
            address: "Gurukul Avenue",
            city: "Vadodara",
            phone: "+91-265-2567890",
            latitude: 22.3092,
            longitude: 73.1832,
            services: ["Blood Tests", "Health Checkups", "Preventive Care"],
            rating: 4.4,
          },
          {
            id: "lab5",
            name: "SRL Diagnostics",
            address: "43/A, Sampatrao Colony, Alkapuri",
            city: "Vadodara",
            phone: "+91-265-2678901",
            latitude: 22.3052,
            longitude: 73.1792,
            services: ["Blood Tests", "Molecular Diagnostics", "Pathology", "Radiology", "Home Collection"],
            rating: 4.7,
          },
          {
            id: "lab6",
            name: "Param Imaging Centre",
            address: "1st Floor, Sunrise Complex, Waghodia Road",
            city: "Vadodara",
            phone: "+91-265-2789012",
            latitude: 22.3102,
            longitude: 73.1842,
            services: ["CT Scan", "MRI", "X-Ray", "Ultrasound", "Mammography"],
            rating: 4.5,
          },
          {
            id: "lab7",
            name: "Sterling Accuris Diagnostics",
            address: "Memories House, Sampatrao, Alkapuri",
            city: "Vadodara",
            phone: "+91-265-2890123",
            latitude: 22.3042,
            longitude: 73.1782,
            services: ["Blood Tests", "Biochemistry", "Microbiology", "Pathology"],
            rating: 4.4,
          },
          {
            id: "lab8",
            name: "Sneh Hospital",
            address: "Fortune Complex, Sun Pharma Road, Atladara",
            city: "Vadodara",
            phone: "+91-265-2901234",
            latitude: 22.3112,
            longitude: 73.1852,
            services: ["Emergency Care", "Blood Tests", "Surgery", "ICU", "24x7 Services"],
            rating: 4.6,
          },
          {
            id: "lab9",
            name: "Apollo Clinic",
            address: "Cosmic Enclave, Sama Road",
            city: "Vadodara",
            phone: "+91-265-3012345",
            latitude: 22.3032,
            longitude: 73.1772,
            services: ["Blood Tests", "Health Checkups", "Consultation", "Pharmacy"],
            rating: 4.8,
          },
          {
            id: "lab10",
            name: "Divine Lab Fateganj",
            address: "Mangalkirti Apartment, Fateganj",
            city: "Vadodara",
            phone: "+91-265-3123456",
            latitude: 22.3122,
            longitude: 73.1862,
            services: ["Blood Tests", "Urine Tests", "Pathology"],
            rating: 4.2,
          },
          // Continue with remaining 40 labs...
          {
            id: "lab11",
            name: "Baroda Heart Institute & Research",
            address: "44, Haribhakti Colony, Old Padra Road",
            city: "Vadodara",
            phone: "+91-265-3234567",
            latitude: 22.3022,
            longitude: 73.1762,
            services: ["Cardiology", "ECG", "Echo", "Stress Test", "Heart Surgery"],
            rating: 4.9,
          },
          {
            id: "lab12",
            name: "Baroda Imaging Center",
            address: "Sangita Apartment, RC Dutt Road, Alkapuri",
            city: "Vadodara",
            phone: "+91-265-3345678",
            latitude: 22.3132,
            longitude: 73.1872,
            services: ["CT Scan", "MRI", "X-Ray", "Mammography", "Ultrasound"],
            rating: 4.5,
          },
          {
            id: "lab13",
            name: "Raneshwar Multispeciality Hospital",
            address: "Parshawnagar Society, Vasna Road",
            city: "Vadodara",
            phone: "+91-265-3456789",
            latitude: 22.3012,
            longitude: 73.1752,
            services: ["Emergency Care", "Surgery", "Blood Tests", "ICU", "Multispeciality"],
            rating: 4.7,
          },
          {
            id: "lab14",
            name: "Dr. Tiwaris Diagnostic Centre",
            address: "256, Swaminarayan Nagar, Kadamnagar Road, Nizampura",
            city: "Vadodara",
            phone: "+91-265-3567890",
            latitude: 22.3142,
            longitude: 73.1882,
            services: ["Blood Tests", "Pathology", "Biochemistry"],
            rating: 4.3,
          },
          {
            id: "lab15",
            name: "Metropolis Healthcare Ltd",
            address: "101, Soho Complex, Malhar Cross Road, Old Padra Road",
            city: "Vadodara",
            phone: "+91-265-3678901",
            latitude: 22.3002,
            longitude: 73.1742,
            services: ["Blood Tests", "Molecular Diagnostics", "Genetics", "Pathology", "Home Collection"],
            rating: 4.8,
          },
          {
            id: "lab16",
            name: "Paramount Diagnostic & Research",
            address: "Paramount Complex, Gotri Road",
            city: "Vadodara",
            phone: "+91-265-3789012",
            latitude: 22.3152,
            longitude: 73.1892,
            services: ["Blood Tests", "Research", "Clinical Trials"],
            rating: 4.4,
          },
          {
            id: "lab17",
            name: "Pratham Microbiology Laboratory",
            address: "102 Mangaldhara Complex, Alkapuri",
            city: "Vadodara",
            phone: "+91-265-3890123",
            latitude: 22.2992,
            longitude: 73.1732,
            services: ["Microbiology", "Culture Tests", "Sensitivity Tests"],
            rating: 4.3,
          },
          {
            id: "lab18",
            name: "Dr. Lal PathLabs Jetalpur",
            address: "Capri House 2, Sudha Nagar, Jetalpur Road",
            city: "Vadodara",
            phone: "+91-265-3901234",
            latitude: 22.3162,
            longitude: 73.1902,
            services: ["Blood Tests", "Pathology", "Radiology", "Home Collection"],
            rating: 4.6,
          },
          {
            id: "lab19",
            name: "Shri K K Patel Nidan Kendra",
            address: "Sayaji Ganj",
            city: "Vadodara",
            phone: "+91-265-4012345",
            latitude: 22.2982,
            longitude: 73.1722,
            services: ["Blood Tests", "Diagnostic Services"],
            rating: 4.2,
          },
          {
            id: "lab20",
            name: "Divine Lab Old Padra",
            address: "Anannya Complex, Old Padra Road, Akshar Chowk",
            city: "Vadodara",
            phone: "+91-265-4123456",
            latitude: 22.3172,
            longitude: 73.1912,
            services: ["Blood Tests", "Urine Tests", "Pathology"],
            rating: 4.2,
          },
          // Add remaining 30 labs following the same pattern...
        ]

        let labsWithDistance = vadodaraLabs

        if (location) {
          labsWithDistance = vadodaraLabs
            .map((lab) => {
              if (lab.latitude && lab.longitude) {
                const distance = calculateDistance(location.lat, location.lng, lab.latitude, lab.longitude)
                return { ...lab, distance }
              }
              return lab
            })
            .sort((a, b) => (a.distance || 999) - (b.distance || 999))
        }

        setLabs(labsWithDistance)
        setLoading(false)
        return
      }

      let query = supabase.from("labs").select("*")

      if (location) {
        query = query.not("latitude", "is", null).not("longitude", "is", null)
      }

      const { data, error } = await query.limit(50)

      if (error) throw error

      let labsWithDistance = data || []

      if (location && data) {
        labsWithDistance = data
          .map((lab) => {
            if (lab.latitude && lab.longitude) {
              const distance = calculateDistance(location.lat, location.lng, lab.latitude, lab.longitude)
              return { ...lab, distance }
            }
            return lab
          })
          .sort((a, b) => (a.distance || 999) - (b.distance || 999))
      }

      setLabs(labsWithDistance)
    } catch (error) {
      console.error("Error fetching labs:", error)
    } finally {
      setLoading(false)
    }
  }

  const calculateDistance = (lat1: number, lng1: number, lat2: number, lng2: number): number => {
    const R = 6371 // Earth's radius in kilometers
    const dLat = ((lat2 - lat1) * Math.PI) / 180
    const dLng = ((lng2 - lng1) * Math.PI) / 180
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos((lat1 * Math.PI) / 180) * Math.cos((lat2 * Math.PI) / 180) * Math.sin(dLng / 2) * Math.sin(dLng / 2)
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
    return R * c
  }

  const handleRequestLocation = () => {
    requestLocation({
      enableHighAccuracy: true,
      timeout: 15000,
      fallbackToIP: true,
    })
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="pb-20">
        <div className="px-4 py-6 space-y-6">
          <div className="flex items-center justify-between">
            <h1 className="text-xl font-bold text-gray-900">Find Nearby Labs</h1>
            <div className="flex items-center gap-2">
              <LocationAccuracyIndicator />
              <Button variant="outline" size="sm" className="flex items-center gap-2 bg-transparent">
                <Filter className="w-4 h-4" />
                Filters
              </Button>
            </div>
          </div>

          {/* Location Status */}
          {locationLoading && (
            <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
              <div className="flex items-center gap-3">
                <Loader2 className="w-5 h-5 text-blue-600 animate-spin" />
                <div>
                  <h3 className="font-semibold text-blue-900 mb-1">Detecting your location...</h3>
                  <p className="text-blue-700 text-sm">Finding labs near you for better results</p>
                </div>
              </div>
            </div>
          )}

          {currentLocation && !locationLoading && (
            <div className="bg-green-50 border border-green-200 rounded-xl p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-green-600" />
                  <span className="text-green-800 text-sm font-medium">
                    Location detected - showing labs sorted by distance
                  </span>
                </div>
                <LocationAccuracyIndicator />
              </div>
            </div>
          )}

          {locationError && (
            <div className="bg-orange-50 border border-orange-200 rounded-xl p-6">
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-orange-600 mt-1" />
                <div className="flex-1">
                  <h3 className="font-semibold text-orange-900 mb-2">{locationError.message}</h3>
                  <p className="text-orange-700 text-sm mb-4">{locationError.details}</p>
                  <Button
                    onClick={handleRequestLocation}
                    variant="outline"
                    className="bg-transparent border-orange-300 text-orange-700 hover:bg-orange-100"
                  >
                    <Navigation className="w-4 h-4 mr-2" />
                    Try Again
                  </Button>
                </div>
              </div>
            </div>
          )}

          <MapComponent
            userLocation={
              currentLocation
                ? {
                    lat: currentLocation.coordinates.latitude,
                    lng: currentLocation.coordinates.longitude,
                  }
                : null
            }
            labs={labs}
          />

          <div className="space-y-4">
            <h3 className="font-semibold text-gray-900">
              Labs in Vadodara ({labs.length}) {currentLocation && "- Sorted by distance"}
            </h3>

            {loading ? (
              <div className="space-y-4">
                {[1, 2, 3, 4, 5].map((i) => (
                  <Card key={i} className="animate-pulse">
                    <CardContent className="p-4">
                      <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                      <div className="h-3 bg-gray-200 rounded w-full mb-2"></div>
                      <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : labs.length > 0 ? (
              <div className="space-y-4">
                {labs.map((lab) => (
                  <Card key={lab.id} className="hover:shadow-md transition-shadow">
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex-1">
                          <h4 className="font-semibold text-gray-900 mb-1">{lab.name}</h4>
                          <p className="text-sm text-gray-600 mb-2">{lab.address}</p>
                          {lab.distance && (
                            <div className="flex items-center gap-1 text-sm text-blue-600">
                              <MapPin className="w-4 h-4" />
                              <span>{lab.distance.toFixed(1)} km away</span>
                            </div>
                          )}
                        </div>
                        <div className="flex items-center gap-1">
                          <Star className="w-4 h-4 text-yellow-500 fill-current" />
                          <span className="text-sm font-medium">{lab.rating}</span>
                        </div>
                      </div>

                      <div className="flex items-center gap-4 text-sm text-gray-600 mb-3">
                        {lab.phone && (
                          <div className="flex items-center gap-1">
                            <Phone className="w-4 h-4" />
                            <span>{lab.phone}</span>
                          </div>
                        )}
                        <div className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          <span>Open 8:00 AM - 8:00 PM</span>
                        </div>
                      </div>

                      {lab.services && lab.services.length > 0 && (
                        <div className="mb-3">
                          <div className="flex flex-wrap gap-1">
                            {lab.services.slice(0, 3).map((service, index) => (
                              <span key={index} className="px-2 py-1 bg-gray-100 text-xs rounded-full text-gray-700">
                                {service}
                              </span>
                            ))}
                            {lab.services.length > 3 && (
                              <span className="px-2 py-1 bg-gray-100 text-xs rounded-full text-gray-700">
                                +{lab.services.length - 3} more
                              </span>
                            )}
                          </div>
                        </div>
                      )}

                      <div className="flex gap-2">
                        <Button size="sm" className="flex-1">
                          Book Appointment
                        </Button>
                        <Button size="sm" variant="outline" className="bg-transparent">
                          View Details
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <Card>
                <CardContent className="p-6 text-center">
                  <MapPin className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                  <h3 className="font-semibold text-gray-900 mb-2">No labs found</h3>
                  <p className="text-gray-600 text-sm">
                    Try adjusting your location or search radius to find nearby labs.
                  </p>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </main>
      <BottomNavigation />
    </div>
  )
}
