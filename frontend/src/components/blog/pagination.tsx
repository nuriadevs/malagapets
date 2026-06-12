"use client"

import Link from "next/link"
import { useTranslations } from "next-intl"
import { Button } from "@/components/ui/button"
import { paginationIcons } from "@/data/icons"

interface PaginationProps {
  pageIndex: number
  isFirstPage: boolean
  isLastPage: boolean
  basePath: string
}


export default function Pagination({
  pageIndex,
  isFirstPage,
  isLastPage,
  basePath,
}: PaginationProps) {
  const [ChevronLeft, ChevronRight] = paginationIcons
  const t = useTranslations("pagination")
  const tAccess = useTranslations("accessibility.pagination")

  const prevHref = `${basePath}?page=${pageIndex - 1}`
  const nextHref = `${basePath}?page=${pageIndex + 1}`

  return (
    <nav
      aria-label={tAccess("navigation")}
      className="flex items-center justify-center gap-2 py-6 border-t border-border mt-8"
    >
      {isFirstPage ? (
        <Button
          variant="ghost"
          size="sm"
          disabled
          aria-label={tAccess("previousPage")}
        >
          <ChevronLeft className="h-4 w-4" aria-hidden="true" />
          <span className="sr-only sm:not-sr-only sm:inline">{t("previousPage")}</span>
        </Button>
      ) : (
        <Button asChild variant="ghost" size="sm" aria-label={tAccess("previousPage")}>
          <Link href={prevHref}>
            <ChevronLeft className="h-4 w-4" aria-hidden="true" />
            <span className="sr-only sm:not-sr-only sm:inline">{t("previousPage")}</span>
          </Link>
        </Button>
      )}

      <span className="px-3 text-sm font-medium text-foreground tabular-nums">
        {t("page")} {pageIndex}
      </span>

      {isLastPage ? (
        <Button
          variant="ghost"
          size="sm"
          disabled
          aria-label={tAccess("nextPage")}
        >
          <span className="sr-only sm:not-sr-only sm:inline">{t("nextPage")}</span>
          <ChevronRight className="h-4 w-4" aria-hidden="true" />
        </Button>
      ) : (
        <Button asChild variant="ghost" size="sm" aria-label={tAccess("nextPage")}>
          <Link href={nextHref}>
            <span className="sr-only sm:not-sr-only sm:inline">{t("nextPage")}</span>
            <ChevronRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </Button>
      )}
    </nav>
  )
}
