import Link from "next/link"
import { Button } from "@/components/ui/button"

export function BestOffers() {
  return (
    <div className="space-y-4">
      <h2 className="text-lg font-bold text-gray-900">Best Offers!</h2>
      <p className="text-gray-600">Explore Deals, Offers, Health Updates & More</p>

      <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-xl p-6 text-white">
        <div className="text-xl font-bold mb-2">Lab Test</div>
        <div className="text-blue-100 mb-4">Get comprehensive health checkups at discounted rates</div>
        <Button asChild variant="secondary" className="bg-white text-blue-600 hover:bg-gray-100">
          <Link href="/lab-tests">Explore Now</Link>
        </Button>
      </div>
    </div>
  )
}
