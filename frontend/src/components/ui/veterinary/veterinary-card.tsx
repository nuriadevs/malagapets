// src/components/ui/veterinary/veterinary-card.tsx
"use client";
import { useTranslations } from "next-intl";
import { FaGlobe } from 'react-icons/fa';
import { BaseCard } from '@/components/common/base-card';
import { VetInfoItems } from '@/components/ui/veterinary/vet-info-items';
import { Button } from '@/components/ui/button';
import { vetsIcon } from '@/data/icons';
import type { PhoneData, FormattedPhone } from '@/types/veterinary';
import { VeterinaryCardProps } from '@/types/components';

function formatPhoneNumbers(phones: PhoneData[], t: ReturnType<typeof useTranslations>): FormattedPhone[] {
    return phones
        .filter((p): p is PhoneData & { number: string } => Boolean(p.number))
        .map(p => ({
            type: t(`phone.${p.type}`),
            number: p.number,
            displayText: `${t(`phone.${p.type}`)}: ${p.number}`,
        }));
}

export function VeterinaryCard({ center }: VeterinaryCardProps) {
    const t = useTranslations("data-cards");
    const tAcces = useTranslations("accessibility.card");

    // Convertir readonly array a mutable array
    const phones = formatPhoneNumbers([...center.phone], t);
    const name = center.name;

    // Usar iconos desde data/icons.ts
    const [Hospital, Stethoscope] = vetsIcon;
    const headerIcon = center.type === 'hospital'
        ? <Hospital className="w-5 h-5" />
        : <Stethoscope className="w-5 h-5" />;

    const vetData = {
        address: center.address,
        postalCode: center.postalCode,
        phones,
        schedule: center.schedule ?? undefined,
        daysOpen: center.daysOpen ?? undefined,
        website: center.website ?? undefined,
        email: center.email ?? undefined,
    };

    return (
        <BaseCard
            id={center.id}
            headerIcon={headerIcon}
            headerSubtitle={name}
        >
            {/* Información */}
            <VetInfoItems center={vetData} />

            {/* Google Maps */}
            {center.googleMapsUrl && (
                <div className="pt-4 border-t border-border/50">
                    <Button
                        href={center.googleMapsUrl}
                        icon={<FaGlobe />}
                        variant="maps"
                        size="action"
                        className="w-full"
                        aria-label={tAcces("viewOnMaps")}
                        external
                    >
                        <span className="text-base tracking-wide">{t("viewInMaps")}</span>
                    </Button>
                </div>
            )}
        </BaseCard>
    );
}