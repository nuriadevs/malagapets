// src/app/[locale]/explorer/page.tsx
import { buildAlternates } from "@/lib/seo"
import { setRequestLocale, getTranslations } from "next-intl/server"
import { ExplorerSkeleton } from "@/components/sections/explorer/explorer-skeleton"
import { Suspense } from "react"
import type { Metadata } from "next"
import { API_URL as API } from "@/lib/config"
import { normalizeBeachData, normalizeVetData } from "@/lib/utils/normalizers"
import { MapHeroCompact } from "@/components/layouts/page-hero"
import { ExplorerClient } from "@/components/sections/explorer/explorer-client"


export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: "explorer" })
  return {
    title: t("title"),
    description: t("subtitle"),
    alternates: buildAlternates(locale, "/explorer"),
  }
}

export default async function ExplorerPage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  setRequestLocale(locale)

  const t = await getTranslations("explorer")

  const [beachesRes, vetsRes] = await Promise.allSettled([
    fetch(`${API}/api/beaches`, { next: { revalidate: 3600 } }),
    fetch(`${API}/api/veterinary`, { next: { revalidate: 3600 } }),
  ])

  const beachesRaw =
    beachesRes.status === "fulfilled" && beachesRes.value.ok
      ? (await beachesRes.value.json()).data ?? []
      : []

  const vetsRaw =
    vetsRes.status === "fulfilled" && vetsRes.value.ok
      ? (await vetsRes.value.json()).data ?? []
      : []

  const beaches = beachesRaw.map(normalizeBeachData)
  const vets = vetsRaw.map(normalizeVetData)

  return (
    <Suspense fallback={<ExplorerSkeleton />}>
      <>
        <MapHeroCompact
          badge={t("badge")}
          title={t("title")}
          titleHighlight={t("titleHighlight")}
          subtitle={t("subtitle")}
        />
        <ExplorerClient beaches={beaches} vets={vets} />
      </>
    </Suspense>
  )
}