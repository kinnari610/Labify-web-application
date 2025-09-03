"use client"

import Link from "next/link"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, ArrowRight, Star } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { offers } from "@/data/offers"

export default function OffersPage() {
  const router = useRouter()
  const { toast } = useToast()
  const [addingId, setAddingId] = useState<string | null>(null)

  const handleAddToCart = (id: string) => {
    const offer = offers.find((o) => o.id === id)
    if (!offer) return
    setAddingId(id)

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
    const idx = existingCart.findIndex((item: any) => item.id === cartItem.id)
    if (idx >= 0) {
      existingCart[idx].quantity += 1
    } else {
      existingCart.push(cartItem)
    }
    localStorage.setItem("labify_cart", JSON.stringify(existingCart))

    toast({
      title: "Added to Cart!",
      description: `${offer.subtitle} has been added to your cart.`,
    })
    setTimeout(() => setAddingId(null), 700)
  }

  const handleBookNow = (id: string) => {
    const offer = offers.find((o) => o.id === id)
    if (!offer) return
    localStorage.setItem("selected_offer", JSON.stringify(offer))
    router.push(`/booking?offer=${offer.id}`)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="sticky top-0 z-10 bg-white/80 backdrop-blur border-b">
        <div className="mx-auto max-w-3xl px-4 py-3 flex items-center gap-3">
          <Button variant="ghost" size="icon" asChild aria-label="Back to Home">
            <Link href="/">
              <ArrowLeft className="w-5 h-5" />
            </Link>
          </Button>
          <h1 className="text-lg font-semibold">Offers</h1>
        </div>
      </header>

      <main className="mx-auto max-w-3xl px-4 py-6 space-y-4">
        {offers.map((offer) => {
          const Icon = offer.icon
          const adding = addingId === offer.id
          return (
            <Card key={offer.id} className="overflow-hidden border-0 shadow-md">
              <div className={`h-2 bg-gradient-to-r ${offer.gradient}`} />
              <CardHeader className="pb-0">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-base">{offer.title}</CardTitle>
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 text-yellow-400 fill-current" />
                    <span className="text-sm">{offer.rating}</span>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="pt-4">
                <div className={`relative p-4 rounded-xl text-white bg-gradient-to-br ${offer.gradient}`}>
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-8 h-8 bg-white/20 rounded-xl flex items-center justify-center">
                      <Icon className="w-4 h-4" />
                    </div>
                    <Badge className="bg-white/20 text-white border-white/30 rounded-xl">{offer.timeLeft} left</Badge>
                  </div>
                  <p className="font-semibold">{offer.subtitle}</p>
                  <p className="text-sm text-white/90">{offer.description}</p>

                  <div className="mt-3">
                    <p className="text-xs text-white/75 mb-1">Includes</p>
                    <div className="flex flex-wrap gap-1">
                      {offer.tests.slice(0, 4).map((t, i) => (
                        <Badge key={i} className="bg-white/20 text-white border-white/30 rounded-xl text-xs">
                          {t}
                        </Badge>
                      ))}
                      {offer.tests.length > 4 && (
                        <Badge className="bg-white/20 text-white border-white/30 rounded-xl text-xs">
                          +{offer.tests.length - 4} more
                        </Badge>
                      )}
                    </div>
                  </div>

                  <div className="mt-4 flex items-end justify-between">
                    <div className="space-y-0.5">
                      {offer.originalPrice > 0 && (
                        <p className="text-white/80 text-sm line-through">₹{offer.originalPrice}</p>
                      )}
                      <p className="text-2xl font-bold">
                        {offer.discountPrice === 0 ? "FREE" : `₹${offer.discountPrice}`}
                      </p>
                    </div>
                    <div className="flex gap-2">
                      <Button
                        variant="secondary"
                        className="bg-white/20 hover:bg-white/30 text-white rounded-2xl"
                        disabled={adding}
                        onClick={() => handleAddToCart(offer.id)}
                      >
                        {adding ? "Adding..." : "Add to Cart"}
                      </Button>
                      <Button
                        className="bg-white text-gray-900 hover:bg-white/90 rounded-2xl"
                        onClick={() => handleBookNow(offer.id)}
                      >
                        Book Now
                        <ArrowRight className="w-4 h-4 ml-1" />
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </main>
    </div>
  )
}
