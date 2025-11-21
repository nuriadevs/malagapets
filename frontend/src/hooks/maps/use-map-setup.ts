// src/hooks/maps/useMapSetup.ts

import { useEffect, useState } from 'react';
import type L from 'leaflet';

/**
 * Hook to setup Leaflet library and icons
 */
export function useMapSetup() {
  const [leaflet, setLeaflet] = useState<typeof L | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    import('leaflet').then((module) => {
      const L = module.default;
      
      // Fix for default marker icons
      const iconPrototype = L.Icon.Default.prototype as {
        _getIconUrl?: () => string;
      };
      delete iconPrototype._getIconUrl;
      
      L.Icon.Default.mergeOptions({
        iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png',
        iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png',
        shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
      });
      
      setLeaflet(L);
      setIsLoading(false);
      
      // Load fullscreen plugin
      import('leaflet.fullscreen');
    });
  }, []);

  return { leaflet, isLoading };
}
