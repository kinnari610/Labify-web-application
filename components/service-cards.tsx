import Link from "next/link"
import { TestTube, MapPin, Stethoscope, Crown } from "lucide-react"

const services = [
  {
    title: "Find Labs",
    icon: MapPin,
    href: "/find-labs",
    bgColor: "bg-blue-100",
    iconColor: "text-blue-600",
  },
  {
    title: "Lab Tests",
    icon: TestTube,
    href: "/lab-tests",
    bgColor: "bg-green-100",
    iconColor: "text-green-600",
  },
  {
    title: "Consult Doctor",
    icon: Stethoscope,
    href: "/consult-doctor",
    bgColor: "bg-orange-100",
    iconColor: "text-orange-600",
  },
  {
    title: "Get Plus",
    icon: Crown,
    href: "/plus",
    bgColor: "bg-purple-100",
    iconColor: "text-purple-600",
  },
]

export function ServiceCards() {
  return (
    <div className="grid grid-cols-2 gap-4">
      {services.map((service) => {
        const Icon = service.icon
        return (
          <Link
            key={service.title}
            href={service.href}
            className="block p-6 bg-white rounded-xl shadow-sm border hover:shadow-md transition-shadow"
          >
            <div className={`w-12 h-12 ${service.bgColor} rounded-lg flex items-center justify-center mb-3`}>
              <Icon className={`w-6 h-6 ${service.iconColor}`} />
            </div>
            <h3 className="font-semibold text-gray-900">{service.title}</h3>
          </Link>
        )
      })}
    </div>
  )
}
