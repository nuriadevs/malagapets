// hooks/use-parks-data.ts
"use client";

import { useEffect, useState, useCallback } from "react";
import type { Parque } from "@/types/parks";

// Tipo para la respuesta de la API
interface ApiResponse {
  parques: unknown[];
}

// Función para validar si un objeto es un parque válido
function isValidParque(parque: unknown): parque is Parque {
  if (!parque || typeof parque !== "object") return false;

  const p = parque as Record<string, unknown>;

  return Boolean(
    p.id &&
      p.properties &&
      typeof p.properties === "object" &&
      p.geometry &&
      typeof p.geometry === "object" &&
      (p.geometry as Record<string, unknown>).coordinates &&
      Array.isArray((p.geometry as Record<string, unknown>).coordinates)
  );
}

interface UseParksDataReturn {
  parques: Parque[];
  loading: boolean;
  error: string | null;
  refetch: () => void;
  isEmpty: boolean;
}

export function useParksData(): UseParksDataReturn {
  const [parques, setParques] = useState<Parque[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchParques = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch("/api/parks/", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        cache: "default",
      });

      if (!response.ok) {
        throw new Error(`Error ${response.status}: ${response.statusText}`);
      }

      const data: ApiResponse = await response.json();

      if (!data || typeof data !== "object") {
        throw new Error("Respuesta inválida del servidor");
      }

      if (!data.parques || !Array.isArray(data.parques)) {
        throw new Error("Formato de datos de parques inválido");
      }
           console.log("Datos de parques recibidos:", data.parques);

      const validParques = data.parques.filter(
        (parque: unknown): parque is Parque => isValidParque(parque)
      );

      if (validParques.length !== data.parques.length) {
        console.warn(
          `Se filtraron ${data.parques.length - validParques.length} parques con datos inválidos`
        );
      }

      setParques(validParques);
      console.log("Parques cargados exitosamente:", validParques.length);
    } catch (err) {
      const errorMessage =
        err instanceof Error
          ? err.message
          : "Error desconocido al cargar parques";
      console.error("Error al cargar parques:", err);
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  }, []);

  const refetch = useCallback(() => {
    fetchParques();
  }, [fetchParques]);

  useEffect(() => {
    fetchParques();
  }, [fetchParques]);

  return {
    parques,
    loading,
    error,
    refetch,
    isEmpty: !loading && !error && parques.length === 0,
  };
}
