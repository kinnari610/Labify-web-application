// Centralized offers data shared by SpecialOffers and the /offers page

import { type LucideIcon, Zap, Gift, Clock } from "lucide-react"

export type Offer = {
  id: string
  title: string
  subtitle: string
  description: string
  gradient: string // tailwind gradient classes without the 'bg-gradient-to-...' prefix
  icon: LucideIcon
  timeLeft: string
  originalPrice: number
  discountPrice: number
  rating: number
  packageId: string
  tests: string[]
}

export const offers: Offer[] = [
  {
    id: "flash-sale",
    title: "Flash Sale",
    subtitle: "50% OFF on Blood Tests",
    description: "Limited time offer on all blood test packages",
    gradient: "from-red-400 via-pink-500 to-purple-600",
    icon: Zap,
    timeLeft: "2h 30m",
    originalPrice: 2000,
    discountPrice: 1000,
    rating: 4.8,
    packageId: "blood-test-package",
    tests: ["Complete Blood Count", "Blood Sugar", "Cholesterol", "Liver Function"],
  },
  {
    id: "weekend-special",
    title: "Weekend Special",
    subtitle: "Free Home Collection",
    description: "Book any test and get free home collection",
    gradient: "from-blue-400 via-cyan-500 to-teal-600",
    icon: Gift,
    timeLeft: "1d 12h",
    originalPrice: 500,
    discountPrice: 0,
    rating: 4.9,
    packageId: "home-collection-free",
    tests: ["Any Test Package", "Free Home Visit", "Same Day Results"],
  },
  {
    id: "health-checkup",
    title: "Health Checkup",
    subtitle: "Complete Body Checkup",
    description: "Comprehensive health screening package",
    gradient: "from-green-400 via-emerald-500 to-cyan-600",
    icon: Clock,
    timeLeft: "3d 5h",
    originalPrice: 5000,
    discountPrice: 2999,
    rating: 4.7,
    packageId: "complete-health-checkup",
    tests: ["50+ Tests", "Full Body Scan", "Doctor Consultation", "Health Report"],
  },
]
