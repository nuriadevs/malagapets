// hooks/maps/use-parks-list.ts
"use client";
import { useState, useEffect } from "react";
import type { ParkCardData } from "@/types/cards";

export function useParksList() {
    const [data, setData] = useState<ParkCardData[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        fetch("/api/parks")
            .then(r => {
                if (!r.ok) throw new Error("Error al cargar parques");
                return r.json();
            })
            .then((json: ParkCardData[]) => setData(Array.isArray(json) ? json : []))
            .catch(err => setError(err instanceof Error ? err.message : "Error desconocido"))
            .finally(() => setLoading(false));
    }, []);

    return { data, loading, error };
}
