"use client";

import { useTranslations } from "next-intl";
import { PopupHeader, PopupRow } from "@/components/maps/popups/components";
import { SectionDivider } from "@/components/shared/cards";
import { vetCardIcons } from "@/data/icons";
import type { VetCardData } from "@/types/cards";

interface VetPopupProps {
  data: VetCardData;
}

export function VetPopup({ data }: VetPopupProps) {
  const t = useTranslations("data-cards");
  const iconClass = "w-4 h-4 text-primary shrink-0";

  const phoneTypes: Record<string, string> = {
    landline: t("phone.landlineFull"),
    mobile: t("phone.mobileFull"),
    emergency: t("phone.emergency"),
  };

  const icon =
    data.type === "clinic"
      ? <vetCardIcons.vetClinic className="w-6 h-6" aria-hidden="true" />
      : <vetCardIcons.vetHospital className="w-6 h-6" aria-hidden="true" />;

  const sections = [
    data.address && (
      <PopupRow
        icon={<vetCardIcons.location className={iconClass} />}
        label={t("adress")}
        value={data.address}
      />
    ),

    data.postalCode && (
      <PopupRow
        icon={<vetCardIcons.house className={iconClass} />}
        label={t("postalCode")}
        value={data.postalCode}
      />
    ),

    data.phones.length > 0 && (
      <PopupRow
        icon={<vetCardIcons.phone className={iconClass} />}
        label={t("phone.phones")}
        value={
          <div className="flex flex-col gap-2">
            {data.phones.map((phone, i) => (
              <div key={i} className="flex items-center gap-2">
                <span className="inline-flex items-center">
                  {phoneTypes[phone.type] ?? phone.type}
                </span>
                <span className={phone.type === "emergency" ? "text-destructive font-semibold" : ""}>
                  {phone.number}
                </span>
              </div>
            ))}
          </div>
        }
      />
    ),

    data.schedule && (
      <PopupRow
        icon={<vetCardIcons.schedule className={iconClass} />}
        label={t("schedule")}
        value={data.schedule}
      />
    ),

    data.daysOpen && (
      <PopupRow
        icon={<vetCardIcons.daysOpen className={iconClass} />}
        label={t("daysOpen")}
        value={data.daysOpen}
      />
    ),

    data.email && (
      <PopupRow
        icon={<vetCardIcons.email className={iconClass} />}
        label={t("email")}
        value={<span className="text-primary-text">{data.email}</span>}
      />
    ),

    data.website && (
      <PopupRow
        icon={<vetCardIcons.website className={iconClass} />}
        label={t("website")}
        value={
          <a
            href={data.website}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block font-medium text-muted-foreground! hover:text-primary/80! transition-colors"
          >
            {data.website.replace(/(^\w+:|^)\/\//, "")}
          </a>
        }
      />
    ),
  ].filter(Boolean);

  return (
    <div className="max-w-md w-full bg-card border-2 border-primary rounded-xl p-4 shadow-2xl">
      <PopupHeader
        title={data.name}
        icon={icon}
      />

      <div className="mt-4 space-y-3">
        {sections.map((section, i) => (
          <div key={i}>
            {section}
            {i < sections.length && <SectionDivider className="mt-2" />}
          </div>
        ))}
      </div>

      {data.googleMapsUrl && (
        <a
          href={data.googleMapsUrl}
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
          <vetCardIcons.map className="w-4 h-4" aria-hidden="true" />
          <span>{t("viewInMaps")}</span>
        </a>
      )}
    </div>
  );
}