// src/components/sections/blog/category-section-content.tsx
"use client"

import { useRouter, usePathname } from "next/navigation"
import { useTranslations } from "next-intl"
import { FileText as FileTextIcon } from "@/data/icons"
import { Suspense } from "react"
import { Button } from "@/components/ui/button"
import { ContentLayout } from "@/components/common/content-layout-section"
import { LoadingContent } from "@/components/ui/loading-content"
import PostList from "@/components/blog/post-list"
import Pagination from "@/components/blog/pagination"
import type { CategorySectionContentProps } from "@/types/blog-categories"


export default function CategorySectionContent({
  categories,
  posts,
  selectedCategory,
  currentPage,
  totalPages,
  isFirstPage,
  isLastPage,
  categoryCounts,
  totalCount,
  locale,
  asSection = false,
}: CategorySectionContentProps & { asSection?: boolean }) {
  const router = useRouter()
  const pathname = usePathname()
  const t = useTranslations("blog.content")
  const tAccess = useTranslations("accessibility.categories")


  const handleCategoryChange = (slug: string) => {
    const params = new URLSearchParams()
    if (slug !== "All") params.set("category", slug)
    params.set("page", "1")
    router.push(`${pathname}?${params.toString()}`)
  }


  const basePath = `/${locale}/blog/categorias`

  const HeadingTitle = asSection
    ? (
      <h2 className="text-4xl sm:text-5xl font-bold text-foreground/80 text-balance">
        {t("category.title")}
      </h2>
    )
    : (
      <h1 className="text-4xl sm:text-5xl font-bold text-foreground/80 text-balance">
        {t("category.title")}
      </h1>
    )

  return (
    <ContentLayout
      mainTitle={HeadingTitle}
      subtitle={
        <div className="space-y-3">
          <p className="text-lg text-muted-foreground text-pretty">
            {t("category.subtitle")}
          </p>
          {totalCount > 0 && (
            <span
              className="badge badge-pet"
              aria-label={`${totalCount} ${totalCount === 1 ? t("category.article") : t("category.articles")}`}
            >
              <FileTextIcon className="w-3.5 h-3.5" aria-hidden="true" />
              {totalCount}{" "}
              {totalCount === 1 ? t("category.article") : t("category.articles")}
            </span>
          )}
        </div>
      }
    >
      <div className="container-app pb-16 pt-8">
        <Suspense fallback={<LoadingContent />} key={`${selectedCategory}-${currentPage}`}>

          <nav aria-label={tAccess("categoriesList")} className="mb-10">
            <ul className="flex flex-wrap items-center justify-center gap-3">
              <li>
                <Button
                  variant={selectedCategory === "All" ? "pet" : "ghost"}
                  size="lg"
                  onClick={() => handleCategoryChange("All")}
                  aria-pressed={selectedCategory === "All"}
                  aria-label={`${t("all")} (${totalCount} ${totalCount === 1 ? t("category.article") : t("category.articles")})`}
                  className="rounded-full capitalize"
                >
                  {t("all")}
                  <span className="badge badge-secondary ml-1 text-xs">
                    {totalCount}
                  </span>
                </Button>
              </li>
              {categories.map((category) => {
                const count = categoryCounts[category.slug] ?? 0
                if (count === 0) return null
                const isActive = selectedCategory === category.slug
                return (
                  <li key={category.slug}>

                    <Button
                      variant={isActive ? "pet" : "ghost"}
                      size="lg"
                      onClick={() => handleCategoryChange(category.slug)}
                      aria-pressed={isActive}
                      aria-label={`${category.name} (${count} ${count === 1 ? t("category.article") : t("category.articles")})`}
                      className="rounded-full capitalize"
                    >
                      {category.name}
                      <span className="badge badge-muted ml-1 text-xs">
                        {count}
                      </span>
                    </Button>
                  </li>
                )
              })}
            </ul>
          </nav>

          {posts.length === 0 ? (
            <div
              className="flex flex-col items-center justify-center gap-4 py-20"
              role="status"
              aria-live="polite"
            >
              <p className="text-lg text-muted-foreground text-center">
                {t("category.noPosts")}
              </p>
            </div>
          ) : (
            <section aria-labelledby="category-posts-heading">
              <h2 id="category-posts-heading" className="sr-only">
                {selectedCategory === "All"
                  ? t("category.title")
                  : categories.find((c) => c.slug === selectedCategory)?.name ?? t("category.title")}
              </h2>
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
                {posts.map((post) => (
                  <PostList key={post.slug} post={post} variant="default" />
                ))}
              </div>
              {totalPages > 1 && (
                <Pagination
                  pageIndex={currentPage}
                  isFirstPage={isFirstPage}
                  isLastPage={isLastPage}
                  basePath={basePath}
                />
              )}
            </section>
          )}


          {!asSection && (
            <div className="flex justify-center mt-10">
              <Button
                asChild
                variant="default"
                size="xl"
                className="shadow-sm hover:shadow-pet transition-all duration-500 ease-in-out"
              >
                <a href={`/${locale}/blog`}>{t("backToBlog")}</a>
              </Button>
            </div>
          )}

        </Suspense>
      </div>
    </ContentLayout>
  )
}
