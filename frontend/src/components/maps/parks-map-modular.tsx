// src/components/maps/ParksMapModular.tsx
'use client';

import dynamic from 'next/dynamic';
import { useMapSetup, useMapIcons, useParksData } from '@/hooks/maps';
import { getMapColor, MALAGA_CENTER } from '@/utils/maps';
import { ParkPopup } from './popups/park-popup';
import type { ParksGeoJSON } from '@/hooks/maps/use-parks-data';

const PARK_COLOR = getMapColor('park');

// Dynamic imports for Leaflet components
const MapContainer = dynamic(() => import('react-leaflet').then((mod) => mod.MapContainer), { ssr: false });
const TileLayer = dynamic(() => import('react-leaflet').then((mod) => mod.TileLayer), { ssr: false });
const Marker = dynamic(() => import('react-leaflet').then((mod) => mod.Marker), { ssr: false });
const Popup = dynamic(() => import('react-leaflet').then((mod) => mod.Popup), { ssr: false });

/**
 * Main Parks Map Component (Modular Version)
 */
export default function ParksMapModular() {
  const { data: parksData } = useParksData();

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
      <div className="bg-card/30 backdrop-blur-sm border border-border/30 rounded-2xl p-4 sm:p-6 lg:p-8 shadow-xl">
        <div className="bg-card/30 backdrop-blur-sm border border-border/30 rounded-2xl overflow-hidden shadow-xl h-[70vh]">
          <MapContent parksData={parksData} />
        </div>
      </div>
    </div>
  );
}

/**
 * Map Content Component
 */
function MapContent({ parksData }: { parksData: ParksGeoJSON | null }) {
  const { leaflet } = useMapSetup();
  const { createCustomIcon } = useMapIcons(leaflet);

  if (!leaflet || !parksData) return null;

  const parkIcon = createCustomIcon({
    iconClass: 'fa-solid fa-dog',
    color: PARK_COLOR,
    size: 40,
  });

  if (!parkIcon) return null;

  return (
    <>
      <link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css" />
      <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.6.0/css/all.min.css" />
      <link rel="stylesheet" href="https://unpkg.com/leaflet.fullscreen@latest/Control.FullScreen.css" />
      
      <MapContainer 
        center={MALAGA_CENTER} 
        zoom={13} 
        scrollWheelZoom={false} 
        style={{ height: '100%', width: '100%' }}
        fullscreenControl={true}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> | <a href="https://datosabiertos.malaga.eu/">Datos abiertos: Ayuntamiento de Málaga</a> |'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        
        {parksData.features.map((park, index) => {
          const [lng, lat] = park.geometry.coordinates;
          return (
            <Marker
              key={index}
              position={[lat, lng]}
              icon={parkIcon}
            >
              <Popup maxWidth={450} minWidth={350}>
                <ParkPopup park={park} />
              </Popup>
            </Marker>
          );
        })}
      </MapContainer>
    </>
  );
}
