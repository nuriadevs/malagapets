// src/app/[locale]/blog/[slug]/page.tsx
import type { Metadata } from "next"
import { SITE_URL } from "@/lib/constants"
import { routing } from "@/i18n/routing"
import { notFound } from "next/navigation"
import { Main } from "@/components/layouts/main"
import { getPostDetail, getPosts } from "@/lib/blog/post-service"
import PostSection from "@/components/sections/blog/post-section"
import type { Locale } from "@/i18n/routing"


interface PostPageProps {
  params: Promise<{ locale: Locale; slug: string }>
}

export async function generateStaticParams() {
  try {
    const results = await Promise.all(
      routing.locales.map(async (locale) => {
        const response = await getPosts(locale, 1, 100)
        return response.data.map((post) => ({ locale, slug: post.slug }))
      })
    )
    return results.flat()
  } catch {
    return []
  }
}


export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale; slug: string }>
}): Promise<Metadata> {
  const { locale, slug } = await params

  try {
    const post = await getPostDetail(slug, locale)
    if (!post) return { title: "Post no encontrado", robots: { index: false } }

    const title = post.seo?.metaTitle ?? post.title
    const description = post.seo?.metaDescription ?? post.description ?? ""
    const image = post.seo?.ogImage ?? post.cover
    const canonical = post.seo?.canonicalURL ?? `/${locale}/blog/post/${slug}`

    const languages: Record<string, string> = {
      [locale]: `/${locale}/blog/post/${slug}`,
    }
    for (const loc of post.localizations ?? []) {
      languages[loc.locale] = `/${loc.locale}/blog/post/${loc.slug}`
    }
    languages["x-default"] = languages["es"] ?? `/${locale}/blog/post/${slug}`

    return {
      title,
      description,
      keywords: post.seo?.keywords,
      authors: post.author?.name ? [{ name: post.author.name }] : undefined,
      alternates: {
        canonical,
        languages,
      },
      openGraph: {
        title,
        description,
        type: "article",
        url: canonical,
        publishedTime: post.publishedAt,
        modifiedTime: post.updatedAt,
        authors: post.author?.name ? [post.author.name] : undefined,
        images: image
          ? [{ url: image, width: 1200, height: 630, alt: title }]
          : undefined,
      },
      twitter: {
        card: "summary_large_image",
        title,
        description,
        images: image ? [image] : undefined,
      },
    }
  } catch {
    return { title: "MálagaPets Blog", robots: { index: false } }
  }
}

export default async function PostPage({ params }: PostPageProps) {
  const { locale, slug } = await params

  const post = await getPostDetail(slug, locale)
  if (!post) notFound()

  const postUrl = `${SITE_URL}/${locale}/blog/post/${slug}`

  return (
    <Main ariaLabelKey="blog.post" className="min-h-screen">
      <PostSection slug={slug} locale={locale} postUrl={postUrl} />
    </Main>
  )
}


export const revalidate = 3600
export const dynamicParams = true
