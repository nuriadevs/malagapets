import type { Metadata } from "next"
import { Main } from "@/components/layouts/main"
import SearchSection from "@/components/sections/blog/search-section"
import type { SearchPageProps } from "@/types/blog-search"
import { getTranslations } from "next-intl/server"

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: "search" })
  return {
    title: t("title"),
    robots: { index: false, follow: true },
  }
}

export default function SearchPage({ params, searchParams }: SearchPageProps) {
  return (
    <Main ariaLabelKey="search.main" className="min-h-screen">
      <SearchSection params={params} searchParams={searchParams} />
    </Main>
  )
}

export const dynamic = "force-dynamic"
