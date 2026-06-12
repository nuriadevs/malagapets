// sections/explorer/explorer-filters.tsx

"use client";

import { FilterPillsBar, type FilterOption } from "@/components/ui/filter-pills-bar";

interface ExplorerFiltersProps {
    options: FilterOption[];
    activeFilter: string;
    onFilterChange: (value: string) => void;
}

export function ExplorerFilters({
    options,
    activeFilter,
    onFilterChange,
}: ExplorerFiltersProps) {
    return (
        <div className="sticky top-16 z-20 bg-background/95 backdrop-blur-sm border-b border-border/40 py-3">
            <FilterPillsBar
                options={options}
                activeFilter={activeFilter}
                onFilterChange={onFilterChange}
            />
        </div>
    );
}