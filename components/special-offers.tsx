import { Zap } from "lucide-react"

export function SpecialOffers() {
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <Zap className="w-5 h-5 text-blue-600" />
        <h2 className="text-lg font-bold text-gray-900">Special Offers</h2>
      </div>

      <div className="space-y-3">
        <div className="bg-gradient-to-r from-green-500 to-green-600 rounded-xl p-6 text-white relative overflow-hidden">
          <div className="relative z-10">
            <div className="text-2xl font-bold mb-1">Save 60%</div>
            <div className="text-lg font-semibold mb-2">Health Checkup Premium</div>
            <div className="text-green-100">Complete health assessment package</div>
          </div>
          <div className="absolute right-4 top-4 text-6xl opacity-20">🏥</div>
        </div>

        <div className="bg-gradient-to-r from-orange-500 to-orange-600 rounded-xl p-6 text-white relative overflow-hidden">
          <div className="relative z-10">
            <div className="text-2xl font-bold mb-1">Save 45%</div>
            <div className="text-lg font-semibold mb-2">Cardiac Care Package</div>
            <div className="text-orange-100">Heart health monitoring</div>
          </div>
          <div className="absolute right-4 top-4 text-6xl opacity-20">❤️</div>
        </div>
      </div>
    </div>
  )
}
