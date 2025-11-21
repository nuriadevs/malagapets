// src/hooks/use-beaches-data.ts
"use client";

import { useEffect, useState, useCallback } from "react";
import type { Beach } from "@/lib/data/beaches";



interface UseBeachesDataReturn {
    beaches: Beach[];
    loading: boolean;
    error: string | null;
    refetch: () => void;
    isEmpty: boolean;
}

function isValidBeach(beach: unknown): beach is Beach {
    if (!beach || typeof beach !== "object") return false;

    const b = beach as Record<string, unknown>;

    // Validar campos esenciales
    return Boolean(
        b.id &&
        b.name &&
        typeof b.name === "string" &&
        b.municipality &&
        typeof b.municipality === "string" &&
        b.googleMapsUrl &&
        typeof b.googleMapsUrl === "string" &&
        b.coordinates &&
        typeof b.coordinates === "object" &&
        b.detailed_location &&
        typeof b.detailed_location === "string"
    );
}

/**
 * Hook para obtener playas caninas
 * Carga TODAS las playas una sola vez (filtrado en cliente para mejor UX)
 */
export function useBeachesData(): UseBeachesDataReturn {
    const [beaches, setBeaches] = useState<Beach[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchBeaches = useCallback(async () => {
        try {
            setLoading(true);
            setError(null);

            // Cargar TODAS las playas (sin parámetros de búsqueda)
            const url = `/api/beaches`;

            console.log("🔍 Fetching beaches from:", url);

            const response = await fetch(url, {
                headers: {
                    "Content-Type": "application/json",
                },
            });

            console.log("📡 Response status:", response.status);
            console.log("📡 Response headers:", Object.fromEntries(response.headers.entries()));

            if (!response.ok) {
                throw new Error(
                    `Error al cargar datos: ${response.status} ${response.statusText}`
                );
            }

            const data = await response.json();

            // 🔍 DEBUG: Ver qué está devolviendo la API
            console.log("📦 Datos recibidos de la API:", data);
            console.log("📦 ¿Es array?:", Array.isArray(data));
            console.log("📦 Tipo de dato:", typeof data);
            if (data && typeof data === 'object') {
                console.log("📦 Keys del objeto:", Object.keys(data));
            }

            // Soportar ambos formatos: array directo o objeto con beaches
            let beachesData: unknown[];
            if (Array.isArray(data)) {
                beachesData = data;
            } else if (data && typeof data === 'object' && 'beaches' in data) {
                beachesData = (data as { beaches: unknown[] }).beaches;
            } else {
                console.error("❌ Formato de datos no reconocido. Recibido:", data);
                throw new Error("Formato de datos inválido. Se esperaba un array.");
            }


            const validBeaches = beachesData.filter(
                (beach: unknown): beach is Beach => isValidBeach(beach)
            );

            if (validBeaches.length !== data.length) {
                console.warn(
                    `Se filtraron ${data.length - validBeaches.length} playas con datos inválidos`
                );
            }

            setBeaches(validBeaches);
            setBeaches(validBeaches);
        } catch (err) {
            const errorMessage =
                err instanceof Error
                    ? err.message
                    : "Error desconocido al cargar datos";
            console.error("🔴 Error cargando playas caninas:", err);
            setError(errorMessage);
        } finally {
            setLoading(false);
        }
    }, []);

    const refetch = useCallback(() => {
        fetchBeaches();
    }, [fetchBeaches]);

    useEffect(() => {
        fetchBeaches();
    }, [fetchBeaches]);

    return {
        beaches,
        loading,
        error,
        refetch,
        isEmpty: !loading && !error && beaches.length === 0,
    };
}