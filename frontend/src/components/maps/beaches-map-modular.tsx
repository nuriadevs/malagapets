"use client"
import "leaflet/dist/leaflet.css"
import { useEffect, useState } from "react"
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet"
import { useMapSetup, useMapIcons } from "@/hooks/maps"
import { useBeachesData } from "@/hooks/directories/use-beaches-data"
import { MALAGA_CENTER } from "@/utils/maps"
import { beachCardIcons } from "@/data/icons"
import { BeachPopup } from "@/components/maps/popups/beach-popup"
import { UserLocationMarker } from "@/components/maps/user-location-marker"
import { useTranslations } from "next-intl"
import type { BeachCardData } from "@/types/cards"


type BeachWithCoords = BeachCardData & {
  coordinates: NonNullable<BeachCardData["coordinates"]>
}

function hasCoords(b: BeachCardData): b is BeachWithCoords {
  return b.coordinates !== undefined
}

export default function BeachesMapModular() {
  const t = useTranslations("explorer.mapPages")
  const tAccess = useTranslations("accessibility.explorer")
  const { beaches, loading } = useBeachesData()
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

  const beachIcon = createCustomIcon({
    icon: beachCardIcons.umbrella,
    color: "var(--color-primary)",
    size: 40,
  })

  if (!beachIcon) return null

  const beachesWithCoords = beaches.filter(hasCoords)

  if (beachesWithCoords.length === 0) {
    return (
      <div
        role="status"
        aria-live="polite"
        className="h-full w-full flex items-center justify-center text-muted-foreground text-sm"
      >
        {t("noBeaches")}
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
        zoom={11}
        scrollWheelZoom={false}
        style={{ height: "100%", width: "100%" }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> | Datos: Fuentes oficiales y recopilación propia'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        <UserLocationMarker leaflet={leaflet} />

        {beachesWithCoords.map((beach) => (
          <Marker
            key={String(beach.id)}
            position={[beach.coordinates.lat, beach.coordinates.lng]}
            icon={beachIcon}
            title={beach.name}
          >
            <Popup {...popupConfig}>
              <BeachPopup data={beach} />
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </section>
  )
}
