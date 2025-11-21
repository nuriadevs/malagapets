/**
 * Utilidades de validación
 * @module utils/validation
 */

/**
 * Valida si un string es un email válido
 */
export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

/**
 * Valida si una URL es válida
 */
export function isValidUrl(url: string): boolean {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
}

/**
 * Valida coordenadas geográficas
 */
export function isValidCoords(lat?: number, lon?: number): boolean {
  if (
    typeof lat !== "number" ||
    typeof lon !== "number" ||
    isNaN(lat) ||
    isNaN(lon)
  ) {
    return false;
  }
  return lat >= -90 && lat <= 90 && lon >= -180 && lon <= 180;
}

/**
 * Valida un slug (URL-friendly string)
 */
export function isValidSlug(slug: string): boolean {
  const slugRegex = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
  return slugRegex.test(slug);
}

/**
 * Valida un número de teléfono español
 */
export function isValidSpanishPhone(phone: string): boolean {
  const phoneRegex = /^(?:\+34|0034)?[6789]\d{8}$/;
  return phoneRegex.test(phone.replace(/\s/g, ''));
}