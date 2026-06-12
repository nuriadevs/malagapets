"use client";

import { useTranslations }   from "next-intl";
import { vetCardIcons }      from "@/data/icons";
import { GuideLayout }       from "@/components/layouts/guide-layout";
import { DirectoryShell }    from "@/components/layouts/directory-shell";
import { VetCard }           from "@/components/shared/cards";
import { useVeterinaryData } from "@/hooks/directories";
import { useDirectoryState } from "@/hooks/directories";
import { ITEMS_PER_PAGE_VET } from "@/lib/directories/constants";  // ← renombrado
import type { VetCardData }  from "@/types/cards";

function filterVet(vet: VetCardData, query: string): boolean {
  return (
    vet.name.toLowerCase().includes(query)                       ||
    vet.address.toLowerCase().includes(query)                    ||
    (vet.postalCode?.toLowerCase().includes(query) ?? false)
  );
}

export function VetDirectorySection() {
  const t      = useTranslations("veterinary-directory");
  const tAcces = useTranslations("accessibility.vets-directory");

  const { centers: vets, loading, error, isEmpty, refetch } = useVeterinaryData();

  const {
    searchQuery, setSearchQuery,
    debouncedSearch,
    filteredItems, paginatedItems,
    currentPage, totalPages, handlePageChange,
  } = useDirectoryState({
    items:    vets,
    filterFn: filterVet,
    pageSize: ITEMS_PER_PAGE_VET,
  });

  return (
    <GuideLayout
      icon={<vetCardIcons.vetHospital className="w-6 h-6 text-primary" aria-hidden="true" />}
      directoryTitle={t("directoryTitle")}
      mainTitle={t("mainTitle")}
     // subtitle={t("subtitle")}
      count={vets.length}
      countLabel={t("countLabel")}
      sourceInfo={t("sourceInfo")}
      headingId="vet-directory"
      ariaLabel={tAcces("name")}
    >
      <DirectoryShell
        loading={loading}
        error={error ?? null}
        isEmpty={isEmpty}
        onRetry={refetch}
        skeletonVariant="vet"
        skeletonCount={4}

        loadingLabel={tAcces("loading")}
        errorTitle={t("errorTitle")}
        errorDescription={error ?? undefined}
        retryLabel={t("retry")}
        emptyTitle={t("emptyTitle")}
        emptyDescription={t("emptyDescription")}
        reloadLabel={t("reloadButton")}
        noResultsLabel={t("noResultsSearch")}

        searchQuery={searchQuery}
        onSearch={setSearchQuery}
        searchPlaceholder={t("searchPlaceholder")}
        searchAriaLabel={t("searchLabel")}

        totalResults={vets.length}
        filteredResults={filteredItems.length}
        debouncedSearch={debouncedSearch}
        itemName={t("itemName")}
        itemNamePlural={t("itemNamePlural")}

        paginatedItems={paginatedItems}
        gridAriaLabel={tAcces("centersList")}
        gridClassName="sm:grid-cols-1 lg:grid-cols-2"
        renderItem={(vet) => <VetCard data={vet} />}

        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
        paginationAriaLabel={tAcces("paginationAriaLabel")}
      />
    </GuideLayout>
  );
}