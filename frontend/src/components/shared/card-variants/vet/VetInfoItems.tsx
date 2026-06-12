// shared/cards/card-variants/vet/VetInfoItems.tsx
"use client";

import { memo } from "react";
import { useTranslations } from "next-intl";
import { vetCardIcons } from "@/data/icons";
import { InfoItem, SectionDivider } from "@/components/shared/cards/CardAtoms";
import type { VetCardData } from "@/types/cards";

interface VetInfoItemsProps {
  data: VetCardData;
}

export const VetInfoItems = memo(function VetInfoItems({ data }: VetInfoItemsProps) {
  const t = useTranslations("data-cards");

  const phoneTypes: Record<string, string> = {
    landline: t("phone.landlineFull"),
    mobile: t("phone.mobileFull"),
    emergency: t("phone.emergency"),
  };

  const items = [

    data.address && (
      <InfoItem
        icon={<vetCardIcons.location className="w-4 h-4" />}
        label={t("adress")}
        value={data.address}
      />
    ),

    data.postalCode && (
      <InfoItem
        icon={<vetCardIcons.house className="w-4 h-4" />}
        label={t("postalCode")}
        value={data.postalCode}
      />
    ),

    data.phones && data.phones.length > 0 && (
      <InfoItem
        icon={<vetCardIcons.phone className="w-4 h-4" />}
        label={t("phone.name")}
      >
        <div className="space-y-2 mt-2">
          {data.phones.map((phone, i) => (
            <div key={i} className="flex items-center gap-2 text-sm flex-wrap">
              <span className="text-muted-foreground shrink-0">
                {phoneTypes[phone.type] ?? phone.type}:
              </span>
              {phone.type === "emergency" ? (
                <span className="inline-flex items-center text-[10.5px] px-2.25 py-[2px] rounded-full bg-destructive text-destructive-foreground">
                  {phone.number ?? t("phone.emergency")}
                </span>
              ) : (
                <span className="font-medium text-muted-foreground">{phone.number}</span>
              )}
            </div>
          ))}
        </div>
      </InfoItem>
    ),

    data.schedule && (
      <InfoItem
        icon={<vetCardIcons.schedule className="w-4 h-4" />}
        label={t("schedule")}
        value={data.schedule}
      />
    ),

    data.daysOpen && (
      <InfoItem
        icon={<vetCardIcons.daysOpen className="w-4 h-4" />}
        label={t("daysOpen")}
        value={data.daysOpen}
      />
    ),

    data.email && (
      <InfoItem
        icon={<vetCardIcons.email className="w-4 h-4" />}
        label={t("email")}
        value={data.email}
      />
    ),

    data.website && (
      <InfoItem
        icon={<vetCardIcons.website className="w-4 h-4" />}
        label={t("website")}
      >
        <div className="space-y-2 mt-2">
          <a
            href={data.website}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block font-medium text-muted-foreground  hover:text-primary/80 transition-colors"
          >
            {data.website}
          </a>
        </div>
      </InfoItem>
    ),

  ].filter(Boolean);

  return (
    <div className="space-y-3">
      {items.map((item, i) => (
        <div key={i}>
          {item}
          {i < items.length && <SectionDivider className="mt-3" />}
        </div>
      ))}
    </div>
  );
});