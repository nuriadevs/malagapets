import { cn } from "@/lib/utils";

type MapSplitVariant = "explorer" | "map";

interface MapSplitLayoutProps {
    sidebar: React.ReactNode;
    map: React.ReactNode;
    variant?: MapSplitVariant;
    className?: string;
}


const variantStyles: Record<MapSplitVariant, { sidebar: string; map: string }> = {
    explorer: {
        sidebar: "lg:sticky lg:top-[9rem] lg:h-[calc(100vh-9rem)]",
        map: "lg:sticky lg:top-[9rem] lg:h-[calc(100vh-9rem)]",
    },
    map: {
        sidebar: "lg:sticky lg:top-[4rem] lg:h-[calc(100vh-4rem)]",
        map: "lg:sticky lg:top-[4rem] lg:h-[calc(100vh-4rem)]",
    },
};

export function MapSplitLayout({
    sidebar,
    map,
    variant = "map",
    className,
}: MapSplitLayoutProps) {
    const styles = variantStyles[variant];

    return (
        <div
            className={cn(
                "grid grid-cols-1 lg:grid-cols-[22rem_1fr]",
                className
            )}
        >
            <div className={cn("order-2 lg:order-1", styles.sidebar)}>
                {sidebar}
            </div>

            <div className={cn("order-1 lg:order-2 h-[55vw] min-h-80 lg:h-auto", styles.map)}>
                {map}
            </div>
        </div>
    );
}
