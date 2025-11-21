"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Settings, X } from "lucide-react"; 
import { ModeToggle } from "@/components/ui/model-toggle";
import { LanguageSwitch } from "@/components/ui/language-switch";


/**
 * SettingsPanel component.
 */
export function SettingsPanel() {
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const tAccessibility = useTranslations("accessibility");
  const tacces = tAccessibility.raw("settingsPanel");

  return (
    <div className="relative">
      {/* Config Button */}
      <button
        onClick={() => setIsSettingsOpen(!isSettingsOpen)}
        aria-expanded={isSettingsOpen}
        aria-haspopup="dialog"
        aria-label={tacces.openSettings}
        className="p-2 rounded-full bg-background border border-border
                   hover:bg-accent hover:text-accent-foreground
                   focus:outline-none focus:ring-2 focus:ring-cyan-600
                   focus:ring-offset-2 transition-all duration-200
                   min-h-[44px] min-w-[44px] flex items-center justify-center cursor-pointer"
      >
        <Settings
          className={`w-5 h-5 transition-transform duration-200 ${
            isSettingsOpen ? "rotate-45" : "rotate-0"
          }`}
          aria-hidden="true"
        />
      </button>

      {/* Settings Panel */}
      {isSettingsOpen && (
        <>
          <div
            className="fixed inset-0 z-40 bg-black/20"
            onClick={() => setIsSettingsOpen(false)}
            aria-hidden="true"
            aria-label={tacces.overlayLabel}
          />

<div
            className="fixed right-4 top-20 lg:absolute lg:right-0 lg:top-full mt-2 w-[calc(100%-2rem)] max-w-80 z-50
                       bg-background border border-border rounded-lg shadow-lg
                       p-4 space-y-4 
                       transition-all duration-300 ease-out
                       animate-in fade-in slide-in-from-top-2"
            role="dialog"
            aria-modal="true"
            aria-labelledby="settings-title"
            aria-describedby="settings-description"
          >
            {/* Panel header*/}
            <div className="flex items-start justify-between border-b border-border pb-3">
              <div className="flex-1">
                <h2 id="settings-title" className="text-lg font-semibold">
                  {tacces.settingsTitle}
                </h2>
                <p
                  id="settings-description"
                  className="text-sm text-muted-foreground"
                >
                  {tacces.settingsDescription}
                </p>
              </div>
              <button
                onClick={() => setIsSettingsOpen(false)}
                aria-label={tacces.closeSettings}
                className="p-1 rounded-full hover:bg-accent hover:text-accent-foreground
                           focus:outline-none focus:ring-2 focus:ring-cyan-600 ml-3"
              >
                <X className="w-4 h-4" aria-hidden="true" />
              </button>
            </div>

            {/* Configuration Controls */}
            <div className="space-y-4">

              <div className="border-t border-border" />

              {/* Theme light/dark */}
              <fieldset className="space-y-2">
                {" "}
                <legend className="text-sm font-medium">
                  {tacces.themeFieldset}
                </legend>
                <ModeToggle />
              </fieldset>

              <div className="border-t border-border" />

              {/* Language change */}
              <fieldset className="space-y-2">
                {" "}
                <legend className="text-sm font-medium">
                  {tacces.textLanguage}
                </legend>
                <LanguageSwitch />
              </fieldset>

              <div className="border-t border-border" />

              <div className="text-xs text-muted-foreground">
                <p>{tacces.settingsNote}</p>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}