// src/components/maps/BeachesMapModular.tsx
'use client';

import dynamic from 'next/dynamic';
import { beachesData } from '@/lib/data/beaches';
import { useMapSetup, useMapIcons } from '@/hooks/maps';
import { getMapColor, MALAGA_CENTER } from '@/utils/maps';
import { BeachPopup } from './popups/beach-popup';

type BeachData = typeof beachesData;

const BEACH_COLOR = getMapColor('beach');

// Dynamic imports for Leaflet components
const MapContainer = dynamic(() => import('react-leaflet').then((mod) => mod.MapContainer), { ssr: false });
const TileLayer = dynamic(() => import('react-leaflet').then((mod) => mod.TileLayer), { ssr: false });
const Marker = dynamic(() => import('react-leaflet').then((mod) => mod.Marker), { ssr: false });
const Popup = dynamic(() => import('react-leaflet').then((mod) => mod.Popup), { ssr: false });



/**
 * Main Beaches Map Component (Modular Version)
 */
export default function BeachesMapModular() {
  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
      <div className="bg-card/30 backdrop-blur-sm border border-border/30 rounded-2xl p-4 sm:p-6 lg:p-8 shadow-xl">
        <div className="bg-card/30 backdrop-blur-sm border border-border/30 rounded-2xl overflow-hidden shadow-xl h-[70vh]">
          <MapContent beachesData={beachesData} />
        </div>
      </div>
    </div>
  );
}

/**
 * Map Content Component
 */
function MapContent({ beachesData }: { beachesData: BeachData }) {
  const { leaflet } = useMapSetup();
  const { createCustomIcon } = useMapIcons(leaflet);
  
  if (!leaflet || !beachesData) return null;

  const beachIcon = createCustomIcon({
    iconClass: 'fa-solid fa-umbrella-beach',
    color: BEACH_COLOR,
    size: 40,
  });

  if (!beachIcon) return null;

  return (
    <>
      <link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css" />
      <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.6.0/css/all.min.css" />
      <link rel="stylesheet" href="https://unpkg.com/leaflet.fullscreen@latest/Control.FullScreen.css" />
      
      <MapContainer 
        center={MALAGA_CENTER} 
        zoom={10} 
        scrollWheelZoom={false} 
        style={{ height: '100%', width: '100%' }}
        fullscreenControl={true}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> | Datos: Fuentes oficiales y recopilación propia |'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        
        {beachesData.map((beach) => (
          <Marker
            key={beach.id}
            position={[beach.coordinates.latitude, beach.coordinates.longitude]}
            icon={beachIcon}
          >
            <Popup maxWidth={450} minWidth={350}>
              <BeachPopup beach={beach} />
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </>
  );
}
