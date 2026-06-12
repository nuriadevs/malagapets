import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


/**
 * Convierte una cadena a formato Sentence Case (primera letra mayúscula, el resto minúsculas).

*/
export const toSentenceCase = (str: string) =>
  str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();

/**
 * Convierte una cadena a formato Title Case (primera letra de cada palabra en mayúscula, el resto minúsculas).
 */
export const toTitleCase = (str: string) =>
  str.toLowerCase().replace(/(?<!\p{L})\p{L}/gu, (char) => char.toUpperCase());

