// src/components/sections/maps/parks-map-section.tsx
"use client";

import { useTranslations } from "next-intl";
import dynamic from "next/dynamic";
import { ContentLayout } from "@/components/common/content-layout-section";

// Import the modular map dynamically
const ParksMapModular = dynamic(
    () => import("@/components/maps/parks-map-modular")
);

/**
 * Section component for Parks Map (using modular structure)
 */
export function ParksMapSection() {
    const tparks = useTranslations("parks");
    const tAccess = useTranslations("accessibility.main");

    return (
        <ContentLayout
            mainTitle={
                <span className="pb-4 text-4xl md:text-5xl font-semibold">
                    {tparks("title")}
                </span>
            }
            subtitle={
                <span
                    className="text-xl sm:text-xl lg:text-2xl block"
                    style={{ animationDelay: '200ms' }}
                >
                    {tparks.rich("descriptionRich", {
                        highlight: (chunks) => (
                            <span className="text-cyan-600 font-bold drop-shadow-[0_0_15px_rgba(6,182,212,0.5)] hover:text-cyan-500 transition-colors duration-300">
                                {chunks}
                            </span>
                        ),
                    })}
                </span>
            }
            sectionLabel={tAccess("parksMaps")}
        >
            <ParksMapModular />
        </ContentLayout>
    );
}
