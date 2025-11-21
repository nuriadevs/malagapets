/**
 * Utilidades de formato de fecha
 * @module utils/date
 */

/**
 * Formatea una fecha en formato corto
 * @param date - Fecha a formatear
 * @param locale - Locale a usar
 * @returns Fecha formateada
 * @example formatDateShort('2024-01-15') // "15 ene 2024"
 */
export function formatDateShort(
  date?: string | Date,
  locale: string = 'es-ES'
): string {
  if (!date) return "";
  const d = new Date(date);
  return new Intl.DateTimeFormat(locale, {
    year: "numeric",
    month: "short",
    day: "numeric",
  }).format(d);
}

/**
 * Formatea una fecha en formato largo
 * @param date - Fecha a formatear
 * @param locale - Locale a usar
 * @returns Fecha formateada
 * @example formatDateLong('2024-01-15') // "15 de enero de 2024"
 */
export function formatDateLong(
  date?: string | Date,
  locale: string = 'es-ES'
): string {
  if (!date) return "";
  const d = new Date(date);
  return new Intl.DateTimeFormat(locale, {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(d);
}

/**
 * Obtiene el tiempo relativo desde una fecha
 * @param date - Fecha a comparar
 * @param locale - Locale a usar
 * @returns Texto con tiempo relativo
 * @example getRelativeTime('2024-01-15') // "hace 2 días"
 */
export function getRelativeTime(
  date: string | Date,
  locale: string = 'es-ES'
): string {
  const d = new Date(date);
  const rtf = new Intl.RelativeTimeFormat(locale, { numeric: 'auto' });
  const diff = d.getTime() - Date.now();
  const diffDays = Math.round(diff / (1000 * 60 * 60 * 24));
  
  if (Math.abs(diffDays) < 1) {
    return rtf.format(0, 'day');
  }
  return rtf.format(diffDays, 'day');
}