"use client";

import { memo } from "react";
import { useTranslations } from "next-intl";
import { beachCardIcons } from "@/data/icons";
import { InfoItem, SectionDivider } from "@/components/shared/cards/CardAtoms";
import type { BeachCardData } from "@/types/cards";

interface BeachInfoItemsProps {
    data: BeachCardData;
}

export const BeachInfoItems = memo(function BeachInfoItems({ data }: BeachInfoItemsProps) {
    const t = useTranslations("data-cards");

    const services = [
        { key: "dogShower", value: data.services.dogShower, label: t("dogShower"), icon: <beachCardIcons.dogShower className="w-4 h-4 shrink-0" /> },
        { key: "waterFountain", value: data.services.waterFountain, label: t("waterFountain"), icon: <beachCardIcons.waterFountain className="w-4 h-4 shrink-0" /> },
        { key: "trashBins", value: data.services.trashBins, label: t("trashBins"), icon: <beachCardIcons.trashBins className="w-4 h-4 shrink-0" /> },
        { key: "parking", value: data.services.parking, label: t("parking"), icon: <beachCardIcons.parking className="w-4 h-4 shrink-0" /> },
        { key: "agilityArea", value: data.services.agilityArea, label: t("agilityArea"), icon: <beachCardIcons.agilityArea className="w-4 h-4 shrink-0" /> },
        { key: "bagDispenser", value: data.services.bagDispenser, label: t("bagDispenser"), icon: <beachCardIcons.bagDispenser className="w-4 h-4 shrink-0" /> },
    ];

    const accessItems = data.access
        ? [
            { key: "type", value: data.access.type, label: t("accessType"), type: "text" },
            { key: "by_car", value: data.access.by_car, label: t("accessByCar"), type: "boolean" },
            { key: "distance_from_center", value: data.access.distance_from_center, label: t("distanceFromCenter"), type: "text" },
            { key: "access_road", value: data.access.access_road, label: t("accessRoad"), type: "text" },
            { key: "references", value: data.access.references, label: t("accessReferences"), type: "text" },
        ].filter((i) => i.value !== undefined && i.value !== null && i.value !== "")
        : [];

    const items = [

        data.location && (
            <InfoItem
                icon={<beachCardIcons.location className="w-4 h-4" />}
                label={t("location")}
                value={data.location}
            />
        ),

        data.municipality && (
            <InfoItem
                icon={<beachCardIcons.municipality className="w-4 h-4" />}
                label={t("municipality")}
                value={data.municipality}
            />
        ),

        data.area && (
            <InfoItem
                icon={<beachCardIcons.extension className="w-4 h-4" />}
                label={t("dimensions")}
            >
                <div className="space-y-2 mt-2">
                    <span className="text-muted-foreground shrink-0">{t("length")}: </span>
                    <span className="font-medium text-muted-foreground">{data.length}</span>
                    <span className="text-muted-foreground shrink-0">{t("area")}: </span>
                    <span className="font-medium text-muted-foreground">{data.area}</span>
                </div>
            </InfoItem>
        ),

        (data.schedule.summer || data.schedule.winter || data.schedule.yearRound) && (
            <InfoItem
                icon={<beachCardIcons.schedule className="w-4 h-4" />}
                label={t("schedule")}
            >
                <div className="space-y-2 mt-2">
                    {data.schedule.yearRound && (
                        <div className="flex items-center gap-2 text-sm flex-wrap">
                            <span className="text-muted-foreground shrink-0">{t("year_round")}:</span>
                            <span className="font-medium text-muted-foreground">{data.schedule.yearRound}</span>
                        </div>
                    )}
                    {data.schedule.summer && (
                        <div className="flex items-center gap-2 text-sm flex-wrap">
                            <span className="text-muted-foreground shrink-0">{t("summerSchedule")}:</span>
                            <span className="font-medium text-muted-foreground">{data.schedule.summer}</span>
                        </div>
                    )}
                    {data.schedule.winter && (
                        <div className="flex items-center gap-2 text-sm flex-wrap">
                            <span className="text-muted-foreground shrink-0">{t("winterSchedule")}:</span>
                            <span className="font-medium text-muted-foreground">{data.schedule.winter}</span>
                        </div>
                    )}
                </div>
            </InfoItem>
        ),

        data.services && (
            <InfoItem
                icon={<beachCardIcons.services className="w-4 h-4" />}
                label={t("services")}
            >
                <div className="flex flex-wrap gap-1.5 mt-2">
                    {services.filter((s) => s.value).map((service) => (
                        <span
                            key={service.key}
                            className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border bg-primary/10 text-foreground border-primary/20"
                        >
                            {service.icon}
                            {service.label}
                        </span>
                    ))}
                </div>
            </InfoItem>
        ),

        accessItems.length > 0 && (
            <InfoItem
                icon={<beachCardIcons.road className="w-4 h-4" />}
                label={t("access")}
            >
                <div className="space-y-2 mt-2">
                    {accessItems.map((item) => (
                        <div key={item.key} className="flex items-center gap-2 text-sm flex-wrap">
                            <span className="text-muted-foreground shrink-0">{item.label}:</span>
                            {item.type === "boolean" ? (
                                <span className="inline-flex items-center gap-1">
                                    {item.value
                                        ? <beachCardIcons.checkCircle className="w-4 h-4 text-primary-foreground" />
                                        : <beachCardIcons.closeCircle className="w-4 h-4 text-destructive" />
                                    }
                                    <span className="font-medium text-muted-foreground">
                                        {item.value ? t("yes") : t("no")}
                                    </span>
                                </span>
                            ) : (
                                <span className="font-medium text-muted-foreground">{String(item.value)}</span>
                            )}
                        </div>
                    ))}
                </div>
            </InfoItem>
        ),

        data.certifications && data.certifications.length > 0 && (
            <InfoItem
                icon={<beachCardIcons.certification className="w-4 h-4" />}
                label={t("certifications")}
            >
                <div className="space-y-2 mt-2">
                    {data.certifications.map((cert, i) => (
                        <div key={i} className="flex items-center gap-2 text-sm">
                            <beachCardIcons.award className="w-4 h-4 text-primary shrink-0" />
                            <span className="font-medium text-muted-foreground">{cert}</span>
                        </div>
                    ))}
                </div>
            </InfoItem>
        ),

        data.highlights && data.highlights.length > 0 && (
            <InfoItem
                icon={<beachCardIcons.star className="w-4 h-4" />}
                label={t("highlights")}
            >
                <div className="space-y-2 mt-2">
                    {data.highlights.map((highlight, i) => (
                        <div key={i} className="flex items-center gap-2 text-sm">
                            <beachCardIcons.checkCircle className="w-4 h-4 text-primary shrink-0" />
                            <span className="font-medium text-muted-foreground">{highlight}</span>
                        </div>
                    ))}
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