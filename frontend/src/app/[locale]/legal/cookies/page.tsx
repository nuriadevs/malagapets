// src/app/[locale]/legal/cookies/page.tsx
import { useTranslations } from "next-intl";
import { Timestamp } from "@/components/ui/timestamp";
import { Main } from "@/components/layouts/main";

export default function CookiesPolicyPage() {
    const t = useTranslations("legal.cookies");

    return (
        <Main className="min-h-screen">
            <section aria-labelledby="cookies-heading" className="relative pt-10 sm:pt-12 lg:pt-14 xl:pt-14 pb-10 sm:pb-12 lg:pb-14 xl:pb-14 bg-gradient-to-b">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
                    <article className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
                        <div className="bg-card/50 backdrop-blur-sm border border-border/30 rounded-2xl p-6 sm:p-8 lg:p-12 shadow-xl">
                            <h1 id="cookies-heading" className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
                                {t("title")}
                            </h1>
                            <p className="text-muted-foreground mb-8">
                                {t("lastUpdate")}: Octubre <Timestamp />
                            </p>

                            <div className="prose prose-slate dark:prose-invert max-w-none space-y-8">
                                {/* ¿Qué son las cookies? */}
                                <section>
                                    <h2 className="text-2xl font-semibold mb-4">
                                        {t("whatAreCookies.title")}
                                    </h2>
                                    <p className="text-muted-foreground leading-relaxed">
                                        {t("whatAreCookies.description")}
                                    </p>
                                </section>

                                {/* Cookies que utilizamos */}
                                <section>
                                    <h2 className="text-2xl font-semibold mb-4">
                                        {t("cookiesWeUse.title")}
                                    </h2>
                                    
                                    {/* Cookies esenciales */}
                                    <div className="mb-6">
                                        <h3 className="text-xl font-semibold mb-3">
                                            {t("cookiesWeUse.essential.title")}
                                        </h3>
                                        <p className="text-muted-foreground mb-3">
                                            {t("cookiesWeUse.essential.description")}
                                        </p>
                                        <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
                                            <li>{t("cookiesWeUse.essential.language")}</li>
                                            <li>{t("cookiesWeUse.essential.consent")}</li>
                                            <li>{t("cookiesWeUse.essential.session")}</li>
                                        </ul>
                                        <p className="text-sm text-muted-foreground mt-3">
                                            <strong>{t("legalBasis")}:</strong> {t("cookiesWeUse.essential.legalBasis")}
                                        </p>
                                    </div>

                                    {/* Cookies analíticas */}
                                    <div className="mb-6">
                                        <h3 className="text-xl font-semibold mb-3">
                                            {t("cookiesWeUse.analytics.title")}
                                        </h3>
                                        <p className="text-muted-foreground mb-3">
                                            {t("cookiesWeUse.analytics.description")}
                                        </p>
                                        <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
                                            <li>{t("cookiesWeUse.analytics.googleAnalytics")}</li>
                                            <li>{t("cookiesWeUse.analytics.dataCollected")}</li>
                                            <li>{t("cookiesWeUse.analytics.retention")}</li>
                                        </ul>
                                        <p className="text-sm text-muted-foreground mt-3">
                                            <strong>{t("legalBasis")}:</strong> {t("cookiesWeUse.analytics.legalBasis")}
                                        </p>
                                    </div>
                                </section>

                                {/* Tus derechos */}
                                <section>
                                    <h2 className="text-2xl font-semibold mb-4">
                                        {t("yourRights.title")}
                                    </h2>
                                    <ul className="list-none space-y-2 text-muted-foreground">
                                        <li>✅ {t("yourRights.accept")}</li>
                                        <li>✅ {t("yourRights.change")}</li>
                                        <li>✅ {t("yourRights.delete")}</li>
                                    </ul>

                                    {/* Gestionar cookies en navegadores */}
                                    <div className="mt-6">
                                        <h3 className="text-xl font-semibold mb-3">
                                            {t("yourRights.manageBrowser.title")}
                                        </h3>
                                        <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
                                            <li>
                                                <strong>Chrome:</strong> {t("yourRights.manageBrowser.chrome")}
                                            </li>
                                            <li>
                                                <strong>Firefox:</strong> {t("yourRights.manageBrowser.firefox")}
                                            </li>
                                            <li>
                                                <strong>Safari:</strong> {t("yourRights.manageBrowser.safari")}
                                            </li>
                                            <li>
                                                <strong>Edge:</strong> {t("yourRights.manageBrowser.edge")}
                                            </li>
                                        </ul>
                                    </div>
                                </section>

                                {/* Cookies de terceros */}
                                <section>
                                    <h2 className="text-2xl font-semibold mb-4">
                                        {t("thirdParty.title")}
                                    </h2>
                                    <p className="text-muted-foreground leading-relaxed">
                                        {t("thirdParty.description")}
                                    </p>
                                </section>

                                {/* Contacto */}
                                <section>
                                    <h2 className="text-2xl font-semibold mb-4">
                                        {t("contact.title")}
                                    </h2>
                                    <p className="text-muted-foreground leading-relaxed">
                                        {t("contact.description")}
                                    </p>
                                </section>

                                {/* Nota final */}
                                <div className="mt-8 p-4 bg-primary/10 rounded-lg border border-primary/20">
                                    <p className="text-sm text-muted-foreground">
                                        <strong>{t("note")}:</strong> {t("noteText")}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </article>
                </div>
            </section>
        </Main>
    );
}