// src/components/common/pagination.tsx
"use client";

import { Button } from "@/components/ui/button";
import { useTranslations } from "next-intl";
import { paginationIcons } from "@/data/icons";
import { SimplePaginationProps } from "@/types/components";



/**
 * SimplePagination component for navigating through pages.
 */
export function SimplePagination({
    currentPage,
    totalPages,
    onPageChange,
    ariaLabel = "Paginación"
}: SimplePaginationProps) {

    const [ChevronLeft, ChevronRight] = paginationIcons;
    const t = useTranslations("pagination");
    const tAccess = useTranslations("accessibility.pagination");
    const isFirstPage = currentPage === 1;
    const isLastPage = currentPage === totalPages;

    return (
        <div className="mt-10 flex items-center justify-center gap-4" aria-label={ariaLabel}>
            <Button
                onClick={() => onPageChange(currentPage - 1)}
                disabled={isFirstPage}
                aria-label={tAccess("previousPage")}
                variant="ghost"
                size="default"
                className="cursor-pointer">
                <ChevronLeft className="h-5 w-5" aria-hidden="true" />
                <span>{t("previousPage")}</span>
            </Button>

            <span className="px-4 font-medium text-foreground/80">
                {t("page")} {currentPage} {t("of")} {totalPages}
            </span>

            <Button
                onClick={() => onPageChange(currentPage + 1)}
                disabled={isLastPage}
                aria-label={tAccess("nextPage")}
                variant="ghost"
                size="default"
                className="cursor-pointer"
            >
                <span className="">{t("nextPage")}</span>
                <ChevronRight className="h-5 w-5" aria-hidden="true" />
            </Button>
        </div>
    );
}