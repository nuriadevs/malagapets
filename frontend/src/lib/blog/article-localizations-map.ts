// src/lib/blog/article-localizations-map.ts
/**
 * Mapa manual de localizaciones de artículos
 * Esto es temporal hasta que los artículos estén correctamente vinculados en Strapi
 * 
 * Formato: { slug-en-cualquier-idioma: { locale: slug } }
 */

export const articleLocalizationsMap: Record<string, Record<string, string>> = {
  // Artículo de playas caninas
  'playas-caninas-en-malaga-mapa-guia-completa': {
    es: 'playas-caninas-en-malaga-mapa-guia-completa',
    en: 'dog-beaches-in-malaga-map-complete-guide',
  },
  'dog-beaches-in-malaga-map-complete-guide': {
    es: 'playas-caninas-en-malaga-mapa-guia-completa',
    en: 'dog-beaches-in-malaga-map-complete-guide',
  },
  
  // Agrega más artículos aquí según sea necesario
  // 'slug-articulo-2-es': {
  //   es: 'slug-articulo-2-es',
  //   en: 'slug-article-2-en',
  //   fr: 'slug-article-2-fr',
  // },
};

/**
 * Obtiene el slug de un artículo en un idioma específico
 * @param currentSlug - Slug actual del artículo
 * @param targetLocale - Idioma objetivo
 * @returns Slug en el idioma objetivo o null si no existe
 */
export function getLocalizedSlug(currentSlug: string, targetLocale: string): string | null {
  const localizationsMap = articleLocalizationsMap[currentSlug];
  
  if (!localizationsMap) {
    console.warn(`⚠️ No se encontró mapa de localizaciones para: ${currentSlug}`);
    return null;
  }
  
  const localizedSlug = localizationsMap[targetLocale];
  
  if (!localizedSlug) {
    console.warn(`⚠️ No hay traducción a ${targetLocale} para: ${currentSlug}`);
    return null;
  }
  
  return localizedSlug;
}
