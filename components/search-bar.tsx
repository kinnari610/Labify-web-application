"use client"

import { Search, Mic, Camera, Filter } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { useState } from "react"

interface SearchBarProps {
  placeholder?: string
}

export function SearchBar({ placeholder = "Search..." }: SearchBarProps) {
  const [searchValue, setSearchValue] = useState("")
  const [isListening, setIsListening] = useState(false)

  const popularSearches = ["Blood Test", "X-Ray", "MRI Scan", "Diabetes Check", "Heart Check"]

  const handleVoiceSearch = () => {
    setIsListening(!isListening)
    // Voice search logic would go here
  }

  return (
    <div className="space-y-4">
      {/* Main Search Bar */}
      <div className="relative">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-100 via-purple-50 to-pink-100 rounded-3xl blur-sm opacity-50"></div>
        <div className="relative bg-white/80 backdrop-blur-sm rounded-3xl border border-white/50 shadow-lg hover:shadow-xl transition-all duration-300 p-1">
          <div className="flex items-center gap-3 px-4 py-3">
            <div className="flex items-center justify-center w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl shadow-md">
              <Search className="w-5 h-5 text-white" />
            </div>

            <Input
              type="text"
              placeholder={placeholder}
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              className="flex-1 border-0 bg-transparent text-gray-800 placeholder:text-gray-500 focus-visible:ring-0 focus-visible:ring-offset-0 text-lg font-medium"
            />

            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="icon"
                onClick={handleVoiceSearch}
                className={`w-10 h-10 rounded-2xl transition-all duration-300 ${
                  isListening
                    ? "bg-gradient-to-r from-red-400 to-pink-500 text-white shadow-md animate-pulse"
                    : "bg-gradient-to-r from-green-50 to-teal-50 hover:from-green-100 hover:to-teal-100 text-green-600 shadow-sm"
                }`}
              >
                <Mic className="w-5 h-5" />
              </Button>

              <Button
                variant="ghost"
                size="icon"
                className="w-10 h-10 bg-gradient-to-r from-orange-50 to-yellow-50 hover:from-orange-100 hover:to-yellow-100 text-orange-600 rounded-2xl shadow-sm hover:shadow-md transition-all duration-300"
              >
                <Camera className="w-5 h-5" />
              </Button>

              <Button
                variant="ghost"
                size="icon"
                className="w-10 h-10 bg-gradient-to-r from-purple-50 to-pink-50 hover:from-purple-100 hover:to-pink-100 text-purple-600 rounded-2xl shadow-sm hover:shadow-md transition-all duration-300"
              >
                <Filter className="w-5 h-5" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Popular Searches */}
      <div className="space-y-2">
        <p className="text-sm font-semibold text-gray-600 px-2">Popular Searches</p>
        <div className="flex flex-wrap gap-2">
          {popularSearches.map((search, index) => (
            <Badge
              key={index}
              variant="secondary"
              className="bg-gradient-to-r from-blue-50 to-purple-50 hover:from-blue-100 hover:to-purple-100 text-gray-700 border border-white/50 rounded-2xl px-4 py-2 cursor-pointer transition-all duration-300 hover:shadow-md font-medium"
              onClick={() => setSearchValue(search)}
            >
              {search}
            </Badge>
          ))}
        </div>
      </div>
    </div>
  )
}
