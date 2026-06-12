"use client";

import { memo } from "react";
import { parkCardIcons } from "@/data/icons";
import { useTranslations } from "next-intl";
import { BaseCard, CardContent, CardFooter } from "@/components/shared/cards";
import { ParkInfoItems } from "./ParkInfoItems";
import type { ParkCardData } from "@/types/cards";

interface ParkCardProps {
  data: ParkCardData;
  isLoading?: boolean;
}

export const ParkCard = memo(function ParkCard({ data, isLoading = false }: ParkCardProps) {
  const t = useTranslations("data-cards");
  const tAcces = useTranslations("accessibility.card");

  if (!data && !isLoading) {
    console.warn("ParkCard: data es undefined");
    return null;
  }

  return (
    <BaseCard
      id={data?.id ?? "skeleton"}
      headerIcon={<parkCardIcons.dog className="w-7 h-7" aria-hidden="true" />}
      nameTitle={data?.name}
      isLoading={isLoading}
    >
      <CardContent>
        <ParkInfoItems data={data} />
      </CardContent>

      {data?.googleMapsUrl && (
        <CardFooter>
          <a
            href={data.googleMapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={tAcces("viewOnMaps")}
            className="
              popup-action-btn w-full flex items-center justify-center gap-2
              px-4 py-3 rounded-xl font-semibold text-sm
              bg-primary text-primary-foreground
              hover:bg-[color-mix(in_oklch,var(--color-primary)_88%,white)]
              active:bg-[color-mix(in_oklch,var(--color-primary)_85%,black)]
              transition-all duration-200 ease-out
              shadow-sm hover:shadow-md hover:-translate-y-0.5
              active:translate-y-0 active:shadow-none
              focus-visible:outline-none focus-visible:ring-2
              focus-visible:ring-ring focus-visible:ring-offset-2
            "
          >
            <parkCardIcons.map className="w-4 h-4" aria-hidden="true" />
            {t("viewInMaps")}
          </a>
        </CardFooter>
      )}
    </BaseCard>
  );
});