"use client"

import "leaflet/dist/leaflet.css"
import { useEffect, useState } from "react"
import { MapContainer, TileLayer, Marker, Popup, LayerGroup, LayersControl } from "react-leaflet"
import { useTranslations } from "next-intl"
import { useMapSetup, useMapIcons } from "@/hooks/maps"
import { useVeterinaryData } from "@/hooks/directories/use-veterinary-data"
import { MALAGA_CENTER } from "@/utils/maps"
import { vetCardIcons } from "@/data/icons"
import { VetPopup } from "@/components/maps/popups/vet-popup"
import { UserLocationMarker } from "@/components/maps/user-location-marker"
import type { VetCardData } from "@/types/cards"


type VetWithCoords = VetCardData & {
  coordinates: NonNullable<VetCardData["coordinates"]>
}

function hasCoords(v: VetCardData): v is VetWithCoords {
  return v.coordinates !== undefined
}

export default function VetsMapModular() {
  const t = useTranslations("veterinary-directory")
  const tAccess = useTranslations("accessibility.explorer")
  const tMap = useTranslations("explorer.mapPages")
  const { centers: vets, loading } = useVeterinaryData()
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
        aria-label={tMap("loading")}
        className="h-full w-full skeleton"
      />
    )
  }

  const vetsWithCoords = vets.filter(hasCoords)

  if (vetsWithCoords.length === 0) {
    return (
      <div
        role="status"
        aria-live="polite"
        className="h-full w-full flex items-center justify-center text-muted-foreground text-sm"
      >
        {tMap("noVets")}
      </div>
    )
  }

  const clinics = vetsWithCoords.filter((v) => v.type === "clinic")
  const hospitals = vetsWithCoords.filter((v) => v.type === "hospital")

  const clinicIcon = createCustomIcon({ icon: vetCardIcons.vetClinic, color: "var(--color-primary)", size: 40 })
  const hospitalIcon = createCustomIcon({ icon: vetCardIcons.vetHospital, color: "var(--color-primary)", size: 40 })

  if (!clinicIcon || !hospitalIcon) return null

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
          attribution='&copy; OpenStreetMap | Colegio de Veterinarios Málaga'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        <UserLocationMarker leaflet={leaflet} />

        <LayersControl position="topright">
          <LayersControl.Overlay checked name={t("clinic")}>
            <LayerGroup>
              {clinics.map((vet) => (
                <Marker
                  key={String(vet.id)}
                  position={[vet.coordinates.lat, vet.coordinates.lng]}
                  icon={clinicIcon}
                  title={vet.name}
                >
                  <Popup {...popupConfig}>
                    <VetPopup data={vet} />
                  </Popup>
                </Marker>
              ))}
            </LayerGroup>
          </LayersControl.Overlay>

          <LayersControl.Overlay checked name={t("hospital")}>
            <LayerGroup>
              {hospitals.map((vet) => (
                <Marker
                  key={String(vet.id)}
                  position={[vet.coordinates.lat, vet.coordinates.lng]}
                  icon={hospitalIcon}
                  title={vet.name}
                >
                  <Popup {...popupConfig}>
                    <VetPopup data={vet} />
                  </Popup>
                </Marker>
              ))}
            </LayerGroup>
          </LayersControl.Overlay>
        </LayersControl>
      </MapContainer>
    </section>
  )
}
