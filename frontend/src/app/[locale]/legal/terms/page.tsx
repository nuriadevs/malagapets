// src/app/[locale]/legal/terms/page.tsx
import { Main } from "@/components/layouts/main";
import { useTranslations } from "next-intl";
import { Timestamp } from "@/components/ui/timestamp";





export default function TermsPage() {
    const t = useTranslations("legal.terms");

    return (
        <Main ariaLabelKey="main.legalContent">
            <section
                aria-labelledby="terms-heading"
                className="relative pt-10 sm:pt-12 lg:pt-14 xl:pt-14 pb-10 sm:pb-12 lg:pb-14 xl:pb-14"
            >
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
                    <article className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
                        <div className="bg-card/50 backdrop-blur-sm border border-border/30 rounded-2xl p-6 sm:p-8 lg:p-12 shadow-xl">
                            <h1
                                id="terms-heading"
                                className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4"
                            >
                                {t("title")}
                            </h1>
                            <p className="text-muted-foreground mb-8">
                                {t("lastUpdate")}: <Timestamp />
                            </p>

                            <div className="prose prose-slate dark:prose-invert max-w-none space-y-8">
                                {/* Introducción */}
                                <section>
                                    <h2 className="text-2xl font-semibold mb-4">
                                        {t("intro.title")}
                                    </h2>
                                    <p className="text-muted-foreground leading-relaxed">
                                        {t("intro.description")}
                                    </p>
                                </section>

                                {/* Uso del sitio */}
                                <section>
                                    <h2 className="text-2xl font-semibold mb-4">
                                        {t("usage.title")}
                                    </h2>
                                    <p className="text-muted-foreground mb-3">
                                        {t("usage.intro")}
                                    </p>
                                    <ul className="space-y-2 text-muted-foreground">
                                        <li>✅ {t("usage.allowed.read")}</li>
                                        <li>✅ {t("usage.allowed.share")}</li>
                                        <li>✅ {t("usage.allowed.contact")}</li>
                                    </ul>
                                    <p className="text-muted-foreground mt-4 mb-3">
                                        <strong>{t("usage.notAllowed.title")}:</strong>
                                    </p>
                                    <ul className="space-y-2 text-muted-foreground">
                                        <li>❌ {t("usage.notAllowed.copy")}</li>
                                        <li>❌ {t("usage.notAllowed.commercial")}</li>
                                        <li>❌ {t("usage.notAllowed.illegal")}</li>
                                        <li>❌ {t("usage.notAllowed.harm")}</li>
                                        <li>❌ {t("usage.notAllowed.scraping")}</li>
                                    </ul>
                                </section>

                                {/* Propiedad intelectual */}
                                <section>
                                    <h2 className="text-2xl font-semibold mb-4">
                                        {t("intellectual.title")}
                                    </h2>
                                    <p className="text-muted-foreground mb-3">
                                        {t("intellectual.description")}
                                    </p>
                                    <div className="p-4 bg-muted/30 rounded-lg">
                                        <p className="text-sm text-muted-foreground">
                                            <strong>{t("intellectual.copyright.title")}:</strong>{" "}
                                            {t("intellectual.copyright.description")}
                                        </p>
                                    </div>
                                    <p className="text-muted-foreground mt-4">
                                        {t("intellectual.permission")}
                                    </p>
                                </section>

                                {/* Contenido de terceros */}
                                <section>
                                    <h2 className="text-2xl font-semibold mb-4">
                                        {t("thirdParty.title")}
                                    </h2>
                                    <p className="text-muted-foreground leading-relaxed">
                                        {t("thirdParty.description")}
                                    </p>
                                    <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4 mt-3">
                                        <li>{t("thirdParty.images")}</li>
                                        <li>{t("thirdParty.links")}</li>
                                        <li>{t("thirdParty.embeds")}</li>
                                    </ul>
                                </section>

                                {/* Enlaces externos */}
                                <section>
                                    <h2 className="text-2xl font-semibold mb-4">
                                        {t("externalLinks.title")}
                                    </h2>
                                    <p className="text-muted-foreground leading-relaxed">
                                        {t("externalLinks.description")}
                                    </p>
                                </section>

                                {/* Limitación de responsabilidad */}
                                <section>
                                    <h2 className="text-2xl font-semibold mb-4">
                                        {t("disclaimer.title")}
                                    </h2>
                                    <p className="text-muted-foreground mb-3">
                                        {t("disclaimer.intro")}
                                    </p>
                                    <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
                                        <li>{t("disclaimer.accuracy")}</li>
                                        <li>{t("disclaimer.availability")}</li>
                                        <li>{t("disclaimer.errors")}</li>
                                        <li>{t("disclaimer.damages")}</li>
                                    </ul>
                                    <div className="mt-4 p-4 bg-amber-500/10 rounded-lg border border-amber-500/20">
                                        <p className="text-sm text-muted-foreground">
                                            <strong>{t("disclaimer.note")}:</strong>{" "}
                                            {t("disclaimer.noteText")}
                                        </p>
                                    </div>
                                </section>

                                {/* Modificaciones */}
                                <section>
                                    <h2 className="text-2xl font-semibold mb-4">
                                        {t("modifications.title")}
                                    </h2>
                                    <p className="text-muted-foreground leading-relaxed">
                                        {t("modifications.description")}
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

                                {/* Aceptación */}
                                <div className="mt-8 p-4 bg-primary/10 rounded-lg border border-primary/20">
                                    <p className="text-sm">
                                        <strong>{t("acceptance.title")}:</strong>{" "}
                                        {t("acceptance.description")}
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