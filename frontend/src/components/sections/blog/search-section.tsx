import { searchPosts } from "@/lib/blog/search-service"
import { POSTS_PER_PAGE_SEARCH } from "@/lib/blog/constants"
import type { SearchSectionProps } from "@/types/blog-search"
import SearchSectionContent from "./search-section-content"
import { MappedPost } from '@/types/blog';


export default async function SearchSection({
  params,
  searchParams,
}: SearchSectionProps) {
  const { locale } = await params
  const { q, page } = await searchParams

  const query = q ?? ""
  const currentPage = Math.max(1, parseInt(page ?? "1", 10))

  let posts: MappedPost[] = []
  let totalPosts = 0
  let pageCount = 1

  if (query.trim()) {
    try {
      const response = await searchPosts(query, locale, currentPage, POSTS_PER_PAGE_SEARCH)
      posts = response.data
      totalPosts = response.pagination.total
      pageCount = response.pagination.pageCount
    } catch {
      posts = []
      totalPosts = 0
    }
  }

  const safePage = Math.min(currentPage, Math.max(1, pageCount))

  return (
    <SearchSectionContent
      query={query}
      posts={posts}
      totalPosts={totalPosts}
      currentPage={safePage}
      isFirstPage={safePage === 1}
      isLastPage={safePage >= pageCount}
      locale={locale}
      postsPerPage={POSTS_PER_PAGE_SEARCH}
    />
  )
}
