"use client";
import { useTranslations } from "next-intl";
import { useRouter, useSearchParams } from "next/navigation";
import { PaginationProps } from "@/types/blog";
import { paginationIcons } from "@/data/icons";
import { Button } from "@/components/ui/button";


export default function Pagination({
  pageIndex,
  isFirstPage,
  isLastPage,
  basePath = "/blog/archive"
}: PaginationProps) {

  const [ChevronLeft, ChevronRight] = paginationIcons;

  const t = useTranslations("pagination");
  const tAccess = useTranslations("accessibility.pagination");

  const router = useRouter();
  const searchParams = useSearchParams();

  const handleNextPage = () => {
    const params = new URLSearchParams(searchParams);
    params.set("page", (pageIndex + 1).toString());
    const query = params.toString();

    router.push(`${basePath}?${query}`);
  };

  const handlePrevPage = () => {
    const params = new URLSearchParams(searchParams);
    params.set("page", (pageIndex - 1).toString());
    const query = params.toString();

    router.push(`${basePath}?${query}`);
  };

  return (
    <div className="mt-10 flex items-center justify-center gap-2" aria-label={tAccess("pagination")}>
      <Button
        aria-label={tAccess("previousPage")}
        disabled={isFirstPage}
        onClick={handlePrevPage}
        variant="ghost"
        size="default"
        className="cursor-pointer"
      >
        <ChevronLeft className="h-4 w-4" aria-hidden="true" />
        <span>{t("previousPage")}</span>
      </Button>

      <span className="text-sm text-gray-600 dark:text-gray-400 px-4">
        {t("page")} {pageIndex}
      </span>

      <Button
        aria-label={tAccess("nextPage")}
        onClick={handleNextPage}
        disabled={isLastPage}
        variant="ghost"
        size="default"
        className="cursor-pointer"
      >
        <span>{t("nextPage")}</span>
        <ChevronRight className="h-4 w-4" aria-hidden="true" />
      </Button>
    </div>
  );
}