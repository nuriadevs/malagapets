"use client";

import { cn } from "@/lib/utils"
import { useTranslations } from "next-intl";
import { SettingsPanel } from "@/components/ui/settings-panel";
import Image from "next/image";
import { DesktopNav } from "@/components/layouts/nav-desktop";
import { MobileNav } from "@/components/layouts/nav-mobile";
import { ModeToggle } from "@/components/ui/mode-toggle";
import { LanguageSwitch } from "@/components/ui/language-switch";
import { useState, useEffect } from "react";

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
        window.addEventListener("scroll", handleScroll, { passive: true });
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <header
            aria-label={tAccess("headerLabel")}
            className={cn(
                "sticky top-0 z-50 w-full border-b",
                "transition-[background-color,backdrop-filter,box-shadow,border-color] duration-700 ease-out motion-reduce:transition-none",
                scrolled
                    ? "border-nav-accent/40 bg-background/90 backdrop-blur-3xl shadow-2xl shadow-(--nav-accent)/15"
                    : "border-border/5 bg-background/50 backdrop-blur-md shadow-lg"
            )}
        >
            <div
                aria-hidden="true"
                className={cn(
                    "absolute inset-x-0 bottom-0 h-px bg-linear-to-r from-foreground via-nav-accent to-foreground",
                    "transition-opacity duration-700",
                    scrolled ? "opacity-100" : "opacity-0"
                )}
            />

            <div className="max-w-screen-2xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-2">
                <div className="flex items-center justify-between h-16 sm:h-18 lg:h-20">

                    <div className="flex-1 flex items-center">
                        <div className="flex items-center gap-3 lg:gap-4 p-1.5 -ml-1.5">
                            <Image
                                src="/images/icon.svg"
                                alt=""
                                aria-hidden="true"
                                width={40}
                                height={40}
                                className="w-9 h-9 sm:w-10 sm:h-10 lg:w-11 lg:h-11 object-contain"
                                quality={75}
                            />
                            <span className="hidden sm:block text-xl lg:text-2xl font-bold tracking-tight text-foreground">
                                MálagaPets
                            </span>
                        </div>
                    </div>

                    <div className="hidden lg:flex flex-1 justify-end items-center gap-6">
                        <DesktopNav />
                        <div className="flex items-center gap-3">
                            <ModeToggle />
                            <LanguageSwitch />
                        </div>
                    </div>

                    <div
                        className="flex items-center gap-2 sm:gap-3"
                        role="toolbar"
                        aria-label={tAccess("navigationToolbar")}
                    >
                        <div className="lg:hidden">
                            <SettingsPanel />
                        </div>
                        <div className="lg:hidden">
                            <MobileNav />
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
}
