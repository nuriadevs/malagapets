// src/app/robots.ts
// ============================================
// ROBOTS.TXT - CONTROL DE BOTS Y CRAWLERS
// ============================================

import { MetadataRoute } from "next";
import { SITE_URL, BLOCK_ROBOTS } from "@/config/constants";

// ============================================
// CONFIGURACIÓN DE BOTS
// ============================================

// Bots de IA que consumen contenido para entrenamiento
const AI_BOTS = [
  "GPTBot",
  "ChatGPT-User",
  "CCBot",
  "anthropic-ai",
  "Claude-Web",
  "ClaudeBot",
  "Google-Extended", // Google Bard/Gemini
  "cohere-ai",
  "Omgilibot",
  "FacebookBot",
  "Diffbot",
  "Bytespider", // ByteDance/TikTok
  "PerplexityBot",
  "ImagesiftBot",
  "Amazonbot",
  "YouBot",
  "Applebot-Extended", // Apple Intelligence
  "Meta-ExternalAgent", // Meta AI
  "PetalBot", // Huawei AI
  "OAI-SearchBot", // OpenAI oficial
];

// Bots agresivos o de bajo valor (decide según tu caso)
const AGGRESSIVE_CRAWLERS = [
  "BLEXBot", // Conocido por crawling agresivo
  "DotBot", // Moz (opcional bloquear si consume muchos recursos)
];

// SEO Crawlers legítimos (permitir con delay)
const SEO_TOOLS = [
  "SemrushBot",
  "AhrefsBot",
  "MJ12bot", // Majestic
  "Screaming Frog SEO Spider",
];

// Rutas bloqueadas para todos
const BLOCKED_PATHS = [
  "/api/",
  "/admin/",
  "/private/",
  "/draft/",
  "/test/",
  "/_next/static/",
  "/*.json",
];

// ============================================
// FUNCIÓN PRINCIPAL
// ============================================
export default function robots(): MetadataRoute.Robots {
  // Bloqueo total en staging/development
  if (BLOCK_ROBOTS) {
    return {
      rules: {
        userAgent: "*",
        disallow: "/",
      },
    };
  }

  // Configuración producción
  return {
    rules: [
      // 1. Googlebot - Máxima prioridad
      {
        userAgent: "Googlebot",
        allow: "/",
        disallow: ["/api/", "/admin/", "/private/", "/draft/", "/test/"],
      },

      // 2. Googlebot Images - Permitir imágenes públicas
      {
        userAgent: "Googlebot-Image",
        allow: ["/", "/images/", "/uploads/"],
        disallow: ["/admin/", "/private/"],
      },

      // 3. Bingbot - Alta prioridad
      {
        userAgent: "Bingbot",
        allow: "/",
        disallow: ["/api/", "/admin/", "/private/", "/draft/"],
        crawlDelay: 1,
      },

      // 4. Yandex - Mercado ruso
      {
        userAgent: "Yandex",
        allow: "/",
        disallow: ["/api/", "/admin/", "/private/"],
        crawlDelay: 2,
      },

      // 5. SEO Tools - Permitir con delay moderado
      {
        userAgent: SEO_TOOLS,
        allow: "/",
        disallow: BLOCKED_PATHS,
        crawlDelay: 10,
      },

      // 6. Crawlers agresivos - Delay alto o bloquear
      {
        userAgent: AGGRESSIVE_CRAWLERS,
        disallow: ["/", "/api/", "/blog/"], // Ajusta según necesites
        crawlDelay: 30,
      },

      // 7. Bots de IA - BLOQUEO TOTAL
      {
        userAgent: AI_BOTS,
        disallow: "/",
      },

      // 8. Regla general para el resto
      {
        userAgent: "*",
        allow: "/",
        disallow: BLOCKED_PATHS,
        crawlDelay: 5,
      },
    ],

    // Sitemaps multilingües
    sitemap: [
      `${SITE_URL}/sitemap.xml`,
      `${SITE_URL}/es/sitemap.xml`,
      `${SITE_URL}/en/sitemap.xml`,
      `${SITE_URL}/de/sitemap.xml`,
      `${SITE_URL}/fr/sitemap.xml`,
    ],

    // Host canónico
    host: SITE_URL,
  };
}

// ============================================
// NOTAS DE IMPLEMENTACIÓN
// ============================================
/*
🎯 DECISIONES A TOMAR:

1. SEO TOOLS (SemrushBot, AhrefsBot):
   ✅ Permitir: Si quieres aparecer en sus herramientas y análisis
   ❌ Bloquear: Si consumen muchos recursos o no te aportan valor

2. AGGRESSIVE_CRAWLERS:
   - BLEXBot: Generalmente se recomienda bloquear
   - DotBot (Moz): Útil para SEO, pero puede ser agresivo

3. AI BOTS:
   - Lista actualizada a 2025
   - Bloqueo total recomendado si no quieres que usen tu contenido

🔍 TESTING:
1. Verifica en: https://tudominio.com/robots.txt
2. Google Search Console > Configuración > robots.txt tester
3. Lighthouse > SEO audit

⚠️ IMPORTANTE:
- Los crawl delays son sugerencias, no todos los bots los respetan
- El orden de las reglas importa: más específicas primero
- Googlebot tiene prioridad máxima para SEO
*/