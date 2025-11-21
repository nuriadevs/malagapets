// src/components/maps/VetsMapModular.tsx
'use client';

import dynamic from 'next/dynamic';
import { vetsData } from '@/lib/data/vets';
import { useMapSetup, useMapIcons } from '@/hooks/maps';
import { MALAGA_CENTER } from '@/utils/maps';
import { VetPopup } from './popups/vet-popup';

type VetData = typeof vetsData;

const CENTER_COLORS = {
  clinic: '#0891b2',
  hospital: '#0e7490',
};

// Dynamic imports for Leaflet components
const MapContainer = dynamic(() => import('react-leaflet').then((mod) => mod.MapContainer), { ssr: false });
const TileLayer = dynamic(() => import('react-leaflet').then((mod) => mod.TileLayer), { ssr: false });
const Marker = dynamic(() => import('react-leaflet').then((mod) => mod.Marker), { ssr: false });
const Popup = dynamic(() => import('react-leaflet').then((mod) => mod.Popup), { ssr: false });
const LayerGroup = dynamic(() => import('react-leaflet').then((mod) => mod.LayerGroup), { ssr: false });

// Dynamic imports for LayersControl
const DynamicLayersControl = dynamic(
  () => import('react-leaflet').then((mod) => ({ default: mod.LayersControl })),
  { ssr: false }
);

const DynamicOverlay = dynamic(
  () => import('react-leaflet').then((mod) => ({ default: mod.LayersControl.Overlay })),
  { ssr: false }
);

/**
 * Main Vets Map Component (Modular Version)
 */
export default function VetsMapModular() {
  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
      <div className="bg-card/30 backdrop-blur-sm border border-border/30 rounded-2xl p-4 sm:p-6 lg:p-8 shadow-xl">
        <div className="bg-card/30 backdrop-blur-sm border border-border/30 rounded-2xl overflow-hidden shadow-xl h-[70vh]">
          <MapContent vetsData={vetsData} />
        </div>
      </div>
    </div>
  );
}

/**
 * Map Content Component
 */
function MapContent({ vetsData }: { vetsData: VetData }) {
  const { leaflet } = useMapSetup();
  const { createCustomIcon } = useMapIcons(leaflet);

  if (!leaflet || !vetsData) {
    return null;
  }

  const clinics = vetsData.filter(vet => vet.type === 'clinic');
  const hospitals = vetsData.filter(vet => vet.type === 'hospital');

  const clinicIcon = createCustomIcon({
    iconClass: 'fa-solid fa-stethoscope',
    color: CENTER_COLORS.clinic,
    size: 40,
  });

  const hospitalIcon = createCustomIcon({
    iconClass: 'fa-solid fa-hospital',
    color: CENTER_COLORS.hospital,
    size: 40,
  });

  if (!clinicIcon || !hospitalIcon) return null;

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
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> | <a href="https://colegioveterinariosmalaga.es/">Datos: Colegio Oficial de Veterinarios de Málaga</a> |'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        
        <DynamicLayersControl position="topright">
          <DynamicOverlay checked name="🏥 Clínicas Veterinarias">
            <LayerGroup>
              {clinics.map((vet) => (
                <Marker
                  key={vet.id}
                  position={[vet.coordinates.latitude, vet.coordinates.longitude]}
                  icon={clinicIcon}
                >
                  <Popup maxWidth={450} minWidth={350}>
                    <VetPopup vet={vet} centerColor={CENTER_COLORS.clinic} />
                  </Popup>
                </Marker>
              ))}
            </LayerGroup>
          </DynamicOverlay>

          <DynamicOverlay checked name="🏥 Hospitales Veterinarios">
            <LayerGroup>
              {hospitals.map((vet) => (
                <Marker
                  key={vet.id}
                  position={[vet.coordinates.latitude, vet.coordinates.longitude]}
                  icon={hospitalIcon}
                >
                  <Popup maxWidth={450} minWidth={350}>
                    <VetPopup vet={vet} centerColor={CENTER_COLORS.hospital} />
                  </Popup>
                </Marker>
              ))}
            </LayerGroup>
          </DynamicOverlay>
        </DynamicLayersControl>
      </MapContainer>
    </>
  );
}
