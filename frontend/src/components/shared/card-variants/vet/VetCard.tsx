"use client";

import { memo } from "react";
import { vetCardIcons } from "@/data/icons";
import { useTranslations } from "next-intl";
import { BaseCard, CardContent, CardFooter } from "@/components/shared/cards";
import { VetInfoItems } from "@/components/shared/card-variants/vet/VetInfoItems";
import type { VetCardData } from "@/types/cards";

interface VetCardProps {
  data: VetCardData;
  isLoading?: boolean;
}

export const VetCard = memo(function VetCard({ data, isLoading = false }: VetCardProps) {
  const tCards = useTranslations("data-cards");
  const tAcces = useTranslations("accessibility.card");

  if (!data && !isLoading) {
    console.warn("VetCard: data es undefined");
    return null;
  }

  const isHospital = data.type === "hospital";

  return (
    <BaseCard
      id={data.id}
      headerIcon={
        isHospital
          ? <vetCardIcons.vetHospital className="w-7 h-7" aria-hidden="true" />
          : <vetCardIcons.vetClinic   className="w-7 h-7" aria-hidden="true" />
      }
      nameTitle={data.name}
      isLoading={isLoading}
    >
      <CardContent>
        <VetInfoItems data={data} />
      </CardContent>

      {data.googleMapsUrl && (
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
            <vetCardIcons.map className="w-4 h-4" aria-hidden="true" />
            {tCards("viewInMaps")}
          </a>
        </CardFooter>
      )}
    </BaseCard>
  );
});