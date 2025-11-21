// src/components/sections/contact-section.tsx
"use client";

import { useTranslations } from "next-intl";
import ContactPage from "@/components/common/form-contact";

/**
 * Section for displaying contact form and information
 */
export function ContactSection() {
    const t = useTranslations("contact");
    const tAccess = useTranslations("accessibility.contact");

    return (
        <section
            aria-labelledby= {tAccess("main")}
            className="relative pt-10 sm:pt-16 lg:pt-24 xl:pt-24 pb-12 sm:pb-16 lg:pb-20 xl:pb-24"
        >
            {/* Header */}
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl mb-12 sm:mb-16 lg:mb-20">
                <div className="text-center space-y-4 lg:space-y-6">
                    <h1
                        id="contact-heading"
                        className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold leading-tight text-foreground/80"
                    >
                        {t("title")}
                    </h1>
                    <p className="text-lg sm:text-xl lg:text-2xl leading-relaxed font-medium text-muted-foreground mx-auto max-w-7xl text-center">
                        {t("subtitle")}
                    </p>
                </div>
            </div>

            {/* Contact Form */}
            <ContactPage />
        </section>
    );
}