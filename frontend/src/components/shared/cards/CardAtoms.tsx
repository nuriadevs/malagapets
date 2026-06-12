// shared/cards/CardAtoms.tsx

import { memo } from "react";
import { parkCardIcons } from "@/data/icons";
import { cn } from "@/lib/utils";
import type { InfoItemProps } from "./card.types";



export const InfoItem = memo(function InfoItem({
    icon,
    label,
    value,
    children,
    className,
}: Omit<InfoItemProps, "colorVariant">) {
    return (
        <div className={cn("flex items-start gap-3 py-3", className)}>
            <div
                className="w-10 h-10 rounded-full flex items-center justify-center shrink-0 bg-primary/10 text-primary"
                aria-hidden="true"
            >
                {icon}
            </div>
            <div className="flex-1 min-w-0">
                {label && (
                    <span className="font-semibold block mb-0.5 text-foreground">
                        {label}
                    </span>
                )}
                {value && (
                    <p className="text-muted-foreground leading-normal">{value}</p>
                )}
                {children}
            </div>
        </div>
    );
});


interface ServiceBadgeProps {
    available: boolean;
    label: string;
    checkIcon: React.ReactNode;
    closeIcon: React.ReactNode;
    statusLabel?: string;
}

export const ServiceBadge = memo(function ServiceBadge({
    available,
    label,
    checkIcon,
    closeIcon,
    statusLabel,
}: ServiceBadgeProps) {
    return (
        <div
            className="flex items-center gap-1.5"
            aria-label={statusLabel ? `${label}: ${statusLabel}` : undefined}
        >
            <span
                className={cn(
                    "w-4 h-4 shrink-0",
                    available ? "text-success" : "text-destructive"
                )}
                aria-hidden="true"
            >
                {available ? checkIcon : closeIcon}
            </span>
            <span
                className={cn(
                    "text-sm font-medium",
                    available ? "text-card-foreground" : "text-muted-foreground"
                )}
            >
                {label}
            </span>
        </div>
    );
});



export function SectionDivider({ className }: { className?: string }) {
    return (
        <hr
            className={cn("divider-section", className)}
            aria-hidden="true"
        />
    );
}


export function BooleanBadge({
    value,
    labelYes,
    labelNo,
}: {
    value?: boolean;
    labelYes: string;
    labelNo: string;
}) {
    const available = value === true;
    const Icon = available ? parkCardIcons.check : parkCardIcons.close;

    return (
        <span
            className={cn(
                "inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-semibold",
                available
                    ? "bg-primary/10 text-foreground"
                    : "bg-destructive text-destructive-foreground"
            )}
        >
            <Icon className="w-3 h-3" aria-hidden="true" />
            {available ? labelYes : labelNo}
        </span>
    );
}