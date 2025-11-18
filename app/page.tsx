import { Header } from "@/components/header"
import { LocationSelector } from "@/components/location-selector"
import { LocationPrivacyNotice } from "@/components/location-privacy-notice"
import { ServiceCards } from "@/components/service-cards"
import { SpecialOffers } from "@/components/special-offers"
import { BestOffers } from "@/components/best-offers"
import { NeedHelp } from "@/components/need-help"
import { BottomNavigation } from "@/components/bottom-navigation"
import { SearchBar } from "@/components/search-bar"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="pb-20">
        <div className="px-4 py-6 space-y-6">
          <LocationPrivacyNotice />
          <LocationSelector />
          <SearchBar placeholder="Search tests, packages, labs..." />
          <ServiceCards />
          <NeedHelp />
          <SpecialOffers />
          <BestOffers />
        </div>
      </main>
      <BottomNavigation />
    </div>
  )
}
