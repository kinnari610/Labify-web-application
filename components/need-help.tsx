"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Phone, MessageCircle, Mail, Clock } from "lucide-react"

const helpOptions = [
  {
    icon: Phone,
    title: "Call Us",
    description: "Speak with our experts",
    action: "Call Now",
    gradient: "from-green-400 to-emerald-500",
    bgGradient: "from-green-50 to-emerald-50",
  },
  {
    icon: MessageCircle,
    title: "Live Chat",
    description: "Get instant support",
    action: "Chat Now",
    gradient: "from-blue-400 to-cyan-500",
    bgGradient: "from-blue-50 to-cyan-50",
  },
  {
    icon: Mail,
    title: "Email Support",
    description: "Send us your queries",
    action: "Email Us",
    gradient: "from-purple-400 to-pink-500",
    bgGradient: "from-purple-50 to-pink-50",
  },
]

export function NeedHelp() {
  return (
    <div className="space-y-4">
      <div className="text-center space-y-2">
        <h2 className="text-xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
          Need Help?
        </h2>
        <p className="text-gray-600 font-medium">We're here to assist you 24/7</p>
      </div>

      <Card className="overflow-hidden border-0 shadow-lg bg-gradient-to-br from-orange-50 via-yellow-50 to-amber-50">
        <CardContent className="p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-gradient-to-r from-orange-400 to-yellow-500 rounded-2xl flex items-center justify-center shadow-md">
              <Clock className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="font-bold text-gray-800">24/7 Support Available</h3>
              <p className="text-gray-600 text-sm font-medium">Get help anytime, anywhere</p>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-3">
            {helpOptions.map((option, index) => {
              const Icon = option.icon
              return (
                <div
                  key={index}
                  className={`relative overflow-hidden rounded-2xl bg-gradient-to-r ${option.bgGradient} p-4 hover:scale-105 transition-all duration-300 group cursor-pointer`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-10 h-10 bg-gradient-to-r ${option.gradient} rounded-xl flex items-center justify-center shadow-md`}
                      >
                        <Icon className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-800">{option.title}</h4>
                        <p className="text-gray-600 text-sm">{option.description}</p>
                      </div>
                    </div>
                    <Button
                      size="sm"
                      className={`bg-gradient-to-r ${option.gradient} hover:opacity-90 text-white border-0 rounded-xl font-semibold shadow-md transition-all duration-300 group-hover:scale-105`}
                    >
                      {option.action}
                    </Button>
                  </div>

                  {/* Decorative elements */}
                  <div className="absolute top-0 right-0 w-16 h-16 bg-white/10 rounded-full -translate-y-8 translate-x-8"></div>
                </div>
              )
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
