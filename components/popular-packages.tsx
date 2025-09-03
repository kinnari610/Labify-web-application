"use client"

import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { TestTube, Star, Clock, Users, ShoppingCart } from "lucide-react"
import { useAuth } from "@/hooks/use-auth"
import { useToast } from "@/hooks/use-toast"
import { useState } from "react"

interface TestPackage {
  id: string
  name: string
  description: string
  price: number
  original_price: number
  category: string
  tests_included: string[]
}

interface PopularPackagesProps {
  packages: TestPackage[]
  loading: boolean
}

export function PopularPackages({ packages, loading }: PopularPackagesProps) {
  const router = useRouter()
  const { user } = useAuth()
  const { toast } = useToast()
  const [addingToCart, setAddingToCart] = useState<string | null>(null)

  const handleBookNow = (packageId: string) => {
    if (!user) {
      toast({
        title: "Login Required",
        description: "Please login to book an appointment.",
        variant: "destructive",
      })
      router.push("/auth/login")
      return
    }

    router.push(`/booking?package=${packageId}`)
  }

  const handleAddToCart = (pkg: TestPackage) => {
    setAddingToCart(pkg.id)

    const cartItem = {
      id: pkg.id,
      name: pkg.name,
      description: pkg.description,
      price: pkg.price,
      originalPrice: pkg.original_price,
      quantity: 1,
      category: pkg.category,
      tests_included: pkg.tests_included,
    }

    const existingCart = JSON.parse(localStorage.getItem("labify_cart") || "[]")
    const existingItemIndex = existingCart.findIndex((item: any) => item.id === cartItem.id)

    if (existingItemIndex >= 0) {
      existingCart[existingItemIndex].quantity += 1
      toast({
        title: "Quantity Updated",
        description: `${pkg.name} quantity increased in cart.`,
      })
    } else {
      existingCart.push(cartItem)
      toast({
        title: "Added to Cart!",
        description: `${pkg.name} has been added to your cart.`,
      })
    }

    localStorage.setItem("labify_cart", JSON.stringify(existingCart))
    setTimeout(() => setAddingToCart(null), 900)
  }

  const calculateDiscount = (original: number, current: number) =>
    original > 0 ? Math.round(((original - current) / original) * 100) : 0

  if (loading) {
    return (
      <div className="space-y-4">
        <h2 className="text-lg font-bold text-gray-900">Popular Health Packages</h2>
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="bg-white rounded-3xl p-6 shadow-sm border animate-pulse">
              <div className="h-4 bg-gray-200 rounded w-3/4 mb-2" />
              <div className="h-3 bg-gray-200 rounded w-full mb-3" />
              <div className="h-6 bg-gray-200 rounded w-1/4" />
            </div>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between px-2">
        <div>
          <h2 className="text-xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
            Popular Health Packages
          </h2>
          <p className="text-sm text-gray-600">Most booked packages this month</p>
        </div>
        <Button
          asChild
          variant="ghost"
          size="sm"
          className="text-blue-600 hover:text-blue-700 font-semibold bg-blue-50 hover:bg-blue-100 rounded-2xl px-4"
        >
          <Link href="/lab-tests">View All</Link>
        </Button>
      </div>

      <div className="space-y-4">
        {packages.map((pkg) => {
          const discount = calculateDiscount(pkg.original_price, pkg.price)
          const isAddingToCart = addingToCart === pkg.id

          return (
            <div
              key={pkg.id}
              className="bg-white/80 backdrop-blur-sm rounded-3xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border-0 group hover:scale-102"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <h3 className="font-bold text-gray-900 group-hover:text-blue-700 transition-colors duration-300">
                      {pkg.name}
                    </h3>
                    {discount > 0 && (
                      <Badge className="bg-gradient-to-r from-red-500 to-pink-600 text-white rounded-xl animate-pulse">
                        {discount}% OFF
                      </Badge>
                    )}
                  </div>
                  <p className="text-sm text-gray-600 mb-3">{pkg.description}</p>

                  <div className="flex items-center gap-4 text-xs text-gray-500 mb-3">
                    <div className="flex items-center gap-1">
                      <Star className="w-3 h-3 text-yellow-400 fill-current" />
                      <span>4.8 (1.2k reviews)</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      <span>6-8 hours</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Users className="w-3 h-3" />
                      <span>2.5k+ booked</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-2xl font-bold text-gray-900">₹{pkg.price}</span>
                    {pkg.original_price && (
                      <span className="text-sm text-gray-500 line-through">₹{pkg.original_price}</span>
                    )}
                  </div>

                  {pkg.tests_included && pkg.tests_included.length > 0 && (
                    <div className="mb-4">
                      <p className="text-xs text-gray-500 mb-2">Tests included:</p>
                      <div className="flex flex-wrap gap-1">
                        {pkg.tests_included.slice(0, 3).map((test, index) => (
                          <Badge
                            key={index}
                            variant="outline"
                            className="text-xs rounded-xl hover:bg-blue-50 transition-colors"
                          >
                            {test}
                          </Badge>
                        ))}
                        {pkg.tests_included.length > 3 && (
                          <Badge variant="outline" className="text-xs rounded-xl">
                            +{pkg.tests_included.length - 3} more
                          </Badge>
                        )}
                      </div>
                    </div>
                  )}
                </div>
                <div className="w-12 h-12 bg-gradient-to-br from-blue-100 to-purple-100 rounded-2xl flex items-center justify-center ml-4 group-hover:scale-110 transition-transform duration-300">
                  <TestTube className="w-6 h-6 text-blue-600" />
                </div>
              </div>

              <div className="flex gap-2">
                <Button
                  onClick={() => handleAddToCart(pkg)}
                  disabled={isAddingToCart}
                  variant="outline"
                  className="flex-1 border-2 border-blue-200 hover:border-blue-300 hover:bg-blue-50 rounded-2xl font-semibold transition-all duration-300 hover:scale-105 flex items-center justify-center gap-2"
                >
                  <ShoppingCart className="w-4 h-4" />
                  {isAddingToCart ? "Adding..." : "Add to Cart"}
                </Button>
                <Button
                  onClick={() => handleBookNow(pkg.id)}
                  className="flex-1 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white rounded-2xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
                >
                  Book Now
                </Button>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
