// src/hooks/use-veterinary-data.ts
"use client";

import { useEffect, useState, useCallback } from "react";
import type { Vet } from "@/lib/data/vets";

interface UseVeterinaryDataReturn {
    centers: Vet[];
    loading: boolean;
    error: string | null;
    refetch: () => void;
    isEmpty: boolean;
}

function isValidVeterinaryCenter(center: unknown): center is Vet {
    if (!center || typeof center !== "object") {
        console.log("❌ No es objeto:", center);
        return false;
    }

    const c = center as Record<string, unknown>;

    // 🔍 DEBUG: Ver estructura del primer centro
    if (!('_logged' in c)) {
        console.log("📦 Estructura del centro:", {
            id: c.id,
            name: c.name,
            address: c.address,
            postalCode: c.postalCode,
            googleMapsUrl: c.googleMapsUrl,
            coordinates: c.coordinates,
            type: c.type,
            todasLasClaves: Object.keys(c),
        });
        (c as Record<string, unknown>)._logged = true;
    }

    // ✅ Validación corregida: NO verificar 'city' porque no existe en los datos
    const isValid = Boolean(
        c.id &&
        c.name &&
        typeof c.name === "string" &&
        c.address &&
        typeof c.address === "string" &&
        c.googleMapsUrl &&
        typeof c.googleMapsUrl === "string" &&
        c.coordinates &&
        typeof c.coordinates === "object" &&
        c.type &&
        (c.type === "hospital" || c.type === "clinic")
    );

    if (!isValid) {
        console.log("❌ Centro inválido. Fallos:", {
            tieneId: !!c.id,
            tieneName: !!c.name && typeof c.name === "string",
            tieneAddress: !!c.address && typeof c.address === "string",
            tieneGoogleMapsUrl: !!c.googleMapsUrl && typeof c.googleMapsUrl === "string",
            tieneCoordinates: !!c.coordinates && typeof c.coordinates === "object",
            tieneType: !!c.type && (c.type === "hospital" || c.type === "clinic"),
        });
    }

    return isValid;
}

/**
 * Hook para obtener centros veterinarios
 * Carga TODOS los centros una sola vez (filtrado en cliente para mejor UX)
 */
export function useVeterinaryData(): UseVeterinaryDataReturn {
    const [centers, setCenters] = useState<Vet[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchCenters = useCallback(async () => {
        try {
            setLoading(true);
            setError(null);

            // Cargar TODOS los centros (sin parámetros de búsqueda)
            const url = `/api/veterinary`;

            const response = await fetch(url, {
                headers: {
                    "Content-Type": "application/json",
                },
            });

            if (!response.ok) {
                throw new Error(
                    `Error al cargar datos: ${response.status} ${response.statusText}`
                );
            }

            const data = await response.json();

            console.log('📦 API Response:', {
                url,
                status: response.status,
                dataType: typeof data,
                isArray: Array.isArray(data),
                dataKeys: Object.keys(data || {}),
                dataLength: Array.isArray(data) ? data.length : 'N/A',
                firstItem: Array.isArray(data) ? data[0] : data
            });

            // Soportar ambos formatos: array directo o objeto con veterinaryCenters
            let centersData: unknown[];
            if (Array.isArray(data)) {
                centersData = data;
            } else if (data && typeof data === 'object' && 'veterinaryCenters' in data) {
                centersData = (data as { veterinaryCenters: unknown[] }).veterinaryCenters;
            } else {
                console.error('❌ Formato de datos no reconocido. Recibido:', data);
                throw new Error("Formato de datos inválido");
            }

            const validCenters = centersData.filter(
                (center: unknown): center is Vet =>
                    isValidVeterinaryCenter(center)
            );

            if (validCenters.length !== data.length) {
                console.warn(
                    `Se filtraron ${data.length - validCenters.length} centros con datos inválidos`
                );
            }

            setCenters(validCenters);
            console.log("✅ Centros veterinarios cargados:", validCenters.length);
        } catch (err) {
            const errorMessage =
                err instanceof Error
                    ? err.message
                    : "Error desconocido al cargar datos";
            console.error("🔴 Error cargando centros veterinarios:", err);
            setError(errorMessage);
        } finally {
            setLoading(false);
        }
    }, []);

    const refetch = useCallback(() => {
        fetchCenters();
    }, [fetchCenters]);

    useEffect(() => {
        fetchCenters();
    }, [fetchCenters]);

    return {
        centers,
        loading,
        error,
        refetch,
        isEmpty: !loading && !error && centers.length === 0,
    };
}