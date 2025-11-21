"use client";
import { useTranslations } from "next-intl";
import { MapIframe } from "@/components/maps/map-iframe";
import { ContentLayout } from "@/components/common/content-layout-section";

/* Section for displaying vets maps */
export function VetsMapsSection() {
    const tvets = useTranslations("vets");

    return (
        <ContentLayout
            mainTitle={tvets("title")}
            subtitle={tvets.rich("descriptionRich", {
                highlight: (chunks) => (
                    <span className="text-cyan-600 font-bold">{chunks}</span>
                ),
            })}
            backgroundColor="bg-minimal-gradient"
            sectionLabel={tvets("title")}
        >
            <MapIframe mapType="vets" />
        </ContentLayout>
    );
}
