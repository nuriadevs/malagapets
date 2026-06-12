// src/components/layouts/page-hero.tsx
import { mapHeroIcons } from "@/data/icons";
import { cn } from "@/lib/utils";

interface MapHeroCompactProps {
    badge?: string;
    title: string;
    titleHighlight?: string;
    subtitle?: string;
}

export function MapHeroCompact({
    badge,
    title,
    titleHighlight,
    subtitle,
}: MapHeroCompactProps) {
    return (
        <section
            aria-labelledby="map-hero-title"
            className={cn(
                "relative overflow-hidden border-b border-border/40",
                "bg-linear-to-r from-muted/50 to-primary/5",
                "py-12 sm:py-18"
            )}
        >
            <div className="max-w-screen-2xl mx-auto w-full px-4 sm:px-6 lg:px-8">
                {badge && (
                    <span className="inline-flex items-center gap-1.5 text-[0.6875rem] font-bold uppercase tracking-widest text-primary bg-primary/10 px-3 py-1 rounded-full mb-3">
                        <mapHeroIcons.location className="w-3 h-3" aria-hidden="true" />
                        {badge}
                    </span>
                )}

                <h1
                    id="map-hero-title"
                    className="text-3xl sm:text-4xl font-bold text-foreground leading-tight"
                >
                    {title}
                    {titleHighlight && (
                        <em className="italic text-primary"> {titleHighlight}</em>
                    )}
                </h1>

                {subtitle && (
                    <p className="mt-1.5 text-base font-light text-muted-foreground max-w-xl">
                        {subtitle}
                    </p>
                )}
            </div>
        </section>
    );
}