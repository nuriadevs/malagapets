// src/utils/maps/colors.ts

/**
 * Color palette for map markers and UI elements
 */
export const MAP_COLORS = {
  // Beach colors
  beach: {
    primary: '#0891b2',    // Cyan
    secondary: '#06b6d4',
    light: '#67e8f9',
  },
  // Park colors
  park: {
    primary: '#0891b2',    // Cyan (same as beaches)
    secondary: '#06b6d4',
    light: '#67e8f9',
  },
  // Veterinary colors
  vet: {
    primary: '#0891b2',    // Cyan for clinics
    hospital: '#0e7490',   // Darker cyan for hospitals
    secondary: '#06b6d4',
    light: '#67e8f9',
  },
  // UI colors
  ui: {
    text: '#1f2937',
    textLight: '#6b7280',
    border: '#e5e7eb',
    background: '#ffffff',
  },
} as const;

/**
 * Get color for specific map type
 */
export function getMapColor(type: 'beach' | 'park' | 'vet', shade: 'primary' | 'secondary' | 'light' | 'hospital' = 'primary'): string {
  if (type === 'vet' && shade === 'hospital') {
    return MAP_COLORS.vet.hospital;
  }
  return MAP_COLORS[type][shade as 'primary' | 'secondary' | 'light'];
}
