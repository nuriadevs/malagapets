// src/app/[locale]/legal/privacity/page.tsx
import { useTranslations } from "next-intl";
import { Timestamp } from "@/components/ui/timestamp";
import { Main } from "@/components/layouts/main";

export default function PrivacyPolicyPage() {
    const t = useTranslations("legal.privacy");

    return (
        <Main className="min-h-screen">
            <section aria-labelledby="privacy-heading" className="relative pt-10 sm:pt-12 lg:pt-14 xl:pt-14 pb-10 sm:pb-12 lg:pb-14 xl:pb-14 bg-gradient-to-b">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
                    <article className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
                        <div className="bg-card/50 backdrop-blur-sm border border-border/30 rounded-2xl p-6 sm:p-8 lg:p-12 shadow-xl">
                            <h1 id="privacy-heading" className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
                                {t("title")}
                            </h1>
                            <p className="text-muted-foreground mb-8">
                                {t("lastUpdate")}: Octubre <Timestamp />
                            </p>

                            <div className="prose prose-slate dark:prose-invert max-w-none space-y-8">
                                {/* Responsable del tratamiento */}
                                <section>
                                    <h2 className="text-2xl font-semibold mb-4">
                                        {t("responsible.title")}
                                    </h2>
                                    <ul className="list-none space-y-2 text-muted-foreground">
                                        <li>
                                            <strong>{t("responsible.project")}:</strong> Malagapets
                                        </li>
                                        <li>
                                            <strong>{t("responsible.contact")}:</strong> {t("responsible.contactForm")}
                                        </li>
                                        <li>
                                            <strong>{t("responsible.location")}:</strong> Málaga, España
                                        </li>
                                    </ul>
                                </section>

                                {/* ¿Qué datos recopilamos? */}
                                <section>
                                    <h2 className="text-2xl font-semibold mb-4">
                                        {t("dataCollected.title")}
                                    </h2>
                                    
                                    {/* Datos voluntarios */}
                                    <div className="mb-6">
                                        <h3 className="text-xl font-semibold mb-3">
                                            {t("dataCollected.voluntary.title")}
                                        </h3>
                                        
                                        <div className="p-4 bg-muted/30 rounded-lg">
                                            <h4 className="font-semibold mb-2">
                                                {t("dataCollected.voluntary.contactForm.title")}
                                            </h4>
                                            <ul className="list-disc list-inside space-y-1 text-muted-foreground ml-4">
                                                <li>{t("dataCollected.voluntary.contactForm.name")}</li>
                                                <li>{t("dataCollected.voluntary.contactForm.email")}</li>
                                                <li>{t("dataCollected.voluntary.contactForm.message")}</li>
                                            </ul>
                                            <div className="mt-3 text-sm space-y-1">
                                                <p>
                                                    <strong>{t("purpose")}:</strong> {t("dataCollected.voluntary.contactForm.purpose")}
                                                </p>
                                                <p>
                                                    <strong>{t("legalBasis")}:</strong> {t("dataCollected.voluntary.contactForm.legalBasis")}
                                                </p>
                                                <p>
                                                    <strong>{t("retention")}:</strong> {t("dataCollected.voluntary.contactForm.retention")}
                                                </p>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Datos automáticos */}
                                    <div className="mb-6">
                                        <h3 className="text-xl font-semibold mb-3">
                                            {t("dataCollected.automatic.title")}
                                        </h3>
                                        <p className="text-muted-foreground mb-3">
                                            {t("dataCollected.automatic.description")}
                                        </p>
                                        <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
                                            <li>{t("dataCollected.automatic.ip")}</li>
                                            <li>{t("dataCollected.automatic.browser")}</li>
                                            <li>{t("dataCollected.automatic.pages")}</li>
                                            <li>{t("dataCollected.automatic.time")}</li>
                                            <li>{t("dataCollected.automatic.location")}</li>
                                        </ul>
                                        <div className="mt-3 text-sm space-y-1">
                                            <p>
                                                <strong>{t("purpose")}:</strong> {t("dataCollected.automatic.purpose")}
                                            </p>
                                            <p>
                                                <strong>{t("legalBasis")}:</strong> {t("dataCollected.automatic.legalBasis")}
                                            </p>
                                            <p>
                                                <strong>{t("tool")}:</strong> Google Analytics
                                            </p>
                                            <p>
                                                <strong>{t("retention")}:</strong> 26 meses
                                            </p>
                                        </div>
                                    </div>
                                </section>

                                {/* ¿Compartimos tus datos? */}
                                <section>
                                    <h2 className="text-2xl font-semibold mb-4">
                                        {t("shareData.title")}
                                    </h2>
                                    <p className="text-lg font-semibold text-primary mb-3">
                                        {t("shareData.noSell")}
                                    </p>
                                    <p className="text-muted-foreground mb-3">
                                        {t("shareData.onlyWith")}
                                    </p>
                                    <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
                                        <li>Google Analytics ({t("shareData.analytics")})</li>
                                        <li>{t("shareData.hosting")}</li>
                                        <li>{t("shareData.email")}</li>
                                    </ul>
                                    <p className="text-sm text-muted-foreground mt-3">
                                        {t("shareData.gdprCompliant")}
                                    </p>
                                </section>

                                {/* Tus derechos (RGPD) */}
                                <section>
                                    <h2 className="text-2xl font-semibold mb-4">
                                        {t("rights.title")}
                                    </h2>
                                    <p className="text-muted-foreground mb-4">
                                        {t("rights.intro")}
                                    </p>
                                    <ul className="space-y-2 text-muted-foreground">
                                        <li>
                                            ✅ <strong>{t("rights.access.title")}:</strong> {t("rights.access.description")}
                                        </li>
                                        <li>
                                            ✅ <strong>{t("rights.rectification.title")}:</strong> {t("rights.rectification.description")}
                                        </li>
                                        <li>
                                            ✅ <strong>{t("rights.deletion.title")}:</strong> {t("rights.deletion.description")}
                                        </li>
                                        <li>
                                            ✅ <strong>{t("rights.portability.title")}:</strong> {t("rights.portability.description")}
                                        </li>
                                        <li>
                                            ✅ <strong>{t("rights.opposition.title")}:</strong> {t("rights.opposition.description")}
                                        </li>
                                        <li>
                                            ✅ <strong>{t("rights.limitation.title")}:</strong> {t("rights.limitation.description")}
                                        </li>
                                        <li>
                                            ✅ <strong>{t("rights.withdraw.title")}:</strong> {t("rights.withdraw.description")}
                                        </li>
                                    </ul>
                                    <p className="text-sm text-muted-foreground mt-4">
                                        <strong>{t("rights.exercise")}:</strong> {t("rights.exerciseHow")}
                                    </p>
                                </section>

                                {/* Seguridad */}
                                <section>
                                    <h2 className="text-2xl font-semibold mb-4">
                                        {t("security.title")}
                                    </h2>
                                    <p className="text-muted-foreground mb-3">
                                        {t("security.description")}
                                    </p>
                                    <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
                                        <li>{t("security.https")}</li>
                                        <li>{t("security.access")}</li>
                                        <li>{t("security.reviews")}</li>
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

                                {/* Cambios en esta política */}
                                <section>
                                    <h2 className="text-2xl font-semibold mb-4">
                                        {t("changes.title")}
                                    </h2>
                                    <p className="text-muted-foreground leading-relaxed">
                                        {t("changes.description")}
                                    </p>
                                </section>

                                {/* Compromiso final */}
                                <div className="mt-8 p-4 bg-primary/10 rounded-lg border border-primary/20">
                                    <p className="text-sm">
                                        <strong>{t("commitment")}:</strong> {t("commitmentText")}
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