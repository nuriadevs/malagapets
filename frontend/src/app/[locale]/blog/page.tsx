// src/app/[loclale]/blog/page.tsx
import type { Metadata } from "next"
import { buildAlternates } from "@/lib/seo"
import type { Locale } from "@/i18n/routing"
import { Main } from "@/components/layouts/main"
import BlogSection from "@/components/sections/blog/blog-section"
import CategorySection from "@/components/sections/blog/category-section"
import { getTranslations } from "next-intl/server"

interface BlogPageProps {
  params: Promise<{ locale: Locale }>
  searchParams: Promise<{ page?: string; category?: string }>
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: "blog.content.latest" })
  return {
    title: t("title"),
    description: t("subtitle"),
    alternates: buildAlternates(locale, "/blog"),
  }
}

export default async function BlogPage({ params, searchParams }: BlogPageProps) {
  const { locale } = await params

  return (
    <Main ariaLabelKey="blog.main" className="min-h-screen">
      <BlogSection locale={locale} />
      <CategorySection
        locale={locale}
        searchParams={searchParams}
        asSection
      />
    </Main>
  )
}

//export const revalidate = 3600
