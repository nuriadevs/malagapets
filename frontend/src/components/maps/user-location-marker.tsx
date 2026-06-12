"use client"

import { useEffect, useState } from "react"
import { Marker, Popup } from "react-leaflet"
import { useTranslations } from "next-intl"
import { useMapIcons } from "@/hooks/maps"


interface UserLocationMarkerProps {
  leaflet: typeof import("leaflet") | null
}


export function UserLocationMarker({ leaflet }: UserLocationMarkerProps) {
  const t = useTranslations("explorer.geolocation")
  const { createUserLocationIcon } = useMapIcons(leaflet)

  const [position, setPosition] = useState<{ lat: number; lng: number } | null>(() => {
    try {
      const cached = sessionStorage.getItem("user-location")
      return cached ? JSON.parse(cached) : null
    } catch {
      return null
    }
  })

  useEffect(() => {
    const handleStorage = (e: StorageEvent) => {
      if (e.key === "user-location") {
        try {
          setPosition(e.newValue ? JSON.parse(e.newValue) : null)
        } catch { /* ignore */ }
      }
    }

    const handleCleared = () => setPosition(null)

    const handleGranted = (e: Event) => {
      const detail = (e as CustomEvent<{ lat: number; lng: number }>).detail
      if (detail?.lat && detail?.lng) setPosition(detail)
    }

    window.addEventListener("storage", handleStorage)
    window.addEventListener("user-location-cleared", handleCleared)
    window.addEventListener("user-location-granted", handleGranted)

    return () => {
      window.removeEventListener("storage", handleStorage)
      window.removeEventListener("user-location-cleared", handleCleared)
      window.removeEventListener("user-location-granted", handleGranted)
    }
  }, [])

  if (!position || !leaflet) return null

  const icon = createUserLocationIcon()
  if (!icon) return null

  return (
    <Marker
      position={[position.lat, position.lng]}
      icon={icon}
      zIndexOffset={1000}
    >
      <Popup maxWidth={200} minWidth={150}>
        <div className="flex items-center gap-2 py-1">
          <div className="w-3 h-3 rounded-full bg-blue-500 ring-2 ring-blue-200 shrink-0" />
          <span className="text-sm font-medium text-foreground">
            {t("youAreHere")}
          </span>
        </div>
      </Popup>
    </Marker>
  )
}