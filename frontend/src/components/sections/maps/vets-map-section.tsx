// src/components/sections/maps/vets-map-section.tsx
"use client";

import { useTranslations } from "next-intl";
import dynamic from "next/dynamic";
import { ContentLayout } from "@/components/common/content-layout-section";

// Import the modular map dynamically
const VetsMapModular = dynamic(
    () => import("@/components/maps/vets-map-modular")
);

/**
 * Section component for Vets Map (using modular structure)
 */
export function VetsMapSection() {
    const tvets = useTranslations("vets");
    const tAccess = useTranslations("accessibility.main");

    return (
        <ContentLayout
            mainTitle={
                <span className="pb-4 text-4xl md:text-5xl font-semibold">
                    {tvets("title")}
                </span>
            }
            subtitle={
                <span
                    className="text-xl sm:text-xl lg:text-2xl block"
                    style={{ animationDelay: '200ms' }}
                >
                    {tvets.rich("descriptionRich", {
                        highlight: (chunks) => (
                            <span className="text-cyan-600 font-bold drop-shadow-[0_0_15px_rgba(6,182,212,0.5)] hover:text-cyan-500 transition-colors duration-300">
                                {chunks}
                            </span>
                        ),
                    })}
                </span>
            }
            sectionLabel={tAccess("vetsMaps")}
        >
            <VetsMapModular />
        </ContentLayout>
    );
}
