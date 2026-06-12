// src/i18n/pathnames.ts
import type { Pathnames } from "next-intl/routing";
import { locales } from "@/i18n/config";

// localePrefix NO va aquí — vive en routing.ts
export const pathnames: Pathnames<typeof locales> = {
  "/": "/",

  "/explorer": {
    es: "/explorar",
    en: "/explorer",
    de: "/erkunden",
    fr: "/explorer",
  },

  "/directory": {
    es: "/directorio",
    en: "/directory",
    de: "/verzeichnis",
    fr: "/annuaire",
  },
  "/directory/parks": {
    es: "/directorio/parques-caninos",
    en: "/directory/dog-parks",
    de: "/verzeichnis/hundeparks",
    fr: "/annuaire/parcs-canins",
  },
  "/directory/veterinary": {
    es: "/directorio/veterinarios",
    en: "/directory/veterinarians",
    de: "/verzeichnis/tierärzte",
    fr: "/annuaire/vétérinaires",
  },
  "/directory/beaches": {
    es: "/directorio/playas-caninas",
    en: "/directory/dog-beaches",
    de: "/verzeichnis/hundestrände",
    fr: "/annuaire/plages-canines",
  },

  "/blog": "/blog",
  "/blog/categories": {
    es: "/blog/categorias",
    en: "/blog/categories",
    de: "/blog/kategorien",
    fr: "/blog/categories",
  },
  "/blog/categories/[slug]": {
    es: "/blog/categorias/[slug]",
    en: "/blog/categories/[slug]",
    de: "/blog/kategorien/[slug]",
    fr: "/blog/categories/[slug]",
  },
  "/blog/search": {
    es: "/blog/buscar",
    en: "/blog/search",
    de: "/blog/suche",
    fr: "/blog/recherche",
  },
  "/blog/archive": {
    es: "/blog/archivo",
    en: "/blog/archive",
    de: "/blog/archiv",
    fr: "/blog/archive",
  },
  "/blog/post/[slug]": "/blog/post/[slug]",
  "/blog/author/[slug]": {
    es: "/blog/autor/[slug]",
    en: "/blog/author/[slug]",
    de: "/blog/autor/[slug]",
    fr: "/blog/auteur/[slug]",
  },

  "/legal": {
    es: "/legal",
    en: "/legal",
    de: "/rechtliches",
    fr: "/legal",
  },
  "/legal/privacy": "/legal/privacy",
  "/legal/terms": "/legal/terms",
  "/legal/cookies": "/legal/cookies",
} satisfies Pathnames<typeof locales>;

export type AppPathnames = keyof typeof pathnames;
