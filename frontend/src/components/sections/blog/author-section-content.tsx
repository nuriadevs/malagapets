"use client"

import { useTranslations } from "next-intl"
import { Link } from "@/i18n/navigation"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { socialLinks } from "@/data/social-links"
import { FileText as FileTextIcon } from "@/data/icons"
import type { AuthorSectionContentProps } from "@/types/blog"
import PostList from "@/components/blog/post-list"
import Pagination from "@/components/blog/pagination"

export default function AuthorSectionContent({
  author,
  posts,
  currentPage,
  totalArticles,
  isFirstPage,
  isLastPage,
}: AuthorSectionContentProps) {
  const t = useTranslations("blog")
  const tFooter = useTranslations("footer")

  const basePath = `/blog/author/${author.slug}`


  return (
    <article aria-labelledby="author-name">
      <div className="container-app">
        <section
          aria-labelledby="author-name"
          className="py-10 sm:py-14 border-b border-border"
        >
          <div className="max-w-4xl mx-auto">
            <div className="flex flex-col lg:flex-row items-center lg:items-start gap-8">

              <div className="shrink-0 w-24 h-24 sm:w-32 sm:h-32" aria-hidden="true">
                {author.image?.src ? (
                  <Image
                    src={author.image.src}
                    alt={author.image.alt}
                    className="rounded-full object-cover w-full h-full ring-2 ring-border"
                    width={128}
                    height={128}
                  />
                ) : (
                  <div className="bg-gradient-brand w-full h-full rounded-full flex items-center justify-center ring-2 ring-border">
                    <span className="text-5xl font-bold text-primary-foreground">
                      {author.name.charAt(0).toUpperCase()}
                    </span>
                  </div>
                )}
              </div>

              <div className="flex-1 text-center lg:text-left space-y-4">
                <h1
                  id="author-name"
                  className="text-3xl sm:text-4xl font-bold text-foreground/80"
                >
                  {author.name}
                </h1>

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
                  <p className="text-base sm:text-lg leading-relaxed text-muted-foreground max-w-2xl">
                    {author.bio}
                  </p>
                )}

                <div className="space-y-2">
                  <p className="text-sm text-foreground/80">
                    {tFooter("social.followUs")}
                  </p>
                  <ul
                    className="flex items-center justify-center lg:justify-start gap-3 flex-wrap"
                    aria-label={tFooter("social.followUs")}
                  >
                    {socialLinks.map((link) => (
                      <li key={link.href}>
                        <a
                          href={link.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={link.label}
                          className="text-primary hover:text-primary/80 transition-all duration-200 hover:scale-110 focus:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-sm"
                        >
                          <link.icon className="w-5 h-5 md:w-6 md:h-6" aria-hidden="true" />
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <span
                    className="badge badge-pet"
                    aria-label={`${totalArticles} ${totalArticles === 1 ? t("category.article") : t("category.articles")}`}
                  >
                    <FileTextIcon className="w-3.5 h-3.5" aria-hidden="true" />
                    {totalArticles}{" "}
                    {totalArticles === 1
                      ? t("category.article")
                      : t("category.articles")}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section
          aria-labelledby="author-posts-title"
          className="py-10 sm:py-14"
        >
          <h2
            id="author-posts-title"
            className="text-2xl sm:text-3xl font-bold text-foreground/80 mb-10 text-center"
          >
            {t("content.author.allArticles")} {author.name}
          </h2>

          {posts.length > 0 ? (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                {posts.map((post) => (
                  <PostList key={post.slug} post={post} variant="default" />
                ))}
              </div>

              {totalArticles > 6 && (
                <Pagination
                  pageIndex={currentPage}
                  isFirstPage={isFirstPage}
                  isLastPage={isLastPage}
                  basePath={basePath}
                />
              )}
            </>
          ) : (
            <div
              className="text-center py-16"
              role="status"
              aria-live="polite"
            >
              <p className="text-lg text-muted-foreground">
                {t("noArticles")}
              </p>
            </div>
          )}
        </section>

        <hr className="divider-section" aria-hidden="true" />

        <div className="py-8 flex justify-center">
          <Button
            asChild
            variant="ghost"
            size="xl"
            className="shadow-sm hover:shadow-pet transition-all duration-500 ease-in-out"
          >
            <Link href="/blog">{t("content.backToBlog")}</Link>

          </Button>
        </div>

      </div>
    </article>
  )
}
