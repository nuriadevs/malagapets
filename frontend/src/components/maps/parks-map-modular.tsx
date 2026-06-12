"use client"

import "leaflet/dist/leaflet.css"
import { useEffect, useState } from "react"
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet"
import { useMapSetup, useMapIcons } from "@/hooks/maps"
import { useParksData } from "@/hooks/directories/use-parks-data"
import { MALAGA_CENTER } from "@/utils/maps"
import { parkCardIcons } from "@/data/icons"
import { ParkPopup } from "@/components/maps/popups/park-popup"
import { UserLocationMarker } from "@/components/maps/user-location-marker"
import { useTranslations } from "next-intl"
import type { ParkCardData } from "@/types/cards"


type ParkWithCoords = ParkCardData & {
  coordinates: NonNullable<ParkCardData["coordinates"]>
}

function hasCoords(p: ParkCardData): p is ParkWithCoords {
  return p.coordinates !== undefined
}

export default function ParksMapModular() {
  const t = useTranslations("explorer.mapPages")
  const tAccess = useTranslations("accessibility.explorer")
  const { parks, loading } = useParksData()
  const { leaflet } = useMapSetup()
  const { createCustomIcon } = useMapIcons(leaflet)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 640)
    check()
    window.addEventListener("resize", check)
    return () => window.removeEventListener("resize", check)
  }, [])

  if (!leaflet || loading) {
    return (
      <div
        role="status"
        aria-busy="true"
        aria-label={t("loading")}
        className="h-full w-full skeleton"
      />
    )
  }

  const parkIcon = createCustomIcon({
    icon: parkCardIcons.dog,
    color: "var(--color-primary)",
    size: 40,
  })

  if (!parkIcon) return null

  const parksWithCoords = parks.filter(hasCoords)

  if (parksWithCoords.length === 0) {
    return (
      <div
        role="status"
        aria-live="polite"
        className="h-full w-full flex items-center justify-center text-muted-foreground text-sm"
      >
        {t("noParks")}
      </div>
    )
  }

  const popupConfig = isMobile
    ? { maxWidth: 280, minWidth: 250 }
    : { maxWidth: 450, minWidth: 350 }

  return (
    <section
      aria-label={tAccess("map")}
      className="h-full w-full"
    >
      <MapContainer
        center={MALAGA_CENTER}
        zoom={13}
        scrollWheelZoom={false}
        style={{ height: "100%", width: "100%" }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> | <a href="https://datosabiertos.malaga.eu/">Datos abiertos: Ayto. Málaga</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        <UserLocationMarker leaflet={leaflet} />

        {parksWithCoords.map((park) => (
          <Marker
            key={String(park.id)}
            position={[park.coordinates.lat, park.coordinates.lng]}
            icon={parkIcon}
            title={park.name}
          >
            <Popup {...popupConfig}>
              <ParkPopup data={park} />
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </section>
  )
}
