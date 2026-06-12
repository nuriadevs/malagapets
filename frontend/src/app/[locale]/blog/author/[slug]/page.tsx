// src/app/[locale]/blog/author/[slug]/page.tsx
import type { Metadata } from "next"
import { routing } from "@/i18n/routing"
import { notFound } from "next/navigation"
import { Main } from "@/components/layouts/main"
import AuthorSection from "@/components/sections/blog/author-section"
import { getAuthorBySlug, getAuthors, AUTHOR_BASE } from "@/lib/blog/author-service"
import type { Locale } from "@/i18n/routing"

interface AuthorPageProps {
    params: Promise<{ locale: Locale; slug: string }>
    searchParams: Promise<{ page?: string }>
}



function isValidLocale(locale: string): locale is Locale {
    return routing.locales.includes(locale as Locale)
}

export async function generateStaticParams() {
    try {
        const authors = await getAuthors()
        return routing.locales.flatMap((locale) =>
            authors.map((author: { slug: string }) => ({ locale, slug: author.slug }))
        )
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
    if (!isValidLocale(locale)) return { title: "Not found", robots: { index: false } }

    const author = await getAuthorBySlug(slug, locale)
    if (!author) return { title: "Author not found", robots: { index: false } }

    const canonical = `/${locale}${AUTHOR_BASE[locale]}/${slug}`

    return {
        title: author.name,
        description: author.bio ?? undefined,
        alternates: {
            canonical,
        },
        openGraph: {
            title: author.name,
            description: author.bio ?? undefined,
            type: "profile",
            url: canonical,
            images: author.image?.src ? [{ url: author.image.src }] : [],
        },
    }
}

export default async function AuthorPage({ params, searchParams }: AuthorPageProps) {
    const { locale, slug } = await params
    if (!isValidLocale(locale)) notFound()

    return (
        <Main ariaLabelKey="author.main" className="min-h-screen">
            <AuthorSection
                slug={slug}
                locale={locale}
                searchParams={searchParams}
            />
        </Main>
    )
}

export const revalidate = 3600
export const dynamicParams = true