import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { Toaster } from "@/components/ui/toaster"
import { LocationServiceProvider } from "@/hooks/use-location-service"
import { AuthProvider } from "@/hooks/use-auth"
import { CartProvider } from "@/hooks/use-cart"
import { DemoBanner } from "@/components/demo-banner"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Labify - Lab Test Booking Platform",
  description: "Book lab tests online with ease. Find nearby labs, compare prices, and get reports digitally.",
  keywords: "lab tests, medical tests, blood tests, health checkup, online booking",
  authors: [{ name: "Labify Team" }],
  creator: "Labify",
  publisher: "Labify",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"),
  openGraph: {
    title: "Labify - Lab Test Booking Platform",
    description: "Book lab tests online with ease. Find nearby labs, compare prices, and get reports digitally.",
    url: "/",
    siteName: "Labify",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Labify - Lab Test Booking Platform",
    description: "Book lab tests online with ease. Find nearby labs, compare prices, and get reports digitally.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "your-google-verification-code",
  },
    generator: 'v0.app'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
          <LocationServiceProvider>
            <AuthProvider>
              <CartProvider>
                <DemoBanner />
                {children}
                <Toaster />
              </CartProvider>
            </AuthProvider>
          </LocationServiceProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
