"use client"

import { Package, ShoppingCart, User } from "lucide-react"
import Link from "next/link"
import { useAuth } from "@/hooks/use-auth"
import { Button } from "@/components/ui/button"

export function Header() {
  const { user, loading } = useAuth()

  return (
    <header className="bg-white shadow-sm border-b">
      <div className="flex items-center justify-between px-4 py-3">
        <Link href="/" className="flex items-center gap-2">
          <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
            <span className="text-white font-bold text-sm">⚡</span>
          </div>
          <span className="text-xl font-bold text-blue-600">Labify</span>
        </Link>
        <div className="flex items-center gap-3">
          {!loading && (
            <>
              {user ? (
                <>
                  <Link href="/orders" className="p-2 hover:bg-gray-100 rounded-lg">
                    <Package className="w-6 h-6 text-gray-600" />
                  </Link>
                  <Link href="/cart" className="p-2 hover:bg-gray-100 rounded-lg relative">
                    <ShoppingCart className="w-6 h-6 text-gray-600" />
                    <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                      0
                    </span>
                  </Link>
                  <Link href="/profile" className="p-2 hover:bg-gray-100 rounded-lg">
                    <User className="w-6 h-6 text-gray-600" />
                  </Link>
                </>
              ) : (
                <div className="flex gap-2">
                  <Button asChild variant="ghost" size="sm">
                    <Link href="/auth/login">Login</Link>
                  </Button>
                  <Button asChild size="sm">
                    <Link href="/auth/signup">Sign Up</Link>
                  </Button>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </header>
  )
}
