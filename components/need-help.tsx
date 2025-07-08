"use client"

import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"

export function NeedHelp() {
  const router = useRouter()

  const handleBookNow = () => {
    router.push("/booking")
  }

  return (
    <div className="bg-yellow-50 rounded-xl p-4 flex items-center justify-between border border-yellow-200">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 bg-yellow-100 rounded-full flex items-center justify-center">
          <span className="text-2xl">👨‍⚕️</span>
        </div>
        <div>
          <div className="font-semibold text-gray-900">Need Help?</div>
          <div className="text-sm text-gray-600">Request a call back</div>
        </div>
      </div>
      <Button onClick={handleBookNow} className="bg-blue-600 hover:bg-blue-700">
        Book Now
      </Button>
    </div>
  )
}
