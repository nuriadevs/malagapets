"use client"

import Image from "next/image"
import Link from "next/link"
import { useTranslations, useLocale } from "next-intl"
import { Button } from "@/components/ui/button"
import type { AuthorCardProps } from "@/types/blog-post"
import { ArrowRight } from "lucide-react"


export default function AuthorCard({ author }: AuthorCardProps) {
  const t = useTranslations("blog.card")
  const locale = useLocale()
  const authorUrl = `/${locale}/blog/author/${author.slug}`

  return (
    <aside
      aria-labelledby="author-card-name"
      className="container-narrow"
    >
      <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 p-6 rounded-2xl bg-card border border-border shadow-sm hover-lift hover:-translate-y-1 transition-all duration-300">

        <div
          className="relative shrink-0 w-20 h-20 sm:w-24 sm:h-24 rounded-full overflow-hidden ring-2 ring-border"
          aria-hidden="true"
        >
          {author.image?.src && author.image.src.length > 0 ? (
            <Image
              src={author.image.src}
              alt=""
              className="object-cover"
              fill
              sizes="(max-width: 640px) 80px, 96px"
            />
          ) : (
            <div className="bg-gradient-brand w-full h-full rounded-full flex items-center justify-center ring-2 ring-border">
              <span className="text-2xl font-bold text-primary-foreground">
                {author.name.charAt(0).toUpperCase()}
              </span>
            </div>
          )}
        </div>

        <div className="flex-1 min-w-0 text-center sm:text-left space-y-2">
          <h2
            id="author-card-name"
            className="text-xl font-semibold text-foreground/80"
          >
            {author.name}
          </h2>

          {author.email && (
            <address className="not-italic">
              <a
                href={`mailto:${author.email}`}
                className="text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                {author.email}
              </a>
            </address>
          )}

          {author.bio && (
            <p className="text-sm sm:text-base leading-relaxed text-muted-foreground line-clamp-2">
              {author.bio}
            </p>
          )}

          <Button variant="default" size="sm" asChild>
            <Link href={authorUrl}>
              {t("readProfile")}
              <ArrowRight className="w-3 h-3" aria-hidden="true" />
            </Link>
          </Button>
        </div>

      </div>
    </aside>
  )
}
