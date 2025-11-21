// src/app/api/parks/route.ts
import { NextResponse } from 'next/server';
import type { Parque } from '@/types/parks';

export async function GET(request: Request) {
  try {
    // Obtener parámetro de formato desde la URL
    const { searchParams } = new URL(request.url);
    const format = searchParams.get('format'); // 'geojson' o null (default: procesado)

    const response = await fetch(
      'https://datosabiertos.malaga.eu/recursos/ambiente/parquesCaninos/da_parquesCaninos-4326.geojson',
      {
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
        },
        next: { revalidate: 3600 } // Cache 1 hora
      }
    );

    if (!response.ok) {
      throw new Error('Error al obtener datos');
    }

    const geojsonData = await response.json();

    // Si se solicita formato GeoJSON directo (para el mapa)
    if (format === 'geojson') {
      return NextResponse.json(geojsonData);
    }

    // Por defecto: formato procesado para la guía
    const parques: Parque[] = geojsonData.features.map((feature: {
      id?: string | number;
      properties?: Record<string, unknown>;
      geometry?: unknown;
    }, index: number) => {
      const props = feature.properties || {};
      const info = (props.INFOESP as Array<Record<string, unknown>> | undefined)?.[0] || {};

      return {
        id: feature.id ? String(feature.id) : String(index),
        properties: {
          Nombre: (props.NOMBRE as string) || 'Sin nombre',
          Direccion: (props.DIRECCION as string) || 'No especificada',
          Horarios: (props.HORARIOS as string) || 'No especificado',
          AccesoPMR: (props.ACCESOPMR as string) || 'No especificado',
          Extension: (info.Extension as string) || 'No especificada',
          Fuente: (info.Fuente as string) || 'Ayuntamiento de Málaga',
        },
        geometry: feature.geometry || {
          type: 'Point',
          coordinates: [0, 0]
        }
      };
    });

    return NextResponse.json({ parques });
  } catch (error) {
    console.error('Error fetching parks:', error);
    return NextResponse.json(
      { error: 'Error al cargar datos de parques' },
      { status: 500 }
    );
  }
}
