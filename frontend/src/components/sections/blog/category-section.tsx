import { notFound } from "next/navigation"
import { getCategories } from "@/lib/blog/category-service"
import { getPosts } from "@/lib/blog/post-service"
import type { CategorySectionProps } from "@/types/blog-categories"
import CategorySectionContent from "./category-section-content"

const POSTS_PER_PAGE = 6

interface CategorySectionExtendedProps extends CategorySectionProps {
  asSection?: boolean
}

export default async function CategorySection({
  locale,
  searchParams,
  asSection = false,
}: CategorySectionExtendedProps) {
  const resolved = await searchParams
  const selectedCategory = resolved.category ?? "All"
  const currentPage = Math.max(1, parseInt(resolved.page ?? "1", 10))

  const [categories, postsResponse] = await Promise.all([
    getCategories(locale),
    getPosts(locale, 1, 999),
  ])

  if (categories.length === 0) notFound()

  if (selectedCategory !== "All") {
    const exists = categories.some((c) => c.slug === selectedCategory)
    if (!exists) notFound()
  }

  const allPosts = postsResponse.data ?? []

  const filtered = selectedCategory === "All"
    ? allPosts
    : allPosts.filter((p) => p.category?.slug === selectedCategory)

  const totalPages = Math.max(1, Math.ceil(filtered.length / POSTS_PER_PAGE))
  const safePage = Math.min(currentPage, totalPages)
  const start = (safePage - 1) * POSTS_PER_PAGE
  const paginated = filtered.slice(start, start + POSTS_PER_PAGE)


  const categoryCounts = Object.fromEntries(
    categories.map((cat) => [
      cat.slug,
      allPosts.filter((p) => p.category?.slug === cat.slug).length,
    ])
  )

  return (
    <CategorySectionContent
      categories={categories}
      posts={paginated}
      selectedCategory={selectedCategory}
      currentPage={safePage}
      totalPages={totalPages}
      isFirstPage={safePage === 1}
      isLastPage={safePage >= totalPages}
      categoryCounts={categoryCounts}
      totalCount={allPosts.length}
      locale={locale}
      asSection={asSection}
    />
  )
}
