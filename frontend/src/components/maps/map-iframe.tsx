// src/components/maps/map-iframe.tsx
"use client";
import { useTranslations } from "next-intl";
import { useMapLoader } from "@/hooks/use-map-loader";
import { MapIframeProps } from "@/types/components";

/**
 * Map iframe component for displaying Folium maps.
 * ✅ CORREGIDO: Evita ERR_BLOCKED_BY_RESPONSE con sandbox apropiado
 */
export function MapIframe({ mapType, translationKey = "maps" }: MapIframeProps) {
  const tMaps = useTranslations(translationKey);
  const { iframeRef } = useMapLoader(mapType);

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl animate-in fade-in duration-1000">
      <div className="bg-card/30 backdrop-blur-sm border border-border/30 rounded-2xl p-4 sm:p-6 lg:p-8 shadow-xl">
        <div className="bg-card/30 backdrop-blur-sm border border-border/30 rounded-2xl overflow-hidden shadow-xl h-[70vh]">
          
          {/* ✅ Iframe con TODOS los permisos necesarios para Folium */}
          <iframe
            ref={iframeRef}
            className="w-full h-full border-0 rounded-2xl"
            aria-label={tMaps("ariatitle")}
            title={tMaps("title")}
            loading="lazy"
            
            // ✅ CRITICAL: Sandbox con TODOS los permisos para Folium
            sandbox="allow-scripts allow-same-origin allow-popups allow-forms allow-popups-to-escape-sandbox allow-downloads allow-modals"
            
            // ✅ Permitir geolocalización (útil para mapas)
            allow="geolocation 'self'"
            
            // ✅ Referrer policy permisiva para tiles de OpenStreetMap
            referrerPolicy="no-referrer-when-downgrade"
            
            style={{ 
              minHeight: "400px", 
              pointerEvents: "auto"
            }}
          />
          
        </div>
      </div>
    </div>
  );
}