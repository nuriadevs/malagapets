// src/i18n/routing.ts
import { defineRouting } from "next-intl/routing";
import { locales } from "./config";
import { pathnames } from "./pathnames";
import type { LocalePrefix } from "next-intl/routing";

export const localePrefix: LocalePrefix<typeof locales> = "always";

export const routing = defineRouting({
  locales,
  defaultLocale: "es",
  localePrefix,
  pathnames,
});

export type { Locale } from "./config";
export type AppPathnames = keyof (typeof routing)["pathnames"];
