"use client";

import { useTranslations } from "next-intl";
import { FaDog } from "react-icons/fa";
import { GuideLayout } from "@/components/layouts/guide-layout";
import { DirectoryShell } from "@/components/layouts/directory-shell";
import { ParkCard } from "@/components/shared/cards";
import { useParksData, useDirectoryState } from "@/hooks/directories";
import { ITEMS_PER_PAGE_PARK } from "@/lib/directories/constants";
import type { ParkCardData } from "@/types/cards";

function filterPark(park: ParkCardData, query: string): boolean {
  return (
    park.name.toLowerCase().includes(query) ||
    (park.address?.toLowerCase().includes(query) ?? false)
  );
}

export function ParksDirectorySection() {
  const t = useTranslations("parks-directory");
  const tAcces = useTranslations("accessibility.parks-directory");

  const { parks, loading, error, isEmpty, refetch } = useParksData();

  const {
    searchQuery, setSearchQuery,
    debouncedSearch,
    filteredItems, paginatedItems,
    currentPage, totalPages, handlePageChange,
  } = useDirectoryState({
    items: parks,
    filterFn: filterPark,
    pageSize: ITEMS_PER_PAGE_PARK,
  });

  return (
    <GuideLayout
      icon={<FaDog className="w-6 h-6 text-primary" aria-hidden="true" />}
      directoryTitle={t("directoryTitle2")}
      mainTitle={t("mainTitle")}
      count={parks.length}
      countLabel={t("countLabel")}
      sourceInfo={t("sourceInfo")}
      headingId="parks-directory"
      ariaLabel={tAcces("name")}
    >
      <DirectoryShell
        loading={loading}
        error={error ?? null}
        isEmpty={isEmpty}
        skeletonVariant="park"
        skeletonCount={6}
        onRetry={refetch}
        loadingLabel={tAcces("loading")}
        noResultsLabel={t("noResultsSearch")}

        searchQuery={searchQuery}
        onSearch={setSearchQuery}
        searchPlaceholder={t("searchPlaceholder")}
        searchAriaLabel={t("searchLabel")}

        totalResults={parks.length}
        filteredResults={filteredItems.length}
        debouncedSearch={debouncedSearch}
        itemName={t("itemName")}
        itemNamePlural={t("itemNamePlural")}

        paginatedItems={paginatedItems}
        gridAriaLabel={tAcces("centersList")}
        gridClassName="sm:grid-cols-2 lg:grid-cols-3"
        renderItem={(park) => <ParkCard data={park} />}

        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
        paginationAriaLabel={tAcces("paginationAriaLabel")}
      />
    </GuideLayout>
  );
}