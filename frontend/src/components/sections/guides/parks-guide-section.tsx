// components/sections/guides/parks-guide-section.tsx
"use client";

import { useState, useMemo, useEffect, useCallback } from "react";
import { useTranslations } from "next-intl";
import { FaDog } from "react-icons/fa";
import { GuideLayout } from "@/components/common/guide-section";
import { useParksData } from "@/hooks/use-parks-data";
import ParkCard from "@/components/ui/parks/park-card";
import { SearchFilter } from "@/components/common/search-filter";
import { SearchResultsInfo } from "@/components/common/search-results-info";
import { SimplePagination } from "@/components/common/pagination";
import { POSTS_PER_PAGE_PARK } from "@/lib/blog/constants";
import { useDebounce } from "@/hooks/use-debounce";

export function ParksGuideSection() {
    const { parques, loading, error } = useParksData();
    const t = useTranslations("parks-guides");
    const tAcces = useTranslations("accessibility.parks-guides");

    const [searchQuery, setSearchQuery] = useState("");
    const [currentPage, setCurrentPage] = useState(1);

    // ✅ Debounce optimizado
    const debouncedSearch = useDebounce(searchQuery, 150);

    // ✅ Memoizar el icono para evitar nueva referencia
    const parkIcon = useMemo(
        () => <FaDog className="w-6 h-6 text-cyan-600" aria-hidden="true" />,
        []
    );

    // ✅ Memoizar traducciones estáticas
    const staticTranslations = useMemo(() => ({
        directoryTitle2: t("directoryTitle2"),
        mainTitle: t("mainTitle"),
        countLabel: t("countLabel"),
        sourceInfo: t("sourceInfo"),
        searchPlaceholder: t("searchPlaceholder"),
        searchLabel: t("searchLabel"),
        itemName: t("itemName"),
        itemNamePlural: t("itemNamePlural"),
        noResultsSearch: t("noResultsSearch"),
    }), [t]);

    // Filtrar parques según la búsqueda
    const filteredParques = useMemo(() => {
        if (!debouncedSearch.trim()) return parques;

        const query = debouncedSearch.toLowerCase();
        return parques.filter((parque) => {
            return (
                parque.properties.Nombre?.toLowerCase().includes(query) ||
                parque.properties.Direccion?.toLowerCase().includes(query)
            );
        });
    }, [parques, debouncedSearch]);

    // Resetear a página 1 cuando cambia la búsqueda
    useEffect(() => {
        setCurrentPage(1);
    }, [debouncedSearch]);

    // Calcular paginación
    const totalPages = Math.ceil(filteredParques.length / POSTS_PER_PAGE_PARK);
    const startIndex = (currentPage - 1) * POSTS_PER_PAGE_PARK;
    const endIndex = startIndex + POSTS_PER_PAGE_PARK;
    const paginatedParques = filteredParques.slice(startIndex, endIndex);

    // ✅ Memoizar el callback
    const handlePageChange = useCallback((page: number) => {
        setCurrentPage(page);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }, []);

    return (
        <GuideLayout
            icon={parkIcon}
            directoryTitle={staticTranslations.directoryTitle2}
            mainTitle={staticTranslations.mainTitle}
            count={parques.length}
            countLabel={staticTranslations.countLabel}
            sourceInfo={staticTranslations.sourceInfo}
            headingId="parks-directory"
            ariaLabel={tAcces("name")}
        >
            {loading ? (
                <div
                    className="flex flex-col items-center justify-center py-12"
                    role="status"
                    aria-live="polite"
                    aria-label={tAcces("loading")}
                >
                    <div className="animate-spin rounded-full h-12 w-12 border-4 border-white/30 border-t-white mb-4" />
                    <p className="text-lg">
                        {tAcces("loading")}
                    </p>
                </div>
            ) : error ? (
                <div
                    className="bg-red-500/20 border border-red-500/50 rounded-lg p-6 max-w-md mx-auto"
                    role="alert"
                    aria-live="assertive"
                >
                    <p className="text-lg">{error}</p>
                </div>
            ) : (
                <>
                    {/* Barra de búsqueda */}
                    <SearchFilter
                        placeholder={staticTranslations.searchPlaceholder}
                        ariaLabel={staticTranslations.searchLabel}
                        onSearch={setSearchQuery}
                        value={searchQuery}
                        className="mb-6"
                    />

                    {/* Información de resultados */}
                    <SearchResultsInfo
                        totalResults={parques.length}
                        filteredResults={filteredParques.length}
                        searchQuery={debouncedSearch}
                        itemName={staticTranslations.itemName}
                        itemNamePlural={staticTranslations.itemNamePlural}
                    />

                    {/* Grid de parques */}
                    {paginatedParques.length > 0 ? (
                        <>
                            <div
                                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 py-10"
                                role="list"
                                aria-label={tAcces("centersList")}
                            >
                                {paginatedParques.map((parque) => (
                                    <div key={parque.id} role="listitem">
                                        <ParkCard parque={parque} />
                                    </div>
                                ))}
                            </div>

                            {/* Paginación */}
                            {totalPages > 1 && (
                                <SimplePagination
                                    currentPage={currentPage}
                                    totalPages={totalPages}
                                    onPageChange={handlePageChange}
                                    ariaLabel={tAcces("paginationAriaLabel")}
                                />
                            )}
                        </>
                    ) : (
                        <div className="text-center py-12">
                            <p className="text-white/80 text-lg">
                                {staticTranslations.noResultsSearch}
                            </p>
                        </div>
                    )}
                </>
            )}
        </GuideLayout>
    );
}