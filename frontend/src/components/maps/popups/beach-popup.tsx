"use client";

import { useTranslations } from "next-intl";
import { PopupHeader, PopupRow } from "@/components/maps/popups/components";
import { SectionDivider } from "@/components/shared/cards";
import { beachCardIcons } from "@/data/icons";
import type { BeachCardData } from "@/types/cards";

interface BeachPopupProps {
  data: BeachCardData;
}

export function BeachPopup({ data }: BeachPopupProps) {
  const t = useTranslations("data-cards");
  const iconClass = "w-4 h-4 text-primary shrink-0";

  const mapsUrl =
    data.googleMapsUrl ??
    `https://www.google.com/maps?q=${data.coordinates.lat},${data.coordinates.lng}`;

  const services = [
    { key: "dogShower",      value: data.services.dogShower,      label: t("dogShower"),      icon: <beachCardIcons.dogShower      className={iconClass} /> },
    { key: "waterFountain",  value: data.services.waterFountain,  label: t("waterFountain"),  icon: <beachCardIcons.waterFountain  className={iconClass} /> },
    { key: "trashBins",      value: data.services.trashBins,      label: t("trashBins"),      icon: <beachCardIcons.trashBins      className={iconClass} /> },
    { key: "parking",        value: data.services.parking,        label: t("parking"),        icon: <beachCardIcons.parking        className={iconClass} /> },
    { key: "agilityArea",    value: data.services.agilityArea,    label: t("agilityArea"),    icon: <beachCardIcons.agilityArea    className={iconClass} /> },
    { key: "bagDispenser",   value: data.services.bagDispenser,   label: t("bagDispenser"),   icon: <beachCardIcons.bagDispenser   className={iconClass} /> },
  ].filter(({ value }) => value);

  const accessItems = data.access
    ? [
        { key: "type",                 value: data.access.type,                 label: t("accessType"),          type: "text"    },
        { key: "by_car",               value: data.access.by_car,               label: t("accessByCar"),         type: "boolean" },
        { key: "distance_from_center", value: data.access.distance_from_center, label: t("distanceFromCenter"),  type: "text"    },
        { key: "access_road",          value: data.access.access_road,          label: t("accessRoad"),          type: "text"    },
        { key: "references",           value: data.access.references,           label: t("accessReferences"),    type: "text"    },
      ].filter((i) => i.value !== undefined && i.value !== null && i.value !== "")
    : [];

  const sections = [
    data.location && (
      <PopupRow
        icon={<beachCardIcons.location className={iconClass} />}
        label={t("location")}
        value={data.location}
      />
    ),

    data.municipality && (
      <PopupRow
        icon={<beachCardIcons.municipality className={iconClass} />}
        label={t("municipality")}
        value={data.municipality}
      />
    ),

    data.area && (
      <PopupRow
        icon={<beachCardIcons.extension className={iconClass} />}
        label={t("dimensions")}
        value={
          <div className="flex flex-col gap-0.5">
            <span><span className="font-medium">{t("length")}:</span> {data.length}</span>
            <span><span className="font-medium">{t("area")}:</span> {data.area}</span>
          </div>
        }
      />
    ),

    (data.schedule.summer || data.schedule.winter || data.schedule.yearRound) && (
      <PopupRow
        icon={<beachCardIcons.schedule className={iconClass} />}
        label={t("schedule")}
        value={
          <div className="flex flex-col gap-0.5">
            {data.schedule.yearRound && <span><span className="font-medium">{t("year_round")}:</span> {data.schedule.yearRound}</span>}
            {data.schedule.summer    && <span><span className="font-medium">{t("summerSchedule")}:</span> {data.schedule.summer}</span>}
            {data.schedule.winter    && <span><span className="font-medium">{t("winterSchedule")}:</span> {data.schedule.winter}</span>}
          </div>
        }
      />
    ),

    services.length > 0 && (
      <PopupRow
        icon={<beachCardIcons.services className={iconClass} />}
        label={t("services")}
        value={
          <div className="flex flex-wrap gap-1.5">
            {services.map(({ key, label, icon }) => (
              <span key={key} className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full font-semibold border bg-primary/10 text-foreground border-primary/20">
                {icon}
                {label}
              </span>
            ))}
          </div>
        }
      />
    ),

    accessItems.length > 0 && (
      <PopupRow
        icon={<beachCardIcons.road className={iconClass} />}
        label={t("access")}
        value={
          <div className="flex flex-col gap-1">
            {accessItems.map((item) => (
              <div key={item.key} className="flex items-start gap-1">
                <span className="font-medium shrink-0">{item.label}:</span>
                {item.type === "boolean" ? (
                  <span className="flex items-center gap-1">
                    {item.value
                      ? <beachCardIcons.checkCircle className="w-3.5 h-3.5 text-primary" />
                      : <beachCardIcons.closeCircle className="w-3.5 h-3.5 text-destructive" />
                    }
                    {item.value ? t("yes") : t("no")}
                  </span>
                ) : (
                  <span>{String(item.value)}</span>
                )}
              </div>
            ))}
          </div>
        }
      />
    ),

    data.certifications && data.certifications.length > 0 && (
      <PopupRow
        icon={<beachCardIcons.certification className={iconClass} />}
        label={t("certifications")}
        value={
          <div className="flex flex-col gap-1">
            {data.certifications.map((cert, i) => (
              <div key={i} className="flex items-start gap-1.5">
                <beachCardIcons.award className="w-3.5 h-3.5 text-primary shrink-0" aria-hidden="true" />
                <span>{cert}</span>
              </div>
            ))}
          </div>
        }
      />
    ),

    data.highlights && data.highlights.length > 0 && (
      <PopupRow
        icon={<beachCardIcons.star className={iconClass} />}
        label={t("highlights")}
        value={
          <ul className="flex flex-col gap-1">
            {data.highlights.map((highlight, i) => (
              <li key={i} className="flex items-start gap-1.5">
                <beachCardIcons.checkCircle className="w-3.5 h-3.5 text-primary shrink-0 mt-0.5" aria-hidden="true" />
                <span>{highlight}</span>
              </li>
            ))}
          </ul>
        }
      />
    ),
  ].filter(Boolean);

  return (
    <div className="max-w-md w-full bg-card border-2 border-primary rounded-xl p-4 shadow-2xl">
      <PopupHeader
        title={data.name}
        icon={<beachCardIcons.umbrella className="w-6 h-6" aria-hidden="true" />}
      />

      <div className="mt-4 space-y-3">
        {sections.map((section, i) => (
          <div key={i}>
            {section}
            {i < sections.length && <SectionDivider className="mt-2" />}
          </div>
        ))}
      </div>

      <a
        href={mapsUrl}
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
        <beachCardIcons.map className="w-4 h-4" aria-hidden="true" />
        <span>{t("viewInMaps")}</span>
      </a>
    </div>
  );
}