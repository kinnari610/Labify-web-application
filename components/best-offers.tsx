"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Star, Users, ArrowRight } from "lucide-react"

const bestOffers = [
  {
    id: 1,
    title: "Complete Health Checkup",
    subtitle: "Most Popular Package",
    tests: ["Blood Sugar", "Cholesterol", "Liver Function", "Kidney Function", "+8 more"],
    originalPrice: 4500,
    discountedPrice: 1999,
    discount: 56,
    rating: 4.8,
    reviews: 2340,
    gradient: "from-blue-500 to-purple-600",
    bgGradient: "from-blue-50 to-purple-50",
    popular: true,
  },
  {
    id: 2,
    title: "Diabetes Care Package",
    subtitle: "Early Detection",
    tests: ["HbA1c", "Fasting Glucose", "Post Meal Glucose", "Insulin", "+4 more"],
    originalPrice: 2800,
    discountedPrice: 1299,
    discount: 54,
    rating: 4.7,
    reviews: 1890,
    gradient: "from-green-500 to-teal-600",
    bgGradient: "from-green-50 to-teal-50",
  },
  {
    id: 3,
    title: "Heart Health Screening",
    subtitle: "Cardiac Wellness",
    tests: ["ECG", "Lipid Profile", "Troponin", "CRP", "+6 more"],
    originalPrice: 3200,
    discountedPrice: 1599,
    discount: 50,
    rating: 4.9,
    reviews: 1567,
    gradient: "from-red-500 to-pink-600",
    bgGradient: "from-red-50 to-pink-50",
  },
]

export function BestOffers() {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between px-2">
        <div>
          <h2 className="text-xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
            Best Offers
          </h2>
          <p className="text-sm text-gray-500 font-medium">Handpicked packages for you</p>
        </div>
        <Button
          variant="ghost"
          size="sm"
          className="text-purple-600 hover:text-purple-700 font-semibold bg-purple-50 hover:bg-purple-100 rounded-2xl px-4"
        >
          View All
        </Button>
      </div>

      <div className="space-y-4">
        {bestOffers.map((offer, index) => (
          <Card
            key={offer.id}
            className="overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02] group"
          >
            <CardContent className="p-0">
              <div className="relative">
                {/* Background gradient */}
                <div className={`absolute inset-0 bg-gradient-to-r ${offer.bgGradient} opacity-50`}></div>

                <div className="relative p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <h3 className="text-lg font-bold text-gray-800">{offer.title}</h3>
                        {offer.popular && (
                          <Badge
                            className={`bg-gradient-to-r ${offer.gradient} text-white border-0 rounded-xl font-medium shadow-md`}
                          >
                            Most Popular
                          </Badge>
                        )}
                      </div>
                      <p className="text-gray-600 font-medium mb-3">{offer.subtitle}</p>

                      {/* Rating and reviews */}
                      <div className="flex items-center gap-4 mb-4">
                        <div className="flex items-center gap-1">
                          <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                          <span className="text-sm font-semibold text-gray-700">{offer.rating}</span>
                        </div>
                        <div className="flex items-center gap-1 text-gray-500">
                          <Users className="w-4 h-4" />
                          <span className="text-sm font-medium">{offer.reviews.toLocaleString()} reviews</span>
                        </div>
                      </div>
                    </div>

                    <div className="text-right">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-gray-400 line-through text-sm">₹{offer.originalPrice}</span>
                        <Badge variant="destructive" className="rounded-xl font-bold">
                          {offer.discount}% OFF
                        </Badge>
                      </div>
                      <p className="text-2xl font-bold text-gray-800">₹{offer.discountedPrice}</p>
                    </div>
                  </div>

                  {/* Tests included */}
                  <div className="mb-4">
                    <p className="text-sm font-semibold text-gray-700 mb-2">Tests Included:</p>
                    <div className="flex flex-wrap gap-2">
                      {offer.tests.slice(0, 4).map((test, testIndex) => (
                        <Badge
                          key={testIndex}
                          variant="secondary"
                          className="bg-white/80 text-gray-700 border border-gray-200 rounded-xl font-medium"
                        >
                          {test}
                        </Badge>
                      ))}
                      {offer.tests.length > 4 && (
                        <Badge
                          variant="secondary"
                          className={`bg-gradient-to-r ${offer.gradient} text-white border-0 rounded-xl font-medium`}
                        >
                          {offer.tests[offer.tests.length - 1]}
                        </Badge>
                      )}
                    </div>
                  </div>

                  {/* Action buttons */}
                  <div className="flex gap-3">
                    <Button
                      className={`flex-1 bg-gradient-to-r ${offer.gradient} hover:opacity-90 text-white border-0 rounded-2xl font-semibold shadow-md hover:shadow-lg transition-all duration-300 group-hover:scale-105`}
                    >
                      Book Now
                      <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                    </Button>
                    <Button
                      variant="outline"
                      className="px-6 rounded-2xl border-gray-200 hover:bg-gray-50 font-semibold transition-all duration-300 bg-transparent"
                    >
                      View Details
                    </Button>
                  </div>
                </div>

                {/* Decorative elements */}
                <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-white/20 to-transparent rounded-full -translate-y-10 translate-x-10"></div>
                <div className="absolute bottom-0 left-0 w-16 h-16 bg-gradient-to-tr from-white/10 to-transparent rounded-full translate-y-8 -translate-x-8"></div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
