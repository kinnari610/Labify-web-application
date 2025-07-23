"use client"

import { useRouter } from "next/navigation"
import { MapPin, TestTube, Stethoscope, Crown } from "lucide-react"

const services = [
  {
    id: "find-labs",
    title: "Find Labs",
    icon: MapPin,
    gradient: "from-blue-200 via-purple-200 to-blue-300",
    iconBg: "bg-blue-500",
    iconColor: "text-white",
    route: "/find-labs",
  },
  {
    id: "lab-tests",
    title: "Lab Tests",
    icon: TestTube,
    gradient: "from-green-200 via-emerald-200 to-teal-300",
    iconBg: "bg-green-500",
    iconColor: "text-white",
    route: "/lab-tests",
  },
  {
    id: "consult-doctor",
    title: "Consult Doctor",
    icon: Stethoscope,
    gradient: "from-orange-200 via-yellow-200 to-orange-300",
    iconBg: "bg-orange-500",
    iconColor: "text-white",
    route: "/consult-doctor",
  },
  {
    id: "get-plus",
    title: "Get Plus",
    subtitle: "Save 12% Extra",
    icon: Crown,
    gradient: "from-purple-400 via-pink-500 to-purple-600",
    iconBg: "bg-white",
    iconColor: "text-purple-600",
    textColor: "text-white",
    route: "/get-plus",
  },
]

export function ServiceCards() {
  const router = useRouter()

  const handleServiceClick = (route: string) => {
    router.push(route)
  }

  return (
    <div className="grid grid-cols-2 gap-4 px-4">
      {services.map((service) => {
        const Icon = service.icon
        return (
          <div
            key={service.id}
            onClick={() => handleServiceClick(service.route)}
            className={`
              relative overflow-hidden rounded-3xl p-6 cursor-pointer
              bg-gradient-to-br ${service.gradient}
              hover:scale-105 hover:shadow-xl
              transition-all duration-300 ease-out
              group
            `}
          >
            {/* Decorative background elements */}
            <div className="absolute top-0 right-0 w-16 h-16 bg-white/10 rounded-full -translate-y-8 translate-x-8 group-hover:scale-110 transition-transform duration-500"></div>
            <div className="absolute bottom-0 left-0 w-12 h-12 bg-white/5 rounded-full translate-y-6 -translate-x-6 group-hover:scale-110 transition-transform duration-500"></div>

            <div className="relative z-10">
              <div
                className={`
                w-12 h-12 rounded-2xl ${service.iconBg} 
                flex items-center justify-center mb-4
                group-hover:scale-110 transition-transform duration-300
                shadow-lg
              `}
              >
                <Icon className={`w-6 h-6 ${service.iconColor}`} />
              </div>

              <div className="space-y-1">
                <h3
                  className={`
                  font-bold text-lg leading-tight
                  ${service.textColor || "text-gray-800"}
                  group-hover:scale-105 transition-transform duration-300
                `}
                >
                  {service.title}
                </h3>
                {service.subtitle && (
                  <p
                    className={`
                    text-sm font-medium
                    ${service.textColor || "text-gray-600"}
                    opacity-90
                  `}
                  >
                    {service.subtitle}
                  </p>
                )}
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}
