"use client"

import { ResourceSidebar } from "@/components/layouts/resource-sidebar"
import { PlaceCard } from "@/components/shared/card-variants/place/place-card"
import { SimplePagination } from "@/components/common/pagination"
import { useTranslations } from "next-intl"
import { toTitleCase } from "@/lib/utils"
import { useGeolocation } from "@/hooks/use-geolocation"
import { haversineDistance } from "@/lib/utils/distance"
import type { AnyItem } from "@/components/sections/explorer/explorer.types"

interface ExplorerListProps {
  items: AnyItem[]
  totalCount: number
  totalPages: number
  currentPage: number
  onPageChange: (page: number) => void
}

export function ExplorerList({
  items,
  totalCount,
  totalPages,
  currentPage,
  onPageChange,
}: ExplorerListProps) {
  const t = useTranslations("explorer.mapPages")
  const tAccess = useTranslations("accessibility")
  const tGeo = useTranslations("explorer.geolocation")

  const { state, request, clear } = useGeolocation()

  const userLat = state.status === "granted" ? state.lat : null
  const userLng = state.status === "granted" ? state.lng : null


  const getDistance = (coords?: { lat: number; lng: number }) => {
    if (userLat === null || userLng === null || !coords) return undefined
    return haversineDistance(userLat, userLng, coords.lat, coords.lng)
  }

  return (
    <ResourceSidebar
      countLabel={t("placesFound")}
      count={totalCount}
      sidebarLabel={tAccess("explorer.sidebarLabel")}
      listLabel={tAccess("explorer.sidebarListLabel")}
      footer={
        totalPages > 1 && (
          <SimplePagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={onPageChange}
            ariaLabel={tAccess("explorer.pagination")}
          />
        )
      }
    >
      <li className="list-none">
        <div className="px-1 pb-2">
          {state.status === "idle" && (
            <button
              onClick={request}
              className="
                w-full flex items-center justify-center gap-2
                text-xs font-medium px-3 py-2 rounded-xl
                border border-border bg-card text-muted-foreground
                hover:border-primary/30 hover:text-primary hover:bg-primary/5
                transition-all duration-200
                focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring
              "
            >
              <svg className="w-3.5 h-3.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
              </svg>
              {tGeo("button")}
            </button>
          )}

          {state.status === "loading" && (
            <div className="w-full flex items-center justify-center gap-2 text-xs text-muted-foreground px-3 py-2">
              <svg className="w-3.5 h-3.5 animate-spin shrink-0" fill="none" viewBox="0 0 24 24" aria-hidden="true">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
              </svg>
              {tGeo("loading")}
            </div>
          )}

          {state.status === "granted" && (
            <div className="w-full flex items-center justify-between gap-2 text-xs px-3 py-2 rounded-xl bg-primary/5 border border-primary/20">
              <span className="flex items-center gap-1.5 text-primary font-medium">
                <svg className="w-3.5 h-3.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
                </svg>
                {tGeo("active")}
              </span>
              <button
                onClick={clear}
                className="text-muted-foreground hover:text-foreground transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded"
                aria-label={tGeo("clear")}
              >
                ✕
              </button>
            </div>
          )}

          {state.status === "denied" && (
            <p className="text-xs text-destructive text-center px-3 py-2">
              {tGeo("denied")}
            </p>
          )}
        </div>
      </li>

      {items.map((item) => {
        if (item.kind === "park") {
          const park = item.data
          return (
            <li key={`park-${park.id}`}>
              <PlaceCard
                id={String(park.id)}
                type="park"
                name={park.name ?? t("noName")}
                category={t("parks.title")}
                address={park.address ? toTitleCase(park.address) : undefined}
                schedule={park.schedule}
                href={park.googleMapsUrl}
                distance={getDistance(park.coordinates)}
              />
            </li>
          )
        }

        if (item.kind === "beach") {
          const beach = item.data
          return (
            <li key={`beach-${beach.id}`}>
              <PlaceCard
                id={String(beach.id)}
                type="beach"
                name={beach.name}
                category={t("beaches.title")}
                address={beach.location}
                schedule={beach.schedule.summer ?? beach.schedule.yearRound}
                href={beach.googleMapsUrl}
                distance={getDistance(beach.coordinates)}
              />
            </li>
          )
        }

        const vet = item.data
        return (
          <li key={`vet-${vet.id}`}>
            <PlaceCard
              id={String(vet.id)}
              type="vet"
              vetType={vet.type}
              name={vet.name}
              category={
                vet.type === "hospital"
                  ? t("veterinary.hospital")
                  : t("veterinary.clinic")
              }
              address={vet.address}
              schedule={vet.schedule}
              phones={vet.phones?.map((p) => ({
                type:
                  p.type === "mobile" ? "mobile" :
                    p.type === "emergency" ? "emergency" :
                      "landline",
                number: p.number,
              }))}
              href={vet.googleMapsUrl}
              distance={getDistance(vet.coordinates)}
            />
          </li>
        )
      })}
    </ResourceSidebar>
  )
}
