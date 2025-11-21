
export const LOCALES = ["es", "en", "de", "fr"] as const;
export type Locale = typeof LOCALES[number];