// src/components/ui/parks/park-info-items.tsx
import { InfoItem } from "@/components/common/info-item";
import { useTranslations } from "next-intl";
import { ParkInfoItemsProps } from "@/types/components";
import { cardIcons } from "@/data/icons";

export function ParkInfoItems({ data }: ParkInfoItemsProps) {
    const t = useTranslations("data-cards");

    const items = [
        {
            icon: <cardIcons.location className="w-5 h-5 text-success" />,
            label: t("adress"),
            value: data.direccion
        },
        {
            icon: <cardIcons.schedule className="w-5 h-5 text-success" />,
            label: t("schedule"),
            value: data.horarios
        },
        {
            icon: <cardIcons.accessibility className="w-5 h-5 text-success" />,
            label: t("accessibility"),
            value: data.accesoPMR
        },
        {
            icon: <cardIcons.extension className="w-5 h-5 text-success" />,
            label: t("length"),
            value: data.extension
        },
        {
            icon: <cardIcons.fountain className="w-5 h-5 text-success" />,
            label: t("fountain"),
            value: data.fuente
        },
    ];

    return (
        <div className="space-y-3">
            {items.map((item, i) => (
                <InfoItem
                    key={i}
                    icon={item.icon}
                    label={item.label}
                    value={item.value}
                    variant="horizontal"
                />
            ))}
        </div>
    );
}