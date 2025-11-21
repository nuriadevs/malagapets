// src/config/constants.ts
/**
 * ═══════════════════════════════════════════════════════════════════════════
 * ARCHIVO CENTRAL DE CONSTANTES - MálagaPets
 * ═══════════════════════════════════════════════════════════════════════════
 * 
 * Este archivo centraliza TODAS las constantes de configuración del proyecto.
 * 
 * ⚠️  IMPORTANTE PARA DEPLOYMENT EN VERCEL:
 * - Variables NEXT_PUBLIC_* son visibles en el cliente
 * - Variables sin prefijo son SOLO para servidor
 * - Configurar en Vercel Dashboard > Settings > Environment Variables
 * 
 * 📋 CHECKLIST PARA VERCEL:
 * 1. NEXT_PUBLIC_SITE_URL (tu dominio de producción)
 * 2. NEXT_PUBLIC_STRAPI_URL (URL de tu CMS)
 * 3. STRAPI_API_TOKEN (token secreto)
 * 4. NEXT_PUBLIC_GA_ID (Google Analytics - opcional)
 * 5. RESEND_API_KEY (emails - opcional)
 * 6. CONTACT_EMAIL (email de contacto)
 * 
 * ═══════════════════════════════════════════════════════════════════════════
 */

// ============================================
// HELPERS DE VALIDACIÓN
// ============================================

/**
 * Obtiene variable de entorno requerida
 * Lanza error en producción si no está configurada
 */
function getEnvVar(key: string, fallback?: string): string {
  const value = process.env[key];

  if (!value) {
    if (process.env.NODE_ENV === "production" && !fallback) {
      throw new Error(
        `❌ Variable de entorno requerida no configurada: ${key}\n` +
        `Por favor configúrala en Vercel Dashboard > Settings > Environment Variables`
      );
    }
    return fallback || "";
  }

  return value;
}

/**
 * Obtiene variable de entorno opcional con fallback
 */
function getOptionalEnvVar(key: string, fallback: string = ""): string {
  return process.env[key] || fallback;
}

/**
 * Verifica si una feature está habilitada
 */
function isFeatureEnabled(key: string): boolean {
  const value = process.env[key];
  return value === "true" || value === "1";
}

// ============================================
// 🌐 CONFIGURACIÓN DEL SITIO (PÚBLICO)
// ============================================

/**
 * URL principal del sitio web
 * ⚠️ CRÍTICO: Configurar en Vercel con tu dominio de producción
 * @example https://malagapets.com
 */
export const SITE_URL = getEnvVar(
  "NEXT_PUBLIC_SITE_URL",
  process.env.NODE_ENV === "development"
    ? "http://localhost:3000"
    : "https://malagapets.com" // ✅ fallback temporal hasta que tengas dominio
);


/**
 * Nombre del sitio
 */
export const SITE_NAME = "MálagaPets";

/**
 * Descripción del sitio
 */
export const SITE_DESCRIPTION = "Tu guía completa para mascotas en Málaga";

/**
 * Email de contacto principal
 */
export const CONTACT_EMAIL = getOptionalEnvVar("CONTACT_EMAIL", "holamalagapets@gmail.com");

/**
 * Handle de Twitter/X
 */
export const TWITTER_HANDLE = "@malagapets";

/**
 * Imagen por defecto para Open Graph
 */
export const DEFAULT_OG_IMAGE = "/images/og-default.jpg";


export const DEFAULT_IMAGE = "/images/default.jpg";

// ============================================
// 🎨 CONFIGURACIÓN DE STRAPI CMS (PÚBLICO/PRIVADO)
// ============================================

/**
 * URL del servidor Strapi (PÚBLICO - visible en cliente)
 * ⚠️ CRÍTICO: Configurar en Vercel
 * @example https://cms.malagapets.com
 */
export const STRAPI_URL = getEnvVar(
  "NEXT_PUBLIC_STRAPI_URL",
  process.env.NODE_ENV === "development" 
    ? "http://localhost:1337" 
    : "https://backend-pets-u2de.onrender.com" // ✅ Fallback de producción
);

/**
 * Token de API de Strapi (PRIVADO - solo servidor)
 * ⚠️ CRÍTICO: Configurar en Vercel como variable de entorno secreta
 * ⚠️ NUNCA exponer en código cliente
 */
export const STRAPI_API_TOKEN = getOptionalEnvVar("STRAPI_API_TOKEN");

/**
 * Endpoints de Strapi
 */
export const STRAPI_ENDPOINTS = {
  articles: "/api/articles",
  authors: "/api/authors",
  categories: "/api/categories",
  tags: "/api/tags",
  newsletter: "/api/newsletters",
} as const;

/**
 * Configuración de llamadas a Strapi
 */
export const STRAPI_CONFIG = {
  cache: {
    tags: ["strapi-data"],
  },
  retries: 3,
  timeout: 5000,
  revalidate: 60, // Revalidar cada 60 segundos
} as const;


// ============================================
// 📧 CONFIGURACIÓN DE EMAIL (PRIVADO)
// ============================================

