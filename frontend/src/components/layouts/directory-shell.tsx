// components/common/directory-shell.tsx

import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { SearchFilter } from "@/components/ui/search-filter";
import { SearchResultsInfo } from "@/components/ui/search-results-info";
import { SimplePagination } from "@/components/common/pagination";
import { CardSkeletonList } from "@/components/shared/cards/CardSkeleton";
import type { DirectoryVariant } from "@/components/shared/cards/card.types";


interface DirectoryShellProps<T> {
  loading: boolean;
  error?: string | null;
  isEmpty?: boolean;
  onRetry?: () => void;
  skeletonVariant?: DirectoryVariant;
  skeletonCount?: number;
  loadingLabel: string;
  errorTitle?: string;
  errorDescription?: string;
  retryLabel?: string;
  emptyTitle?: string;
  emptyDescription?: string;
  reloadLabel?: string;
  noResultsLabel: string;
  searchQuery: string;
  onSearch: (q: string) => void;
  searchPlaceholder: string;
  searchAriaLabel: string;
  totalResults: number;
  filteredResults: number;
  debouncedSearch: string;
  itemName: string;
  itemNamePlural: string;
  paginatedItems: T[];
  gridAriaLabel: string;
  gridClassName?: string;
  renderItem: (item: T) => ReactNode;
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  paginationAriaLabel: string;
}


export function DirectoryShell<T>({
  loading,
  error,
  isEmpty,
  onRetry,
  skeletonVariant = "generic",
  skeletonCount = 4,
  loadingLabel,
  errorTitle,
  errorDescription,
  retryLabel,
  emptyTitle,
  emptyDescription,
  reloadLabel,
  noResultsLabel,
  searchQuery,
  onSearch,
  searchPlaceholder,
  searchAriaLabel,
  totalResults,
  filteredResults,
  debouncedSearch,
  itemName,
  itemNamePlural,
  paginatedItems,
  gridAriaLabel,
  gridClassName,
  renderItem,
  currentPage,
  totalPages,
  onPageChange,
  paginationAriaLabel,
}: DirectoryShellProps<T>) {

  if (loading) {
    return (
      <div
        role="status"
        aria-live="polite"
        aria-label={loadingLabel}
        className="space-y-4 pt-4"
      >
        <span className="sr-only">{loadingLabel}</span>
        <CardSkeletonList count={skeletonCount} variant={skeletonVariant} />
      </div>
    );
  }

  if (error) {
    return (
      <div
        role="alert"
        aria-live="assertive"
        className="bg-destructive/10 border border-destructive/30 rounded-xl
                   p-8 text-center max-w-md mx-auto"
      >
        <p className="text-foreground font-semibold mb-1">
          {errorTitle ?? "Ha ocurrido un error"}
        </p>
        <p className="text-muted-foreground text-sm mb-6">
          {errorDescription ?? error}
        </p>
        {onRetry && (
          <button
            onClick={onRetry}
            className="px-6 py-2.5 bg-destructive text-destructive-foreground
                       rounded-lg text-sm font-medium transition-all
                       hover:brightness-110 active:scale-95
                       focus-visible:outline-none focus-visible:ring-2
                       focus-visible:ring-destructive/50 focus-visible:ring-offset-2"
          >
            {retryLabel ?? "Reintentar"}
          </button>
        )}
      </div>
    );
  }

  if (isEmpty) {
    return (
      <div className="text-center py-20">
        <p className="text-lg text-muted-foreground mb-6">
          {emptyTitle ?? "No hay datos disponibles"}
        </p>
        {emptyDescription && (
          <p className="text-sm text-muted-foreground/70 mb-8 max-w-md mx-auto">
            {emptyDescription}
          </p>
        )}
        {onRetry && (
          <button
            onClick={onRetry}
            className="px-6 py-2.5 bg-muted text-foreground rounded-xl text-sm
                       font-medium transition-all hover:bg-muted/80
                       focus-visible:outline-none focus-visible:ring-2
                       focus-visible:ring-ring focus-visible:ring-offset-2"
          >
            {reloadLabel ?? "Recargar"}
          </button>
        )}
      </div>
    );
  }

  return (
    <>
      <SearchFilter
        placeholder={searchPlaceholder}
        ariaLabel={searchAriaLabel}
        onSearch={onSearch}
        value={searchQuery}
        className="mb-6"
      />

      <SearchResultsInfo
        totalResults={totalResults}
        filteredResults={filteredResults}
        searchQuery={debouncedSearch}
        itemName={itemName}
        itemNamePlural={itemNamePlural}
      />

      {paginatedItems.length > 0 ? (
        <>
          <ul
            className={cn(
              "grid grid-cols-1 gap-6 py-8",
              gridClassName ?? "sm:grid-cols-1 lg:grid-cols-2"
            )}
            role="list"
            aria-label={gridAriaLabel}
          >
            {paginatedItems.map((item, i) => (
              <li key={i} role="listitem">
                {renderItem(item)}
              </li>
            ))}
          </ul>

          {totalPages > 1 && (
            <SimplePagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={onPageChange}
              ariaLabel={paginationAriaLabel}
            />
          )}
        </>
      ) : (
        <div className="text-center py-14" role="status">
          <p className="text-muted-foreground text-lg">{noResultsLabel}</p>
        </div>
      )}
    </>
  );
}
