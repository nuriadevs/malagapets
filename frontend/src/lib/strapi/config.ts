// src/lib/strapi/config.ts
/**
 * Configuración de Strapi
 * 
 * ⚠️ DEPRECADO: Este archivo se mantiene por compatibilidad.
 * Se recomienda usar las constantes de @/config/constants
 */

import { 
  STRAPI_URL, 
  STRAPI_API_TOKEN, 
  DEFAULT_LOCALE,
  REVALIDATE_TIME 
} from "@/config/constants";

// URL pública de Strapi (accesible desde cliente y servidor)
export const strapiUrl = STRAPI_URL;

// Token de API de Strapi (solo servidor)
export const apiToken = STRAPI_API_TOKEN;

// Configuración regional por defecto
export const defaultLocale = DEFAULT_LOCALE;

// Tiempo de revalidación para ISR (en segundos)
export const revalidateTime = REVALIDATE_TIME.default;
