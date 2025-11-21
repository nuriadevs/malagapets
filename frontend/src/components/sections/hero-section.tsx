// src/components/sections/hero-section.tsx
"use client";

import { useTranslations } from "next-intl";
import { ContentLayout } from "@/components/common/content-layout-section";
import { MissionSection } from "@/components/sections/mission-section";

export function HeroSection() {
  const t = useTranslations("homepage");
  const tAccess = useTranslations("accessibility.main");

  return (
    <ContentLayout
      mainTitle={
        <span className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl
          font-black pb-4 text-white
          bg-clip-text
          drop-shadow-2xl
          animate-fadeInUp
          leading-tight tracking-tight">
          {t("title")}
        </span>
      }
      subtitle={
        <span className="text-xl sm:text-2xl lg:text-3xl
          font-medium leading-relaxed text-white drop-shadow-lg
          animate-fadeInUp
          block"
          style={{ animationDelay: '200ms' }}>
          {t("subtitle.part1")}
          <span className="text-cyan-400 font-bold 
            drop-shadow-[0_0_15px_rgba(6,182,212,0.5)]
            hover:text-cyan-300 transition-colors duration-300">
            {t("subtitle.highlight")}
          </span>
          {t("subtitle.part2")}
        </span>
      }
      sectionLabel={tAccess("homeContent")}
    >
      <MissionSection />
    </ContentLayout>
  );
}