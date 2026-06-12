import type { Metadata } from "next"
import { buildAlternates } from "@/lib/seo"
import { getTranslations } from "next-intl/server"
import { Main } from "@/components/layouts/main"
import { ParksDirectorySection } from "@/components/sections/directories/parks";

export async function generateMetadata({
    params,
}: {
    params: Promise<{ locale: string }>
}): Promise<Metadata> {
    const { locale } = await params
    const t = await getTranslations({ locale, namespace: "directoryMeta.parks" })
    return {
        title: t("title"),
        description: t("description"),
        alternates: buildAlternates(locale, "/directory/parks"),
    }
}

export default function ParksGuidePage() {
    return (
        <Main ariaLabelKey="main.parksCardsContent">
            <ParksDirectorySection />
        </Main>
    );
}