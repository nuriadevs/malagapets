import type { Metadata } from "next"
import { getTranslations } from "next-intl/server"
import { Main } from "@/components/layouts/main"
import { Database, ExternalLink, Info } from "lucide-react"
import type { Locale } from "@/i18n/routing"

export async function generateMetadata({
    params,
}: {
    params: Promise<{ locale: Locale }>
}): Promise<Metadata> {
    const { locale } = await params
    const t = await getTranslations({ locale, namespace: "legal.terms" })

    return {
        title: t("title"),
        description: t("intro"),
        alternates: {
            canonical: `/${locale}/legal/terms`,
        },
    }
}

export default async function TermsPage({
    params,
}: {
    params: Promise<{ locale: Locale }>
}) {
    const { locale } = await params
    const tLegal = await getTranslations({ locale, namespace: "legal.terms" })

    const sources = [
        { key: "parks", url: "https://datosabiertos.malaga.eu", display: "datosabiertos.malaga.eu" },
        { key: "veterinary", url: "https://colegioveterinariosmalaga.es", display: "colegioveterinariosmalaga.es" },
        { key: "beaches", url: null, display: null },
    ]

    return (
        <Main ariaLabelKey="main.terms">
            <section className="container-app py-16 sm:py-20" aria-labelledby="main.terms">
                <div className="max-w-3xl mx-auto">

                    <header className="mb-12">
                        <h1 id="terms-title" className="text-4xl font-bold tracking-tight text-foreground">
                            {tLegal("title")}
                        </h1>
                        <p className="mt-2 text-sm text-muted-foreground">
                            {tLegal("lastUpdate")}
                        </p>
                    </header>

                    <article className="space-y-12">

                        <section aria-labelledby="data-sources-title">
                            <div className="flex items-center gap-2.5 mb-4">
                                <Database className="w-5 h-5 text-primary-text" aria-hidden="true" />
                                <h2 id="data-sources-title" className="text-2xl font-bold text-foreground">
                                    {tLegal("dataSources.title")}
                                </h2>
                            </div>

                            <p className="text-foreground/80 leading-relaxed mb-6">
                                {tLegal("dataSources.description")}
                            </p>

                            <ul className="space-y-3">
                                {sources.map((source) => (
                                    <li
                                        key={source.key}
                                        className="
                      group rounded-xl border border-border bg-card p-4
                      transition-colors duration-200 hover:border-primary/40
                    "
                                    >
                                        <p className="text-sm text-foreground/90 leading-relaxed">
                                            {tLegal(`dataSources.${source.key}`)}
                                        </p>
                                        {source.url && (
                                            <a
                                                href={source.url}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="
                          mt-2 inline-flex items-center gap-1.5 text-sm font-medium text-primary-text
                          hover:underline focus-visible:outline-none focus-visible:ring-2
                          focus-visible:ring-ring focus-visible:ring-offset-2 rounded
                        "
                                            >
                                                {source.display}
                                                <ExternalLink className="w-3.5 h-3.5" aria-hidden="true" />
                                            </a>
                                        )}
                                    </li>
                                ))}
                            </ul>
                        </section>

                        <section
                            aria-labelledby="important-note"
                            className="rounded-xl border border-border bg-muted/30 p-5"
                        >
                            <div className="flex items-start gap-3">
                                <Info className="w-5 h-5 text-muted-foreground shrink-0 mt-0.5" aria-hidden="true" />
                                <div className="space-y-3">
                                    <h2 id="important-note" className="sr-only">{tLegal("noteHeading")}</h2>
                                    <p className="text-sm text-muted-foreground leading-relaxed">
                                        {tLegal("intro")}
                                    </p>
                                    <p className="text-sm text-muted-foreground leading-relaxed">
                                        {tLegal("note")}
                                    </p>
                                </div>
                            </div>
                        </section>

                    </article>
                </div>
            </section>
        </Main>
    )
}