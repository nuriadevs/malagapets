// hooks/use-directory-state.ts
"use client";

import { useState, useMemo, useCallback } from "react";
import { useDebounce } from "@/hooks/use-debounce";

interface UseDirectoryStateOptions<T> {
  items: T[];
  filterFn: (item: T, query: string) => boolean;
  pageSize: number;
}

interface UseDirectoryStateResult<T> {
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  debouncedSearch: string;
  filteredItems: T[];
  paginatedItems: T[];
  currentPage: number;
  totalPages: number;
  handlePageChange: (page: number) => void;
}

export function useDirectoryState<T>({
  items,
  filterFn,
  pageSize,
}: UseDirectoryStateOptions<T>): UseDirectoryStateResult<T> {
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const debouncedSearch = useDebounce(searchQuery, 150);

  const filteredItems = useMemo(() => {
    if (!debouncedSearch.trim()) return items;
    const q = debouncedSearch.toLowerCase();
    return items.filter((item) => filterFn(item, q));
  }, [items, debouncedSearch, filterFn]);

  // Reset de página al cambiar búsqueda — sin useEffect
  const effectivePage = debouncedSearch !== searchQuery ? 1 : currentPage;

  const totalPages = Math.ceil(filteredItems.length / pageSize);
  const safePage = Math.min(effectivePage, totalPages || 1);
  const startIndex = (safePage - 1) * pageSize;
  const paginatedItems = filteredItems.slice(startIndex, startIndex + pageSize);

  const handlePageChange = useCallback((page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const handleSetSearchQuery = useCallback((q: string) => {
    setSearchQuery(q);
    setCurrentPage(1);
  }, []);

  return {
    searchQuery,
    setSearchQuery: handleSetSearchQuery,
    debouncedSearch,
    filteredItems,
    paginatedItems,
    currentPage: safePage,
    totalPages,
    handlePageChange,
  };
}
