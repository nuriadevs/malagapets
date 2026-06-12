import type { Metadata } from "next"
import { buildAlternates } from "@/lib/seo"
import { Main } from "@/components/layouts/main"
import ArchiveSection from "@/components/sections/blog/archive-section"
import type { ArchivePageProps } from "@/types/blog-archive"
import { getTranslations } from "next-intl/server"

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: "blog.content.archive" })
  return {
    title: t("title"),
    description: t("subtitle"),
    alternates: buildAlternates(locale, "/blog/archive"),
  }
}


export default async function ArchivePage({ params, searchParams }: ArchivePageProps) {
  const { locale } = await params

  return (
    <Main ariaLabelKey="main.archive" className="min-h-screen">
      <ArchiveSection locale={locale} searchParams={searchParams} />
    </Main>
  )
}


export const revalidate = 3600
export const dynamicParams = true
