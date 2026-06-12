import { cn } from "@/lib/utils"
import { placeCardIcons } from "@/data/icons"
import { useTranslations } from "next-intl"
import { formatDistance } from "@/lib/utils/distance"

export type PlaceType = "park" | "beach" | "vet"

export interface PlaceCardProps {
    id: string
    type: PlaceType
    vetType?: "clinic" | "hospital"
    phones?: {
        type: "mobile" | "landline" | "emergency"
        number: string | null
    }[]
    name: string
    category: string
    address?: string
    schedule?: string
    href?: string
    className?: string
    distance?: number
}

const typeIcons: Record<PlaceType, React.ReactNode> = {
    park: <placeCardIcons.park className="w-4.5 h-4.5" aria-hidden="true" />,
    beach: <placeCardIcons.beach className="w-4.5 h-4.5" aria-hidden="true" />,
    vet: null,
}

export function PlaceCard({
    type,
    vetType,
    phones,
    name,
    address,
    schedule,
    href,
    className,
    distance,
}: PlaceCardProps) {
    const t = useTranslations("explorer.cards")

    const icon =
        type === "vet"
            ? vetType === "clinic"
                ? <placeCardIcons.vetClinic className="w-4.5 h-4.5" aria-hidden="true" />
                : <placeCardIcons.vetHospital className="w-4.5 h-4.5" aria-hidden="true" />
            : typeIcons[type]

    const hasDetails = address || schedule || (phones && phones.length > 0)

    return (
        <article
            className={cn(
                "group/card flex gap-3 p-3.5 rounded-xl",
                "border border-border bg-card text-card-foreground",
                "hover:border-primary/30 hover:bg-accent/30 hover:shadow-md",
                "transition-all duration-200 ease-out",
                className
            )}
        >
            <div
                className={cn(
                    "shrink-0 w-8 h-8 rounded-lg flex items-center justify-center",
                    "transition-transform duration-200 group-hover/card:scale-105",
                    "bg-primary/10 text-primary ring-1 ring-primary/20"
                )}
                aria-hidden="true"
            >
                {icon}
            </div>

            <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2">
                    <h3 className="font-semibold text-sm text-foreground leading-snug tracking-tight truncate">
                        {name}
                    </h3>
                    {distance !== undefined && (
                        <span
                            className="shrink-0 text-xs font-medium text-pet bg-pet/10 px-2 py-0.5 rounded-full ring-1 ring-pet/20 tabular-nums"
                            aria-label={`A ${formatDistance(distance)} de tu ubicación`}
                        >
                            {formatDistance(distance)}
                        </span>
                    )}
                </div>

                {hasDetails && (
                    <div className="mt-2 space-y-1">
                        {address && (
                            <div className="flex items-start gap-1.5">
                                <placeCardIcons.location
                                    className="shrink-0 w-3 h-3 mt-0.5 text-primary"
                                    aria-hidden="true"
                                />
                                <span className="text-xs text-muted-foreground leading-relaxed line-clamp-2">
                                    {address}
                                </span>
                            </div>
                        )}

                        {schedule && (
                            <div className="flex items-start gap-1.5">
                                <placeCardIcons.schedule
                                    className="shrink-0 w-3 h-3 mt-0.5 text-primary"
                                    aria-hidden="true"
                                />
                                <span className="text-xs text-muted-foreground leading-relaxed">
                                    {schedule}
                                </span>
                            </div>
                        )}

                        {phones?.map((phone, index) => {
                            const isEmergency = phone.type === "emergency"
                            const phoneIcon =
                                phone.type === "mobile" ? (
                                    <placeCardIcons.mobile className="shrink-0 w-3 h-3 mt-0.5 text-primary" aria-hidden="true" />
                                ) : isEmergency ? (
                                    <placeCardIcons.emergency className="shrink-0 w-3 h-3 mt-0.5 text-destructive" aria-hidden="true" />
                                ) : (
                                    <placeCardIcons.phone className="shrink-0 w-3 h-3 mt-0.5 text-primary" aria-hidden="true" />
                                )

                            return (
                                <div key={`${phone.type}-${index}`} className="flex items-start gap-1.5">
                                    {phoneIcon}
                                    <span className={cn(
                                        "text-xs leading-relaxed tabular-nums",
                                        isEmergency ? "text-destructive font-semibold" : "text-muted-foreground"
                                    )}>
                                        {phone.number ?? t("emergency")}
                                    </span>
                                </div>
                            )
                        })}
                    </div>
                )}

                {href && (
                    <div className={cn("mt-2.5", hasDetails && "pt-2 border-t border-border/50")}>
                        <a
                            href={href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={cn(
                                "inline-flex items-center gap-1.5",
                                "text-xs font-medium px-2.5 py-1 rounded-full",
                                "bg-primary/10 text-primary ring-1 ring-primary/20",
                                "transition-all duration-200 ease-out",
                                "hover:bg-primary/15 hover:ring-primary/35 hover:-translate-y-px",
                                "active:translate-y-0 active:scale-[0.98]",
                                "focus-visible:outline-none focus-visible:ring-2",
                                "focus-visible:ring-ring focus-visible:ring-offset-2",
                                "focus-visible:ring-offset-card"
                            )}
                        >
                            <placeCardIcons.globe className="w-3 h-3" aria-hidden="true" />
                            <span>{t("map")}</span>
                        </a>
                    </div>
                )}
            </div>
        </article>
    )
}
