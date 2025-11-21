// src/components/ui/beaches/beach-info-items.tsx
import { InfoItem } from "@/components/common/info-item";
import { useTranslations } from "next-intl";
import { beachCardIcons } from "@/data/icons";
import { cardIcons } from "@/data/icons";
import {BeachInfoItemsProps} from "@/types/components";

/**
 * BeachInfoItems component to display detailed information about a dog beach.
 */

export function BeachInfoItems({ data }: BeachInfoItemsProps) {
    const t = useTranslations("data-cards");

    const items = [
        {
            icon: <beachCardIcons.municipality className="w-5 h-5 text-success" />,
            label: t("municipality"),
            value: data.locality ? `${data.municipality} - ${data.locality}` : data.municipality
        },
        {
            icon: <beachCardIcons.location className="w-5 h-5 text-success" />,
            label: t("location"),
            value: data.location
        },
    ];

    const services = [
        { key: "dogShower", value: data.dogShower, label: t("dogShower") },
        { key: "waterFountain", value: data.waterFountain, label: t("waterFountain") },
        { key: "trashBins", value: data.trashBins, label: t("trashBins") },
        { key: "parking", value: data.parking, label: t("parking") },
        { key: "agilityArea", value: data.agilityArea, label: t("agilityArea") },
        { key: "bagDispenser", value: data.bagDispenser, label: t("bagDispenser") },
    ];

    return (
        <div className="space-y-3">
            {/* Información básica */}
            {items.map((item, i) => (
                <InfoItem
                    key={i}
                    icon={item.icon}
                    label={item.label}
                    value={item.value}
                    variant="horizontal"
                />
            ))}

            {/* Dimensiones (Extensión + Área) - Con children */}
            <InfoItem
                icon={<beachCardIcons.extension className="w-5 h-5 text-success" />}
                label={t("dimensions")}
                variant="horizontal"
            >
                <div className="space-y-1 mt-1">
                    <div className="text-sm">
                        <span className="font-medium text-card-foreground">{t("length")}: </span>
                        <span className="font-medium text-card-foreground">{data.length}</span>
                    </div>
                    <div className="text-sm">
                        <span className="font-medium text-card-foreground">{t("area")}: </span>
                        <span className="font-medium text-card-foreground">{data.area}</span>
                    </div>
                </div>
            </InfoItem>

            {/* Horarios - Con children */}
            <InfoItem
                icon={<beachCardIcons.schedule className="w-5 h-5 text-success" />}
                label={t("schedule")}
                variant="horizontal"
            >
                <div className="space-y-1 mt-1">
                    {data.summerSchedule && (
                        <div className="text-sm">
                            <span className="font-medium text-card-foreground">{t("summerSchedule")}: </span>
                            <span className="font-medium text-card-foreground">{data.summerSchedule}</span>
                        </div>
                    )}
                    {data.winterSchedule && (
                        <div className="text-sm">
                            <span className="font-medium text-card-foreground" >{t("winterSchedule")}: </span>
                            <span className="font-medium text-card-foreground">{data.winterSchedule}</span>
                        </div>
                    )}
                    {data.year_round && (
                        <div className="text-sm">
                            <span className="font-medium text-card-foreground">{t("year_round")}: </span>
                            <span className="font-medium text-card-foreground">{data.year_round}</span>
                        </div>
                    )}
                </div>
            </InfoItem>


            {/* Servicios - Con children */}
            <InfoItem
                icon={<beachCardIcons.services className="w-5 h-5 text-success" />}
                label={t("services")}
                variant="horizontal"
            >
                <div className="grid grid-cols-2 gap-2 mt-1">
                    {services.map((service) => (
                        <div key={service.key} className="flex items-center gap-2">
                            {service.value ? (

                                <beachCardIcons.check className="w-4 h-4 text-success" />
                            ) : (
                                <beachCardIcons.close className="w-4 h-4 text-destructive" />
                            )}
                            <span className="font-medium text-card-foreground text-sm ">
                                {service.label}
                            </span>
                        </div>
                    ))}
                </div>
            </InfoItem>

            {/* Certificaciones - Con children */}
            {data.certifications && data.certifications.length > 0 && (
                <InfoItem
                    icon={<cardIcons.certification className="w-5 h-5 text-success" />}
                    label={t("certifications")}
                    variant="horizontal"
                >
                    <div className="space-y-1 mt-1">
                        {data.certifications.map((cert, index) => (
                            <p key={index} className="font-medium text-card-foreground text-sm">
                                {cert}
                            </p>
                        ))}
                    </div>
                </InfoItem>
            )}

            {/* Destacados - Con children */}
            {data.highlights && data.highlights.length > 0 && (
                <InfoItem
                    icon={<cardIcons.star className="w-5 h-5 text-success" />}
                    label={t("highlights")}
                    variant="horizontal"
                >
                    <ul className="space-y-1 list-disc list-inside mt-1">
                        {data.highlights.map((highlight, index) => (
                            <li key={index} className="text-sm">
                                <span className="font-medium text-card-foreground">{highlight}</span>
                            </li>
                        ))}
                    </ul>
                </InfoItem>
            )}
        </div>
    );
}