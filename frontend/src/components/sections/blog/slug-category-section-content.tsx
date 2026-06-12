"use client"

import { Suspense } from "react"
import { useTranslations } from "next-intl"
import { FileText as FileTextIcon } from "@/data/icons"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ContentLayout } from "@/components/common/content-layout-section"
import { LoadingContent } from "@/components/ui/loading-content"
import PostList from "@/components/blog/post-list"
import Pagination from "@/components/blog/pagination"
import type { SlugCategorySectionContentProps } from "@/types/blog-categories"

const POSTS_PER_PAGE = 6

export default function SlugCategorySectionContent({
  category,
  posts,
  currentPage,
  totalArticles,
  isFirstPage,
  isLastPage,
  locale,
}: SlugCategorySectionContentProps) {
  const t = useTranslations("blog.category")
  const tContent = useTranslations("blog.content")

  const categoryTitle =
    category.name.charAt(0).toUpperCase() + category.name.slice(1)

  const basePath = `/${locale}/blog/categorias/${category.slug}`

  return (
    <ContentLayout
      mainTitle={
        <h1
          id="category-title"
          className="text-4xl sm:text-5xl font-bold text-foreground/80 text-balance capitalize"
        >
          {categoryTitle}
        </h1>
      }
      subtitle={
        <div className="space-y-3">
          {category.description && (
            <p className="text-lg text-muted-foreground text-pretty max-w-2xl mx-auto">
              {category.description}
            </p>
          )}
          <span
            className="badge badge-pet"
            aria-label={`${totalArticles} ${totalArticles === 1 ? t("article") : t("articles")}`}
          >
            <FileTextIcon className="w-3.5 h-3.5" aria-hidden="true" />
            {totalArticles}{" "}
            {totalArticles === 1 ? t("article") : t("articles")}
          </span>
        </div>
      }
    >
      <div className="container-app pb-16 pt-8">
        <Suspense fallback={<LoadingContent />} key={currentPage}>

          {posts.length === 0 ? (
            <div
              className="flex flex-col items-center justify-center gap-4 py-20"
              role="status"
              aria-live="polite"
            >
              <p className="text-lg text-muted-foreground text-center">
                {t("noPosts")}
              </p>
              <Button asChild variant="outline" size="lg">
                <Link href={`/${locale}/blog/categorias`}>
                  {t("allCategories")}
                </Link>
              </Button>
            </div>
          ) : (
            <>
              <section aria-labelledby="category-posts-heading">
                <h2 id="category-posts-heading" className="sr-only">
                  {t("postsInCategory", { category: categoryTitle })}
                </h2>
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
                  {posts.map((post) => (
                    <PostList key={post.slug} post={post} variant="default" />
                  ))}
                </div>
              </section>

              {totalArticles > POSTS_PER_PAGE && (
                <Pagination
                  pageIndex={currentPage}
                  isFirstPage={isFirstPage}
                  isLastPage={isLastPage}
                  basePath={basePath}
                />
              )}
            </>
          )}

          <hr className="divider-section my-10" aria-hidden="true" />

          <nav
            aria-label="Navegación de regreso"
            className="flex items-center justify-center gap-4"
          >
            <Button asChild variant="outline" size="lg">
              <Link href={`/${locale}/blog/categorias`}>
                {t("allCategories")}
              </Link>
            </Button>
            <Button
              asChild
              variant="ghost"
              size="xl"
              className="shadow-sm hover:shadow-pet transition-all duration-500 ease-in-out"
            >
              <Link href={`/${locale}/blog`}>
                {tContent("backToBlog")}
              </Link>
            </Button>
          </nav>

        </Suspense>
      </div>
    </ContentLayout>
  )
}
