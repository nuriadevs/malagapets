// src/lib/security/config.ts

/**
 * 🔒 CONFIGURACIÓN DE SEGURIDAD CENTRALIZADA
 * 
 * Este archivo contiene toda la configuración de seguridad de la aplicación.
 * IMPORTANTE: Actualizar estos valores en producción.
 */

export const SECURITY_CONFIG = {
  // 🔒 Rate Limiting
  rateLimits: {
    // APIs generales (vets, beaches)
    api: {
      requests: 100,
      windowMs: 60000, // 1 minuto
    },
    // Mapas (más restrictivo por el tamaño de los archivos)
    maps: {
      requests: 60,
      windowMs: 60000, // 1 minuto
    },
    // Búsquedas (más restrictivo para prevenir scraping)
    search: {
      requests: 50,
      windowMs: 60000, // 1 minuto
    },
    // Contacto/Newsletter (muy restrictivo)
    contact: {
      requests: 5,
      windowMs: 300000, // 5 minutos
    },
  },

  // 🔒 Orígenes permitidos (CORS)
  allowedOrigins: {
    production: [
      process.env.NEXT_PUBLIC_SITE_URL,
      'https://www.malagapets.com', // Tu dominio real
      'https://malagapets.com',
    ].filter(Boolean) as string[],
    
    development: [
      'http://localhost:3000',
      'http://127.0.0.1:3000',
      'http://localhost:3001',
    ],
  },

  // 🔒 Límites de resultados para prevenir scraping masivo
  maxResults: {
    beaches: 50,
    vets: 100,
    parks: 100,
    search: 20,
  },

  // 🔒 Longitud máxima de inputs
  maxInputLength: {
    search: 100,
    name: 100,
    email: 254,
    message: 5000,
  },

  // 🔒 Tipos de archivos permitidos
  allowedFileTypes: {
    maps: ['html'],
    locales: ['es', 'en', 'de', 'fr'],
    mapTypes: ['parks', 'vets', 'beaches'],
  },

  // 🔒 Patterns de validación
  validationPatterns: {
    filename: /^[a-z]+_[a-z]{2}\.html$/,
    slug: /^[a-z0-9-]+$/,
    locale: /^(es|en|de|fr)$/,
    email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  },

  // 🔒 Headers de seguridad
  securityHeaders: {
    // Prevenir XSS
    xContentTypeOptions: 'nosniff',
    xFrameOptions: 'DENY',
    
    // Política de referrer
    referrerPolicy: 'strict-origin-when-cross-origin',
    
    // No indexar APIs
    xRobotsTag: 'noindex, nofollow',
    
    // Permisos restrictivos
    permissionsPolicy: 'geolocation=(), microphone=(), camera=()',
  },

  // 🔒 CSP para mapas (Leaflet requiere algunas excepciones)
  csp: {
    maps: [
      "default-src 'self'",
      "script-src 'self' 'unsafe-inline' https://unpkg.com https://cdn.jsdelivr.net",
      "style-src 'self' 'unsafe-inline' https://unpkg.com",
      "img-src 'self' data: https://*.tile.openstreetmap.org https://*.tile.osm.org",
      "connect-src 'self' https://*.tile.openstreetmap.org",
      "font-src 'self' data:",
      "frame-ancestors 'self'",
    ].join('; '),
  },
} as const;

/**
 * 🔒 Obtener orígenes permitidos según el entorno
 */
export function getAllowedOrigins(): string[] {
  const isDevelopment = process.env.NODE_ENV === 'development';
  
  return isDevelopment
    ? [...SECURITY_CONFIG.allowedOrigins.production, ...SECURITY_CONFIG.allowedOrigins.development]
    : SECURITY_CONFIG.allowedOrigins.production;
}

/**
 * 🔒 Validar si un origen es permitido
 */
export function isOriginAllowed(origin: string | null): boolean {
  if (!origin) return false;
  
  const allowed = getAllowedOrigins();
  return allowed.some(allowedOrigin => 
    origin === allowedOrigin || origin.startsWith(allowedOrigin + '/')
  );
}

/**
 * 🔒 Obtener configuración de rate limit por tipo de endpoint
 */
export function getRateLimitConfig(endpoint: keyof typeof SECURITY_CONFIG.rateLimits) {
  return SECURITY_CONFIG.rateLimits[endpoint];
}
