import type { Metadata } from "next"
import { routing } from "@/i18n/routing"
import { Main } from "@/components/layouts/main"
import { getCategories, CATEGORY_BASE } from "@/lib/blog/category-service"
import SlugCategorySection from "@/components/sections/blog/slug-category-section"
import type { CategoryPageProps } from "@/types/blog-categories"
import type { Locale } from "@/i18n/routing"
import { getTranslations } from "next-intl/server"

export async function generateStaticParams(): Promise<{ locale: string; slug: string }[]> {
  try {
    const results = await Promise.all(
      routing.locales.map(async (locale) => {
        const categories = await getCategories(locale)
        return categories.map((cat) => ({ locale, slug: cat.slug }))
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
    const categories = await getCategories(locale)
    const category = categories.find((cat) => cat.slug === slug)

    if (!category) {
      return { title: "Categoría no encontrada", robots: { index: false } }
    }

    const t = await getTranslations({ locale, namespace: "blog.category" })
    const description = t("postsInCategory", { category: category.name })

    const allByLocale = await Promise.all(
      routing.locales.map(async (l) => ({
        locale: l,
        categories: l === locale ? categories : await getCategories(l).catch(() => []),
      }))
    )

    const languages: Record<string, string> = {}
    for (const { locale: l, categories: cats } of allByLocale) {
      const match = cats.find((c) => c.key === category.key)
      if (match) languages[l] = `/${l}${CATEGORY_BASE[l]}/${match.slug}`
    }

    const canonical = `/${locale}${CATEGORY_BASE[locale]}/${slug}`
    languages[locale] = canonical
    languages["x-default"] = languages["es"] ?? canonical

    return {
      title: category.name,
      description,
      alternates: { canonical, languages },
      openGraph: {
        title: category.name,
        description,
        type: "website",
        url: canonical,
      },
    }
  } catch {
    return { title: "MálagaPets Blog", robots: { index: false } }
  }
}

export default async function CategoryPage({
  params,
  searchParams,
}: CategoryPageProps) {
  const { locale, slug } = await params

  return (
    <Main ariaLabelKey="category.main" className="min-h-screen">
      <SlugCategorySection
        slug={slug}
        locale={locale}
        searchParams={searchParams}
      />
    </Main>
  )
}

export const revalidate = 3600
export const dynamicParams = true