// src/components/common/search-results-info.tsx

import { useTranslations } from "next-intl";
import { SearchResultsInfoProps } from "@/types/components";

export function SearchResultsInfo({
    totalResults,
    filteredResults,
    searchQuery,
    itemName,
    itemNamePlural,
}: SearchResultsInfoProps) {
    const t = useTranslations("search-results-info");

    if (!searchQuery && filteredResults === totalResults) return null;

    const itemLabel = filteredResults === 1 ? itemName : itemNamePlural;

    return (
        <div className="results-info" role="status" aria-live="polite">
            <p>
                {searchQuery ? (
                    <>
                        {t("showingResults")}{" "}
                        <strong>{filteredResults}</strong>{" "}
                        {t("of")}{" "}
                        <strong>{totalResults}</strong>{" "}
                        {itemLabel}{" "}
                        {t("for")}{" "}
                        <span className="results-info-query">{searchQuery}</span>
                    </>
                ) : (
                    <>
                        {t("allResults")}{" "}
                        <strong>{filteredResults}</strong>{" "}
                        {t("of")}{" "}
                        <strong>{totalResults}</strong>{" "}
                        {itemLabel}
                    </>
                )}
            </p>
        </div>
    );
}