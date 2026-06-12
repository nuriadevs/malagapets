"use client"

import Link from "next/link"
import { useTranslations } from "next-intl"
import { Button } from "@/components/ui/button"
import { ContentLayout } from "@/components/common/content-layout-section"
import PostList from "@/components/blog/post-list"
import type { MappedPost } from "@/types/blog"

interface BlogSectionContentProps {
  posts: MappedPost[]
  locale: string
}

/**
 * BlogSectionContent — sección principal del blog.
 *
 * SEMÁNTICA:
 * - <h1> aquí es el único h1 de la página /blog
 * - <section aria-labelledby> para hero y grid de recientes
 * - CategorySection en /blog usa asSection=true → renderiza <h2>
 */
export default function BlogSectionContent({
  posts,
  locale,
}: BlogSectionContentProps) {
  const t = useTranslations("blog.content")

  if (!posts || posts.length === 0) return null

  const [heroPost, ...restPosts] = posts
  const gridPosts = restPosts.slice(0, 2)

  return (
    <ContentLayout
      mainTitle={
        <h1 className="text-4xl sm:text-5xl font-bold text-foreground/80 text-balance">
          {t("latest.title")}
        </h1>
      }
      subtitle={
        <p className="text-lg text-muted-foreground text-pretty max-w-2xl mx-auto">
          {t("latest.subtitle")}
        </p>
      }
    >
      <div className="container-app py-10 pb-16">

        {/* ── Post hero ────────────────────────────────────────────────── */}
        {heroPost && (
          <section aria-labelledby="blog-hero-heading" className="mb-10">
            <h2 id="blog-hero-heading" className="sr-only">
              {t("lastPost")}
            </h2>
            <PostList post={heroPost} variant="hero" preloadImage />
          </section>
        )}

        {/* ── Grid de posts recientes ───────────────────────────────────── */}
        {gridPosts.length > 0 && (
          <section aria-labelledby="blog-recent-heading" className="mb-10">
            <h2 id="blog-recent-heading" className="sr-only">
              {t("blogSectionTitle")}
            </h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {gridPosts.map((post) => (
                <PostList key={post.slug} post={post} variant="horizontal" />
              ))}
            </div>
          </section>
        )}

        {/* ── Ver todos los posts ───────────────────────────────────────── */}
        <div className="flex justify-center mt-10">
          <Button
            asChild
            size="xl"
            className="shadow-sm hover:shadow-pet transition-all duration-300 group ease-in-out"
          >
            <Link href={`/${locale}/blog/archivo`}>
              {t("viewAllPosts")}
            </Link>
          </Button>
        </div>

      </div>
    </ContentLayout>
  )
}
