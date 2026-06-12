import type { PaginationParams } from "@/types/blog";

export async function getPaginationParams(
  searchParams: Promise<{ page?: string }>,
  itemsPerPage = 6,
): Promise<PaginationParams> {
  const resolved = await searchParams;
  const currentPage = Math.max(1, parseInt(resolved.page ?? "1", 10));
  const offset = (currentPage - 1) * itemsPerPage;

  return {
    currentPage,
    offset,
    limit: itemsPerPage,
    isFirstPage: currentPage === 1,
    isLastPage: (totalItems: number) =>
      currentPage >= Math.ceil(totalItems / itemsPerPage),
    pageCount: (totalItems: number) => Math.ceil(totalItems / itemsPerPage),
  };
}
