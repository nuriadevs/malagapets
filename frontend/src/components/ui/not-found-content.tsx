
"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { notFoundIcons } from "@/data/icons";
import { Button } from "@/components/ui/button";


/**
 * NotFoundContent component.
 */
export function NotFoundContent() {

  const [Home, Search, PawPrint] = notFoundIcons;

  const t = useTranslations("notFound");

  const tAccessibility = useTranslations("accessibility");
  const tacces = tAccessibility.raw("notFound");

  return (
    <main className="flex-1 flex items-center justify-center px-4 py-16" role="main" aria-labelledby="error-title">
      <div className="max-w-2xl w-full text-center space-y-8">
        {/* Number 404 and Icon */}
        <div className="space-y-4" role="banner" aria-label={tacces.errorState}>
          <div className="flex justify-center">
            <div className="p-4" role="img" aria-label={tacces.warningIcon}>
              <PawPrint className="w-24 h-24 text-cyan-600" aria-hidden="true"/>
            </div>
          </div>
          <div className="text-8xl font-bold text-cyan-600/50 font-mono" aria-hidden="true">
            404
          </div>
        </div>

        {/* Main content */}
        <div className="space-y-4">
          <h1 id="error-title" className="text-3xl font-bold tracking-tight">
            {t("title")}
          </h1>
          <p className="text-lg text-muted-foreground max-w-lg mx-auto">
            {t("description")}
          </p>
        </div>

        {/* Action buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center" role="group" aria-label={tacces.navigationHelp}>
          <Button asChild className="gap-2 bg-success" aria-label={tacces.backToHome}>
            <Link href="/">
              <Home className="w-4 h-4" aria-hidden="true" />
              {t("backHome")}
            </Link>
          </Button>

          <Button variant="outline" asChild className="gap-2" aria-label={tacces.searchSite}>
            <Link href="/parks">
              <Search className="w-4 h-4" aria-hidden="true"/>
              {t("searchParks")}
            </Link>
          </Button>
        </div>

        {/* Additional information */}
        <section className="mt-12 p-6 bg-muted/50 rounded-xl" aria-labelledby="suggestions-section">
          <h2 id="suggestions-section" className="text-lg font-semibold mb-3">
            {t("suggestions.title")}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm text-muted-foreground" role="list" aria-label={tacces.suggestions}>
            <div className="flex items-center gap-2" role="listitem">
              <div className="w-1.5 h-1.5 bg-success rounded-full" aria-hidden="true"></div>
              {t("suggestions.findParks")}
            </div>
            <div className="flex items-center gap-2" role="listitem">
              <div className="w-1.5 h-1.5 bg-success rounded-full" aria-hidden="true"></div>
              {t("suggestions.checkMap")}
            </div>
            <div className="flex items-center gap-2" role="listitem">
              <div className="w-1.5 h-1.5 bg-success rounded-full" aria-hidden="true"></div>
              {t("suggestions.contactUs")}
            </div>
            <div className="flex items-center gap-2" role="listitem">
              <div className="w-1.5 h-1.5 bg-success rounded-full" aria-hidden="true"></div>
              {t("suggestions.goHome")}
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}