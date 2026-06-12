// src/hooks/directories/use-beaches-data
"use client";

import { useState, useEffect } from "react";
import type { BeachCardData } from "@/types/cards";
import { API_URL as API } from "@/lib/config";

interface BeachesResponse {
  data: BeachCardData[];
  total: number;
}

export function useBeachesData() {
  const [beaches, setBeaches] = useState<BeachCardData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [trigger, setTrigger] = useState(0);

  useEffect(() => {
    let cancelled = false;

    const fetchBeaches = async () => {
      try {
        setLoading(true);
        setError(null);
        const res = await fetch(`${API}/api/beaches`, {
          next: { revalidate: 3600 },
        });
        if (!res.ok) throw new Error(`Error ${res.status}`);
        const json: BeachesResponse = await res.json();
        if (!cancelled) setBeaches(json.data ?? []);
      } catch (err) {
        if (!cancelled) {
          console.error("Error fetching beaches:", err);
          setError("No se pudieron cargar las playas");
          setBeaches([]);
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    fetchBeaches();
    return () => {
      cancelled = true;
    };
  }, [trigger]);

  const isEmpty = !loading && !error && beaches.length === 0;
  const refetch = () => setTrigger((t) => t + 1);

  return { beaches, loading, error, isEmpty, refetch };
}
