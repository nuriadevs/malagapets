"use client";

import Link from "next/link";
import { useTranslations } from "next-intl";
import { SettingsPanel } from "@/components/ui/settings-panel";
import Image from "next/image";
import { DesktopNav } from "@/components/layouts/nav-desktop";
import { MobileNav } from "@/components/layouts/nav-mobile";
import { ModeToggle } from "@/components/ui/model-toggle";
import { LanguageSwitch } from "@/components/ui/language-switch";
import { useState, useEffect } from "react";

/**
 * Header component with modern glassmorphism and scroll effects.
 */
export function Header() {
  const tAccess = useTranslations("accessibility.header");
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setScrolled(window.scrollY > 20);
          ticking = false;
        });
        ticking = true;
      }
    };

    // ✅ Throttle con requestAnimationFrame
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 w-full 
        border-b transition-all duration-700 ease-out
        ${scrolled
          ? "border-cyan-500/40 bg-background/90 backdrop-blur-3xl shadow-2xl shadow-cyan-500/15"
          : "border-border/5 bg-background/50 backdrop-blur-md shadow-lg"
        }`}
      aria-label={tAccess("headerLabel")}
    >
      {/* Gradient border animado en scroll */}
      <div
        className={`absolute inset-x-0 bottom-0 h-[1px] bg-gradient-to-r
          from-foreground via-cyan-600 to-foreground
          transition-opacity duration-700
          ${scrolled ? 'opacity-100' : 'opacity-0'}`}
      />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl py-2">
        <div className="flex items-center justify-between h-16 sm:h-18 lg:h-20">

          {/* Logo */}
          <div className="flex-1 flex items-center">
            <Link
              href="/"
              aria-label={tAccess("logoLabel")}
              className="flex items-center gap-3 lg:gap-4 group
      focus:outline-none focus-visible:ring-2 focus-visible:ring-white/40
      rounded-lg p-1.5 -ml-1.5
      transition-opacity duration-200 hover:opacity-80"
            >
              {/* Logo */}
              <Image
                src="/images/pets.png"
                alt="Logo MálagaPets"
                width={40}
                height={40}
                className="w-9 h-9 sm:w-10 sm:h-10 lg:w-11 lg:h-11
        object-contain"
                quality={40} 
                
              />

              {/* Texto del logo */}
              <div className="hidden sm:block">
                <span className="text-xl lg:text-2xl
        font-black tracking-tight
        text-foreground/80">
                  MálagaPets
                </span>
              </div>
            </Link>
          </div>

          {/* Main Navigation */}
          <div className="hidden lg:flex flex-1 justify-end mr-6">
            <DesktopNav />
            {/* Settings - Desktop */}
            <div className="hidden lg:flex items-center space-x-3 ml-6">
              <ModeToggle />
              <LanguageSwitch />
            </div>
          </div>

          {/* User Controls - Mobile */}
          <div
            className="flex items-center space-x-2 sm:space-x-3"
            role="toolbar"
            aria-label={tAccess("navigationToolbar")}
          >
            {/* Settings - mobile and tablet only */}
            <div className="lg:hidden">
              <SettingsPanel />
            </div>
            {/* Mobile Navigation - visible until lg */}
            <div className="lg:hidden">
              <MobileNav />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}