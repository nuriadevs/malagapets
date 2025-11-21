// src/config/app.config.ts
/**
 * Configuraciones para filtrar rutas públicas en middleware
 */
export const PUBLIC_FILE_PATTERNS = [
  /^\/manifest\.webmanifest$/,
  /^\/manifest\.json$/,
  /^\/robots\.txt$/,
  /^\/sitemap\.xml$/,
  /^\/blog-sitemap\.xml$/,
  /^\/favicon\.ico$/,
  /^\/icon.*\.png$/,
  /^\/apple-touch-icon.*\.png$/,
  /^\/_next\//,
  /^\/api\//,
  /^\/icons\//,
  /^\/screenshots\//,
  /^\/images\//,
  /\.(png|jpg|jpeg|gif|svg|webp|ico|json|xml|txt|pdf|woff|woff2|ttf|eot)$/, // Archivos estáticos
];

/**
 * Configuraciones de caché y revalidación
 */
export const CACHE_CONFIG = {
  // Revalidar cada hora por defecto
  defaultRevalidate: 3600, // 1 hora en segundos
  
  // Revalidar cada 24 horas
  longRevalidate: 86400, // 24 horas en segundos
  
  // Revalidar cada 5 minutos
  shortRevalidate: 300, // 5 minutos en segundos
} as const;
