import { cn } from "@/lib/utils";

interface ResourceSidebarProps {
    count: number;
    countLabel?: string;
    children: React.ReactNode;
    footer?: React.ReactNode;
    className?: string;
    sidebarLabel?: string;
    listLabel?: string;
}

export function ResourceSidebar({
    count,
    countLabel ="",
    children,
    footer,
    className,
    sidebarLabel,
    listLabel,
}: ResourceSidebarProps) {
    return (
        <aside
            aria-label={sidebarLabel}
            className={cn(
                "flex flex-col h-full bg-background border-r border-border/40",
                className
            )}
        >
            <div className="flex items-center justify-between px-4 py-3 border-b border-border/40 shrink-0">
                <span className="text-xs text-muted-foreground">
                    <strong className="text-foreground font-semibold">{count}</strong>{" "}
                    {countLabel}
                </span>
            </div>

            <ul
                role="list"
                aria-label={listLabel}
                className="flex-1 overflow-y-auto p-3 space-y-2"
            >
                {children}
            </ul>

            {footer && (
                <div className="shrink-0">{footer}</div>
            )}
        </aside>
    );
}
