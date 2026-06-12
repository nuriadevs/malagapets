import { notFound } from "next/navigation"
import { getCategories } from "@/lib/blog/category-service"
import { getPosts } from "@/lib/blog/post-service"
import { getPaginationParams } from "@/hooks/use-pagination"
import type { SlugCategorySectionProps } from "@/types/blog-categories"
import SlugCategorySectionContent from "@/components/sections/blog/slug-category-section-content"

const POSTS_PER_PAGE = 6


export default async function SlugCategorySection({
  slug,
  locale,
  searchParams,
}: SlugCategorySectionProps) {
  const pagination = await getPaginationParams(searchParams, POSTS_PER_PAGE)

  const [categories, postsResponse] = await Promise.all([
    getCategories(locale),
    getPosts(locale, 1, 999),
  ])

  const category = categories.find((c) => c.slug === slug)

  if (!category) notFound()

  const allCategoryPosts = (postsResponse.data ?? []).filter(
    (p) => p.category?.slug === slug
  )

  const totalArticles = allCategoryPosts.length
  const pageCount = Math.max(1, Math.ceil(totalArticles / POSTS_PER_PAGE))
  const safePage = Math.min(pagination.currentPage, pageCount)
  const start = (safePage - 1) * POSTS_PER_PAGE
  const posts = allCategoryPosts.slice(start, start + POSTS_PER_PAGE)

  return (
    <SlugCategorySectionContent
      category={category}
      posts={posts}
      currentPage={safePage}
      totalArticles={totalArticles}
      isFirstPage={safePage === 1}
      isLastPage={safePage >= pageCount}
      locale={locale}
    />
  )
}
