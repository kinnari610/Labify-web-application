"use client"

import { useLocationService } from "@/hooks/use-location-service"
import { Badge } from "@/components/ui/badge"
import { MapPin, Wifi, WifiOff } from "lucide-react"

export function LocationAccuracyIndicator() {
  const { currentLocation, accuracy, error } = useLocationService()

  if (!currentLocation || error) return null

  const getAccuracyColor = () => {
    switch (accuracy) {
      case "high":
        return "bg-green-100 text-green-800 border-green-200"
      case "medium":
        return "bg-yellow-100 text-yellow-800 border-yellow-200"
      case "low":
        return "bg-orange-100 text-orange-800 border-orange-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  const getAccuracyIcon = () => {
    switch (accuracy) {
      case "high":
        return <Wifi className="w-3 h-3" />
      case "medium":
        return <Wifi className="w-3 h-3" />
      case "low":
        return <WifiOff className="w-3 h-3" />
      default:
        return <MapPin className="w-3 h-3" />
    }
  }

  const getAccuracyText = () => {
    const accuracyValue = currentLocation.coordinates.accuracy
    if (accuracyValue) {
      return `±${Math.round(accuracyValue)}m`
    }
    return accuracy || "Unknown"
  }

  return (
    <Badge variant="secondary" className={`text-xs ${getAccuracyColor()}`}>
      {getAccuracyIcon()}
      <span className="ml-1">{getAccuracyText()}</span>
    </Badge>
  )
}
