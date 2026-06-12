
"use client"

import { Button } from "@/components/ui/button";
import { useTranslations } from "next-intl";
import { paginationIcons } from "@/data/icons";
import { SimplePaginationProps } from "@/types/components";

export function SimplePagination({
    currentPage,
    totalPages,
    onPageChange,
    ariaLabel,
}: SimplePaginationProps) {
    const [ChevronLeft, ChevronRight] = paginationIcons;
    const t = useTranslations("pagination");
    const tAccess = useTranslations("accessibility.pagination");
    const isFirstPage = currentPage === 1;
    const isLastPage = currentPage === totalPages;

    return (
        <nav className="flex items-center justify-center gap-2 py-3 border-t border-border/40" aria-label={ariaLabel}>
            <Button
                onClick={() => onPageChange(currentPage - 1)}
                disabled={isFirstPage}
                aria-label={tAccess("previousPage")}
                variant="ghost"
                size="sm"
                className="cursor-pointer"
            >
                <ChevronLeft className="h-4 w-4" aria-hidden="true" />
                <span className="sr-only sm:not-sr-only sm:inline">{t("previousPage")}</span>
            </Button>

            <span className="px-2 text-xs font-medium text-foreground">
                {t("page")} {currentPage} {t("of")} {totalPages}
            </span>

            <Button
                onClick={() => onPageChange(currentPage + 1)}
                disabled={isLastPage}
                aria-label={tAccess("nextPage")}
                variant="ghost"
                size="sm"
                className="cursor-pointer"
            >
                <span className="sr-only sm:not-sr-only sm:inline">{t("nextPage")}</span>
                <ChevronRight className="h-4 w-4" aria-hidden="true" />
            </Button>
        </nav>
    );
}
