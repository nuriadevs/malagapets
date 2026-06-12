// src/app/[locale]/page.tsx
import { Locale } from "@/i18n/routing";
import { Main } from "@/components/layouts/main";
import { HeroSection } from "@/components/sections/hero";
import DiscoverSection from "@/components/sections/discover-section"
import MapHighlightSection from "@/components/sections/map-highlight-section"

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  return (
    <Main ariaLabelKey="main.homeContent">
      <HeroSection />
      <MapHighlightSection />
      <DiscoverSection locale={locale} />
    </Main>
  );
}