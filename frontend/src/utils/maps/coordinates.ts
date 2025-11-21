// src/utils/maps/coordinates.ts

import { LatLngExpression } from 'leaflet';

/**
 * Málaga city center coordinates
 */
export const MALAGA_CENTER: LatLngExpression = [36.7213, -4.4214];

/**
 * Default zoom level for maps
 */
export const DEFAULT_ZOOM = 12;

/**
 * Zoom levels for different map types
 */
export const ZOOM_LEVELS = {
  city: 12,
  detailed: 14,
  close: 16,
} as const;

/**
 * Calculate center point from multiple coordinates
 */
export function calculateCenter(coordinates: [number, number][]): LatLngExpression {
  if (coordinates.length === 0) return MALAGA_CENTER;
  
  const sum = coordinates.reduce(
    (acc, coord) => ({
      lat: acc.lat + coord[0],
      lng: acc.lng + coord[1],
    }),
    { lat: 0, lng: 0 }
  );
  
  return [sum.lat / coordinates.length, sum.lng / coordinates.length];
}
