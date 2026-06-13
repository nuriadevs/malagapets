"use client"

import { Suspense } from "react"
import { useTranslations } from "next-intl"
import Link from "next/link"
import { FileText as FileTextIcon } from "@/data/icons"
import { Button } from "@/components/ui/button"
import { ContentLayout } from "@/components/common/content-layout-section"
import { LoadingContent } from "@/components/ui/loading-content"
import PostList from "@/components/blog/post-list"
import Pagination from "@/components/blog/pagination"
import type { ArchiveSectionContentProps } from "@/types/blog-archive"


export default function ArchiveSectionContent({
  posts,
  currentPage,
  isFirstPage,
  isLastPage,
  totalPosts,
  locale,
}: ArchiveSectionContentProps) {
  const t = useTranslations("blog.content")

  const basePath = `/${locale}/blog/archivo`

  return (
    <ContentLayout
      mainTitle={
        <h1 className="text-4xl sm:text-5xl font-bold text-foreground/80 text-balance">
          {t("archive.title")}
        </h1>
      }
      subtitle={
        <div className="space-y-3">
          <p className="text-lg text-muted-foreground text-pretty">
            {t("archive.subtitle")}
          </p>
          {totalPosts > 0 && (
            <span className="badge badge-pet" aria-label={`${totalPosts} ${totalPosts === 1 ? t("archive.article") : t("archive.articles")}`}>
              <FileTextIcon className="w-3.5 h-3.5" aria-hidden="true" />
              {totalPosts}{" "}
              {totalPosts === 1
                ? t("archive.article")
                : t("archive.articles")}
            </span>
          )}
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
                <Link href={`/${locale}/blog`}>{t("backToBlog")}</Link>
              </Button>
            </div>

          ) : (
            <>

              <section aria-labelledby="archive-posts-heading">
                <h2 id="archive-posts-heading" className="sr-only">
                  {t("archive.title")}
                </h2>

                <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
                  {posts.map((post) => (
                    <PostList
                      key={post.slug}
                      post={post}
                      variant="default"
                    />
                  ))}
                </div>
              </section>

              {totalPosts > 0 && (
                <Pagination
                  pageIndex={currentPage}
                  isFirstPage={isFirstPage}
                  isLastPage={isLastPage}
                  basePath={basePath}
                />
              )}

              <hr className="divider-section my-8" aria-hidden="true" />

              <div className="flex justify-center">
                <Button
                  asChild
                  variant="default"
                  size="xl"
                  className="shadow-sm hover:shadow-pet transition-all duration-500 ease-in-out"
                >
                  <Link href={`/${locale}/blog`}>
                    {t("backToBlog")}
                  </Link>
                </Button>
              </div>
            </>
          )}
        </Suspense>
      </div>
    </ContentLayout>
  )
}
