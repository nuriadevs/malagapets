// src/i18n/routing.ts
import { defineRouting } from 'next-intl/routing';
import { pathnames, locales, localePrefix } from './pathnames';

export const routing = defineRouting({
  locales,
  defaultLocale: 'es',
  pathnames,
  localePrefix
});

export type Locale = (typeof locales)[number];