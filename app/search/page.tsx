"use client"

import { useState, useEffect } from "react"
import { useSearchParams } from 'next/navigation'
import { useRouter } from 'next/navigation'
import { Header } from "@/components/header"
import { BottomNavigation } from "@/components/bottom-navigation"
import { SearchBar } from "@/components/search-bar"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { MapPin, TestTube, Building, Star, Phone, AlertCircle } from 'lucide-react'

// Hardcoded Vadodara labs data from the PDF
const vadodaraLabs = [
  {
    id: "lab1",
    name: "Grace Laboratory",
    address: "67 Silver Coin Complex, Lalbaug Road, Makarpura",
    area: "Makarpura",
    phone: "+91-265-2234567",
    services: ["Blood Tests", "Urine Tests", "Pathology", "Biochemistry"],
    rating: 4.5,
    type: "lab",
  },
  {
    id: "lab2",
    name: "Makarpura Diagnostics & Research",
    address: "Indulal Yagnik Road, GIDC Industrial Area, Makarpura",
    area: "Makarpura",
    phone: "+91-265-2345678",
    services: ["Blood Tests", "Radiology", "CT Scan", "MRI", "Research"],
    rating: 4.6,
    type: "lab",
  },
  {
    id: "lab3",
    name: "Dr. Rakesh N Shah",
    address: "Patel Pen Center Gali, Raopura",
    area: "Raopura",
    phone: "+91-265-2456789",
    services: ["Blood Tests", "Consultation", "General Medicine"],
    rating: 4.3,
    type: "clinic",
  },
  {
    id: "lab4",
    name: "Shubh Aarogyam Pvt Ltd",
    address: "Gurukul Avenue",
    area: "Gurukul",
    phone: "+91-265-2567890",
    services: ["Blood Tests", "Health Checkups", "Preventive Care"],
    rating: 4.4,
    type: "lab",
  },
  {
    id: "lab5",
    name: "SRL Diagnostics",
    address: "43/A, Sampatrao Colony, Alkapuri",
    area: "Alkapuri",
    phone: "+91-265-2678901",
    services: ["Blood Tests", "Molecular Diagnostics", "Pathology", "Radiology", "Home Collection"],
    rating: 4.7,
    type: "lab",
  },
  {
    id: "lab6",
    name: "Param Imaging Centre",
    address: "1st Floor, Sunrise Complex, Waghodia Road",
    area: "Waghodia Road",
    phone: "+91-265-2789012",
    services: ["CT Scan", "MRI", "X-Ray", "Ultrasound", "Mammography"],
    rating: 4.5,
    type: "imaging",
  },
  {
    id: "lab7",
    name: "Sterling Accuris Diagnostics",
    address: "Memories House, Sampatrao, Alkapuri",
    area: "Alkapuri",
    phone: "+91-265-2890123",
    services: ["Blood Tests", "Biochemistry", "Microbiology", "Pathology"],
    rating: 4.4,
    type: "lab",
  },
  {
    id: "lab8",
    name: "Sneh Hospital",
    address: "Fortune Complex, Sun Pharma Road, Atladara",
    area: "Atladara",
    phone: "+91-265-2901234",
    services: ["Emergency Care", "Blood Tests", "Surgery", "ICU", "24x7 Services"],
    rating: 4.6,
    type: "hospital",
  },
  {
    id: "lab9",
    name: "Apollo Clinic",
    address: "Cosmic Enclave, Sama Road",
    area: "Sama",
    phone: "+91-265-3012345",
    services: ["Blood Tests", "Health Checkups", "Consultation", "Pharmacy"],
    rating: 4.8,
    type: "clinic",
  },
  {
    id: "lab10",
    name: "Divine Lab Fateganj",
    address: "Mangalkirti Apartment, Fateganj",
    area: "Fateganj",
    phone: "+91-265-3123456",
    services: ["Blood Tests", "Urine Tests", "Pathology"],
    rating: 4.2,
    type: "lab",
  },
  {
    id: "lab11",
    name: "Baroda Heart Institute & Research",
    address: "44, Haribhakti Colony, Old Padra Road",
    area: "Old Padra Road",
    phone: "+91-265-3234567",
    services: ["Cardiology", "ECG", "Echo", "Stress Test", "Heart Surgery"],
    rating: 4.9,
    type: "specialty",
  },
  {
    id: "lab12",
    name: "Baroda Imaging Center",
    address: "Sangita Apartment, RC Dutt Road, Alkapuri",
    area: "Alkapuri",
    phone: "+91-265-3345678",
    services: ["CT Scan", "MRI", "X-Ray", "Mammography", "Ultrasound"],
    rating: 4.5,
    type: "imaging",
  },
  {
    id: "lab13",
    name: "Raneshwar Multispeciality Hospital",
    address: "Parshawnagar Society, Vasna Road",
    area: "Vasna",
    phone: "+91-265-3456789",
    services: ["Emergency Care", "Surgery", "Blood Tests", "ICU", "Multispeciality"],
    rating: 4.7,
    type: "hospital",
  },
  {
    id: "lab14",
    name: "Dr. Tiwaris Diagnostic Centre",
    address: "256, Swaminarayan Nagar, Kadamnagar Road, Nizampura",
    area: "Nizampura",
    phone: "+91-265-3567890",
    services: ["Blood Tests", "Pathology", "Biochemistry"],
    rating: 4.3,
    type: "lab",
  },
  {
    id: "lab15",
    name: "Metropolis Healthcare Ltd",
    address: "101, Soho Complex, Malhar Cross Road, Old Padra Road",
    area: "Old Padra Road",
    phone: "+91-265-3678901",
    services: ["Blood Tests", "Molecular Diagnostics", "Genetics", "Pathology", "Home Collection"],
    rating: 4.8,
    type: "lab",
  },
  {
    id: "lab16",
    name: "Paramount Diagnostic & Research",
    address: "Paramount Complex, Gotri Road",
    area: "Gotri",
    phone: "+91-265-3789012",
    services: ["Blood Tests", "Research", "Clinical Trials"],
    rating: 4.4,
    type: "lab",
  },
  {
    id: "lab17",
    name: "Pratham Microbiology Laboratory",
    address: "102 Mangaldhara Complex, Alkapuri",
    area: "Alkapuri",
    phone: "+91-265-3890123",
    services: ["Microbiology", "Culture Tests", "Sensitivity Tests"],
    rating: 4.3,
    type: "lab",
  },
  {
    id: "lab18",
    name: "Dr. Lal PathLabs Jetalpur",
    address: "Capri House 2, Sudha Nagar, Jetalpur Road",
    area: "Jetalpur",
    phone: "+91-265-3901234",
    services: ["Blood Tests", "Pathology", "Radiology", "Home Collection"],
    rating: 4.6,
    type: "lab",
  },
  {
    id: "lab19",
    name: "Shri K K Patel Nidan Kendra",
    address: "Sayaji Ganj",
    area: "Sayaji Ganj",
    phone: "+91-265-4012345",
    services: ["Blood Tests", "Diagnostic Services"],
    rating: 4.2,
    type: "lab",
  },
  {
    id: "lab20",
    name: "Divine Lab Old Padra",
    address: "Anannya Complex, Old Padra Road, Akshar Chowk",
    area: "Old Padra Road",
    phone: "+91-265-4123456",
    services: ["Blood Tests", "Urine Tests", "Pathology"],
    rating: 4.2,
    type: "lab",
  },
  {
    id: "lab21",
    name: "Icure Cardio Diagnostic Center",
    address: "Acharya Nursing Home, Arunanchal Road, Gorva",
    area: "Gorva",
    phone: "+91-265-4234567",
    services: ["Cardiology", "ECG", "Echo", "Holter Monitoring"],
    rating: 4.5,
    type: "specialty",
  },
  {
    id: "lab22",
    name: "Sanya GIC Imaging Pvt Ltd",
    address: "Trauma Centre, SSG General Hospital, Sayaji Ganj",
    area: "Sayaji Ganj",
    phone: "+91-265-4345678",
    services: ["CT Scan", "MRI", "X-Ray", "Emergency Imaging", "24x7 Services"],
    rating: 4.4,
    type: "imaging",
  },
  {
    id: "lab23",
    name: "Royal Diagnostic & Health Care",
    address: "Vishwas Colony, Vadiwadi, Haripura",
    area: "Haripura",
    phone: "+91-265-4456789",
    services: ["Blood Tests", "Health Checkups", "Preventive Care"],
    rating: 4.3,
    type: "lab",
  },
  {
    id: "lab24",
    name: "Ambe's Advanced Clinical Laboratory",
    address: "Pratham Plaza, Akota Garden Char Rasta, Akota",
    area: "Akota",
    phone: "+91-265-4567890",
    services: ["Blood Tests", "Advanced Diagnostics", "Clinical Chemistry"],
    rating: 4.5,
    type: "lab",
  },
  {
    id: "lab25",
    name: "Shital Diagnostic Clinic",
    address: "Anandvan Complex, Subhanpura Main Road, Subhanpura",
    area: "Subhanpura",
    phone: "+91-265-4678901",
    services: ["Blood Tests", "Diagnostic Services"],
    rating: 4.2,
    type: "clinic",
  },
  {
    id: "lab26",
    name: "Amins Pathology Referral Laboratory",
    address: "Sanstha Vasahat, Pratap Road, Raopura",
    area: "Raopura",
    phone: "+91-265-4789012",
    services: ["Pathology", "Histopathology", "Cytology"],
    rating: 4.4,
    type: "lab",
  },
  {
    id: "lab27",
    name: "Labopath Diagnostics",
    address: "Sunrise Complex, Manjalpur",
    area: "Manjalpur",
    phone: "+91-265-4890123",
    services: ["Blood Tests", "Pathology", "Laboratory Services"],
    rating: 4.3,
    type: "lab",
  },
  {
    id: "lab28",
    name: "Baroda Imaging Centre Padra",
    address: "Bhadralok Tower, Old Padra Road",
    area: "Old Padra Road",
    phone: "+91-265-4901234",
    services: ["CT Scan", "MRI", "X-Ray", "Ultrasound"],
    rating: 4.5,
    type: "imaging",
  },
  {
    id: "lab29",
    name: "Vip Diagnostic Lab",
    address: "Pacific Plaza, VIP Road, Karelibaug",
    area: "Karelibaug",
    phone: "+91-265-5012345",
    services: ["Blood Tests", "VIP Services", "Executive Health"],
    rating: 4.6,
    type: "lab",
  },
  {
    id: "lab30",
    name: "Alakh Lab",
    address: "Siddharth Patel Square, Old Padra Main Road",
    area: "Old Padra Road",
    phone: "+91-265-5123456",
    services: ["Blood Tests", "Laboratory Services"],
    rating: 4.2,
    type: "lab",
  },
  {
    id: "lab31",
    name: "Dr. Purandares Day & Night Lab",
    address: "Sainath Tower, Kharivav Road, Dandia Bazar",
    area: "Dandia Bazar",
    phone: "+91-265-5234567",
    services: ["Blood Tests", "24x7 Services", "Emergency Lab"],
    rating: 4.4,
    type: "lab",
  },
  {
    id: "lab32",
    name: "SIDDHI ICU & Multispeciality Hospital",
    address: "Near Fire Station, Dandia Bazar",
    area: "Dandia Bazar",
    phone: "+91-265-5345678",
    services: ["ICU", "Emergency Care", "Blood Tests", "Surgery"],
    rating: 4.7,
    type: "hospital",
  },
  {
    id: "lab33",
    name: "Dr. Lal PathLabs Makarpura",
    address: "Silver Rock Complex, Main Road, Makarpura",
    area: "Makarpura",
    phone: "+91-265-5456789",
    services: ["Blood Tests", "Pathology", "Radiology", "Home Collection"],
    rating: 4.6,
    type: "lab",
  },
  {
    id: "lab34",
    name: "Sanidhya Clinic",
    address: "Silver House, Akota",
    area: "Akota",
    phone: "+91-265-5567890",
    services: ["Blood Tests", "Consultation", "General Medicine"],
    rating: 4.3,
    type: "clinic",
  },
  {
    id: "lab35",
    name: "Wellness Diagnostic Centre",
    address: "Indiabulls Megamall, Jetalpur Road",
    area: "Jetalpur",
    phone: "+91-265-5678901",
    services: ["Blood Tests", "Health Checkups", "Wellness Programs"],
    rating: 4.5,
    type: "lab",
  },
  {
    id: "lab36",
    name: "Phoenix Diagnostic Lab",
    address: "Shreeji Complex, Dabhoi Sinor Road, Dabhoi",
    area: "Dabhoi",
    phone: "+91-265-5789012",
    services: ["Blood Tests", "Diagnostic Services"],
    rating: 4.2,
    type: "lab",
  },
  {
    id: "lab37",
    name: "Ami Lab",
    address: "Arpan Complex, Delux Char Rasta, Nizampura",
    area: "Nizampura",
    phone: "+91-265-5890123",
    services: ["Blood Tests", "Laboratory Services"],
    rating: 4.1,
    type: "lab",
  },
  {
    id: "lab38",
    name: "Om Imaging Centre",
    address: "Shree Sai Avenue, Yogi Society, Waghodia Road",
    area: "Waghodia Road",
    phone: "+91-265-5901234",
    services: ["CT Scan", "MRI", "X-Ray", "Ultrasound"],
    rating: 4.4,
    type: "imaging",
  },
  {
    id: "lab39",
    name: "Snaap Oral Diagnosis & Radiology",
    address: "Trivia, Natubhai Circle, Race Course Road",
    area: "Race Course",
    phone: "+91-265-6012345",
    services: ["Oral Radiology", "Dental X-Ray", "OPG"],
    rating: 4.3,
    type: "specialty",
  },
  {
    id: "lab40",
    name: "Aster Diagnostics & Research Centre",
    address: "Nandigram Society, Sindhvai Mata Road, Manjalpur",
    area: "Manjalpur",
    phone: "+91-265-6123456",
    services: ["Blood Tests", "Research", "Advanced Diagnostics"],
    rating: 4.5,
    type: "lab",
  },
  {
    id: "lab41",
    name: "Dr. Lal PathLabs Ajwa",
    address: "Saraswati Apartment, New VIP Road, Ajwa Road",
    area: "Ajwa Road",
    phone: "+91-265-6234567",
    services: ["Blood Tests", "Pathology", "Radiology", "Home Collection"],
    rating: 4.6,
    type: "lab",
  },
  {
    id: "lab42",
    name: "Arogyam Microcare Pvt Ltd",
    address: "Dandia Bazar",
    area: "Dandia Bazar",
    phone: "+91-265-6345678",
    services: ["Blood Tests", "Microbiology", "Pathology"],
    rating: 4.3,
    type: "lab",
  },
  {
    id: "lab43",
    name: "Divine Lab Chhani",
    address: "Eshanti Sira, Ramakaka Dairy Road, Chhani",
    area: "Chhani",
    phone: "+91-265-6456789",
    services: ["Blood Tests", "Urine Tests", "Pathology"],
    rating: 4.2,
    type: "lab",
  },
  {
    id: "lab44",
    name: "Thyrocare Main Branch",
    address: "RAMVE PLAZA, Kharivav Road, Dandia Bazar",
    area: "Dandia Bazar",
    phone: "+91-265-6567890",
    services: ["Thyroid Tests", "Hormone Tests", "Blood Tests", "Home Collection"],
    rating: 4.7,
    type: "lab",
  },
  {
    id: "lab45",
    name: "Krishna Laboratory",
    address: "Padmini Complex, Waghodia Road",
    area: "Waghodia Road",
    phone: "+91-265-6678901",
    services: ["Blood Tests", "Laboratory Services"],
    rating: 4.2,
    type: "lab",
  },
  {
    id: "lab46",
    name: "Dr. Lal Pathlabs Vasna",
    address: "Yajman Complex, Vasna Road",
    area: "Vasna",
    phone: "+91-265-6789012",
    services: ["Blood Tests", "Pathology", "Radiology", "Home Collection"],
    rating: 4.6,
    type: "lab",
  },
  {
    id: "lab47",
    name: "Unipath Speciality Laboratory LLP",
    address: "Platinum Complex, Akota",
    area: "Akota",
    phone: "+91-265-6890123",
    services: ["Speciality Tests", "Advanced Diagnostics", "Blood Tests"],
    rating: 4.5,
    type: "lab",
  },
  {
    id: "lab48",
    name: "Shree Hospital & Maternity Home",
    address: "Rajratan Complex, Vasna Road",
    area: "Vasna",
    phone: "+91-265-6901234",
    services: ["Maternity Care", "Blood Tests", "Gynecology", "Pediatrics"],
    rating: 4.6,
    type: "hospital",
  },
  {
    id: "lab49",
    name: "Thyrocare Aarogyam Centre",
    address: "Meera Society, Ajwa Road",
    area: "Ajwa Road",
    phone: "+91-265-7012345",
    services: ["Thyroid Tests", "Hormone Tests", "Health Packages", "Home Collection"],
    rating: 4.7,
    type: "lab",
  },
  {
    id: "lab50",
    name: "Akar Diagnostic Lab",
    address: "Avishkar Complex, Old Padra Road",
    area: "Old Padra Road",
    phone: "+91-265-7123456",
    services: ["Blood Tests", "Diagnostic Services", "Pathology"],
    rating: 4.3,
    type: "lab",
  },
]