/**
 * API Key de Resend (PRIVADO - solo servidor)
 * ⚠️ Configurar en Vercel si usas emails
 */
export const RESEND_API_KEY = getOptionalEnvVar("RESEND_API_KEY");

/**
 * Email remitente para notificaciones
 */
export const RESEND_FROM_EMAIL = getOptionalEnvVar(
  "RESEND_FROM_EMAIL", 
  "MálagaPets <info@malagapets.com>"
);

// ============================================
// 📊 ANALYTICS Y TRACKING (PÚBLICO)
// ============================================

/**
 * Google Analytics ID
 * @example G-XXXXXXXXXX
 */
export const GOOGLE_ANALYTICS_ID = getOptionalEnvVar("NEXT_PUBLIC_GA_ID");

/**
 * Verificación de Google Search Console
 */
export const GOOGLE_VERIFICATION = getOptionalEnvVar("NEXT_PUBLIC_GOOGLE_VERIFICATION");


/**
 * Flag manual para forzar analytics en desarrollo (opcional)
 */
const FORCE_ANALYTICS_IN_DEV = isFeatureEnabled("NEXT_PUBLIC_FORCE_ANALYTICS");



/**
 * Habilitar analytics
 * - En producción: solo si existe GOOGLE_ANALYTICS_ID
 * - En desarrollo: solo si FORCE_ANALYTICS_IN_DEV está activo
 */
export const ANALYTICS_ENABLED = (() => {
  const isProduction = process.env.NODE_ENV === "production";
  const hasAnalyticsId = !!GOOGLE_ANALYTICS_ID;
  
  // En producción: requiere ID
  if (isProduction) {
    if (!hasAnalyticsId) {
      console.warn("⚠️  Google Analytics deshabilitado: NEXT_PUBLIC_GA_ID no configurado");
    }
    return hasAnalyticsId;
  }
  
  // En desarrollo: solo si se fuerza manualmente
  if (FORCE_ANALYTICS_IN_DEV && hasAnalyticsId) {
    console.log("🔧 Google Analytics habilitado en desarrollo (FORCE_ANALYTICS_IN_DEV=true)");
    return true;
  }
  
  return false;
})();


// Debug en desarrollo
if (process.env.NODE_ENV === "development") {
  console.log("═══════════════════════════════════════════");
  console.log("🔧 MálagaPets - Configuración de Desarrollo");
  console.log("═══════════════════════════════════════════");
  console.log(`📍 Site URL: ${SITE_URL}`);
  console.log(`📍 Strapi URL: ${STRAPI_URL}`);
  console.log(`📊 Google Analytics ID: ${GOOGLE_ANALYTICS_ID || "❌ No configurado"}`);
  console.log(`📊 Analytics Enabled: ${ANALYTICS_ENABLED ? "✅ Sí" : "❌ No"}`);
  console.log(`🔍 Google Verification: ${GOOGLE_VERIFICATION || "❌ No configurado"}`);
  console.log("═══════════════════════════════════════════");
}

// ============================================
// 🌍 INTERNACIONALIZACIÓN (i18n)
// ============================================

/**
 * Locale por defecto
 */
export const DEFAULT_LOCALE = "es";

/**
 * Locales soportados
 */
export const SUPPORTED_LOCALES = ["es", "en", "de", "fr"] as const;

export type Locale = (typeof SUPPORTED_LOCALES)[number];

// ============================================
// 🗺️ CONFIGURACIÓN DE MAPAS
// ============================================

/**
 * Configuración de mapas de Málaga
 */
export const MAPS_CONFIG = {
  enabled: true,
  defaultCenter: {
    lat: 36.7213,
    lng: -4.4213,
  },
  defaultZoom: 13,
  types: ["parks", "vets"] as const,
} as const;

// ============================================
// 📝 CONFIGURACIÓN DEL BLOG
// ============================================

/**
 * Posts por página en diferentes secciones
 */
export const POSTS_PER_PAGE = {
  archive: 12,
  category: 12,
  author: 12,
  search: 15,
  parks: 9,
  vets: 9,
  featured: 3,
} as const;

/**
 * Configuración de imágenes del blog
 */
export const BLOG_IMAGE_SIZES = {
  thumbnail: { width: 150, height: 150 },
  small: { width: 500, height: 500 },
  medium: { width: 750, height: 750 },
  large: { width: 1000, height: 1000 },
  og: { width: 1200, height: 630 },
} as const;

/**
 * Tiempo de lectura
 */
export const READING_CONFIG = {
  wordsPerMinute: 200,
  minReadTime: 1, // minutos
} as const;

// ============================================
// 🔒 CONFIGURACIÓN DE SEGURIDAD Y SEO
// ============================================

/**
 * Bloquear robots en desarrollo/preview
 */
export const BLOCK_ROBOTS = isFeatureEnabled("NEXT_PUBLIC_BLOCK_ROBOTS");

/**
 * Bots bloqueados (scraping AI)
 */
