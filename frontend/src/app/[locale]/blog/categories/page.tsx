import type { Metadata } from "next"
import { buildAlternates } from "@/lib/seo"
import { Main } from "@/components/layouts/main"
import CategorySection from "@/components/sections/blog/category-section"
import type { CategoriesPageProps } from "@/types/blog-categories"
import { getTranslations } from "next-intl/server"

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: "blog.category" })
  return {
    title: t("heroTitle"),
    description: t("heroSubtitle"),
    alternates: buildAlternates(locale, "/blog/categories"),
  }
}

export default async function CategoriesPage({
  params,
  searchParams,
}: CategoriesPageProps) {
  const { locale } = await params

  return (
    <Main ariaLabelKey="categories.main" className="min-h-screen">
      <CategorySection locale={locale} searchParams={searchParams} />
    </Main>
  )
}


export const revalidate = 3600
export const dynamicParams = true
