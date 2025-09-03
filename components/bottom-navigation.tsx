"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Home, Search, FlaskConical, Gift, User } from "lucide-react"
import { cn } from "@/lib/utils"

const tabs = [
  { href: "/", label: "Home", icon: Home },
  { href: "/search", label: "Search", icon: Search },
  { href: "/lab-tests", label: "Lab Tests", icon: FlaskConical },
  { href: "/offers", label: "Offers", icon: Gift },
  { href: "/profile", label: "Profile", icon: User },
] as const

export function BottomNavigation() {
  const pathname = usePathname()

  return (
    <nav className="fixed bottom-0 inset-x-0 z-40 bg-white/90 backdrop-blur border-t">
      <ul className="mx-auto max-w-3xl grid grid-cols-5">
        {tabs.map(({ href, label, icon: Icon }) => {
          const active = pathname === href || (href !== "/" && pathname.startsWith(href))
          return (
            <li key={href}>
              <Link
                href={href}
                aria-current={active ? "page" : undefined}
                className={cn(
                  "flex flex-col items-center justify-center gap-1 py-3 text-xs transition-colors",
                  active ? "text-blue-600" : "text-gray-500 hover:text-gray-700",
                )}
              >
                <span
                  className={cn(
                    "inline-flex items-center justify-center w-10 h-10 rounded-2xl",
                    active ? "bg-blue-50 ring-1 ring-blue-200" : "",
                  )}
                  aria-hidden="true"
                >
                  <Icon className={cn("w-5 h-5", active ? "text-blue-600" : "")} />
                </span>
                {label}
              </Link>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}
