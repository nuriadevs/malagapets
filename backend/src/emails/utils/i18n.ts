// src/emails/utils/i18n.ts

import esTranslations from "../locales/es.json";
import enTranslations from "../locales/en.json";
import deTranslations from "../locales/de.json";
import frTranslations from "../locales/fr.json";

type Translations = typeof esTranslations;

const translations: Record<string, Translations> = {
  es: esTranslations,
  en: enTranslations,
  de: deTranslations,
  fr: frTranslations,
};

const supportedLocales = ["es", "en", "de", "fr"] as const;
type SupportedLocale = (typeof supportedLocales)[number];

/**
 * Obtiene las traducciones para un idioma específico
 */
export function getTranslations(locale: string): Translations {
  const normalizedLocale = supportedLocales.includes(locale as SupportedLocale)
    ? locale
    : "es";

  return translations[normalizedLocale] || translations.es;
}

/**
 * Reemplaza variables en una cadena de traducción
 * Ejemplo: "Hello {{name}}" con { name: "John" } → "Hello John"
 */
export function interpolate(
  text: string,
  variables: Record<string, string | number>
): string {
  return text.replace(/\{\{(\w+)\}\}/g, (match, key) => {
    return variables[key]?.toString() || match;
  });
}

/**
 * Obtiene una traducción específica con interpolación de variables
 */
export function t(
  locale: string,
  key: string,
  variables?: Record<string, string | number>
): string {
  const trans = getTranslations(locale);

  // Navega por el objeto de traducciones usando la key con puntos
  const keys = key.split(".");
  let value: any = trans;

  for (const k of keys) {
    value = value?.[k];
  }

  if (typeof value !== "string") {
    console.warn(`Translation key "${key}" not found for locale "${locale}"`);
    return key;
  }

  return variables ? interpolate(value, variables) : value;
}

/**
 * Obtiene el asunto del email según el tipo y el idioma
 */
export function getEmailSubject(
  type: "confirmation" | "welcome" | "unsubscribe",
  locale: string
): string {
  return t(locale, `subjects.${type}`);
}

/**
 * Hook para usar en componentes React Email
 */
export function useEmailTranslations(locale: string) {
  const trans = getTranslations(locale);

  return {
    t: (key: string, variables?: Record<string, string | number>) =>
      t(locale, key, variables),
    translations: trans,
    locale,
  };
}
