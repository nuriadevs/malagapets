import { useTranslations } from "next-intl";

export function ContactAbout() {
    const t = useTranslations("contact.about");

    return (
        <div className="flex flex-col justify-center p-6 sm:p-8 lg:p-10">
            <div className="mb-8">
                <h2 className="text-foreground/80 text-2xl xs:text-2xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold mb-4">
                    {t("title")}
                </h2>
                <div className="h-1 w-20 bg-success rounded-full mb-6" />

                <div className="space-y-4 text-muted-foreground leading-relaxed">
                    <p className="text-lg sm:text-xl">{t("paragraph1")}</p>
                    <p className="text-lg sm:text-xl">{t("paragraph2")}</p>
                    <p className="text-lg sm:text-xl">{t("paragraph3")}</p>
                </div>
            </div>

            {/* Mission */}
            <div className="mt-8 p-4 bg-primary/10 rounded-lg border border-success/20">
                <p className="text-md sm:text-lg text-muted-foreground italic">
                    {t("mission")}
                </p>
            </div>
        </div>
    );
}