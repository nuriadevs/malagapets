// src/hooks/maps/useParksData.ts

import { useState, useEffect } from 'react';

interface ParkInfoEsp {
  Fuente?: string;
  Extension?: string;
  'Bi-zona'?: string;
}

interface ParkProperties {
  NOMBRE?: string;
  DIRECCION?: string;
  ACCESOPMR?: string;
  HORARIOS?: string;
  INFOESP?: ParkInfoEsp[];
  DESCRIPCION?: string;
  TITULARIDAD?: string;
  ID?: number;
  URL?: string | null;
  PRECIOS?: string | null;
  TARJETAJOVEN?: string;
  CONTACTO?: string | null;
  EMAIL?: string | null;
}

interface ParkFeature {
  type: string;
  properties: ParkProperties;
  geometry: {
    type: string;
    coordinates: [number, number];
  };
}

interface ParksGeoJSON {
  type: string;
  features: ParkFeature[];
}

/**
 * Hook to fetch parks data from API (GeoJSON format for maps)
 */
export function useParksData() {
  const [data, setData] = useState<ParksGeoJSON | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchParks = async () => {
      try {
        // Usar la API local con formato GeoJSON para el mapa
        const response = await fetch('/api/parks?format=geojson');
        if (!response.ok) {
          throw new Error('Error al cargar datos de parques');
        }
        const result = await response.json();
        setData(result);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Error desconocido');
      } finally {
        setLoading(false);
      }
    };

    fetchParks();
  }, []);

  return { data, loading, error };
}

export type { ParksGeoJSON, ParkFeature, ParkProperties, ParkInfoEsp };
