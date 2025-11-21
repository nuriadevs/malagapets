"use client";

import { useTranslations } from "next-intl";
import { MapIframe } from "@/components/maps/map-iframe";
import { ContentLayout } from "@/components/common/content-layout-section";

/**
 * Component for the Parks Maps Section  
 */
export function ParksMapsSection() {
  const tparks = useTranslations("parks");
  const tAccess = useTranslations("accessibility.main");

  return (
    <ContentLayout
      mainTitle={
        <span
          className="pb-4 text-4xl md:text-5xl font-semibold"
        >
          {tparks("title")}
        </span>
      }
      subtitle={
        <span className="text-xl sm:text-xl lg:text-2xl 
          block"
          style={{ animationDelay: '200ms' }}>
          {tparks.rich("descriptionRich", {
            highlight: (chunks) => (
              <span className="text-cyan-600 font-bold 
                drop-shadow-[0_0_15px_rgba(6,182,212,0.5)]
                hover:text-cyan-500 transition-colors duration-300">
                {chunks}
              </span>
            ),
          })}
        </span>
      }
      sectionLabel={tAccess("parksMaps")}
    >
      <MapIframe mapType="parks" />
    </ContentLayout>
  );
}