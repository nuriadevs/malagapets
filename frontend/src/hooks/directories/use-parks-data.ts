"use client"

import { useEffect, useState } from "react"
import type { ParkCardData } from "@/types/cards"

export function useParksData() {
  const [parks, setParks] = useState<ParkCardData[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [trigger, setTrigger] = useState(0)

  useEffect(() => {
    let cancelled = false

    const fetchParques = async () => {
      try {
        setLoading(true)
        setError(null)
        const response = await fetch("/api/parks", { cache: "default" })
        if (!response.ok) throw new Error(`Error ${response.status}: ${response.statusText}`)
        const data: ParkCardData[] = await response.json()
        if (!cancelled) setParks(Array.isArray(data) ? data : [])
      } catch (err) {
        if (!cancelled) {
          setError(err instanceof Error ? err.message : "Error desconocido al cargar parques")
          setParks([])
        }
      } finally {
        if (!cancelled) setLoading(false)
      }
    }

    fetchParques()
    return () => { cancelled = true }
  }, [trigger])

  return {
    parks,
    loading,
    error,
    isEmpty: !loading && !error && parks.length === 0,
    refetch: () => setTrigger(t => t + 1),
  }
}