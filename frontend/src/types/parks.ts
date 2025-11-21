// src/types/parks.ts
import type { Point, Feature } from "geojson";

// Propiedades que vienen en el GeoJSON
export type ParqueProperties = {
  NOMBRE?: string;
  DIRECCION?: string;
  HORARIOS?: string; // 🔹 ya sin null, porque normalizamos en el route
  ACCESOPMR?: string;
  INFOESP?: Array<{
    Fuente?: string;
    Extension?: string;
    [key: string]: unknown;
  }>;
  [key: string]: unknown;
};

// Tipo de cada Feature del GeoJSON
export type ParqueFeature = Feature<Point, ParqueProperties>;

// Tipo simplificado que usaremos en frontend
export type Parque = {
  id: string;
  properties: {
    Nombre?: string;
    Direccion?: string;
    Horarios?: string;
    AccesoPMR?: string;
    Extension?: string;
    Fuente?: string;
  };
  geometry: Point; // 🔹 siempre un Point
};

// Props para los componentes
export type ParqueCaninoProp = {
  parque: Parque;
};
