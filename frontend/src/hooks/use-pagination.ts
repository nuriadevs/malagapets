// lib/hooks/usePagination.ts
import  { PaginationParams } from "@/types/blog";

export async function getPaginationParams(
  searchParams: Promise<{ page?: string }>,
  itemsPerPage: number = 6
): Promise<PaginationParams> {
  const resolvedParams = await searchParams;
  const currentPage = Math.max(1, parseInt(resolvedParams.page || "1", 10));
  const offset = (currentPage - 1) * itemsPerPage;

  return {
    currentPage,
    offset,
    limit: itemsPerPage,
    isFirstPage: currentPage === 1,
    isLastPage: (totalItems: number) => {
      const pages = Math.ceil(totalItems / itemsPerPage);
      return currentPage >= pages;
    },
    pageCount: (totalItems: number) => Math.ceil(totalItems / itemsPerPage),
  };
}