export const BLOCKED_BOTS = [
  "GPTBot",        // OpenAI
  "ChatGPT-User",
  "CCBot",         // Common Crawl
  "anthropic-ai",  // Anthropic
  "Claude-Web",
  "Google-Extended", // Bard/Gemini
  "cohere-ai",
  "Omgilibot",
  "FacebookBot",
  "Diffbot",
] as const;

/**
 * Patrones de archivos públicos (para middleware)
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
  /\.(png|jpg|jpeg|gif|svg|webp|ico|json|xml|txt|pdf|woff|woff2|ttf|eot)$/,
] as const;

// ============================================
// ⏱️ CONFIGURACIÓN DE CACHÉ
// ============================================

/**
 * Tiempos de revalidación para ISR
 */
export const REVALIDATE_TIME = {
  short: 300,      // 5 minutos 
  default: 3600,   // 1 hora
  long: 86400,     // 24 horas 
} as const;


// ============================================
// 🏗️ CONFIGURACIÓN DE AMBIENTE
// ============================================

/**
 * Flags de ambiente
 */
export const ENV = {
  isDevelopment: process.env.NODE_ENV === "development",
  isProduction: process.env.NODE_ENV === "production",
  isTest: process.env.NODE_ENV === "test",
  isVercel: !!process.env.VERCEL,
  vercelEnv: process.env.VERCEL_ENV || "development",
} as const;

// ============================================
// 🔧 FUNCIONES HELPER
// ============================================

/**
 * Obtiene la URL completa de un path
 * @example getFullUrl('/blog/post') // https://malagapets.com/blog/post
 */
export function getFullUrl(path: string): string {
  const cleanPath = path.startsWith("/") ? path : `/${path}`;
  return `${SITE_URL}${cleanPath}`;
}

/**
 * Obtiene URL completa de media de Strapi
 * @example getStrapiMediaUrl('/uploads/image.jpg')
 */
export function getStrapiMediaUrl(path: string | null | undefined): string {
  if (!path) return "";
  if (path.startsWith("http")) return path;
  return `${STRAPI_URL}${path}`;
}

/**
 * Verifica si estamos en el cliente
 */
export function isClient(): boolean {
  return typeof window !== "undefined";
}

/**
 * Verifica si estamos en el servidor
 */
export function isServer(): boolean {
  return typeof window === "undefined";
}

// ============================================
// 📋 VALIDACIÓN EN PRODUCCIÓN
// ============================================
/*
if (ENV.isProduction) {
  console.log("═══════════════════════════════════════════");
  console.log("🚀 MálagaPets - Configuración de Producción");
  console.log("═══════════════════════════════════════════");
  console.log(`📍 Site URL: ${SITE_URL}`);
  console.log(`📍 Strapi URL: ${STRAPI_URL}`);
  console.log(`🔒 Strapi Token: ${STRAPI_API_TOKEN ? "✅ Configurado" : "❌ No configurado"}`);
  console.log(`📊 Google Analytics: ${GOOGLE_ANALYTICS_ID ? `✅ ${GOOGLE_ANALYTICS_ID}` : "❌ Deshabilitado"}`);
  console.log(`📧 Email (Resend): ${RESEND_API_KEY ? "✅ Configurado" : "⚠️  No configurado"}`);
  console.log(`🌍 Locale por defecto: ${DEFAULT_LOCALE}`);
  console.log(`🗺️  Mapas habilitados: ${MAPS_CONFIG.enabled ? "✅ Sí" : "❌ No"}`);
  console.log("═══════════════════════════════════════════");

  // Validar variables críticas
  const criticalVars = [
    { name: "NEXT_PUBLIC_SITE_URL", value: SITE_URL },
    { name: "NEXT_PUBLIC_STRAPI_URL", value: STRAPI_URL },
  ];

  const missingVars = criticalVars.filter(v => !v.value);
  
  if (missingVars.length > 0) {
    console.error("❌ VARIABLES CRÍTICAS NO CONFIGURADAS:");
    missingVars.forEach(v => console.error(`   - ${v.name}`));
    console.error("\nConfigúralas en Vercel Dashboard > Settings > Environment Variables");
  }
}
*/

// ============================================
// 🔐 VARIABLES DE SERVIDOR (NO EXPORTAR AL CLIENTE)
// ============================================

/**
 * Variables que SOLO deben usarse en el servidor
 * ⚠️ NUNCA importar en componentes cliente
 */
export const SERVER_ONLY = {
  strapiToken: STRAPI_API_TOKEN,
  resendApiKey: RESEND_API_KEY,
  jwtSecret: getOptionalEnvVar("JWT_SECRET"),
  databaseUrl: getOptionalEnvVar("DATABASE_URL"),
  emailApiKey: getOptionalEnvVar("EMAIL_API_KEY"),
} as const;

// ============================================
// 📦 TIPOS
// ============================================

export type MapType = (typeof MAPS_CONFIG.types)[number];
export type StrapiEndpoint = keyof typeof STRAPI_ENDPOINTS;
export type BlogSection = keyof typeof POSTS_PER_PAGE;
