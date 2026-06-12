import type { Metadata } from "next"
import { getTranslations } from "next-intl/server"
import { Link } from "@/i18n/navigation"
import { Main } from "@/components/layouts/main"
import { ChevronRight } from "lucide-react"
import type { Locale } from "@/i18n/routing"
import type { NavigationLink } from "@/types/navigation"

export async function generateMetadata({
    params,
}: {
    params: Promise<{ locale: Locale }>
}): Promise<Metadata> {
    const { locale } = await params
    const t = await getTranslations({ locale, namespace: "navigation" })

    return {
        title: t("legal"),
        alternates: {
            canonical: `/${locale}/legal`,
        },
    }
}

export default async function LegalPage({
    params,
}: {
    params: Promise<{ locale: Locale }>
}) {
    const { locale } = await params
    const tLegal = await getTranslations({ locale, namespace: "legal" })
    const tAccess = await getTranslations({ locale, namespace: "accessibility.footer" })
    const tNav = await getTranslations({ locale, namespace: "navigation" })

    const navigationItems: NavigationLink[] = tNav.raw("links") as NavigationLink[]
    const legalLinks = navigationItems.find((item) => item.key === "legal")?.submenu ?? []

    return (
        <Main ariaLabelKey="main.legal">
            <section className="container-app py-16" aria-labelledby="main.legal">
                <div className="max-w-3xl mx-auto">
                    <h1 id="legal-title" className="text-4xl font-bold mb-2 text-foreground">
                        {tNav("legal")}
                    </h1>
                    <p className="text-sm text-muted-foreground mb-12">
                        {tLegal("subtitle")}
                    </p>

                    <nav aria-label={tAccess("legalNav")}>
                        <ul className="space-y-4">
                            {legalLinks.map((page) => (
                                <li key={page.key}>
                                    <Link
                                        href={page.href}
                                        className="
                      group flex items-center justify-between p-4 rounded-lg
                      border border-border bg-card
                      hover:border-primary hover:bg-primary/5
                      transition-all duration-200
                    "
                                    >
                                        <span className="font-semibold text-foreground">
                                            {tLegal(`${page.key}.title`)}
                                        </span>
                                        <ChevronRight className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" aria-hidden="true" />
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </nav>
                </div>
            </section>
        </Main>
    )
}