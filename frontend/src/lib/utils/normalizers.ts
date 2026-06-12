import type { BeachCardData, ParkCardData, VetCardData } from "@/types/cards";

export function emptyToUndefined(value?: string | null): string | undefined {
  if (!value || value.trim() === "") return undefined;
  return value.trim();
}

export function toGoogleMapsUrl(
  lat?: number,
  lon?: number,
): string | undefined {
  if (
    typeof lat !== "number" ||
    typeof lon !== "number" ||
    isNaN(lat) ||
    isNaN(lon)
  ) {
    return undefined;
  }
  return `https://www.google.com/maps?q&layer=c&cbll=${lat},${lon}`;
}

export function normalizeUrl(url?: string | null): string | undefined {
  if (!url) return undefined;
  if (url.startsWith("http://") || url.startsWith("https://")) return url;
  return `https://${url}`;
}

export function cardAriaId(id: string | number): string {
  return `card-title-${id}`;
}

// ─── Playas ───────────────────────────────────────────────────────────────────

interface RawBeachData {
  id: string | number;
  name?: string;
  municipality?: string;
  locality?: string;
  location?: string;
  length?: string;
  area?: string;
  coordinates?: { lat: number; lng: number };
  services?: {
    dogShower?: unknown;
    waterFountain?: unknown;
    trashBins?: unknown;
    parking?: unknown;
    agilityArea?: unknown;
    bagDispenser?: unknown;
  };
  schedule?: { summer?: string; winter?: string; yearRound?: boolean };
  access?: {
    type?: string;
    by_car?: unknown;
    distance_from_center?: string;
    access_road?: string;
    references?: string;
  };
  certifications?: string[];
  highlights?: string[];
  googleMapsUrl?: string;
}

export function normalizeBeachData(beach: RawBeachData): BeachCardData {
  const s = beach.services ?? {};
  const sc = beach.schedule ?? {};
  const a = beach.access ?? {};

  return {
    id: beach.id,
    name: beach.name ?? "",
    municipality: beach.municipality ?? "",
    locality: emptyToUndefined(beach.locality),
    location: beach.location ?? "",
    length: emptyToUndefined(beach.length),
    area: emptyToUndefined(beach.area),
    coordinates: {
      lat: beach.coordinates?.lat ?? 0,
      lng: beach.coordinates?.lng ?? 0,
    },
    services: {
      dogShower: Boolean(s.dogShower),
      waterFountain: Boolean(s.waterFountain),
      trashBins: Boolean(s.trashBins),
      parking: Boolean(s.parking),
      agilityArea: Boolean(s.agilityArea),
      bagDispenser: Boolean(s.bagDispenser),
    },
    schedule: {
      summer: emptyToUndefined(sc.summer),
      winter: emptyToUndefined(sc.winter),
      yearRound: sc.yearRound ? "Abierto todo el año" : undefined,
    },
    access: {
      type: emptyToUndefined(a.type),
      by_car: typeof a.by_car === "boolean" ? a.by_car : undefined,
      distance_from_center: emptyToUndefined(a.distance_from_center),
      access_road: emptyToUndefined(a.access_road),
      references: emptyToUndefined(a.references),
    },
    certifications: Array.isArray(beach.certifications)
      ? [...beach.certifications]
      : undefined,
    highlights: Array.isArray(beach.highlights)
      ? [...beach.highlights]
      : undefined,
    googleMapsUrl: emptyToUndefined(beach.googleMapsUrl),
  };
}

// ─── Parques ──────────────────────────────────────────────────────────────────

interface AyuntamientoInfoEsp {
  Fuente?: string;
  Extension?: string;
  "Bi-zona"?: string;
}

interface AyuntamientoParque {
  id?: string;
  properties?: {
    NOMBRE?: string;
    DIRECCION?: string;
    HORARIOS?: string;
    ACCESOPMR?: string;
    DESCRIPCION?: string;
    INFOESP?: AyuntamientoInfoEsp[] | null;
  };
  geometry?: {
    coordinates?: [number, number, number?];
  };
}

export function normalizeParkData(parque: AyuntamientoParque): ParkCardData {
  const p = parque.properties ?? {};
  const [lon, lat] = parque.geometry?.coordinates ?? [];
  const infoEsp = Array.isArray(p.INFOESP) ? p.INFOESP[0] : {};

  return {
    id: parque.id ?? "",
    name: emptyToUndefined(p.NOMBRE) ?? "",
    address: emptyToUndefined(p.DIRECCION),
    schedule: emptyToUndefined(p.HORARIOS),
    accessibility: p.ACCESOPMR != null ? p.ACCESOPMR === "Si" : undefined,
    extension: emptyToUndefined(infoEsp?.Extension),
    fountain: infoEsp?.Fuente != null ? infoEsp.Fuente === "Si" : undefined,
    biZone:
      infoEsp?.["Bi-zona"] != null ? infoEsp["Bi-zona"] === "Si" : undefined,
    description: emptyToUndefined(p.DESCRIPCION),
    googleMapsUrl: toGoogleMapsUrl(lat, lon),
    coordinates:
      typeof lat === "number" && typeof lon === "number"
        ? { lat, lng: lon }
        : undefined,
  };
}

// ─── Veterinarios ─────────────────────────────────────────────────────────────

interface RawPhone {
  type: string;
  number: string;
}

interface RawVetData {
  id: string | number;
  type?: string;
  name?: string;
  address?: string;
  postalCode?: string;
  phones?: Array<{ type?: string; number?: string | null }>;
  website?: string;
  email?: string;
  schedule?: string;
  daysOpen?: string;
  coordinates?: { lat: number; lng: number };
  googleMapsUrl?: string;
}

export function normalizeVetData(center: RawVetData): VetCardData {
  const phones: RawPhone[] = (center.phones ?? [])
    .filter((p) => Boolean(p?.number))
    .map((p) => ({ type: p.type ?? "", number: p.number! }));

  return {
    id: center.id,
    type: (center.type === "hospital" ? "hospital" : "clinic") as
      | "clinic"
      | "hospital",
    name: center.name ?? "",
    address: center.address ?? "",
    postalCode: emptyToUndefined(center.postalCode),
    phones,
    schedule: emptyToUndefined(center.schedule),
    daysOpen: emptyToUndefined(center.daysOpen),
    website: normalizeUrl(center.website),
    email: emptyToUndefined(center.email),
    googleMapsUrl: emptyToUndefined(center.googleMapsUrl),
    coordinates: center.coordinates
      ? { lat: center.coordinates.lat, lng: center.coordinates.lng }
      : undefined,
  };
}
