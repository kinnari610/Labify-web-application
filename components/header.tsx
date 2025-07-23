"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ShoppingCart, Package, User } from "lucide-react"
import { useAuth } from "@/hooks/use-auth"
import Image from "next/image"

export function Header() {
  const { user, signOut } = useAuth()
  const router = useRouter()
  const [cartCount, setCartCount] = useState(0)

  // Update cart count when component mounts and when cart changes
  useEffect(() => {
    const updateCartCount = () => {
      if (typeof window !== "undefined") {
        const cart = JSON.parse(localStorage.getItem("labify_cart") || "[]")
        const count = cart.reduce((sum: number, item: any) => sum + item.quantity, 0)
        setCartCount(count)
      }
    }

    updateCartCount()

    // Listen for cart updates
    const handleCartUpdate = () => updateCartCount()
    window.addEventListener("cartUpdated", handleCartUpdate)

    return () => {
      window.removeEventListener("cartUpdated", handleCartUpdate)
    }
  }, [])

  const handleCartClick = () => {
    router.push("/cart")
  }

  const handleOrdersClick = () => {
    if (!user) {
      router.push("/auth/login")
      return
    }
    router.push("/orders")
  }

  const handleProfileClick = () => {
    if (!user) {
      router.push("/auth/login")
      return
    }
    router.push("/profile")
  }

  const handleAuthClick = async () => {
    if (user) {
      try {
        await signOut()
        router.push("/")
      } catch (error) {
        console.error("Logout error:", error)
      }
    } else {
      router.push("/auth/login")
    }
  }

  return (
    <header className="bg-white/80 backdrop-blur-md border-b border-gray-100 sticky top-0 z-50 shadow-sm">
      <div className="px-4 py-3">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-3 cursor-pointer group" onClick={() => router.push("/")}>
            <div className="relative">
              <Image
                src="/placeholder-logo.png"
                alt="Labify Logo"
                width={32}
                height={32}
                className="rounded-xl group-hover:scale-110 transition-transform duration-300"
              />
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
            </div>
            <div>
              <h1 className="text-xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-teal-600 bg-clip-text text-transparent">
                Labify
              </h1>
              <p className="text-xs text-gray-500 -mt-1">Health at your fingertips</p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-2">
            {/* Orders */}
            <Button
              variant="ghost"
              size="sm"
              onClick={handleOrdersClick}
              className="relative p-2 hover:bg-gradient-to-br hover:from-blue-50 hover:to-purple-50 rounded-2xl transition-all duration-300 hover:scale-110"
            >
              <Package className="w-5 h-5 text-gray-600" />
              <Badge className="absolute -top-1 -right-1 w-5 h-5 p-0 flex items-center justify-center bg-gradient-to-r from-orange-500 to-red-500 text-white text-xs rounded-full animate-bounce">
                2
              </Badge>
            </Button>

            {/* Cart */}
            <Button
              variant="ghost"
              size="sm"
              onClick={handleCartClick}
              className="relative p-2 hover:bg-gradient-to-br hover:from-green-50 hover:to-emerald-50 rounded-2xl transition-all duration-300 hover:scale-110"
            >
              <ShoppingCart className="w-5 h-5 text-gray-600" />
              {cartCount > 0 && (
                <Badge className="absolute -top-1 -right-1 w-5 h-5 p-0 flex items-center justify-center bg-gradient-to-r from-blue-500 to-purple-600 text-white text-xs rounded-full animate-pulse">
                  {cartCount}
                </Badge>
              )}
            </Button>

            {/* Profile/Auth */}
            <Button
              variant="ghost"
              size="sm"
              onClick={handleProfileClick}
              className="relative p-2 hover:bg-gradient-to-br hover:from-purple-50 hover:to-pink-50 rounded-2xl transition-all duration-300 hover:scale-110"
            >
              <User className="w-5 h-5 text-gray-600" />
              {user && <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>}
            </Button>

            {/* Login/Logout */}
            <Button
              onClick={handleAuthClick}
              size="sm"
              className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white rounded-2xl font-semibold px-4 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
            >
              {user ? "Logout" : "Login"}
            </Button>
          </div>
        </div>
      </div>
    </header>
  )
}
