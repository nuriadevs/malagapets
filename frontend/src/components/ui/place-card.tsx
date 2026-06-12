import { cn } from "@/lib/utils";
import { placeCardIcons } from "@/data/icons";

export type PlaceType = "park" | "beach" | "vet";

export interface PlaceCardProps {
    id: string;
    type: PlaceType;
    vetType?: "clinic" | "hospital";
    phones?: {
        type: "mobile" | "landline" | "emergency";
        number: string | null;
    }[];
    name: string;
    category: string;
    address?: string;
    schedule?: string;
    href?: string;
    className?: string;
}

const typeIcons: Record<PlaceType, React.ReactNode> = {
    park: <placeCardIcons.park className="w-4.5 h-4.5" aria-hidden="true" />,
    beach: <placeCardIcons.beach className="w-4.5 h-4.5" aria-hidden="true" />,
    vet: null,
};

export function PlaceCard({
    type,
    vetType,
    phones,
    name,
    address,
    schedule,
    href,
    className,
}: PlaceCardProps) {
    const icon =
        type === "vet"
            ? vetType === "clinic"
                ? <placeCardIcons.vetClinic className="w-4.5 h-4.5" aria-hidden="true" />
                : <placeCardIcons.vetHospital className="w-4.5 h-4.5" aria-hidden="true" />
            : typeIcons[type];

    const hasDetails = address || schedule || (phones && phones.length > 0);

    return (
        <article
            className={cn(
                "group/card flex gap-3.5 p-4 rounded-2xl",
                "border border-border bg-card",
                "hover:border-border/80 hover:bg-card/80 hover:shadow-2xl",
                "transition-all duration-250 ease-out",
                className
            )}
        >
            {/* Icono */}
            <div
                className={cn(
                    "shrink-0 w-9 h-9 rounded-xl flex items-center justify-center",
                    "transition-transform duration-200 group-hover/card:scale-105",
                    "bg-primary/8 text-primary ring-1 ring-primary/15"
                )}
                aria-hidden="true"
            >
                {icon}
            </div>

            {/* Info */}
            <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-sm text-foreground leading-snug tracking-[-0.01em]">
                    {name}
                </h3>

                {hasDetails && (
                    <div className="mt-2 space-y-1.5">
                        {address && (
                            <div className="flex items-start gap-1.5 text-xs text-muted-foreground/80">
                                <placeCardIcons.location className="shrink-0 w-3 h-3 mt-px" />
                                <span className="leading-relaxed">{address}</span>
                            </div>
                        )}

                        {schedule && (
                            <div className="flex items-start gap-1.5 text-xs text-muted-foreground/80">
                                <placeCardIcons.schedule className="shrink-0 w-3 h-3 mt-px" />
                                <span className="leading-relaxed">{schedule}</span>
                            </div>
                        )}

                        {phones?.map((phone, index) => {
                            const phoneIcon =
                                phone.type === "mobile" ? (
                                    <placeCardIcons.mobile className="shrink-0 w-3 h-3 mt-px" />
                                ) : phone.type === "emergency" ? (
                                    <placeCardIcons.emergency className="shrink-0 w-3 h-3 mt-px" />
                                ) : (
                                    <placeCardIcons.phone className="shrink-0 w-3 h-3 mt-px" />
                                );

                            return (
                                <div
                                    key={`${phone.type}-${index}`}
                                    className="flex items-start gap-1.5 text-xs text-muted-foreground/80"
                                >
                                    {phoneIcon}
                                    <span className="leading-relaxed tabular-nums">
                                        {phone.number ?? "Urgencias"}
                                    </span>
                                </div>
                            );
                        })}
                    </div>
                )}

                {href && (
                    <div className={cn("mt-3", hasDetails && "pt-2.5 border-t border-border/40")}>
                        <a
                            href={href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={cn(
                                "group inline-flex items-center gap-1.5",
                                "text-xs font-medium px-2.5 py-1 rounded-full",
                                "transition-all duration-200 ease-out",
                                "hover:-translate-y-px hover:shadow-[0_1px_6px_0_rgba(0,0,0,0.1)]",
                                "active:translate-y-0 active:shadow-none active:scale-[0.98]",
                                "bg-primary/8 text-primary ring-1 ring-primary/15 hover:bg-primary/12 hover:ring-primary/30"
                            )}
                        >
                            <placeCardIcons.globe className="w-3 h-3 transition-transform duration-200 group-hover:rotate-12" />
                            <span>Ver mapa</span>
                        </a>
                    </div>
                )}
            </div>
        </article>
    );
}