// src/components/ui/parks/park-card.tsx
"use client"

import { FaDog, FaGlobe } from "react-icons/fa";
import { useTranslations } from "next-intl";
import { BaseCard } from "@/components/common/base-card";
import { Button } from "@/components/ui/button";
import { ParkInfoItems } from "@/components/ui/parks/park-info-items";
import { capitalizeText, getGoogleStreetViewUrl } from "@/utils/parks";
import type { ParqueCaninoProp } from "@/types/parks";

/**
 * ParkCard component to display information about a dog park.
 */
export default function ParkCard({ parque }: ParqueCaninoProp) {
    const t = useTranslations("data-cards");
    const tAcces = useTranslations("accessibility.card");

    if (!parque?.properties || !parque?.geometry) {
        console.warn("ParkCard: Invalid parque data received");
        return null;
    }

    const { Nombre, Direccion, Horarios, AccesoPMR, Extension, Fuente } = parque.properties;
    const [lon, lat] = parque.geometry.coordinates || [];
    const googleStreetViewUrl = getGoogleStreetViewUrl(lat, lon);

    const parkData = {
        nombre: Nombre || t("unknown"),
        direccion: capitalizeText(Direccion || t("directionNotAvailable")),
        horarios: Horarios || t("scheduleNotAvailable"),
        accesoPMR: AccesoPMR || t("accessibilityNotAvailable"),
        extension: Extension || t("extensionNotAvailable"),
        fuente: Fuente || t("notAvailable"),
    };

    return (
        <BaseCard id={parque.id} headerIcon={<FaDog className="w-5 h-5" />} headerSubtitle={parkData.nombre}>
            {/* Información */}
            <ParkInfoItems data={parkData} />

            {/* Botón */}
            {googleStreetViewUrl && (
                <div className="pt-4 border-t border-border/50">
                    <Button
                        href={googleStreetViewUrl}
                        icon={<FaGlobe />}
                        variant="maps"
                        size="action"
                        className="w-full"
                        aria-label={tAcces("viewOnMaps")}
                        external
                    >
                        <span className="text-sm tracking-wide text-white">{t("viewInMaps")}</span>
                    </Button>
                </div>
            )}
        </BaseCard>
    );
}