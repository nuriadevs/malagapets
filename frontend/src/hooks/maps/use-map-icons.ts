// src/hooks/maps/useMapIcons.ts

import type L from 'leaflet';

interface CreateIconOptions {
  iconClass: string;
  color: string;
  size?: number;
}

/**
 * Hook to create custom map icons
 */
export function useMapIcons(leaflet: typeof L | null) {
  const createCustomIcon = ({ iconClass, color, size = 40 }: CreateIconOptions) => {
    if (!leaflet) return null;

    return leaflet.divIcon({
      html: `
        <div style="
          background: white;
          border: 3px solid ${color};
          border-radius: 50%;
          width: ${size}px;
          height: ${size}px;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 2px 8px rgba(0,0,0,0.3);
        ">
          <i class="${iconClass}" style="color: ${color}; font-size: ${size / 2}px;"></i>
        </div>
      `,
      className: '',
      iconSize: [size, size],
      iconAnchor: [size / 2, size],
      popupAnchor: [0, -size],
    });
  };

  return { createCustomIcon };
}
