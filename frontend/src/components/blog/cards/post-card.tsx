"use client"

import Image from "next/image"
import { useTranslations, useLocale } from "next-intl"
import Link from "next/link"
import { parseISO, format } from "date-fns"
import { es } from "date-fns/locale"
import { heroCard } from "@/data/icons"
import type { PostListProps, MappedPostAuthor, MappedPostCategory } from "@/types/blog"
import Label from "@/components/ui/blog/label"



function AuthorLine({
  author,
  authorUrl,
}: {
  author: MappedPostAuthor
  authorUrl: string
}) {
  return (
    <Link
      href={authorUrl}
      className="flex items-center gap-2 text-foreground/80 transition-colors duration-200 hover:text-primary focus-visible:outline-none focus-visible:underline"
    >
      {author.avatar && (
        <Image
          src={author.avatar}
          alt=""
          aria-hidden="true"
          className="rounded-full object-cover size-6"
          width={24}
          height={24}
        />
      )}
      <span className="font-medium">{author.name}</span>
    </Link>
  )
}

function DateLine({ publishedAt }: { publishedAt: string }) {
  return (
    <time dateTime={publishedAt} className="tabular-nums">
      {format(parseISO(publishedAt), "d MMM yyyy", { locale: es })}
    </time>
  )
}

function Separator() {
  return (
    <span className="text-border" aria-hidden="true">•</span>
  )
}

function CategoryBadge({ category }: { category?: MappedPostCategory }) {
  if (!category) return null
  return (
    <span className="inline-block pb-4">
      <Label color={category.color} nomargin>
        {category.name}
      </Label>
    </span>
  )
}


