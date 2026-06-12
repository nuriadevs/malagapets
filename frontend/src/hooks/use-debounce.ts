// src/hooks/use-debounce.ts
"use client";

import { useEffect, useState } from "react";

/**
 * Hook personalizado para debouncing de valores
 * Útil para retrasar llamadas a la API en búsquedas en tiempo real
 * 
 * @param value - El valor a debounce
 * @param delay - El delay en milisegundos (por defecto 500ms)
 * @returns El valor debounced
 * 
 * @example
 * ```tsx
 * const [searchTerm, setSearchTerm] = useState("");
 * const debouncedSearch = useDebounce(searchTerm, 300);
 * 
 * useEffect(() => {
 *   // Esta llamada solo se ejecutará después de 300ms sin cambios
 *   fetch(`/api/search?q=${debouncedSearch}`);
 * }, [debouncedSearch]);
 * ```
 */
export function useDebounce<T>(value: T, delay: number = 500): T {
    const [debouncedValue, setDebouncedValue] = useState<T>(value);

    useEffect(() => {
        // Establecer un timeout para actualizar el valor después del delay
        const handler = setTimeout(() => {
            setDebouncedValue(value);
        }, delay);

        // Limpiar el timeout si el valor cambia (cleanup)
        return () => {
            clearTimeout(handler);
        };
    }, [value, delay]);

    return debouncedValue;
}
