// src/components/ui/beaches/beach-card.tsx
"use client"

import { FaUmbrellaBeach } from "react-icons/fa";
import { useTranslations } from "next-intl";
import { BaseCard } from "@/components/common/base-card";
import { Button } from "@/components/ui/button";
import { BeachInfoItems } from "@/components/ui/beaches/beach-info-items";
import { cardIcons } from "@/data/icons";
import type { Beach } from "@/lib/data/beaches";

interface BeachCardProps {
    beach: Beach;
}

/**
 * BeachCard component to display information about a dog beach.
 */
export default function BeachCard({ beach }: BeachCardProps) {
    const t = useTranslations("data-cards");
    const tAcces = useTranslations("accessibility.card");

    if (!beach) {
        console.warn("BeachCard: Invalid beach data received");
        return null;
    }

    const beachData = {
        municipality: beach.municipality,
        locality: 'locality' in beach ? beach.locality : undefined,
        location: beach.detailed_location,
        length: ('length' in beach.features ? beach.features.length : undefined) || t("extensionNotAvailable"),
        area: ('total_area' in beach.features ? beach.features.total_area : undefined) || t("areaNotAvailable"),
        dogShower: 'dog_shower' in beach.services ? beach.services.dog_shower : false,
        waterFountain: 'water_fountain' in beach.services ? beach.services.water_fountain : false,
        trashBins: 'trash_bins' in beach.services ? beach.services.trash_bins : false,
        parking: 'parking' in beach.services ? beach.services.parking : false,
        agilityArea: 'agility_area' in beach.services ? beach.services.agility_area : false,
        bagDispenser: 'bag_dispenser' in beach.services ? beach.services.bag_dispenser : false,
        summerSchedule: 'summer' in beach.opening_hours ? beach.opening_hours.summer : undefined,
        winterSchedule: 'winter' in beach.opening_hours ? beach.opening_hours.winter : undefined,
        year_round: 'year_round' in beach.opening_hours && beach.opening_hours.year_round ? t("year_round") : undefined,
        certifications: 'certifications' in beach ? [...beach.certifications] : undefined,
        highlights: 'highlights' in beach ? [...beach.highlights] : undefined,
    };

    return (
        <BaseCard 
            id={beach.id.toString()} 
            headerIcon={<FaUmbrellaBeach className="w-5 h-5" />} 
            headerSubtitle={beach.name}
        >
            {/* Toda la información ahora se maneja dentro de BeachInfoItems */}
            <BeachInfoItems data={beachData} />

            {/* Botón Google Maps */}
            {beach.googleMapsUrl && (
                <div className="pt-4 border-t border-border/50">
                    <Button
                        href={beach.googleMapsUrl}
                        icon={<cardIcons.globe />}
                        variant="maps"
                        size="action"
                        className="w-full"
                        aria-label={tAcces("viewOnMaps")}
                        external
                    >
                        <span className="text-sm tracking-wide text-white">
                            {t("viewInMaps")}
                        </span>
                    </Button>
                </div>
            )}
        </BaseCard>
    );
}