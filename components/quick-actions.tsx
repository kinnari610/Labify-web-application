import Link from "next/link"
import { Package, ShoppingCart, MapPin, Calendar, CreditCard, FileText } from "lucide-react"

const actions = [
  {
    title: "View Orders",
    icon: Package,
    href: "/orders",
    description: "Track your appointments and test results",
  },
  {
    title: "View Cart (0 items)",
    icon: ShoppingCart,
    href: "/cart",
    description: "Review items before checkout",
  },
  {
    title: "Find Labs",
    icon: MapPin,
    href: "/find-labs",
    description: "Locate nearby laboratories",
  },
  {
    title: "My Appointments",
    icon: Calendar,
    href: "/appointments",
    description: "Manage your scheduled appointments",
  },
  {
    title: "Payment History",
    icon: CreditCard,
    href: "/payments",
    description: "View transaction history",
  },
  {
    title: "Test Reports",
    icon: FileText,
    href: "/reports",
    description: "Download and view your reports",
  },
]

export function QuickActions() {
  return (
    <div className="bg-white rounded-xl p-6 shadow-sm border">
      <h2 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h2>
      <div className="space-y-3">
        {actions.map((action) => {
          const Icon = action.icon
          return (
            <Link
              key={action.title}
              href={action.href}
              className="flex items-center gap-3 p-3 hover:bg-gray-50 rounded-lg transition-colors"
            >
              <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                <Icon className="w-5 h-5 text-gray-600" />
              </div>
              <div className="flex-1">
                <div className="font-medium text-gray-900">{action.title}</div>
                <div className="text-sm text-gray-600">{action.description}</div>
              </div>
            </Link>
          )
        })}
      </div>
    </div>
  )
}
