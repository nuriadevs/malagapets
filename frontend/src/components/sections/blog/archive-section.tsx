import type { MappedPost } from "@/types/blog"
import { getPosts } from "@/lib/blog/post-service"
import { getPaginationParams } from "@/hooks/use-pagination"
import { POSTS_PER_PAGE_ARCHIVE } from "@/lib/blog/constants"
import type { ArchiveSectionProps } from "@/types/blog-archive"
import ArchiveSectionContent from "@/components/sections/blog/archive-section-content"


export default async function ArchiveSection({
  locale,
  searchParams,
}: ArchiveSectionProps) {
  const pagination = await getPaginationParams(searchParams, POSTS_PER_PAGE_ARCHIVE)

  let posts: MappedPost[] = []
  let totalPosts = 0
  let pageCount = 1

  try {
    const response = await getPosts(locale, pagination.currentPage, POSTS_PER_PAGE_ARCHIVE)
    posts = response.data ?? []
    totalPosts = response.pagination?.total ?? 0
    pageCount = response.pagination?.pageCount ?? 1
  } catch {
    posts = []
    totalPosts = 0
  }

  const isLastPage = pagination.currentPage >= pageCount

  return (
    <ArchiveSectionContent
      posts={posts}
      currentPage={pagination.currentPage}
      isFirstPage={pagination.isFirstPage}
      isLastPage={isLastPage}
      totalPosts={totalPosts}
      locale={locale}
    />
  )
}
