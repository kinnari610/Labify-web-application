import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { AuthProvider } from "@/hooks/use-auth"
import { LocationServiceProvider } from "@/hooks/use-location-service"
import { Toaster } from "@/components/ui/toaster"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Labify - Laboratory Booking & Home Services",
  description:
    "Book laboratory appointments and home services with ease. Find nearby labs, schedule tests, and get results delivered.",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <LocationServiceProvider>
          <AuthProvider>
            {children}
            <Toaster />
          </AuthProvider>
        </LocationServiceProvider>
      </body>
    </html>
  )
}
