"use client";
import { useTranslations } from "next-intl";
import { FaUmbrellaBeach } from "react-icons/fa";
import { GuideLayout } from "@/components/layouts/guide-layout";
import { DirectoryShell } from "@/components/layouts/directory-shell";
import { BeachCard } from "@/components/shared/cards";
import { useBeachesData } from "@/hooks/directories";
import { useDirectoryState } from "@/hooks/directories";
import { ITEMS_PER_PAGE_BEACH } from "@/lib/directories/constants";
import type { BeachCardData } from "@/types/cards";

function filterBeach(beach: BeachCardData, query: string): boolean {
  return (
    beach.name.toLowerCase().includes(query) ||
    beach.municipality.toLowerCase().includes(query) ||
    beach.location.toLowerCase().includes(query)
  );
}

export function BeachesDirectorySection() {
  const t = useTranslations("beaches-directory");
  const tAcces = useTranslations("accessibility.beaches-directory");
const { beaches, loading, error, isEmpty, refetch } = useBeachesData()


  const {
    searchQuery, setSearchQuery, debouncedSearch,
    filteredItems, paginatedItems,
    currentPage, totalPages, handlePageChange,
  } = useDirectoryState({
    items: beaches,
    filterFn: filterBeach,
    pageSize: ITEMS_PER_PAGE_BEACH,
  });

  return (
    <GuideLayout
      icon={<FaUmbrellaBeach className="w-6 h-6 text-primary" aria-hidden="true" />}
      directoryTitle={t("directoryTitle2")}
      mainTitle={t("mainTitle")}
      count={beaches.length}
      countLabel={t("countLabel")}
      sourceInfo={t("sourceInfo")}
      headingId="beaches-directory"
      ariaLabel={tAcces("name")}
    >
      <DirectoryShell
        loading={loading}
        error={error ?? null}
        isEmpty={isEmpty}
        skeletonVariant="beach"
        onRetry={refetch}
        skeletonCount={4}
        loadingLabel={tAcces("loading")}
        errorTitle={t("errorTitle")}
        retryLabel={t("retry")}
        emptyTitle={t("emptyTitle")}
        emptyDescription={t("emptyDescription")}
        noResultsLabel={t("noResultsSearch")}
        searchQuery={searchQuery}
        onSearch={setSearchQuery}
        searchPlaceholder={t("searchPlaceholder")}
        searchAriaLabel={t("searchLabel")}
        totalResults={beaches.length}
        filteredResults={filteredItems.length}
        debouncedSearch={debouncedSearch}
        itemName={t("itemName")}
        itemNamePlural={t("itemNamePlural")}
        paginatedItems={paginatedItems}
        gridAriaLabel={tAcces("centersList")}
        gridClassName="sm:grid-cols-1 lg:grid-cols-2"
        renderItem={(beach) => <BeachCard data={beach} />}
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
        paginationAriaLabel={tAcces("paginationAriaLabel")}
      />
    </GuideLayout>
  );
}