export default function PostCard({
  post,
  variant = "default",
  pathPrefix = "",
  preloadImage = false,
  showDescription = true,
}: PostListProps & { showDescription?: boolean }) {
  const t = useTranslations("blog.content")
  const locale = useLocale()

  const postUrl = `/blog/post/${pathPrefix ? `${pathPrefix}/` : ""}${post.slug}`
  const authorUrl = post.author?.slug
    ? `/${locale}/blog/author/${post.author.slug}`
    : "#"

  const headingId = `post-${post.slug}`


  if (variant === "horizontal") {
    return (
      <article
        aria-labelledby={headingId}
        className="group relative flex flex-col p-4 gap-4 overflow-hidden rounded-2xl bg-card shadow-sm border border-border transition-all duration-300 hover:shadow-pet hover:-translate-y-1 sm:flex-row"
      >
        <Link
          href={postUrl}
          className="relative aspect-4/3 w-full shrink-0 overflow-hidden sm:aspect-square sm:w-48 rounded-xl"
          tabIndex={-1}
          aria-hidden="true"
        >
          {post.cover ? (
            <Image
              src={post.cover}
              alt=""
              priority={preloadImage}
              className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
              fill
              sizes="(max-width: 640px) 100vw, 192px"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center bg-muted">
              <heroCard.camera className="h-12 w-12 text-muted-foreground" aria-hidden="true" />
            </div>
          )}
        </Link>

        <div className="flex flex-1 flex-col justify-between p-6 sm:py-6 sm:pr-6 sm:pl-0">
          <div className="space-y-3">
            <CategoryBadge category={post.category} />
            <h3 id={headingId} className="text-xl leading-tight">
              <Link
                href={postUrl}
                className="text-foreground/80 transition-colors duration-200 line-clamp-2 hover:text-primary focus-visible:outline-none focus-visible:underline"
              >
                {post.title}
              </Link>
            </h3>
            {post.description && showDescription && (
              <p className="text-sm leading-relaxed text-muted-foreground line-clamp-2">
                {post.description}
              </p>
            )}
          </div>
          <footer className="mt-4 flex items-center gap-3 text-sm text-muted-foreground">
            {post.author && <AuthorLine author={post.author} authorUrl={authorUrl} />}
            {post.author && post.publishedAt && <Separator />}
            {post.publishedAt && <DateLine publishedAt={post.publishedAt} />}
          </footer>
        </div>
      </article>
    )
  }


  if (variant === "minimal") {
    return (
      <article
        aria-labelledby={headingId}
        className="group rounded-2xl bg-card shadow-sm border border-border p-4 transition-all duration-300 hover:shadow-pet hover:-translate-y-1"
      >
        <Link
          href={postUrl}
          className="relative block aspect-square overflow-hidden rounded-xl"
          tabIndex={-1}
          aria-hidden="true"
        >
          {post.cover ? (
            <Image
              src={post.cover}
              alt=""
              priority={preloadImage}
              className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center bg-muted">
              <heroCard.camera className="h-16 w-16 text-muted-foreground" aria-hidden="true" />
            </div>
          )}
        </Link>
        <div className="mt-4 space-y-4">
          <CategoryBadge category={post.category} />
          <h3 id={headingId} className="text-lg font-semibold leading-snug text-foreground/80">
            <Link
              href={postUrl}
              className="transition-colors duration-200 line-clamp-2 hover:text-primary focus-visible:outline-none focus-visible:underline"
            >
              {post.title}
            </Link>
          </h3>
          <footer className="mt-4 mb-2 flex items-center gap-3 text-sm text-muted-foreground">
            {post.author && <AuthorLine author={post.author} authorUrl={authorUrl} />}
            {post.author && post.publishedAt && <Separator />}
            {post.publishedAt && <DateLine publishedAt={post.publishedAt} />}
          </footer>
        </div>
      </article>
    )
  }


  if (variant === "hero") {
    return (
      <article
        aria-labelledby={headingId}
        className="group relative flex flex-col overflow-hidden rounded-2xl bg-card shadow-lg border border-border transition-all duration-300 hover:shadow-pet hover:-translate-y-1 p-4 lg:flex-row lg:items-center lg:gap-6 lg:p-2"
      >
        <div
          className="absolute top-4 right-4 z-10 flex items-center gap-2 rounded-full bg-pet px-4 py-2 shadow-lg"
          aria-hidden="true"
        >
          <heroCard.paw className="h-4 w-4 text-title" />
          <span className="text-xs font-bold uppercase tracking-wider text-title">
            {t("lastPost")}
          </span>
        </div>

        <Link
          href={postUrl}
          className="relative w-full overflow-hidden rounded-xl lg:max-w-2xl"
          tabIndex={-1}
          aria-hidden="true"
        >
          {post.cover ? (
            <>
              <div className="relative aspect-4/3 w-full lg:hidden">
                <Image
                  src={post.cover}
                  alt=""
                  priority={preloadImage}
                  className="size-full object-cover transition duration-300 group-hover:scale-105"
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"

                />
              </div>
              <div className="hidden lg:block relative lg:aspect-16/10">
                <Image
                  src={post.cover}
                  alt=""
                  priority={preloadImage}
                  className="size-full object-cover transition duration-300 group-hover:scale-105"
                  fill
                  sizes="672px"
                />
              </div>
            </>
          ) : (
            <div className="flex aspect-4/3 w-full items-center justify-center bg-muted lg:aspect-16/10">
              <heroCard.camera className="size-16 text-muted-foreground" aria-hidden="true" />
            </div>
          )}
        </Link>

        <div className="w-full p-6 flex flex-col justify-between">
          <div className="space-y-4">
            <CategoryBadge category={post.category} />
            <h2 id={headingId} className="text-2xl leading-tight xl:text-3xl">
              <Link
                href={postUrl}
                className="text-foreground/80 transition-colors duration-200 line-clamp-2 hover:text-primary focus-visible:outline-none focus-visible:underline"
              >
                {post.title}
              </Link>
            </h2>
            {post.description && showDescription && (
              <p className="text-base leading-relaxed text-muted-foreground line-clamp-2">
                {post.description}
              </p>
            )}
          </div>
          <footer className="mt-5 flex items-center gap-2 text-sm text-muted-foreground">
            {post.author && <AuthorLine author={post.author} authorUrl={authorUrl} />}
            {post.author && post.publishedAt && <Separator />}
            {post.publishedAt && <DateLine publishedAt={post.publishedAt} />}
          </footer>
        </div>
      </article>
    )
  }


  return (
    <article
      aria-labelledby={headingId}
      className="group relative flex flex-col overflow-hidden rounded-2xl bg-card shadow-sm border border-border transition-all duration-300 hover:shadow-pet hover:-translate-y-1"
    >
      <Link
        href={postUrl}
        className="relative aspect-square overflow-hidden"
        tabIndex={-1}
        aria-hidden="true"
      >
        {post.cover ? (
          <Image
            src={post.cover}
            alt=""
            priority={preloadImage}
            className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-muted">
            <heroCard.camera className="h-16 w-16 text-muted-foreground" aria-hidden="true" />
          </div>
        )}
      </Link>

      <div className="flex flex-1 flex-col p-6">
        <div className="flex-1 space-y-3">
          <CategoryBadge category={post.category} />
          <h3 id={headingId} className="text-xl leading-tight">
            <Link
              href={postUrl}
              className="text-foreground/80 transition-colors duration-200 line-clamp-2 hover:text-primary focus-visible:outline-none focus-visible:underline"
            >
              {post.title}
            </Link>
          </h3>
          {post.description && showDescription && (
            <p className="text-sm leading-relaxed text-muted-foreground line-clamp-3">
              {post.description}
            </p>
          )}
        </div>
        <footer className="mt-6 flex items-center gap-3 border-t border-border pt-4 text-sm text-muted-foreground">
          {post.author && <AuthorLine author={post.author} authorUrl={authorUrl} />}
          {post.author && post.publishedAt && <Separator />}
          {post.publishedAt && <DateLine publishedAt={post.publishedAt} />}
        </footer>
      </div>
    </article>
  )
}
