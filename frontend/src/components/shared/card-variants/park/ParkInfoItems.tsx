// shared/cards/card-variants/park/ParkInfoItems.tsx
import { memo } from "react";
import { useTranslations } from "next-intl";
import { toTitleCase } from "@/lib/utils";
import { parkCardIcons } from "@/data/icons";
import { InfoItem, BooleanBadge, SectionDivider } from "@/components/shared/cards/CardAtoms";
import type { ParkCardData } from "@/types/cards";

interface ParkInfoItemsProps {
  data: ParkCardData;
}

export const ParkInfoItems = memo(function ParkInfoItems({ data }: ParkInfoItemsProps) {
  const t = useTranslations("data-cards");
  const iconClass = "w-4 h-4";

  const items = [
    data.address && (
      <InfoItem
        icon={<parkCardIcons.location className={iconClass} />}
        label={t("adress")}
        value={toTitleCase(data.address)}
      />
    ),
    data.schedule && (
      <InfoItem
        icon={<parkCardIcons.schedule className={iconClass} />}
        label={t("schedule")}
        value={data.schedule}
      />
    ),
    data.extension && (
      <InfoItem
        icon={<parkCardIcons.extension className={iconClass} />}
        label={t("length")}
        value={data.extension}
      />
    ),
    data.accessibility != null && (
      <InfoItem
        icon={<parkCardIcons.accessibility className={iconClass} />}
        label={t("accessibility")}
      >
        <BooleanBadge
          value={data.accessibility}
          labelYes={t("accessible")}
          labelNo={t("notAccessible")}
        />
      </InfoItem>
    ),
    data.fountain != null && (
      <InfoItem
        icon={<parkCardIcons.fountain className={iconClass} />}
        label={t("fountain")}
      >
        <BooleanBadge
          value={data.fountain}
          labelYes={t("available")}
          labelNo={t("notAvailableShort")}
        />
      </InfoItem>
    ),
    data.biZone != null && (
      <InfoItem
        icon={<parkCardIcons.arrows className={iconClass} />}
        label={t("biZone")}
      >
        <BooleanBadge
          value={data.biZone}
          labelYes={t("yes")}
          labelNo={t("no")}
        />
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