"use client"

import { Home, Search, TestTube, Star, User } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"

const navItems = [
  {
    icon: Home,
    label: "Home",
    href: "/",
    gradient: "from-blue-400 to-purple-500",
    bgGradient: "from-blue-50 to-purple-50",
  },
  {
    icon: Search,
    label: "Search",
    href: "/search",
    gradient: "from-green-400 to-teal-500",
    bgGradient: "from-green-50 to-teal-50",
  },
  {
    icon: TestTube,
    label: "Lab Tests",
    href: "/lab-tests",
    gradient: "from-orange-400 to-red-500",
    bgGradient: "from-orange-50 to-red-50",
  },
  {
    icon: Star,
    label: "Offers",
    href: "/offers",
    gradient: "from-yellow-400 to-orange-500",
    bgGradient: "from-yellow-50 to-orange-50",
  },
  {
    icon: User,
    label: "Profile",
    href: "/profile",
    gradient: "from-purple-400 to-pink-500",
    bgGradient: "from-purple-50 to-pink-50",
  },
]

export function BottomNavigation() {
  const pathname = usePathname()

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50">
      {/* Background blur effect */}
      <div className="absolute inset-0 bg-white/80 backdrop-blur-lg border-t border-white/50"></div>

      <nav className="relative px-4 py-3">
        <div className="flex items-center justify-around">
          {navItems.map((item) => {
            const Icon = item.icon
            const isActive = pathname === item.href || (item.href === "/search" && pathname.startsWith("/search"))

            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex flex-col items-center gap-1 py-2 px-3 rounded-2xl transition-all duration-300 relative group",
                  isActive
                    ? `bg-gradient-to-br ${item.bgGradient} shadow-lg scale-105`
                    : "hover:scale-105 hover:bg-gray-50",
                )}
              >
                <div
                  className={cn(
                    "w-8 h-8 rounded-xl flex items-center justify-center transition-all duration-300",
                    isActive ? `bg-gradient-to-r ${item.gradient} shadow-md` : "group-hover:bg-gray-100",
                  )}
                >
                  <Icon
                    className={cn(
                      "w-5 h-5 transition-all duration-300",
                      isActive ? "text-white" : "text-gray-600 group-hover:text-gray-800",
                    )}
                  />
                </div>
                <span
                  className={cn(
                    "text-xs font-medium transition-all duration-300",
                    isActive ? "text-gray-800 font-bold" : "text-gray-600",
                  )}
                >
                  {item.label}
                </span>

                {/* Active indicator */}
                {isActive && (
                  <div
                    className={`absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-gradient-to-r ${item.gradient} rounded-full animate-pulse`}
                  ></div>
                )}
              </Link>
            )
          })}
        </div>
      </nav>
    </div>
  )
}
