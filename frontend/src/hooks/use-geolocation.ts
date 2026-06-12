"use client";

import { useState } from "react";

export type GeolocationState =
  | { status: "idle" }
  | { status: "loading" }
  | { status: "granted"; lat: number; lng: number }
  | { status: "denied"; error: string };

/**
 * useGeolocation — hook para obtener la posición del usuario.
 *
 * Proporciona un estado con la latitud y longitud, junto con funciones para
 *  calcular distancias, solicitar permiso y limpiar la ubicación almacenada.
 */
export function useGeolocation() {
  const [state, setState] = useState<GeolocationState>(() => {
    try {
      const cached = sessionStorage.getItem("user-location");
      if (cached) {
        const { lat, lng } = JSON.parse(cached);
        return { status: "granted", lat, lng };
      }
    } catch {}
    return { status: "idle" };
  });

  const request = () => {
    if (!navigator.geolocation) {
      setState({ status: "denied", error: "not_supported" });
      return;
    }

    setState({ status: "loading" });

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude: lat, longitude: lng } = position.coords;
        setState({ status: "granted", lat, lng });
        try {
          sessionStorage.setItem("user-location", JSON.stringify({ lat, lng }));
          window.dispatchEvent(
            new CustomEvent("user-location-granted", { detail: { lat, lng } }),
          );
        } catch {}
      },
      (error) => {
        const message =
          error.code === error.PERMISSION_DENIED
            ? "permission_denied"
            : error.code === error.POSITION_UNAVAILABLE
              ? "position_unavailable"
              : "timeout";
        setState({ status: "denied", error: message });
      },
      { enableHighAccuracy: true, timeout: 8000, maximumAge: 300_000 },
    );
  };

  const clear = () => {
    setState({ status: "idle" });
    try {
      sessionStorage.removeItem("user-location");
      window.dispatchEvent(new CustomEvent("user-location-cleared"));
    } catch {}
  };

  return { state, request, clear };
}
