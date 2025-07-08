"use client"

import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { TestTube } from "lucide-react"
import { useAuth } from "@/hooks/use-auth"
import { useToast } from "@/hooks/use-toast"

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

  const calculateDiscount = (original: number, current: number) => {
    return Math.round(((original - current) / original) * 100)
  }

  if (loading) {
    return (
      <div className="space-y-4">
        <h2 className="text-lg font-bold text-gray-900">Popular Health Packages</h2>
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="bg-white rounded-xl p-6 shadow-sm border animate-pulse">
              <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
              <div className="h-3 bg-gray-200 rounded w-full mb-3"></div>
              <div className="h-6 bg-gray-200 rounded w-1/4"></div>
            </div>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-bold text-gray-900">Popular Health Packages</h2>

      <div className="space-y-4">
        {packages.map((pkg) => {
          const discount = pkg.original_price ? calculateDiscount(pkg.original_price, pkg.price) : 0

          return (
            <div key={pkg.id} className="bg-white rounded-xl p-6 shadow-sm border">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <h3 className="font-bold text-gray-900 mb-2">{pkg.name}</h3>
                  <p className="text-sm text-gray-600 mb-3">{pkg.description}</p>
                  <div className="flex items-center gap-2">
                    <span className="text-2xl font-bold text-gray-900">₹{pkg.price}</span>
                    {pkg.original_price && (
                      <>
                        <span className="text-sm text-gray-500 line-through">₹{pkg.original_price}</span>
                        <span className="text-sm text-green-600 font-semibold">{discount}% OFF</span>
                      </>
                    )}
                  </div>
                  {pkg.tests_included && pkg.tests_included.length > 0 && (
                    <div className="mt-2">
                      <p className="text-xs text-gray-500">
                        Includes: {pkg.tests_included.slice(0, 3).join(", ")}
                        {pkg.tests_included.length > 3 && ` +${pkg.tests_included.length - 3} more`}
                      </p>
                    </div>
                  )}
                </div>
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center ml-4">
                  <TestTube className="w-6 h-6 text-blue-600" />
                </div>
              </div>
              <Button onClick={() => handleBookNow(pkg.id)} className="w-full bg-blue-600 hover:bg-blue-700">
                Book Now
              </Button>
            </div>
          )
        })}
      </div>
    </div>
  )
}
