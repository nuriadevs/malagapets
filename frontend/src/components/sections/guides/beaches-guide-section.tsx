// src/components/sections/guides/beaches-guide-section.tsx
"use client";

import { useState, useEffect, useMemo, useCallback } from "react";
import { useTranslations } from "next-intl";
import { FaUmbrellaBeach } from "react-icons/fa";
import { GuideLayout } from "@/components/common/guide-section";
import { useBeachesData } from "@/hooks/use-beaches-data";
import BeachCard from "@/components/ui/beaches/beach-card";
import { SearchFilter } from "@/components/common/search-filter";
import { SearchResultsInfo } from "@/components/common/search-results-info";
import { SimplePagination } from "@/components/common/pagination";
import { POSTS_PER_PAGE_BEACH } from "@/lib/blog/constants";
import { useDebounce } from "@/hooks/use-debounce";

export function BeachesGuideSection() {
    const t = useTranslations("beaches-guides");
    const tAcces = useTranslations("accessibility.beaches-guides");

    const [searchQuery, setSearchQuery] = useState("");
    const [currentPage, setCurrentPage] = useState(1);

    // 🔍 Debounce optimizado
    const debouncedSearch = useDebounce(searchQuery, 150);

    // 🚀 Cargar TODAS las playas una sola vez (sin pasar searchQuery)
    const { beaches, loading, error } = useBeachesData();

    // ✅ Filtrar en el cliente (como parques)
    const filteredBeaches = useMemo(() => {
        if (!debouncedSearch.trim()) return beaches;

        const query = debouncedSearch.toLowerCase();
        return beaches.filter((beach) => {
            return (
                beach.name?.toLowerCase().includes(query) ||
                beach.municipality?.toLowerCase().includes(query) ||
                beach.detailed_location?.toLowerCase().includes(query)
            );
        });
    }, [beaches, debouncedSearch]);

    // Resetear a página 1 cuando cambia la búsqueda
    useEffect(() => {
        setCurrentPage(1);
    }, [debouncedSearch]);

    // Calcular paginación (ahora con filtrado en cliente)
    const totalPages = Math.ceil(filteredBeaches.length / POSTS_PER_PAGE_BEACH);
    const startIndex = (currentPage - 1) * POSTS_PER_PAGE_BEACH;
    const endIndex = startIndex + POSTS_PER_PAGE_BEACH;
    const paginatedBeaches = filteredBeaches.slice(startIndex, endIndex);

    // ✅ Memoizar el callback
    const handlePageChange = useCallback((page: number) => {
        setCurrentPage(page);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }, []);

    return (
        <GuideLayout
            icon={<FaUmbrellaBeach className="w-6 h-6 text-cyan-600" aria-hidden="true" />}
            directoryTitle={t("directoryTitle2")}
            mainTitle={t("mainTitle")}
            subtitle={t("subtitle")}
            count={beaches.length}
            countLabel={t("countLabel")}
            sourceInfo={t("sourceInfo")}
            headingId="beaches-directory"
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
                    <p className="text-white text-lg">
                        {tAcces("loading")}
                    </p>
                </div>
            ) : error ? (
                <div
                    className="bg-red-500/20 border border-red-500/50 rounded-lg p-6 max-w-md mx-auto"
                    role="alert"
                    aria-live="assertive"
                >
                    <p className="text-red-100 text-lg">{error}</p>
                </div>
            ) : (
                <>
                    {/* Barra de búsqueda */}
                    <SearchFilter
                        placeholder={t("searchPlaceholder")}
                        ariaLabel={t("searchLabel")}
                        onSearch={setSearchQuery}
                        value={searchQuery}
                        className="mb-6"
                    />

                    {/* Información de resultados */}
                    <SearchResultsInfo
                        totalResults={beaches.length}
                        filteredResults={filteredBeaches.length}
                        searchQuery={debouncedSearch}
                        itemName={t("itemName")}
                        itemNamePlural={t("itemNamePlural")}
                    />

                    {/* Grid de playas */}
                    {paginatedBeaches.length > 0 ? (
                        <>
                            <div
                                className="grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-2 gap-8 py-10"
                                role="list"
                                aria-label={tAcces("centersList")}
                            >
                                {paginatedBeaches.map((beach) => (
                                    <div key={beach.id} role="listitem">
                                        <BeachCard beach={beach} />
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
                                {t("noResultsSearch")}
                            </p>
                        </div>
                    )}
                </>
            )}
        </GuideLayout>
    );
}
