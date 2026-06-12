"use client"

import { useTranslations } from "next-intl"
import { searchResult } from "@/data/icons"
import { ContentLayout } from "@/components/common/content-layout-section"
import PostList from "@/components/blog/post-list"
import Pagination from "@/components/blog/pagination"
import SearchBar from "@/components/blog/search/search-bar"
import type { SearchSectionContentProps } from "@/types/blog-search"


export default function SearchSectionContent({
  query,
  posts,
  totalPosts,
  currentPage,
  isFirstPage,
  isLastPage,
  locale,
  postsPerPage,
}: SearchSectionContentProps) {
  const [Search, FileSearch2] = searchResult
  const t = useTranslations("search")

  const truncatedQuery =
    query && query.length > 20 ? `${query.slice(0, 20)}...` : query

  return (
    <ContentLayout
      mainTitle={
        <h1 className="text-4xl sm:text-5xl font-bold text-foreground/80 text-balance">
          {query ? t("resultsFor", { query: truncatedQuery }) : t("title")}
        </h1>
      }
      subtitle={
        query && totalPosts > 0 ? (
          <span className="badge badge-pet">
            {totalPosts}{" "}
            {totalPosts === 1 ? t("article") : t("articles")}
          </span>
        ) : (
          <p className="text-lg text-muted-foreground">{t("subtitle")}</p>
        )
      }
    >
      <div className="container-app pb-16 pt-8">

        <div className="mb-12">
          <SearchBar basePath={`/${locale}/blog`} />
        </div>

        {!query ? (
          <div
            className="text-center py-20 rounded-2xl border-2 border-dashed border-border"
            role="status"
            aria-live="polite"
          >
            <div className="inline-flex items-center justify-center mb-6">
              <div className="w-20 h-20 flex items-center justify-center bg-primary/10 rounded-full border border-primary/20">
                <Search className="w-10 h-10 text-primary" strokeWidth={2} aria-hidden="true" />
              </div>
            </div>
            <p className="text-xl font-semibold text-foreground mb-2">
              {t("emptyState.title")}
            </p>
            <p className="text-sm text-muted-foreground max-w-md mx-auto">
              {t("subtitle")}
            </p>
          </div>

        ) : posts.length === 0 ? (

          <div
            className="text-center py-20 rounded-2xl border-2 border-dashed border-border"
            role="status"
            aria-live="polite"
          >
            <div className="inline-flex items-center justify-center mb-6">
              <div className="w-20 h-20 flex items-center justify-center bg-muted rounded-full border border-border">
                <FileSearch2 className="w-10 h-10 text-muted-foreground" strokeWidth={2} aria-hidden="true" />
              </div>
            </div>
            <p className="text-xl font-semibold text-foreground mb-2">
              {t("noResults.title")}
            </p>
            <p className="text-sm text-muted-foreground max-w-md mx-auto mb-4">
              {t("noResults.description")}
            </p>
            <span className="inline-flex items-center gap-2 text-xs text-muted-foreground bg-muted px-4 py-2 rounded-full border border-border">
              <span className="font-mono font-semibold">&ldquo;{query}&rdquo;</span>
            </span>
          </div>

        ) : (

          <>
            <div className="mb-8 flex items-center gap-3">
              <div className="w-10 h-10 flex items-center justify-center bg-primary/10 rounded-full border border-primary/20">
                <FileSearch2 className="w-5 h-5 text-primary" strokeWidth={2} aria-hidden="true" />
              </div>
              <div>
                <p className="text-sm font-medium text-foreground/70">
                  {t("resultsCount", {
                    count: totalPosts,
                    articles: totalPosts === 1 ? t("article") : t("articles"),
                  })}
                </p>
                <p className="text-xs text-muted-foreground">
                  {t("searchTerm")}:{" "}
                  <span className="font-semibold text-primary">{query}</span>
                </p>
              </div>
            </div>

            <section aria-labelledby="search-results-heading">
              <h2 id="search-results-heading" className="sr-only">
                {t("resultsFor", { query })}
              </h2>
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
                {posts.map((post) => (
                  <PostList key={post.slug} post={post} variant="default" />
                ))}
              </div>
            </section>

            {totalPosts > postsPerPage && (
              <Pagination
                pageIndex={currentPage}
                isFirstPage={isFirstPage}
                isLastPage={isLastPage}
                basePath={`/${locale}/blog/search?q=${encodeURIComponent(query)}`}
              />
            )}
          </>
        )}

        <hr className="divider-section my-10" aria-hidden="true" />

      </div>
    </ContentLayout>
  )
}
