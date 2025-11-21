// src/lib/security/headers.ts

/**
 * 🔒 Headers específicos para contenido HTML (mapas Folium)
 * ✅ CORRECCIÓN COMPLETA para evitar ERR_BLOCKED_BY_RESPONSE
 */
export function getHTMLSecurityHeaders(origin?: string | null) {
  return {
    "X-Content-Type-Options": "nosniff",
    "Referrer-Policy": "no-referrer-when-downgrade", // ✅ Cambiado para permitir tiles
    "X-Robots-Tag": "noindex, nofollow",
    "Permissions-Policy": "geolocation=(self), microphone=(), camera=()",
    
    // ✅ CRITICAL: Usar SAMEORIGIN para permitir iframe en tu dominio
    "X-Frame-Options": "SAMEORIGIN",

    "Content-Type": "text/html; charset=utf-8",
    "Cache-Control": "public, max-age=3600, stale-while-revalidate=86400",

    // ✅ CSP CORREGIDA - MÁS PERMISIVA para Folium + OpenStreetMap
    "Content-Security-Policy": [
      // Default: permite self, data URIs, y blobs
      "default-src 'self' data: blob:;",
      
      // Scripts: TODOS los CDNs que usa Folium
      "script-src 'self' 'unsafe-inline' 'unsafe-eval' " +
        "https://cdn.jsdelivr.net " +
        "https://cdn.jsdelivr.net/npm/ " +
        "https://cdn.jsdelivr.net/gh/ " +
        "https://code.jquery.com " +
        "https://cdnjs.cloudflare.com " +
        "https://unpkg.com " +
        "https://netdna.bootstrapcdn.com " +
        "https://maxcdn.bootstrapcdn.com " +
        "https://stackpath.bootstrapcdn.com;",
      
      // Estilos: TODOS los CDNs
      "style-src 'self' 'unsafe-inline' " +
        "https://cdn.jsdelivr.net " +
        "https://cdnjs.cloudflare.com " +
        "https://unpkg.com " +
        "https://netdna.bootstrapcdn.com " +
        "https://maxcdn.bootstrapcdn.com " +
        "https://stackpath.bootstrapcdn.com;",
      
      // ✅ CRITICAL: Imágenes - TODOS los subdominios de OpenStreetMap
      "img-src 'self' data: blob: " +
        "https://tile.openstreetmap.org " +
        "https://*.tile.openstreetmap.org " +
        "https://a.tile.openstreetmap.org " +
        "https://b.tile.openstreetmap.org " +
        "https://c.tile.openstreetmap.org " +
        "https://cdn.jsdelivr.net " +
        "https://unpkg.com " +
        "https://cdnjs.cloudflare.com " +
        "https://raw.githubusercontent.com;",
      
      // ✅ CRITICAL: Connect para tiles de mapa
      "connect-src 'self' " +
        "https://tile.openstreetmap.org " +
        "https://*.tile.openstreetmap.org " +
        "https://a.tile.openstreetmap.org " +
        "https://b.tile.openstreetmap.org " +
        "https://c.tile.openstreetmap.org " +
        "https://cdn.jsdelivr.net " +
        "https://code.jquery.com;",
      
      // Fuentes
      "font-src 'self' data: " +
        "https://cdn.jsdelivr.net " +
        "https://netdna.bootstrapcdn.com " +
        "https://maxcdn.bootstrapcdn.com " +
        "https://cdnjs.cloudflare.com " +
        "https://stackpath.bootstrapcdn.com;",
      
      // ✅ CRITICAL: Permitir ser embedido en iframe del mismo origen
      "frame-ancestors 'self';",
      
      // Workers para Leaflet
      "worker-src 'self' blob:;",
      
      // Base URI
      "base-uri 'self';",
      
      // Forms
      "form-action 'self';",
      
      // Object/embed
      "object-src 'none';",
    ].join(" "),

    // ✅ CORS permisivo para desarrollo, restrictivo para producción
    "Access-Control-Allow-Origin": origin || "*",
    "Access-Control-Allow-Methods": "GET, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type, Authorization",
    "Access-Control-Allow-Credentials": "true",
  };
}

/**
 * 🔒 Headers de error (no revelar información sensible)
 */
export function getErrorHeaders() {
  return {
    "X-Content-Type-Options": "nosniff",
    "Content-Type": "application/json; charset=utf-8",
    "Cache-Control": "no-store, no-cache, must-revalidate",
  };
}

/**
 * 🔒 Headers para rate limiting
 */
export function getRateLimitHeaders(
  limit: number,
  remaining: number,
  resetTime: number
) {
  return {
    "X-RateLimit-Limit": String(limit),
    "X-RateLimit-Remaining": String(remaining),
    "X-RateLimit-Reset": new Date(resetTime).toISOString(),
    "Retry-After": String(Math.ceil((resetTime - Date.now()) / 1000)),
  };
}