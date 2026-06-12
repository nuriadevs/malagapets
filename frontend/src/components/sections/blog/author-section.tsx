import { notFound } from "next/navigation"
import type { MappedPost } from "@/types/blog"
import { getAuthorBySlug, getPostsByAuthor } from "@/lib/blog/author-service"
import { getPaginationParams } from "@/hooks/use-pagination"
import AuthorSectionContent from "@/components/sections/blog/author-section-content"

interface AuthorSectionProps {
  slug: string
  locale: string
  searchParams: Promise<{ page?: string }>
}


export default async function AuthorSection({
  slug,
  locale,
  searchParams,
}: AuthorSectionProps) {

  const pagination = await getPaginationParams(searchParams, 6)

  const author = await getAuthorBySlug(slug, locale)
  if (!author) notFound()

  let posts: MappedPost[] = []
  let totalArticles = 0
  let pageCount = 1

  try {
    const response = await getPostsByAuthor(
      slug,
      locale,
      pagination.currentPage,
      pagination.limit
    )
    posts = response.data ?? []
    totalArticles = response.pagination?.total ?? 0
    pageCount = response.pagination?.pageCount ?? 1
  } catch {

    posts = []
    totalArticles = 0
  }

  const isLastPage = pagination.currentPage >= pageCount

  return (
    <AuthorSectionContent
      author={author}
      posts={posts}
      currentPage={pagination.currentPage}
      totalArticles={totalArticles}
      isFirstPage={pagination.isFirstPage}
      isLastPage={isLastPage}
      locale={locale}
    />
  )
}
