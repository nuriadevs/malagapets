/**
 * Utilidades de manipulación de texto
 */

/**
 * Convierte un texto a slug (URL-friendly)
 * @example slugify("Hola Mundo") // "hola-mundo"
 */
export function slugify(text: string): string {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "") // Eliminar acentos
    .replace(/[^a-z0-9\s-]/g, "") // Eliminar caracteres especiales
    .trim()
    .replace(/\s+/g, "-") // Espacios a guiones
    .replace(/-+/g, "-"); // Eliminar guiones múltiples
}

/**
 * Capitaliza las palabras de un texto
 * @example capitalizeText("hola mundo") // "Hola Mundo"
 */
export function capitalizeText(text?: string): string {
  if (!text || typeof text !== "string") return "No disponible";
  return text.toLowerCase().replace(/(?:^|\s)\w/g, (l) => l.toUpperCase());
}

/**
 * Trunca un texto a una longitud máxima
 * @example truncateText("Texto largo", 5) // "Texto..."
 */
export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength).trim() + "...";
}

/**
 * Extrae texto plano de contenido markdown/html
 */
export function extractPlainText(content: string): string {
  return content
    .replace(/<[^>]*>/g, "") // Eliminar HTML
    .replace(/[#*_~`]/g, "") // Eliminar markdown
    .trim();
}

/**
 * Calcula tiempo estimado de lectura
 * @example calculateReadingTime("texto largo...") // 2 (minutos)
 */
export function calculateReadingTime(text: string): number {
  const wordsPerMinute = 200;
  const wordCount = text.trim().split(/\s+/).length;
  return Math.ceil(wordCount / wordsPerMinute);
}