// components/ui/filter-pills-bar.tsx

"use client";

import { cn } from "@/lib/utils";
import { useTranslations } from "next-intl";

export type FilterOption = {
    value: string;
    label: string;
    count?: number;
};

interface FilterPillsBarProps {
    options: FilterOption[];
    activeFilter: string;
    onFilterChange: (value: string) => void;
    className?: string;
}

export function FilterPillsBar({
    options,
    activeFilter,
    onFilterChange,
    className,
}: FilterPillsBarProps) {
    const tAccess = useTranslations("accessibility.explorer");

    return (
        <div
            role="toolbar"
            aria-label={tAccess("filterByType")}
            className={cn(
                "flex gap-2 overflow-x-auto pb-1 scrollbar-none p-4",
                className
            )}
        >
            {options.map((opt) => (
                <button
                    key={opt.value}
                    type="button"
                    onClick={() => onFilterChange(opt.value)}
                    aria-pressed={activeFilter === opt.value}
                    className={cn(
                        "shrink-0 inline-flex items-center gap-1.5 px-4 rounded-full",
                        "py-2.5",
                        "text-sm font-medium border transition-all duration-200 cursor-pointer",
                        "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary",
                        activeFilter === opt.value
                            ? "bg-primary text-primary-foreground border-primary shadow-sm"
                            : "bg-card text-muted-foreground border-border/50 hover:border-primary/50 hover:bg-primary/5"
                    )}
                >
                    {opt.label}
                    {opt.count !== undefined && (
                        <span
                            className={cn(
                                "text-xs px-1.5 py-0.5 rounded-full font-medium",
                                activeFilter === opt.value
                                    ? "bg-primary-foreground/20 text-primary-foreground"
                                    : "bg-muted text-muted-foreground"
                            )}
                        >
                            {opt.count}
                        </span>
                    )}
                </button>
            ))}
        </div>
    );
}