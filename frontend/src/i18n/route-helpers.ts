// src/i18n/route-helpers.ts

export type RouteType = 
  | 'home'
  | 'blog'
  | 'blog-post'
  | 'blog-category'
  | 'blog-author'
  | 'blog-search'
  | 'blog-archive'
  | 'contact'
  | 'maps'
  | 'guides'
  | 'legal'
  | 'other';

/**
 * Patrones de ruta para cada tipo de contenido en todos los idiomas
 */
const ROUTE_PATTERNS: Record<RouteType, RegExp[]> = {
  'home': [/^\/$/],
  'blog': [/^\/blog$/],
  'blog-post': [
    /^\/blog\/(articulo|post|artikel|article)\/[^/]+$/,
  ],
  'blog-category': [
    /^\/blog\/(categorias|categories|kategorien)\/[^/]+$/,
  ],
  'blog-author': [
    /^\/blog\/(autor|author|auteur)\/[^/]+$/,
  ],
  'blog-search': [
    /^\/blog\/(buscar|search|suche|recherche)$/,
  ],
  'blog-archive': [
    /^\/blog\/(archivo|archive|archiv)$/,
  ],
  'contact': [
    /^\/(contacto|contact|kontakt)$/,
  ],
  'maps': [
    /^\/(mapas|maps|karten|cartes)/,
  ],
  'guides': [
    /^\/(guias|guides|leitfaden)/,
  ],
  'legal': [
    /^\/legal\//,
    /^\/rechtliches\//,
  ],
  'other': [],
};

/**
 * Detecta el tipo de ruta basándose en el pathname
 */
export function detectRouteType(pathname: string): RouteType {
  // Remover el prefijo de locale (es, en, de, fr)
  const cleanPath = pathname.replace(/^\/(es|en|de|fr)/, '');
  
  for (const [type, patterns] of Object.entries(ROUTE_PATTERNS)) {
    if (patterns.some(pattern => pattern.test(cleanPath))) {
      return type as RouteType;
    }
  }
  
  return 'other';
}

/**
 * Extrae el slug del pathname
 */
export function extractSlug(pathname: string): string | null {
  const parts = pathname.split('/').filter(Boolean);
  
  // El slug suele ser el último segmento de la ruta
  // Excluimos el locale si está presente
  const lastPart = parts[parts.length - 1];
  
  // Si el último segmento es uno de los locales, no hay slug
  if (['es', 'en', 'de', 'fr'].includes(lastPart)) {
    return null;
  }
  
  return lastPart;
}

/**
 * Mapeo de tipos de contenido a nombres de colección en Strapi
 */
export const CONTENT_TYPE_TO_COLLECTION: Record<string, string> = {
  'blog-post': 'articles',
  'blog-category': 'categories',
  'blog-author': 'authors',
};