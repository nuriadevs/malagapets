export const API_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3001";

// Rutas internas Next.js (parks fetch interno)
export const INTERNAL_URL = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "http://localhost:3000";

// APIs externas
export const AYUNTAMIENTO_PARKS_URL =
  "https://datosabiertos.malaga.eu/recursos/ambiente/parquesCaninos/da_parquesCaninos-4326.geojson";
