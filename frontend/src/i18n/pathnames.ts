// src/i18n/pathnames.ts
import type { Pathnames, LocalePrefix } from 'next-intl/routing';

export const locales = ['es', 'en', 'de', 'fr'] as const;
export const defaultLocale = 'es' as const;

export type Locale = (typeof locales)[number];

// Configuración de prefijos de locale en URL
export const localePrefix: LocalePrefix<typeof locales> = 'always';

// Definición de rutas traducidas
export const pathnames: Pathnames<typeof locales> = {
  // Rutas principales
  '/': '/',
  
  // Mapas
  '/maps': {
    es: '/mapas',
    en: '/maps',
    de: '/karten',
    fr: '/cartes'
  },
  '/maps/parks': {
    es: '/mapas/parques-caninos',
    en: '/maps/dog-parks',
    de: '/karten/hundeparks',
    fr: '/cartes/parcs-canins'
  },
  '/maps/veterinary': {
    es: '/mapas/veterinarios',
    en: '/maps/veterinarians',
    de: '/karten/tierarzte',
    fr: '/cartes/veterinaires'
  },
  '/maps/beaches': {
    es: '/mapas/playas-caninas',
    en: '/maps/dog-beaches',
    de: '/karten/hundestrande',
    fr: '/cartes/plages-canines'
  },
  
  // Guías
  '/guides': {
    es: '/guias',
    en: '/guides',
    de: '/leitfaden',
    fr: '/guides'
  },
  '/guides/parks': {
    es: '/guias/parques-caninos',
    en: '/guides/dog-parks',
    de: '/leitfaden/hundeparks',
    fr: '/guides/parcs-canins'
  },
  '/guides/veterinary': {
    es: '/guias/veterinarios',
    en: '/guides/veterinarians',
    de: '/leitfaden/tierarzte',
    fr: '/guides/veterinaires'
  },
  '/guides/beaches': {
    es: '/guias/playas-caninas',
    en: '/guides/dog-beaches',
    de: '/leitfaden/hundestrande',
    fr: '/guides/plages-canines'
  },
  
  // Blog
  '/blog': '/blog',
  '/blog/categories': {
    es: '/blog/categorias',
    en: '/blog/categories',
    de: '/blog/kategorien',
    fr: '/blog/categories'
  },
  '/blog/categories/[slug]': {
    es: '/blog/categorias/[slug]',
    en: '/blog/categories/[slug]',
    de: '/blog/kategorien/[slug]',
    fr: '/blog/categories/[slug]'
  },
  '/blog/search': {
    es: '/blog/buscar',
    en: '/blog/search',
    de: '/blog/suche',
    fr: '/blog/recherche'
  },
  '/blog/archive': {
    es: '/blog/archivo',
    en: '/blog/archive',
    de: '/blog/archiv',
    fr: '/blog/archive'
  },
  '/blog/post/[slug]': {
    es: '/blog/articulo/[slug]',
    en: '/blog/post/[slug]',
    de: '/blog/artikel/[slug]',
    fr: '/blog/article/[slug]'
  },
  '/blog/author/[slug]': {
    es: '/blog/autor/[slug]',
    en: '/blog/author/[slug]',
    de: '/blog/autor/[slug]',
    fr: '/blog/auteur/[slug]'
  },
  
  // Contacto
  '/contact': {
    es: '/contacto',
    en: '/contact',
    de: '/kontakt',
    fr: '/contact'
  },
  
  // Legal
  '/legal/privacy': {
    es: '/legal/privacidad',
    en: '/legal/privacy',
    de: '/rechtliches/datenschutz',
    fr: '/legal/confidentialite'
  },
  '/legal/terms': {
    es: '/legal/terminos',
    en: '/legal/terms',
    de: '/rechtliches/nutzungsbedingungen',
    fr: '/legal/conditions'
  },
  '/legal/cookies': {
    es: '/legal/cookies',
    en: '/legal/cookies',
    de: '/rechtliches/cookies',
    fr: '/legal/cookies'
  }
};

export type AppPathnames = keyof typeof pathnames;