import type { Metadata } from "next"
import { buildAlternates } from "@/lib/seo"
import { getTranslations } from "next-intl/server"
import { Main } from "@/components/layouts/main"
import { VetDirectorySection } from "@/components/sections/directories/veterinary";

export async function generateMetadata({
    params,
}: {
    params: Promise<{ locale: string }>
}): Promise<Metadata> {
    const { locale } = await params
    const t = await getTranslations({ locale, namespace: "directoryMeta.veterinary" })
    return {
        title: t("title"),
        description: t("description"),
        alternates: buildAlternates(locale, "/directory/veterinary"),
    }
}

export default function VetsGuidePage() {
    return (
        <Main ariaLabelKey="main.vetsCardsContent">
            <VetDirectorySection />
        </Main>
    );
}