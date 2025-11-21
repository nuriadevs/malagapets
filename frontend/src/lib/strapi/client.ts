// src/lib/strapi/client.ts

import { strapiUrl, apiToken, revalidateTime } from "./config";

// Validación de configuración
if (!strapiUrl) {
  console.error(
    "❌ The Strapi URL is not set. Check your environment variables."
  );
}

// Flags de entorno
const isDevelopment = process.env.NODE_ENV === "development";

/**
 * Tipo para parámetros opcionales del fetcher
 */
type FetcherParams = Record<string, string | number | boolean> | undefined;

/**
 * Función base para hacer fetch a la API de Strapi
 * @param endpoint - Ruta del endpoint (ej: '/articles' o '/articles?populate=*')
 * @returns Datos tipados de la respuesta
 * @throws Error si la petición falla
 */
export async function fetchAPI<T>(endpoint: string): Promise<T> {
  const url = `${strapiUrl}/api${endpoint}`;

  if (isDevelopment) {
   // console.log(`🔍 Fetching API URL: ${url}`);
   // console.log(`Api tooken es: ${apiToken}` );
  }

  try {
    const response = await fetch(url, {
      headers: {
        'Content-Type': 'application/json',
        ...(apiToken && { Authorization: `Bearer ${apiToken}` }),
      },
      next: { 
        revalidate: revalidateTime,
        tags: ['strapi'] // Para revalidación por tags
      },
    });

    if (isDevelopment) {
     // console.log(`📡 Response Status: ${response.status} ${response.statusText}`);
    }

    if (!response.ok) {
      // Intentar obtener el cuerpo del error
      let errorBody;
      try {
        errorBody = await response.json();
        console.error('❌ Strapi Error Response:', JSON.stringify(errorBody, null, 2));
      } catch (e) {
        const textBody = await response.text();
        console.error('❌ Strapi Error (text):', e, textBody);
      }

      throw new Error(
        `Strapi API error: ${response.status} - ${response.statusText}\n` +
        `Endpoint: ${endpoint}\n` +
        `URL: ${url}`
      );
    }

    const data = await response.json();

    if (isDevelopment) {
      // console.log('✅ API Response received successfully');
      // console.log('📦 Data structure:', Object.keys(data));
    }
    return data;

  } catch (error) {
   // console.error('💥 Fetch Error:', error);
   // console.error('📍 Failed endpoint:', endpoint);
    throw error;
  }
}

/**
 * Fetcher para SWR (client-side data fetching)
 * @param endpoint - Ruta del endpoint
 * @param params - Parámetros opcionales (no usado actualmente)
 * @returns Datos de la respuesta
 */
export const fetcher = async ([endpoint]: [string, FetcherParams?]) => {
  const url = `${strapiUrl}/api${endpoint}`;

  if (isDevelopment) {
   // console.log(`🔍 SWR Fetching: ${url}`);
  }

  try {
    const response = await fetch(url, {
      headers: {
        'Content-Type': 'application/json',
        ...(apiToken && { Authorization: `Bearer ${apiToken}` }),
      },
    });

    if (isDevelopment) {
   //   console.log(`📡 SWR Response Status: ${response.status}`);
    }

    if (!response.ok) {
      let errorBody;
      try {
        errorBody = await response.json();
        console.error('❌ SWR Error Body:', errorBody);
      } catch (e) {
        const textBody = await response.text();
        console.error('❌ SWR Error (text):',e, textBody);
      }

      throw new Error(`API error: ${response.status}`);
    }

    const data = await response.json();

    if (isDevelopment) {
      // console.log('✅ SWR Response received');
    }

    return data;
  } catch (error) {
    console.error('💥 SWR Error:', error);
    throw error;
  }
};

/**
 * URL del servidor Strapi
 * @deprecated Use env.strapiUrl from @/lib/env instead
 */
export function getStrapiURL(): string {
  return strapiUrl;
}