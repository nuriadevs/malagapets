"use client";

import { useState, useEffect } from "react";
import type { VetCardData } from "@/types/cards";
import { API_URL as API } from "@/lib/config";

interface VetsResponse {
  data: VetCardData[];
  total: number;
}

export function useVeterinaryData() {
  const [centers, setCenters] = useState<VetCardData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [trigger, setTrigger] = useState(0);

  useEffect(() => {
    let cancelled = false;

    const fetchVets = async () => {
      try {
        setLoading(true);
        setError(null);
        const res = await fetch(`${API}/api/veterinary`, {
          next: { revalidate: 3600 },
        });
        if (!res.ok) throw new Error(`Error ${res.status}`);
        const json: VetsResponse = await res.json();
        if (!cancelled) setCenters(json.data ?? []);
      } catch (err) {
        if (!cancelled) {
          console.error("Error fetching vets:", err);
          setError("No se pudieron cargar los centros veterinarios");
          setCenters([]);
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    fetchVets();
    return () => {
      cancelled = true;
    };
  }, [trigger]);

  const isEmpty = !loading && !error && centers.length === 0;
  const refetch = () => setTrigger((t) => t + 1);

  return { centers, loading, error, isEmpty, refetch };
}
