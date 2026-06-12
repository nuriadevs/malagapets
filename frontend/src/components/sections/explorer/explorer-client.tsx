// src/components/sections/explorer/explorer-client.tsx
"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import { MapSplitLayout } from "@/components/layouts/map-split-layout";
import { useParksList } from "@/hooks/maps/use-parks-list";
import { useTranslations } from "next-intl";
import { ExplorerFilters } from "@/components/sections/explorer/explorer-filters";
import { ExplorerList } from "@/components/sections/explorer/explorer-list";
import type { BeachCardData, VetCardData } from "@/types/cards";
import type { AnyItem, FilterValue, ParkItem, BeachItem, VetItem } from "@/components/sections/explorer/explorer.types";

const ITEMS_PER_PAGE = 5;

const ParksMapModular = dynamic(() => import("@/components/maps/parks-map-modular"), { ssr: false });
const BeachesMapModular = dynamic(() => import("@/components/maps/beaches-map-modular"), { ssr: false });
const VetsMapModular = dynamic(() => import("@/components/maps/vets-map-modular"), { ssr: false });

interface ExplorerClientProps {
    beaches: BeachCardData[];
    vets: VetCardData[];
}

export function ExplorerClient({ beaches, vets }: ExplorerClientProps) {
    const t = useTranslations("explorer.mapPages");
    const tAccess = useTranslations("accessibility");

    const [activeFilter, setActiveFilter] = useState<FilterValue>("all");
    const [currentPage, setCurrentPage] = useState(1);
    const { data: parks } = useParksList();

    const filterOptions = [
        { value: "all", label: t("all"), count: parks.length + beaches.length + vets.length },
        { value: "parks", label: t("parks.title"), count: parks.length },
        { value: "beaches", label: t("beaches.title"), count: beaches.length },
        { value: "vets", label: t("veterinary.title"), count: vets.length },
    ];

    const handleFilterChange = (v: string) => {
        setActiveFilter(v as FilterValue);
        setCurrentPage(1);
    };

    const allItems: AnyItem[] = [
        ...(activeFilter === "all" || activeFilter === "parks"
            ? parks.map((p): ParkItem => ({ kind: "park", data: p }))
            : []),
        ...(activeFilter === "all" || activeFilter === "beaches"
            ? beaches.map((b): BeachItem => ({ kind: "beach", data: b }))
            : []),
        ...(activeFilter === "all" || activeFilter === "vets"
            ? vets.map((v): VetItem => ({ kind: "vet", data: v }))
            : []),
    ];

    const totalPages = Math.max(1, Math.ceil(allItems.length / ITEMS_PER_PAGE));
    const paginatedItems = allItems.slice(
        (currentPage - 1) * ITEMS_PER_PAGE,
        currentPage * ITEMS_PER_PAGE
    );

    const activeMap =
        activeFilter === "beaches" ? <BeachesMapModular /> :
            activeFilter === "vets" ? <VetsMapModular /> :
                <ParksMapModular />;

    return (
        <section
            className="p-4 sm:p-6 lg:p-8"
            aria-label={tAccess("explorer.map")}
        >
            <ExplorerFilters
                options={filterOptions}
                activeFilter={activeFilter}
                onFilterChange={handleFilterChange}
            />

            <MapSplitLayout
                variant="explorer"
                sidebar={
                    <ExplorerList
                        items={paginatedItems}
                        totalCount={allItems.length}
                        totalPages={totalPages}
                        currentPage={currentPage}
                        onPageChange={setCurrentPage}
                    />
                }
                map={activeMap}
            />
        </section>
    );
}