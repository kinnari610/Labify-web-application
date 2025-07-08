import Link from "next/link"
import { TestTube, User, Syringe, Heart } from "lucide-react"

const concerns = [
  {
    title: "Full Body Checkup",
    icon: TestTube,
    href: "/lab-tests/full-body",
    bgColor: "bg-purple-100",
    iconColor: "text-purple-600",
  },
  {
    title: "Women Care",
    icon: User,
    href: "/lab-tests/women-care",
    bgColor: "bg-pink-100",
    iconColor: "text-pink-600",
  },
  {
    title: "Diabetes Care",
    icon: Syringe,
    href: "/lab-tests/diabetes",
    bgColor: "bg-blue-100",
    iconColor: "text-blue-600",
  },
  {
    title: "Heart Health",
    icon: Heart,
    href: "/lab-tests/heart",
    bgColor: "bg-red-100",
    iconColor: "text-red-600",
  },
]

export function HealthConcerns() {
  return (
    <div className="space-y-4">
      <h2 className="text-lg font-bold text-gray-900">Browse by Health Concern</h2>

      <div className="grid grid-cols-2 gap-4">
        {concerns.map((concern) => {
          const Icon = concern.icon
          return (
            <Link
              key={concern.title}
              href={concern.href}
              className="block p-4 bg-white rounded-xl shadow-sm border hover:shadow-md transition-shadow"
            >
              <div className={`w-12 h-12 ${concern.bgColor} rounded-lg flex items-center justify-center mb-3`}>
                <Icon className={`w-6 h-6 ${concern.iconColor}`} />
              </div>
              <h3 className="font-semibold text-gray-900 text-sm">{concern.title}</h3>
            </Link>
          )
        })}
      </div>
    </div>
  )
}
