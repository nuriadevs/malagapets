"use client";
import { InfoItem } from "@/components/common/info-item";
import { useTranslations } from "next-intl";
import { VetInfoItemsProps } from "@/types/components";
import { vetCardIcons } from "@/data/icons";

export function VetInfoItems({ center }: VetInfoItemsProps) {
    const t = useTranslations("data-cards");

    return (
        <div className="space-y-3">
            {/* Dirección */}
            <InfoItem
                icon={<vetCardIcons.location className="w-5 h-5 text-success" />}
                label={t("adress")}
                value={center.address}
                variant="horizontal"
            />

            {/* Teléfonos - Con children */}
            {center.phones && center.phones.length > 0 && (
                <InfoItem
                    icon={<vetCardIcons.phone className="w-5 h-5 text-success" />}
                    label={t("phone.name")}
                    variant="horizontal"
                >
                    <div className="space-y-1 mt-1">
                        {center.phones.map((phone, index) => {
                            const isMobile = phone.type.toLowerCase().includes("móvil") ||
                                phone.type.toLowerCase().includes("movil");
                            const PhoneIcon = isMobile ? vetCardIcons.mobile : vetCardIcons.house;

                            return (
                                <div key={index} className="flex items-center gap-2">
                                    <PhoneIcon className="w-4 h-4 text-success" />
                                    <span className="font-medium text-card-foreground text-sm">
                                        {phone.number}
                                    </span>
                                </div>
                            );
                        })}
                    </div>
                </InfoItem>
            )}

            {/* Horario */}
            {center.schedule && (
                <InfoItem
                    icon={<vetCardIcons.schedule className="w-5 h-5 text-success" />}
                    label={t("schedule")}
                    value={center.schedule}
                    variant="horizontal"
                />
            )}

            {/* Días abierto */}
            {center.daysOpen && (
                <InfoItem
                    icon={<vetCardIcons.daysOpen className="w-5 h-5 text-success" />}
                    label={t("daysOpen")}
                    value={center.daysOpen}
                    variant="horizontal"
                />
            )}

            {/* Email */}
            {center.email && (
                <InfoItem
                    icon={<vetCardIcons.email className="w-5 h-5 text-success" />}
                    label={t("email")}
                    value={center.email}
                    variant="horizontal"
                />
            )}

            {center.website && (
                <InfoItem
                    icon={<vetCardIcons.website className="w-5 h-5 text-success" />}
                    label={t("website")}
                    variant="horizontal"
                >
                    <a
                        href={center.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm font-medium  hover:text-success/80 transition-colors duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-success focus:ring-offset-2 mt-1 inline-block"

                    >
                        {center.website}
                    </a>
                </InfoItem>
            )}
        </div>
    );
}