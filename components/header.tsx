"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useRouter, usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { useAuth } from "@/hooks/use-auth"
import { useToast } from "@/hooks/use-toast"
import { ShoppingCart, Menu, User, LogOut, FileText, MapPin } from "lucide-react"

export function Header() {
  const { user, signOut } = useAuth()
  const { toast } = useToast()
  const router = useRouter()
  const pathname = usePathname()
  const [cartCount, setCartCount] = useState(0)
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  // Update cart count
  useEffect(() => {
    const updateCartCount = () => {
      try {
        const cart = JSON.parse(localStorage.getItem("labify-cart") || "[]")
        const totalItems = cart.reduce((sum: number, item: any) => sum + (item.quantity || 1), 0)
        setCartCount(totalItems)
      } catch (error) {
        console.error("Error reading cart:", error)
        setCartCount(0)
      }
    }

    // Initial load
    updateCartCount()

    // Listen for cart updates
    const handleCartUpdate = () => updateCartCount()
    window.addEventListener("cartUpdated", handleCartUpdate)
    window.addEventListener("storage", updateCartCount)

    return () => {
      window.removeEventListener("cartUpdated", handleCartUpdate)
      window.removeEventListener("storage", updateCartCount)
    }
  }, [])

  const handleAuthClick = async () => {
    if (user) {
      try {
        await signOut()
        toast({
          title: "Signed out successfully",
          description: "You have been logged out of your account.",
        })
        router.push("/")
      } catch (error) {
        console.error("Logout error:", error)
        toast({
          title: "Error",
          description: "Failed to sign out. Please try again.",
          variant: "destructive",
        })
      }
    } else {
      router.push("/auth/login")
    }
  }

  const handleProfileClick = () => {
    setIsMenuOpen(false)
    router.push("/profile")
  }

  const handleOrdersClick = () => {
    setIsMenuOpen(false)
    router.push("/orders")
  }

  const navigation = [
    { name: "Home", href: "/", current: pathname === "/" },
    { name: "Lab Tests", href: "/lab-tests", current: pathname === "/lab-tests" },
    { name: "Find Labs", href: "/find-labs", current: pathname === "/find-labs" },
    { name: "Search", href: "/search", current: pathname === "/search" },
  ]

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">L</span>
            </div>
            <span className="text-xl font-bold text-gray-900">Labify</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`text-sm font-medium transition-colors hover:text-blue-600 ${
                  item.current ? "text-blue-600" : "text-gray-600"
                }`}
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* Right side actions */}
          <div className="flex items-center space-x-4">
            {/* Cart */}
            <Link href="/cart">
              <Button variant="ghost" size="sm" className="relative">
                <ShoppingCart className="h-5 w-5" />
                {cartCount > 0 && (
                  <Badge className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 text-xs bg-red-500 hover:bg-red-500">
                    {cartCount > 99 ? "99+" : cartCount}
                  </Badge>
                )}
              </Button>
            </Link>

            {/* User Menu */}
            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                    <Avatar className="h-8 w-8">
                      <AvatarImage
                        src={user.user_metadata?.avatar_url || "/placeholder.svg"}
                        alt={user.user_metadata?.name || "User"}
                      />
                      <AvatarFallback className="bg-blue-600 text-white">
                        {(user.user_metadata?.name || user.email || "U").charAt(0).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56" align="end" forceMount>
                  <DropdownMenuLabel className="font-normal">
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-medium leading-none">{user.user_metadata?.name || "User"}</p>
                      <p className="text-xs leading-none text-muted-foreground">{user.email}</p>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleProfileClick}>
                    <User className="mr-2 h-4 w-4" />
                    <span>Profile</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={handleOrdersClick}>
                    <FileText className="mr-2 h-4 w-4" />
                    <span>My Orders</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => router.push("/find-labs")}>
                    <MapPin className="mr-2 h-4 w-4" />
                    <span>Find Labs</span>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleAuthClick}>
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Sign out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <div className="flex items-center space-x-2">
                <Button variant="ghost" size="sm" onClick={() => router.push("/auth/login")}>
                  Sign in
                </Button>
                <Button size="sm" onClick={() => router.push("/auth/signup")}>
                  Sign up
                </Button>
              </div>
            )}

            {/* Mobile menu */}
            <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
              <SheetTrigger asChild className="md:hidden">
                <Button variant="ghost" size="sm">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px] sm:w-[400px]">
                <nav className="flex flex-col space-y-4">
                  {navigation.map((item) => (
                    <Link
                      key={item.name}
                      href={item.href}
                      onClick={() => setIsMenuOpen(false)}
                      className={`text-lg font-medium transition-colors hover:text-blue-600 ${
                        item.current ? "text-blue-600" : "text-gray-600"
                      }`}
                    >
                      {item.name}
                    </Link>
                  ))}
                  {user && (
                    <>
                      <div className="border-t pt-4 mt-4">
                        <div className="flex items-center space-x-3 mb-4">
                          <Avatar className="h-10 w-10">
                            <AvatarImage
                              src={user.user_metadata?.avatar_url || "/placeholder.svg"}
                              alt={user.user_metadata?.name || "User"}
                            />
                            <AvatarFallback className="bg-blue-600 text-white">
                              {(user.user_metadata?.name || user.email || "U").charAt(0).toUpperCase()}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="text-sm font-medium">{user.user_metadata?.name || "User"}</p>
                            <p className="text-xs text-gray-500">{user.email}</p>
                          </div>
                        </div>
                        <div className="space-y-2">
                          <Button variant="ghost" className="w-full justify-start" onClick={handleProfileClick}>
                            <User className="mr-2 h-4 w-4" />
                            Profile
                          </Button>
                          <Button variant="ghost" className="w-full justify-start" onClick={handleOrdersClick}>
                            <FileText className="mr-2 h-4 w-4" />
                            My Orders
                          </Button>
                          <Button
                            variant="ghost"
                            className="w-full justify-start text-red-600 hover:text-red-700 hover:bg-red-50"
                            onClick={handleAuthClick}
                          >
                            <LogOut className="mr-2 h-4 w-4" />
                            Sign out
                          </Button>
                        </div>
                      </div>
                    </>
                  )}
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  )
}
