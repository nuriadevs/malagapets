import Image from "next/image"
import Link from "next/link"
import { getTranslations, getLocale } from "next-intl/server"
import { format, parseISO } from "date-fns"
import { es } from "date-fns/locale"
import { Button } from "@/components/ui/button"
import Label from "@/components/ui/blog/label"
import AuthorCard from "@/components/blog/cards/author-card"
import MdxContent from "@/components/blog/post/mdx-content"
import SharePost from "@/components/ui/blog/share-post"
import ReadingProgress from "@/components/blog/post/reading-progress"
import RelatedPosts from "@/components/blog/post/related-posts"
import type { PostSectionContentProps } from "@/types/blog-post"

export default async function PostSectionLayout({
  post,
  postUrl,
}: PostSectionContentProps) {
  const t = await getTranslations("blog.content")
  const tAccess = await getTranslations("accessibility.blog")
  const locale = await getLocale()
  const authorUrl = post.author?.slug
    ? `/${locale}/blog/author/${post.author.slug}`
    : "#"

  return (
    <>
      <ReadingProgress />

      <article aria-labelledby="post-title" className="relative pb-8">

        {post.cover && (
          <div className="relative w-full aspect-21/9 min-h-80 max-h-135 overflow-hidden group">
            <Image
              src={post.cover}
              alt={post.coverAlt ?? post.title}
              fill
              priority
              sizes="100vw"
              className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
            />
            <div className="absolute inset-0 bg-linear-to-t from-black/75 via-black/20 to-transparent" />
          </div>
        )}

        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-8 pb-6">
          <h1
            id="post-title"
            className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight text-foreground/80 "
          >
            {post.title}
          </h1>

          {post.category && (
            <div className="flex justify-center py-6">
              <Label color={post.category.color} nomargin>
                {post.category.name}
              </Label>
            </div>
          )}

          {post.description && (
            <p className="text-lg sm:text-xl text-foreground/80 text-pretty mb-8 text-center">
              {post.description}
            </p>
          )}

          {post.author && (
            <div className="flex items-center gap-4 py-5 border-y border-border">

              <Link
                href={authorUrl}
                className="relative shrink-0 w-11 h-11 rounded-full overflow-hidden ring-2 ring-border hover:ring-primary transition-all focus-visible:outline-none focus-visible:ring-primary"
                aria-label={tAccess("viewAuthorProfile", { name: post.author.name })}
              >
                {post.author.image?.src && post.author.image.src.length > 0 ? (
                  <Image
                    src={post.author.image.src}
                    alt=""
                    aria-hidden="true"
                    fill
                    sizes="44px"
                    className="object-cover"
                  />
                ) : (
                  <div className="bg-gradient-brand w-full h-full flex items-center justify-center">
                    <span className="text-base font-bold text-white" aria-hidden="true">
                      {post.author.name.charAt(0).toUpperCase()}
                    </span>
                  </div>
                )}
              </Link>

              <div className="flex-1 min-w-0">
                <p className="font-semibold text-sm">
                  <Link href={authorUrl} className="text-foreground/80 hover:text-primary transition-colors">
                    {post.author.name}
                  </Link>
                </p>
                <div className="flex items-center gap-2 text-xs text-muted-foreground mt-0.5 flex-wrap">
                  {post.publishedAt && (
                    <time dateTime={post.publishedAt}>
                      {format(parseISO(post.publishedAt), "d 'de' MMMM yyyy", { locale: es })}
                    </time>
                  )}
                  {post.publishedAt && post.readingTime && (
                    <span className="w-1 h-1 rounded-full bg-muted-foreground/40" aria-hidden="true" />
                  )}
                  {post.readingTime && (
                    <span className="flex items-center gap-1">
                      <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                      </svg>
                      {post.readingTime} {t("minReader")}
                    </span>
                  )}
                </div>
              </div>

              <div className="hidden sm:block">
                <SharePost title={post.title} url={postUrl} />
              </div>
            </div>
          )}
        </div>
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pb-12">
          {post.content ? (
            <MdxContent source={post.content} />
          ) : (
            <div className="text-center py-12">
              <p className="text-muted-foreground">{t("noContent")}</p>
            </div>
          )}
        </div>

        {post.tags && post.tags.length > 0 && (
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pb-8">
            <div className="flex flex-wrap gap-2" aria-label={tAccess("articleTags")}>
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="badge badge-pet capitalize hover:bg-primary/10 hover:text-primary transition-colors cursor-default"
                >
                  #{tag}
                </span>
              ))}
            </div>
          </div>
        )}

        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pb-8">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 border-t border-border">
            <div className="sm:hidden">
              <SharePost title={post.title} url={postUrl} />
            </div>
            <Button
              asChild
              variant="default"
              size="lg"
              className="shadow-sm hover:shadow-pet transition-all duration-300"
            >
              <Link href={`/${locale}/blog`}>{t("backToBlog")}</Link>
            </Button>
          </div>
        </div>

        {post.author && (
          <div className="pb-8">
            <AuthorCard author={post.author} />
          </div>
        )}

        {post.related && post.related.length > 0 && (
          <RelatedPosts posts={post.related} />
        )}

      </article>
    </>
  )
}