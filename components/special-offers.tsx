"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Star, ArrowRight } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { offers } from "@/data/offers"

export function SpecialOffers() {
  const [selectedOffer, setSelectedOffer] = useState<string | null>(null)
  const router = useRouter()
  const { toast } = useToast()

  const handleOfferClick = (offer: (typeof offers)[number]) => {
    setSelectedOffer(offer.id)

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

    const existingCart = JSON.parse(localStorage.getItem("labify_cart") || "[]")
    const existingItemIndex = existingCart.findIndex((item: any) => item.id === cartItem.id)

    if (existingItemIndex >= 0) {
      existingCart[existingItemIndex].quantity += 1
    } else {
      existingCart.push(cartItem)
    }

    localStorage.setItem("labify_cart", JSON.stringify(existingCart))

    toast({
      title: "Added to Cart!",
      description: `${offer.subtitle} has been added to your cart.`,
    })

    setTimeout(() => setSelectedOffer(null), 900)
  }

  const handleBookNow = (offer: (typeof offers)[number]) => {
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
          asChild
          variant="ghost"
          size="sm"
          className="text-blue-600 hover:text-blue-700 font-semibold bg-blue-50 hover:bg-blue-100 rounded-2xl px-4"
        >
          <Link href="/offers">View All</Link>
        </Button>
      </div>

      <div className="flex gap-4 overflow-x-auto pb-2 px-1">
        {offers.map((offer) => {
          const Icon = offer.icon
          const isSelected = selectedOffer === offer.id

          return (
            <Card
              key={offer.id}
              className={`min-w-[280px] overflow-hidden border-0 shadow-lg hover:shadow-xl 
                transition-all duration-300 hover:scale-105 group cursor-pointer
                ${isSelected ? "ring-2 ring-blue-500 scale-105" : ""}`}
              onClick={() => handleOfferClick(offer)}
            >
              <div className={`h-2 bg-gradient-to-r ${offer.gradient}`} />
              <CardContent className="p-0">
                <div className={`relative p-6 bg-gradient-to-br ${offer.gradient} text-white overflow-hidden`}>
                  <div className="absolute top-0 right-0 w-24 h-24 bg-white/10 rounded-full -translate-y-12 translate-x-12 group-hover:scale-110 transition-transform duration-500" />
                  <div className="absolute bottom-0 left-0 w-16 h-16 bg-white/5 rounded-full translate-y-8 -translate-x-8 group-hover:scale-110 transition-transform duration-500" />

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
                        className={`flex-1 bg-white/20 hover:bg-white/30 text-white border-white/30 
                          rounded-2xl font-semibold backdrop-blur-sm transition-all duration-300 
                          hover:scale-105 ${isSelected ? "bg-white/30" : ""}`}
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
