// src/app/[locale]/directory/beaches/page.tsx
import type { Metadata } from "next"
import { buildAlternates } from "@/lib/seo"
import { getTranslations } from "next-intl/server"
import { Main } from "@/components/layouts/main"
import { BeachesDirectorySection } from "@/components/sections/directories/beaches/beaches-directory-section"


export async function generateMetadata({
    params,
}: {
    params: Promise<{ locale: string }>
}): Promise<Metadata> {
    const { locale } = await params
    const t = await getTranslations({ locale, namespace: "directoryMeta.beaches" })
    return {
        title: t("title"),
        description: t("description"),
        alternates: buildAlternates(locale, "/directory/beaches"),
    }
}

export default function BeachesDirectoryPage() {

    return (
        <Main ariaLabelKey="main.beachesCardsContent">
            <BeachesDirectorySection />
        </Main>
    );
}
