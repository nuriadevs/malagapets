// components/maps/popups/park-popup.tsx

"use client";

import { useTranslations } from "next-intl";
import { toTitleCase } from "@/lib/utils";
import { parkCardIcons } from "@/data/icons";
import { PopupHeader, PopupRow } from "@/components/maps/popups/components";
import { SectionDivider, BooleanBadge } from "@/components/shared/cards";
import type { ParkCardData } from "@/types/cards";

interface ParkPopupProps {
  data: ParkCardData;
}

export function ParkPopup({ data }: ParkPopupProps) {
  const t = useTranslations("data-cards");
  const iconClass = "w-4 h-4 text-primary shrink-0";

  const streetViewUrl =
    data.googleMapsUrl ??
    (data.coordinates
      ? `https://www.google.com/maps?q=&layer=c&cbll=${data.coordinates.lat},${data.coordinates.lng}`
      : "#");

  const sections = [
    data.address && (
      <PopupRow
        icon={<parkCardIcons.location className={iconClass} />}
        label={t("adress")}
        value={toTitleCase(data.address)}
      />
    ),
    data.schedule && (
      <PopupRow
        icon={<parkCardIcons.schedule className={iconClass} />}
        label={t("schedules")}
        value={data.schedule}
      />
    ),
    data.extension && (
      <PopupRow
        icon={<parkCardIcons.extension className={iconClass} />}
        label={t("length")}
        value={data.extension}
      />
    ),
    data.accessibility && (
      <PopupRow
        icon={<parkCardIcons.accessibility className={iconClass} />}
        label={t("accessibility")}
        value={
          <BooleanBadge
            value={data.accessibility}
            labelYes={t("accessible")}
            labelNo={t("notAccessible")}
          />
        }
      />
    ),
    data.fountain && (
      <PopupRow
        icon={<parkCardIcons.fountain className={iconClass} />}
        label={t("waterFountain")}
        value={
          <BooleanBadge
            value={data.fountain}
            labelYes={t("available")}
            labelNo={t("notAvailableShort")}
          />
        }
      />
    ),
    data.biZone != null && (
      <PopupRow
        icon={<parkCardIcons.arrows className={iconClass} />}
        label={t("biZone")}
        value={
          <BooleanBadge
            value={data.biZone}
            labelYes={t("yes")}
            labelNo={t("no")}
          />
        }
      />
    ),
  ].filter(Boolean);

  return (
    <div className="max-w-md w-full bg-card border-2 border-primary rounded-xl p-4 shadow-2xl">
      <PopupHeader
        title={data.name}
        icon={<parkCardIcons.dog className="w-6 h-6" />}
      />

      <div className="mt-4 space-y-3">
        {sections.map((section, i) => (
          <div key={i}>
            {section}
            {i < sections.length  && <SectionDivider className="mt-2" />}
          </div>
        ))}
      </div>

      <a
        href={streetViewUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="
                    popup-action-btn
                    group flex items-center justify-center gap-2 mt-4 px-4 py-3
                    bg-primary text-primary-foreground
                    rounded-lg font-semibold
                    transition-all duration-200 ease-out
                    shadow-sm hover:shadow-md hover:-translate-y-0.5
                    active:translate-y-0 active:shadow-none
                "
      >
        <parkCardIcons.globe className="w-4 h-4" aria-hidden="true" />
        <span>{t("viewInMaps")}</span>
      </a>
    </div>
  );
}