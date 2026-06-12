"use client"

import Image from "next/image"
import Link from "next/link"
import MdxContent from "@/components/blog/post/mdx-content"
import { useTranslations, useLocale } from "next-intl"
import { format, parseISO } from "date-fns"
import { es } from "date-fns/locale"
import { Button } from "@/components/ui/button"
import Label from "@/components/ui/blog/label"
import AuthorCard from "@/components/blog/cards/author-card"
import SharePost from "@/components/ui/blog/share-post"
import type { PostSectionContentProps } from "@/types/blog-post"

/**
 * PostSectionContent — presentación de un artículo individual.
 *
 * SEMÁNTICA:
 * - <article aria-labelledby="post-title"> como contenedor raíz
 * - <header> para título, descripción, categoría y metadatos
 * - <figure> para la imagen principal con <figcaption> si hay alt
 * - <div class="prose"> para el contenido HTML del artículo
 * - <footer> para compartir y botón de volver
 * - <aside> delegado a AuthorCard
 * - <time dateTime> para fechas
 * - Separadores con aria-hidden="true"
 *
 * Tokens del sistema usados:
 * - prose              → tipografía del cuerpo del artículo
 * - shadow-pet         → hover en autor card
 * - divider-section    → separador de sección
 * - container-narrow   → ancho máximo del contenido
 * - bg-gradient-brand  → fallback avatar
 */
export default function PostSectionContent({
  post,
  postUrl,
}: PostSectionContentProps) {
  const t = useTranslations("blog.content")
  const tAccess = useTranslations("accessibility.blog")
  const locale = useLocale()
  const authorUrl = post.author?.slug
    ? `/${locale}/blog/author/${post.author.slug}`
    : "#"

  return (
    <article
      aria-labelledby="post-title"
      className="relative pb-8"
    >

      {/* ── Header del post ──────────────────────────────────────────────── */}
      <header className="container-narrow pt-12 pb-8 text-center space-y-6">

        {/* Categoría */}
        {post.category && (
          <div className="flex justify-center">
            <Label color={post.category.color} nomargin>
              {post.category.name}
            </Label>
          </div>
        )}

        {/* Título — id referenciado por aria-labelledby del article */}
        <h1
          id="post-title"
          className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight text-foreground/80 text-balance"
        >
          {post.title}
        </h1>

        {/* Descripción */}
        {post.description && (
          <p className="text-lg sm:text-xl text-muted-foreground text-pretty max-w-2xl mx-auto">
            {post.description}
          </p>
        )}

        {/* Metadatos: autor + fecha + tiempo de lectura */}
        {post.author && (
          <div className="flex items-center justify-center gap-4 pt-2 text-sm text-muted-foreground">

            {/* Avatar del autor */}
            <Link
              href={authorUrl}
              className="shrink-0 w-12 h-12 rounded-full overflow-hidden ring-2 ring-border hover:ring-primary transition-all focus-visible:outline-none focus-visible:ring-primary"
              aria-label={tAccess("viewAuthorProfile", { name: post.author.name })}
            >
              {post.author.image?.src ? (
                <Image
                  src={post.author.image.src}
                  alt=""
                  aria-hidden="true"
                  width={48}
                  height={48}
                  className="object-cover w-full h-full"
                />
              ) : (
                <div className="bg-gradient-brand w-full h-full flex items-center justify-center">
                  <span className="text-lg font-bold text-white" aria-hidden="true">
                    {post.author.name.charAt(0).toUpperCase()}
                  </span>
                </div>
              )}
            </Link>

            <div className="text-left">
              <p className="font-medium text-foreground/80">
                <Link
                  href={authorUrl}
                  className="hover:text-primary transition-colors"
                >
                  {post.author.name}
                </Link>
              </p>
              <div className="flex items-center gap-2 text-xs mt-0.5">
                {post.publishedAt && (
                  <time dateTime={post.publishedAt}>
                    {format(parseISO(post.publishedAt), "d MMM yyyy", { locale: es })}
                  </time>
                )}
                {post.publishedAt && post.readingTime && (
                  <span aria-hidden="true">·</span>
                )}
                {post.readingTime && (
                  <span>{post.readingTime} {t("minReader")}</span>
                )}
              </div>
            </div>

          </div>
        )}
      </header>

      {/* ── Imagen principal ─────────────────────────────────────────────── */}
      {post.cover && (
        <figure className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 mb-12">
          <div className="relative w-full aspect-video rounded-2xl overflow-hidden shadow-lg">
            <Image
              src={post.cover}
              alt={post.coverAlt ?? post.title}
              fill
              priority
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1200px"
              className="object-cover"
            />
          </div>
          {post.coverAlt && (
            <figcaption className="text-center text-sm text-muted-foreground mt-3 px-4">
              {post.coverAlt}
            </figcaption>
          )}
        </figure>
      )}

      {/* ── Contenido del artículo ───────────────────────────────────────── */}
      <div className="container-narrow pb-16">
        <div className="mx-auto max-w-3xl">

          {post.content ? (
            <MdxContent source={post.content} />
          ) : (
            <div className="text-center py-12">
              <p className="text-muted-foreground">{t("noContent")}</p>
            </div>
          )}

          {/* ── Compartir ─────────────────────────────────────────────────── */}
          <div className="border-t border-border pt-8 mt-12 mb-10 flex justify-center">
            <SharePost title={post.title} url={postUrl} />
          </div>

          {/* ── Tags ──────────────────────────────────────────────────────── */}
          {post.tags && post.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-10" aria-label={tAccess("articleTags")}>
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="badge badge-muted capitalize"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}

        </div>
      </div>

      {/* Separador */}
      <hr className="divider-section mx-auto max-w-3xl" aria-hidden="true" />

      {/* ── Volver al blog ───────────────────────────────────────────────── */}
      <div className="flex justify-center py-8">
        <Button
          asChild
          variant="ghost"
          size="xl"
          className="shadow-sm hover:shadow-pet transition-all duration-500 ease-in-out"
        >
          <Link href={`/${locale}/blog`}>{t("backToBlog")}</Link>
        </Button>
      </div>

      {/* ── Card del autor ───────────────────────────────────────────────── */}
      {post.author && (
        <div className="pt-4 pb-12">
          <AuthorCard author={post.author} />
        </div>
      )}

    </article>
  )
}
