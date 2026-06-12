// hooks/use-directory-state.ts
// ─────────────────────────────────────────────────────────────────────────────
// Hook genérico que encapsula la lógica repetida en las 3 secciones:
//   - estado de búsqueda + debounce
//   - filtrado client-side
//   - paginación
//   - scroll-to-top en cambio de página
//
// Antes: ~30 líneas idénticas en cada GuideSection.
// Ahora: un hook, cero duplicación.
// ─────────────────────────────────────────────────────────────────────────────

"use client";

import { useState, useEffect, useMemo, useCallback } from "react";
import { useDebounce } from "@/hooks/use-debounce";

interface UseDirectoryStateOptions<T> {
  /** Array de items ya normalizados */
  items: T[];
  /** Función que decide si un item coincide con la query */
  filterFn: (item: T, query: string) => boolean;
  /** Cuántos items por página */
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
  const [searchQuery, setSearchQuery]   = useState("");
  const [currentPage, setCurrentPage]  = useState(1);
  const debouncedSearch                = useDebounce(searchQuery, 150);

  // Filtrado memoizado
  const filteredItems = useMemo(() => {
    if (!debouncedSearch.trim()) return items;
    const q = debouncedSearch.toLowerCase();
    return items.filter((item) => filterFn(item, q));
  }, [items, debouncedSearch, filterFn]);

  // Reset a página 1 cuando cambia la búsqueda
  useEffect(() => {
    setCurrentPage(1);
  }, [debouncedSearch]);

  // Paginación
  const totalPages     = Math.ceil(filteredItems.length / pageSize);
  const startIndex     = (currentPage - 1) * pageSize;
  const paginatedItems = filteredItems.slice(startIndex, startIndex + pageSize);

  const handlePageChange = useCallback((page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  return {
    searchQuery,
    setSearchQuery,
    debouncedSearch,
    filteredItems,
    paginatedItems,
    currentPage,
    totalPages,
    handlePageChange,
  };
}
