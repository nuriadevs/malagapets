// src/components/common/search-results-info.tsx

import { useTranslations } from "next-intl";
import {SearchResultsInfoProps} from "@/types/components";


export function SearchResultsInfo({
    totalResults,
    filteredResults,
    searchQuery,
    itemName,
    itemNamePlural,
}: SearchResultsInfoProps) {
    const t = useTranslations("search-results-info");
    if (!searchQuery && filteredResults === totalResults) return null;

    return (
        <div className="bg-success/20 backdrop-blur-sm rounded-lg px-4 py-3 border-success/10 border-1 shadow-md">
            <p className="text-sm">
                {searchQuery ? (
                    <>
                        {t("showingResults")} <span className="font-bold">{filteredResults}</span> {t("of")}{" "}
                        <span className="font-bold">{totalResults}</span>{" "}
                        {filteredResults === 1 ? itemName : itemNamePlural}
                        {searchQuery && (
                            <>
                                {" "}
                                {t("for")} <span className="font-bold">`{searchQuery}`</span>
                            </>
                        )}
                    </>
                ) : (
                    <>
                        {t("allResults")} <span className="font-bold">{filteredResults}</span> {t("of")}{" "}
                        <span className="font-bold">{totalResults}</span>{" "}
                        {filteredResults === 1 ? itemName : itemNamePlural}
                    </>
                )}
            </p>
        </div>
    );
}