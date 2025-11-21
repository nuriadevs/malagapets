"use client";

import { useTranslations } from "next-intl";
import Link from 'next/link';
import { Button } from "@/components/ui/button";
import { useCookieConsent } from "@/hooks/useCookieConsent";

/* Cookie Consent Banner */
export default function CookieConsent() {
  const t = useTranslations("cookie");
  const cookieTypes = t.raw("types");

  const tAccessibility = useTranslations("accessibility");
  const tacces = tAccessibility.raw("cookies");

  const {
    visible,
    showConfig,
    prefs,
    setShowConfig,
    setPrefs,
    acceptAll,
    rejectOptional,
    saveConfig,
    handleKeyDown,
  } = useCookieConsent();

  if (!visible) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="cookie-title"
      aria-describedby="cookie-description"
      className="fixed inset-x-0 bottom-0 z-50 bg-card border-t-2 border-border shadow-xl animate-fade-in
                   sm:inset-x-4 sm:bottom-4 sm:rounded-lg sm:border sm:max-w-md sm:mx-auto
                   lg:max-w-lg"
    >
      <div className="p-4 sm:p-6">
        {!showConfig ? (
          <>
            <div className="mb-4">
              <h2
                id="cookie-title"
                className="text-lg font-semibold text-foreground mb-2"
              >
                🍪 {t("title")}
              </h2>
              <p
                id="cookie-description"
                className="text-sm text-muted-foreground leading-relaxed text-pretty"
              >
                {t("description")}
              </p>
              <p className="text-xs text-muted-foreground mt-2">
                <Link
                  href="/legal/cookies"
                  className="text-primary hover:text-primary/80 underline focus-ring rounded"
                  aria-label={tacces.policyCookiesLink}
                >
                  {t("policyCookies")}
                </Link>
                {" • "}
                <Link
                  href="/legal/privacy"
                  className="text-primary hover:text-primary/80 underline focus-ring rounded"
                  aria-label={tacces.policyPrivacyLink}
                >
                  {t("policyPrivacy")}
                </Link>
              </p>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row sm:justify-end">
              <Button
                variant="outline"
                onClick={rejectOptional}
                onKeyDown={(e) => handleKeyDown(e, rejectOptional)}
                className="order-2 sm:order-1 hover-lift cursor-pointer"
                aria-label={tacces.rejectOptionalButton}
              >
                {t("rejectOptional")}
              </Button>

              <Button
                variant="secondary"
                onClick={() => setShowConfig(true)}
                onKeyDown={(e) => handleKeyDown(e, () => setShowConfig(true))}
                className="order-3 sm:order-2 hover-lift cursor-pointer"
                aria-label={tacces.configureButton}
              >
                {t("configure")}
              </Button>

              <Button
                onClick={acceptAll}
                onKeyDown={(e) => handleKeyDown(e, acceptAll)}
                className="order-1 sm:order-3 bg-success hover:bg-success/90 text-success-foreground hover-lift cursor-pointer"
                aria-label={tacces.acceptAllButton}
              >
                {t("acceptAll")}
              </Button>
            </div>
          </>
        ) : (
          <>
            {/* Configuration Dialog */}
            <div className="mb-4">
              <h3
                id="cookie-config-title"
                className="text-lg font-semibold text-gray-900 mb-3"
              >
                {t("configTitle")}
              </h3>
              <p className="text-sm text-gray-600 mb-4">
                {t("configDescription")}
              </p>
            </div>

            <div
              className="space-y-4 py-4"
              role="group"
              aria-labelledby="cookie-config-title"
            >
              <div className="border border-border rounded-lg p-3 bg-surface-sunken">
                <label className="flex items-start gap-3 cursor-not-allowed">
                  <input
                    type="checkbox"
                    checked={true}
                    disabled
                    className="mt-1 h-4 w-4 text-primary border-border rounded focus:ring-primary opacity-50"
                    aria-describedby="necessary-desc"
                  />
                  <div>
                    <span className="font-medium text-foreground">
                      {cookieTypes.necessaryLabel}
                    </span>
                    <span className="text-xs text-muted-foreground ml-2">
                      {cookieTypes.necessaryRequired}
                    </span>
                    <p
                      id="necessary-desc"
                      className="text-xs text-muted-foreground mt-1"
                    >
                      {cookieTypes.necessaryDesc}
                    </p>
                  </div>
                </label>
              </div>

              <div className="border border-border rounded-lg p-3 hover:border-primary/50 transition-colors">
                <label className="flex items-start gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={prefs.functional}
                    onChange={(e) =>
                      setPrefs({ ...prefs, functional: e.target.checked })
                    }
                    className="mt-1 h-4 w-4 text-primary border-border rounded focus:ring-primary focus-ring"
                    aria-describedby="functional-desc"
                  />
                  <div>
                    <span className="font-medium text-foreground">
                      {cookieTypes.functionalLabel}
                    </span>
                    <p
                      id="functional-desc"
                      className="text-xs text-muted-foreground mt-1"
                    >
                      {cookieTypes.functionalDesc}
                    </p>
                  </div>
                </label>
              </div>

              <div className="border border-border rounded-lg p-3 hover:border-primary/50 transition-colors">
                <label className="flex items-start gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={prefs.analytics}
                    onChange={(e) =>
                      setPrefs({ ...prefs, analytics: e.target.checked })
                    }
                    className="mt-1 h-4 w-4 text-primary border-border rounded focus:ring-primary focus-ring"
                    aria-describedby="analytics-desc"
                  />
                  <div>
                    <span className="font-medium text-foreground">
                      {cookieTypes.analyticsLabel}
                    </span>
                    <p
                      id="analytics-desc"
                      className="text-xs text-muted-foreground mt-1"
                    >
                      {cookieTypes.analyticsDesc}
                    </p>
                  </div>
                </label>
              </div>

              <div className="border border-border rounded-lg p-3 hover:border-primary/50 transition-colors">
                <label className="flex items-start gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={prefs.marketing}
                    onChange={(e) =>
                      setPrefs({ ...prefs, marketing: e.target.checked })
                    }
                    className="mt-1 h-4 w-4 text-primary border-border rounded focus:ring-primary focus-ring"
                    aria-describedby="marketing-desc"
                  />
                  <div>
                    <span className="font-medium text-foreground">
                      {cookieTypes.marketingLabel}
                    </span>
                    <p
                      id="marketing-desc"
                      className="text-xs text-muted-foreground mt-1"
                    >
                      {cookieTypes.marketingDesc}
                    </p>
                  </div>
                </label>
              </div>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row sm:justify-end">
              <Button
                variant="outline"
                onClick={() => setShowConfig(false)}
                onKeyDown={(e) => handleKeyDown(e, () => setShowConfig(false))}
                className="hover-lift cursor-pointer"
                aria-label={tacces.backButton}
              >
                {t("back")}
              </Button>
              <Button
                onClick={saveConfig}
                onKeyDown={(e) => handleKeyDown(e, saveConfig)}
                data-cookie-save
                className="bg-success hover:bg-success/90 text-success-foreground hover-lift cursor-pointer"
                aria-label={tacces.savePreferencesButton}
              >
                {t("savePreferences")}
              </Button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
