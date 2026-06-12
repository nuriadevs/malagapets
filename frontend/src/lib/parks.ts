import { normalizeParkData } from "@/lib/utils/normalizers";
import type { ParkCardData } from "@/types/cards";
import { AYUNTAMIENTO_PARKS_URL } from "@/lib/config";

//const AYUNTAMIENTO_URL = AYUNTAMIENTO_PARKS_URL;

export async function getParksGeoJSON() {
  const res = await fetch(AYUNTAMIENTO_PARKS_URL, {
    headers: {
      "User-Agent":
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
    },
    next: { revalidate: 3600 },
  });
  if (!res.ok) throw new Error("Error al obtener datos del ayuntamiento");
  return res.json();
}

export async function getParks(): Promise<ParkCardData[]> {
  const geojson = await getParksGeoJSON();
  return (geojson.features ?? []).map(normalizeParkData);
}