// Test packages data
const testPackages = [
  {
    id: "pkg1",
    name: "Full Body Checkup Premium",
    description: "Comprehensive health assessment with 50+ tests",
    price: 360,
    originalPrice: 600,
    category: "Health Checkup",
    type: "package",
  },
  {
    id: "pkg2",
    name: "Diabetes Care Package",
    description: "Complete diabetes monitoring and management",
    price: 450,
    originalPrice: 750,
    category: "Diabetes",
    type: "package",
  },
  {
    id: "pkg3",
    name: "Heart Health Package",
    description: "Comprehensive cardiac assessment",
    price: 850,
    originalPrice: 1200,
    category: "Cardiology",
    type: "package",
  },
  {
    id: "pkg4",
    name: "Women Care Package",
    description: "Specialized health checkup for women",
    price: 650,
    originalPrice: 900,
    category: "Women Health",
    type: "package",
  },
  {
    id: "pkg5",
    name: "Thyroid Profile Complete",
    description: "Complete thyroid function assessment",
    price: 320,
    originalPrice: 450,
    category: "Hormonal",
    type: "package",
  },
]

export default function SearchPage() {
  const searchParams = useSearchParams()
  const query = searchParams.get("q") || ""
  const router = useRouter()
  const [searchResults, setSearchResults] = useState<any[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (query.trim()) {
      performSearch(query)
    }
  }, [query])

  const performSearch = async (searchQuery: string) => {
    setLoading(true)
    setError(null)
    try {
      const response = await fetch(`/api/search?q=${encodeURIComponent(searchQuery)}`)
      const data = await response.json()

      if (!response.ok) {
        setError(data.error || "Failed to search")
        setSearchResults([])
      } else {
        setSearchResults(data.results || [])
      }
    } catch (err) {
      console.error("[v0] Search error:", err)
      setError("Failed to perform search. Please try again.")
      setSearchResults([])
    } finally {
      setLoading(false)
    }
  }

  const getItemIcon = (type: string) => {
    switch (type) {
      case "lab":
      case "clinic":
        return <TestTube className="w-5 h-5 text-blue-600" />
      case "hospital":
        return <Building className="w-5 h-5 text-red-600" />
      case "imaging":
        return <Building className="w-5 h-5 text-green-600" />
      case "specialty":
        return <Building className="w-5 h-5 text-purple-600" />
      case "package":
        return <TestTube className="w-5 h-5 text-orange-600" />
      default:
        return <TestTube className="w-5 h-5 text-gray-600" />
    }
  }

  const getTypeLabel = (type: string) => {
    switch (type) {
      case "lab":
        return "Laboratory"
      case "clinic":
        return "Clinic"
      case "hospital":
        return "Hospital"
      case "imaging":
        return "Imaging Center"
      case "specialty":
        return "Specialty Center"
      case "package":
        return "Test Package"
      default:
        return "Healthcare"
    }
  }

  const handleBooking = (item: any) => {
    if (item.type === "package") {
      router.push(`/booking?package=${item.id}`)
    } else {
      router.push(`/booking?lab=${item.id}`)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="pb-20">
        <div className="px-4 py-6 space-y-6">
          <div>
            <h1 className="text-xl font-bold text-gray-900 mb-4">Search Results</h1>
            <SearchBar placeholder="Search Labs, Tests, Packages..." />
          </div>

          {query && (
            <div className="text-sm text-gray-600">
              {loading ? "Searching..." : `Found ${searchResults.length} results for "${query}"`}
            </div>
          )}

          {error && (
            <Card className="border-red-200 bg-red-50">
              <CardContent className="p-4 flex gap-3">
                <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-semibold text-red-900">Search Error</h3>
                  <p className="text-sm text-red-800">{error}</p>
                </div>
              </CardContent>
            </Card>
          )}

          {loading ? (
            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <Card key={i} className="animate-pulse">
                  <CardContent className="p-4">
                    <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                    <div className="h-3 bg-gray-200 rounded w-full mb-2"></div>
                    <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : searchResults.length > 0 ? (
            <div className="space-y-4">
              {searchResults.map((item) => (
                <Card key={item.id} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-4">
                    <div className="flex items-start gap-3">
                      {getItemIcon(item.type)}
                      <div className="flex-1">
                        <div className="flex items-start justify-between mb-2">
                          <div>
                            <h3 className="font-semibold text-gray-900">{item.name}</h3>
                            <Badge variant="secondary" className="text-xs mt-1">
                              {getTypeLabel(item.type)}
                            </Badge>
                          </div>
                          {item.rating && (
                            <div className="flex items-center gap-1">
                              <Star className="w-4 h-4 text-yellow-500 fill-current" />
                              <span className="text-sm font-medium">{item.rating}</span>
                            </div>
                          )}
                        </div>

                        {item.address && (
                          <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
                            <MapPin className="w-4 h-4" />
                            <span>{item.address}</span>
                          </div>
                        )}

                        {item.phone && (
                          <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
                            <Phone className="w-4 h-4" />
                            <span>{item.phone}</span>
                          </div>
                        )}

                        {item.description && <p className="text-sm text-gray-600 mb-2">{item.description}</p>}

                        {item.price && (
                          <div className="flex items-center gap-2 mb-2">
                            <span className="text-lg font-bold text-blue-600">₹{item.price}</span>
                            {item.original_price && (
                              <span className="text-sm text-gray-500 line-through">₹{item.original_price}</span>
                            )}
                          </div>
                        )}

                        {item.services && Array.isArray(item.services) && (
                          <div className="flex flex-wrap gap-1 mb-3">
                            {item.services.slice(0, 3).map((service: string, index: number) => (
                              <span key={index} className="px-2 py-1 bg-gray-100 text-xs rounded-full text-gray-700">
                                {service}
                              </span>
                            ))}
                            {item.services.length > 3 && (
                              <span className="px-2 py-1 bg-gray-100 text-xs rounded-full text-gray-700">
                                +{item.services.length - 3} more
                              </span>
                            )}
                          </div>
                        )}

                        {item.tests_included && Array.isArray(item.tests_included) && (
                          <div className="flex flex-wrap gap-1 mb-3">
                            {item.tests_included.slice(0, 3).map((test: string, index: number) => (
                              <span key={index} className="px-2 py-1 bg-orange-100 text-xs rounded-full text-orange-700">
                                {test}
                              </span>
                            ))}
                            {item.tests_included.length > 3 && (
                              <span className="px-2 py-1 bg-orange-100 text-xs rounded-full text-orange-700">
                                +{item.tests_included.length - 3} more
                              </span>
                            )}
                          </div>
                        )}

                        <div className="flex gap-2">
                          <Button
                            size="sm"
                            className="flex-1"
                            onClick={() => handleBooking(item)}
                          >
                            {item.type === "package" ? "Book Test" : "Book Appointment"}
                          </Button>
                          <Button size="sm" variant="outline" className="bg-transparent">
                            View Details
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : query ? (
            <Card>
              <CardContent className="p-6 text-center">
                <TestTube className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                <h3 className="font-semibold text-gray-900 mb-2">No results found</h3>
                <p className="text-gray-600 text-sm">Try searching with different keywords or browse our categories</p>
              </CardContent>
            </Card>
          ) : (
            <Card>
              <CardContent className="p-6 text-center">
                <TestTube className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                <h3 className="font-semibold text-gray-900 mb-2">Start your search</h3>
                <p className="text-gray-600 text-sm">
                  Search for labs, tests, packages, or healthcare services in your area
                </p>
              </CardContent>
            </Card>
          )}
        </div>
      </main>
      <BottomNavigation />
    </div>
  )
}
