"use client";
import { useTranslations } from "next-intl";
import { MapIframe } from "@/components/maps/map-iframe";

/* Section for displaying park maps */
export function ParksMapsSection() {
  const tparks = useTranslations("parks");

  return (
    <section
      aria-labelledby="parks-heading"
      className="relative pt-10 sm:pt-16 lg:pt-24 xl:pt-24 pb-2 sm:pb-4 lg:pb-6 xl:pb-8 bg-gradient-to-b"
    >
      <div className="container py-4 mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        <div className="grid grid-cols-1 gap-4 lg:gap-6 xl:gap-8 items-center">
          <h1
            id="parks-heading"
            className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold leading-tight text-foreground  flex justify-center text-center"
          >
            {tparks("title")}
          </h1>
          <p className="text-lg sm:text-xl lg:text-2xl leading-relaxed font-medium text-muted-foreground mx-auto max-w-7xl text-center">
            {tparks.rich("descriptionRich", {
              highlight: (chunks) => (
                <span className="text-cyan-600 font-bold">{chunks}</span>
              ),
            })}
          </p>
        </div>
      </div>
      <MapIframe mapType="parks" />
    </section>
  );
}
