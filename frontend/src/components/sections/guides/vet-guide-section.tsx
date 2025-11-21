// src/components/sections/guides/vet-guide-section.tsx
"use client";

import { useState, useEffect, useMemo, useCallback } from "react";
import { useTranslations } from "next-intl";
import { Hospital } from 'lucide-react';
import { GuideLayout } from "@/components/common/guide-section";
import { VeterinaryCard } from "@/components/ui/veterinary/veterinary-card";
import { useVeterinaryData } from "@/hooks/use-veterinary-data";
import { SearchFilter } from "@/components/common/search-filter";
import { SearchResultsInfo } from "@/components/common/search-results-info";
import { SimplePagination } from "@/components/common/pagination";
import { POSTS_PER_PAGE_VET } from "@/lib/blog/constants";
import { useDebounce } from "@/hooks/use-debounce";


export function VetsGuideSection() {
    const t = useTranslations("veterinary-guides");
    const tAcces = useTranslations("accessibility.vets-guides");

    const [searchQuery, setSearchQuery] = useState("");
    const [currentPage, setCurrentPage] = useState(1);

    // 🔍 Debounce optimizado
    const debouncedSearch = useDebounce(searchQuery, 150);

    // 🚀 Cargar TODOS los centros una sola vez (sin pasar searchQuery)
    const { centers, loading, error, isEmpty, refetch } = useVeterinaryData();

    // ✅ Filtrar en el cliente (como parques)
    const filteredCenters = useMemo(() => {
        if (!debouncedSearch.trim()) return centers;

        const query = debouncedSearch.toLowerCase();
        return centers.filter((center) => {
            return (
                center.name?.toLowerCase().includes(query) ||
                center.address?.toLowerCase().includes(query) ||
                center.postalCode?.toLowerCase().includes(query)
            );
        });
    }, [centers, debouncedSearch]);

    // Resetear a página 1 cuando cambia la búsqueda
    useEffect(() => {
        setCurrentPage(1);
    }, [debouncedSearch]);

    // Calcular paginación (ahora con filtrado en cliente)
    const totalPages = Math.ceil(filteredCenters.length / POSTS_PER_PAGE_VET);
    const startIndex = (currentPage - 1) * POSTS_PER_PAGE_VET;
    const endIndex = startIndex + POSTS_PER_PAGE_VET;
    const paginatedCenters = filteredCenters.slice(startIndex, endIndex);

    // ✅ Memoizar el callback
    const handlePageChange = useCallback((page: number) => {
        setCurrentPage(page);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }, []);

    return (
        <GuideLayout
            icon={<Hospital className="w-6 h-6 text-cyan-600" />}
            directoryTitle={t("directoryTitle")}
            mainTitle={t("mainTitle")}
            subtitle={t("subtitle")}
            count={centers.length}
            countLabel={t("countLabel")}
            sourceInfo={t("sourceInfo")}
            headingId="directory"
            ariaLabel={tAcces("name")}
        >
            {loading && (
                <div
                    className="flex flex-col items-center justify-center min-h-80 py-12"
                    role="status"
                    aria-live="polite"
                    aria-label={tAcces("loading")}
                >
                    <div className="animate-spin rounded-full h-12 w-12 border-4 border-white/30 border-t-white mb-4" />
                    <span className="text-lg text-white/90 font-medium">
                        {t("loading")}
                    </span>
                </div>
            )}

            {error && (
                <div
                    className="bg-red-500 border-2 border-red-700 rounded-xl p-8 text-center max-w-md mx-auto"
                    role="alert"
                    aria-live="assertive"
                >
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-red-700/20 rounded-full mb-4">
                        <Hospital className="w-8 h-8 text-red-100" />
                    </div>
                    <h3 className="text-red-100 text-xl font-bold mb-2">
                        {t("errorTitle")}
                    </h3>
                    <p className="text-red-100/90 mb-6 text-sm">
                        {error}
                    </p>
                    <button
                        onClick={refetch}
                        className="cursor-pointer px-6 py-3 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-offset-2 focus:ring-offset-transparent"
                        aria-label={t("retryButton")}
                    >
                        {t("retry")}
                    </button>
                </div>
            )}

            {isEmpty && (
                <div className="text-center py-20">
                    <div className="inline-flex items-center justify-center w-20 h-20 bg-white/20 border-2 border-white/30 rounded-2xl mb-6">
                        <Hospital className="w-10 h-10 text-white" aria-hidden="true" />
                    </div>
                    <h3 className="text-2xl font-bold  mb-3">
                        {t("emptyTitle") || t("noResultsCenters")}
                    </h3>
                    <p className="text-lg max-w-md mx-auto mb-8 leading-relaxed">
                        {t("emptyDescription")}
                    </p>
                    <button
                        onClick={refetch}
                        className="px-8 py-3 bg-white/20 hover:bg-white/30 backdrop-blur-sm border border-white/30  font-semibold rounded-xl transition-all shadow-lg hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-white/50 focus:ring-offset-2 focus:ring-offset-transparent"
                        aria-label={t("reloadButton")}
                    >
                        {t("reloadButton")}
                    </button>
                </div>
            )}

            {!loading && !error && !isEmpty && (
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
                        totalResults={centers.length}
                        filteredResults={filteredCenters.length}
                        searchQuery={debouncedSearch}
                        itemName={t("itemName")}
                        itemNamePlural={t("itemNamePlural")}
                    />

                    {/* Grid de centros */}
                    {paginatedCenters.length > 0 ? (
                        <>
                            <div
                                className="grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-2 gap-8 py-10"
                                role="list"
                                aria-label={tAcces("centersList")}
                            >
                                {paginatedCenters.map((center) => (
                                    <div key={center.id} role="listitem">
                                        <VeterinaryCard center={center} />
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