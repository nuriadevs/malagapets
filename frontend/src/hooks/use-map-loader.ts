// src/hooks/use-map-loader.ts
"use client";
import { useRef, useEffect } from "react";
import { useLocale } from "next-intl";

export type MapType = "parks" | "vets" | "beaches";

/**
 * Custom hook to load a map iframe based on the current locale and map type.
 */
export function useMapLoader(mapType: MapType) {
  const locale = useLocale();
  const iframeRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    if (iframeRef.current) {
      // Ahora usa la API route en lugar de public/
      iframeRef.current.src = `/api/maps/${mapType}/${locale}`;
    }
  }, [locale, mapType]);

  return {
    iframeRef
  };
}