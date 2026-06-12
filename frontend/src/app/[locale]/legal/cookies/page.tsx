import type { Metadata } from "next"
import { getTranslations } from "next-intl/server"
import { Main } from "@/components/layouts/main"
import { Cookie } from "lucide-react"
import type { Locale } from "@/i18n/routing"

export async function generateMetadata({
    params,
}: {
    params: Promise<{ locale: Locale }>
}): Promise<Metadata> {
    const { locale } = await params
    const t = await getTranslations({ locale, namespace: "legal.cookies" })

    return {
        title: t("title"),
        description: t("text"),
        alternates: {
            canonical: `/${locale}/legal/cookies`,
        },
    }
}

export default async function CookiesPage({
    params,
}: {
    params: Promise<{ locale: Locale }>
}) {
    const { locale } = await params
    const tLegal = await getTranslations({ locale, namespace: "legal.cookies" })

    return (
        <Main ariaLabelKey="main.cookiesPolicy">
            <section className="container-app py-16 sm:py-20" aria-labelledby="cookies-title">
                <div className="max-w-3xl mx-auto">

                    <header className="mb-12">
                        <h1 id="cookies-title" className="text-4xl font-bold tracking-tight text-foreground">
                            {tLegal("title")}
                        </h1>
                        <p className="mt-2 text-sm text-muted-foreground">
                            {tLegal("lastUpdate")}
                        </p>
                    </header>

                    <article>
                        <div className="flex items-start gap-3 rounded-xl border border-border bg-card p-5">
                            <Cookie className="w-5 h-5 text-primary shrink-0 mt-0.5" aria-hidden="true" />
                            <p className="text-base text-foreground/90 leading-relaxed">
                                {tLegal("text")}
                            </p>
                        </div>
                    </article>
                </div>
            </section>
        </Main>
    )
}