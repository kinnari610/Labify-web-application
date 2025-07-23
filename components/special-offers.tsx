"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Clock, Zap, Gift, Star, ArrowRight } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

const offers = [
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

export function SpecialOffers() {
  const [selectedOffer, setSelectedOffer] = useState<string | null>(null)
  const router = useRouter()
  const { toast } = useToast()

  const handleOfferClick = (offer: (typeof offers)[0]) => {
    setSelectedOffer(offer.id)

    // Add to cart functionality
    const cartItem = {
      id: offer.packageId,
      name: offer.subtitle,
      description: offer.description,
      price: offer.discountPrice,
      originalPrice: offer.originalPrice,
      quantity: 1,
      category: "Special Offer",
      tests_included: offer.tests,
    }

    // Get existing cart
    const existingCart = JSON.parse(localStorage.getItem("labify_cart") || "[]")

    // Check if item already exists
    const existingItemIndex = existingCart.findIndex((item: any) => item.id === cartItem.id)

    if (existingItemIndex >= 0) {
      existingCart[existingItemIndex].quantity += 1
    } else {
      existingCart.push(cartItem)
    }

    // Save to localStorage
    localStorage.setItem("labify_cart", JSON.stringify(existingCart))

    toast({
      title: "Added to Cart!",
      description: `${offer.subtitle} has been added to your cart.`,
    })

    // Reset selection after a short delay
    setTimeout(() => setSelectedOffer(null), 1000)
  }

  const handleBookNow = (offer: (typeof offers)[0]) => {
    // Store offer details for booking
    localStorage.setItem("selected_offer", JSON.stringify(offer))
    router.push(`/booking?offer=${offer.id}`)
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between px-2">
        <h2 className="text-xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
          Special Offers
        </h2>
        <Button
          variant="ghost"
          size="sm"
          className="text-blue-600 hover:text-blue-700 font-semibold bg-blue-50 hover:bg-blue-100 rounded-2xl px-4"
        >
          View All
        </Button>
      </div>

      <div className="flex gap-4 overflow-x-auto pb-2 px-1">
        {offers.map((offer) => {
          const Icon = offer.icon
          const isSelected = selectedOffer === offer.id

          return (
            <Card
              key={offer.id}
              className={`
                min-w-[280px] overflow-hidden border-0 shadow-lg hover:shadow-xl 
                transition-all duration-300 hover:scale-105 group cursor-pointer
                ${isSelected ? "ring-2 ring-blue-500 scale-105" : ""}
              `}
              onClick={() => handleOfferClick(offer)}
            >
              <div className={`h-2 bg-gradient-to-r ${offer.gradient}`}></div>
              <CardContent className="p-0">
                <div className={`relative p-6 bg-gradient-to-br ${offer.gradient} text-white overflow-hidden`}>
                  {/* Background decorative elements */}
                  <div className="absolute top-0 right-0 w-24 h-24 bg-white/10 rounded-full -translate-y-12 translate-x-12 group-hover:scale-110 transition-transform duration-500"></div>
                  <div className="absolute bottom-0 left-0 w-16 h-16 bg-white/5 rounded-full translate-y-8 -translate-x-8 group-hover:scale-110 transition-transform duration-500"></div>

                  <div className="relative z-10">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur-sm">
                          <Icon className="w-4 h-4 text-white" />
                        </div>
                        <Badge className="bg-white/20 text-white border-white/30 rounded-xl font-medium backdrop-blur-sm">
                          {offer.timeLeft} left
                        </Badge>
                      </div>
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 text-yellow-300 fill-current" />
                        <span className="text-sm font-medium">{offer.rating}</span>
                      </div>
                    </div>

                    <h3 className="text-lg font-bold mb-1">{offer.title}</h3>
                    <p className="text-white/90 font-semibold mb-2">{offer.subtitle}</p>
                    <p className="text-white/80 text-sm mb-4">{offer.description}</p>

                    {/* Tests included */}
                    <div className="mb-4">
                      <p className="text-white/70 text-xs mb-2">Includes:</p>
                      <div className="flex flex-wrap gap-1">
                        {offer.tests.slice(0, 2).map((test, index) => (
                          <Badge key={index} className="bg-white/20 text-white text-xs rounded-xl border-white/30">
                            {test}
                          </Badge>
                        ))}
                        {offer.tests.length > 2 && (
                          <Badge className="bg-white/20 text-white text-xs rounded-xl border-white/30">
                            +{offer.tests.length - 2} more
                          </Badge>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center justify-between mb-4">
                      <div className="space-y-1">
                        {offer.originalPrice > 0 && (
                          <p className="text-white/70 text-sm line-through">₹{offer.originalPrice}</p>
                        )}
                        <p className="text-white font-bold text-xl">
                          {offer.discountPrice === 0 ? "FREE" : `₹${offer.discountPrice}`}
                        </p>
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        onClick={(e) => {
                          e.stopPropagation()
                          handleOfferClick(offer)
                        }}
                        className={`
                          flex-1 bg-white/20 hover:bg-white/30 text-white border-white/30 
                          rounded-2xl font-semibold backdrop-blur-sm transition-all duration-300 
                          hover:scale-105 ${isSelected ? "bg-white/30" : ""}
                        `}
                      >
                        {isSelected ? "Added!" : "Add to Cart"}
                      </Button>
                      <Button
                        size="sm"
                        onClick={(e) => {
                          e.stopPropagation()
                          handleBookNow(offer)
                        }}
                        className="bg-white text-gray-900 hover:bg-white/90 rounded-2xl font-semibold transition-all duration-300 hover:scale-105 flex items-center gap-1"
                      >
                        Book Now
                        <ArrowRight className="w-3 h-3" />
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>
    </div>
  )
}
