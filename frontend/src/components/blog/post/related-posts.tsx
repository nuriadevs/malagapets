import Image from "next/image"
import Link from "next/link"
import { getTranslations, getLocale } from "next-intl/server"
import Label from "@/components/ui/blog/label"
import type { MappedPost } from "@/types/blog"

interface RelatedPostsProps {
  posts: MappedPost[]
}

/**
 * RelatedPosts — grid de posts relacionados al pie del artículo.
 * Server component — sin hidratación.
 *
 * SEMÁNTICA:
 * - <aside aria-labelledby> — contenido relacionado complementario
 * - <h2> como título de la sección
 * - <article> por cada post relacionado
 */
export default async function RelatedPosts({ posts }: RelatedPostsProps) {
  if (!posts || posts.length === 0) return null

  const t = await getTranslations("blog.content")
  const locale = await getLocale()

  return (
    <aside
      aria-labelledby="related-posts-heading"
      className="container-app py-12 border-t border-border"
    >
      <h2
        id="related-posts-heading"
        className="text-2xl sm:text-3xl font-bold text-foreground/80 mb-8 text-center"
      >
        {t("relatedPosts")}
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
        {posts.map((post) => (
          <article
            key={post.slug}
            aria-labelledby={`related-${post.slug}`}
            className="group flex flex-col rounded-2xl border border-border bg-card overflow-hidden hover:shadow-pet hover:-translate-y-1 transition-all duration-300"
          >
            {/* Imagen */}
            {post.cover && (
              <Link
                href={`/${locale}/blog/post/${post.slug}`}
                tabIndex={-1}
                aria-hidden="true"
                className="block aspect-video overflow-hidden"
              >
                <Image
                  src={post.cover}
                  alt=""
                  width={400}
                  height={225}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </Link>
            )}

            {/* Info */}
            <div className="flex flex-col flex-1 p-5 gap-3">
              {post.category && (
                <Label color={post.category.color} nomargin pill>
                  {post.category.name}
                </Label>
              )}

              <h3
                id={`related-${post.slug}`}
                className="text-base font-semibold text-foreground/80 leading-snug line-clamp-2"
              >
                <Link
                  href={`/${locale}/blog/post/${post.slug}`}
                  className="hover:text-primary transition-colors"
                >
                  {post.title}
                </Link>
              </h3>

              {post.readingTime && (
                <p className="text-xs text-muted-foreground mt-auto">
                  {post.readingTime} {t("minReader")}
                </p>
              )}
            </div>
          </article>
        ))}
      </div>
    </aside>
  )
}
