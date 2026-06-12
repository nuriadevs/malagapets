// shared/cards/card-variants/beach/BeachCard.tsx
"use client";

import { memo } from "react";
import { beachCardIcons } from "@/data/icons";
import { FaUmbrellaBeach } from "react-icons/fa";
import { useTranslations } from "next-intl";
import { BaseCard, CardContent, CardFooter } from "../../cards/BaseCard";
import { BeachInfoItems } from "./BeachInfoItems";
import type { BeachCardData } from "@/types/cards";

interface BeachCardProps {
  data: BeachCardData;
  isLoading?: boolean;
}

export const BeachCard = memo(function BeachCard({ data, isLoading = false }: BeachCardProps) {
  const t = useTranslations("data-cards");
  const tAcces = useTranslations("accessibility.card");

  if (!data && !isLoading) {
    console.warn("BeachCard: data es undefined");
    return null;
  }

  return (
    <BaseCard
      id={data?.id ?? "skeleton"}
      headerIcon={<FaUmbrellaBeach className="w-7 h-7" aria-hidden="true" />}
      nameTitle={data?.name}
      isLoading={isLoading}
    >
      <CardContent>
        <BeachInfoItems data={data} />
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
            <beachCardIcons.map className="w-4 h-4" aria-hidden="true" />
            {t("viewInMaps")}
          </a>
        </CardFooter>
      )}
    </BaseCard>
  );
});