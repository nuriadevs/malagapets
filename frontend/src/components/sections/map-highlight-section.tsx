import { getTranslations } from "next-intl/server"
import { Link } from "@/i18n/navigation"
import { MoveRight } from "lucide-react"
import { mapHighlight } from "@/data/icons"
import { Button } from "@/components/ui/button"


export default async function MapHighlightSection() {
    const t = await getTranslations("mapHighlight")

    const features = [
        t("features.0"),
        t("features.1"),
        t("features.2"),
    ]

    return (
        <section
            aria-labelledby="map-highlight-title"
            className="container-app py-16 sm:py-20"
        >
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
                <div className="space-y-6">
                    <span className="badge badge-pet text-xs font-semibold uppercase tracking-widest">
                        {t("label")}
                    </span>
                    <h2
                        id="map-highlight-title"
                        className="text-3xl sm:text-4xl font-bold text-foreground/80 leading-tight text-balance"
                    >
                        {t("title")}
                    </h2>
                    <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
                        {t("description")}
                    </p>
                    <ul className="space-y-4" role="list">
                        {features.map((feature, i) => (
                            <li key={i} className="flex items-start gap-3">
                                <div
                                    className="shrink-0 w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center mt-0.5 ring-1 ring-primary/20"
                                    aria-hidden="true"
                                >
                                    <svg
                                        className="w-3 h-3 text-primary"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth={2.5}
                                        viewBox="0 0 24 24"
                                        aria-hidden="true"
                                    >
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                                    </svg>
                                </div>
                                <p className="text-sm text-muted-foreground leading-relaxed">
                                    {feature}
                                </p>
                            </li>
                        ))}
                    </ul>
                    <Button
                        asChild
                        size="lg"
                        className="mt-2 shadow-pet hover:shadow-pet transition-all duration-300 group ease-in-out"
                    >
                        <Link href="/explorer">
                            {t("cta")}
                            <MoveRight
                                className="w-4 h-4 ml-1 transition-transform duration-200 group-hover:translate-x-1"
                                aria-hidden="true"
                            />
                        </Link>
                    </Button>
                </div>
                <div className="relative" aria-hidden="true">

                    <div className="relative aspect-4/3 rounded-3xl overflow-hidden border border-border shadow-pet bg-muted/30">

                        <div className="absolute inset-0 bg-linear-to-br from-primary/5 via-background to-pet/5" />

                        <div
                            className="absolute inset-0 opacity-20"
                            style={{
                                backgroundImage: `
                  linear-gradient(var(--color-border) 1px, transparent 1px),
                  linear-gradient(90deg, var(--color-border) 1px, transparent 1px)
                `,
                                backgroundSize: "40px 40px",
                            }}
                        />

                        <div className="absolute inset-0 opacity-10">
                            <div className="absolute top-[35%] left-0 right-0 h-px bg-foreground" />
                            <div className="absolute top-[60%] left-0 right-0 h-px bg-foreground" />
                            <div className="absolute left-[30%] top-0 bottom-0 w-px bg-foreground" />
                            <div className="absolute left-[65%] top-0 bottom-0 w-px bg-foreground" />
                        </div>

                        <div className="absolute inset-0 flex flex-col items-center justify-center gap-3">
                            <div className="w-16 h-16 rounded-full bg-card/80 backdrop-blur-sm flex items-center justify-center shadow-lg border border-border">
                                <mapHighlight.location className="w-7 h-7 text-primary" />
                            </div>
                            <p className="text-sm text-muted-foreground font-medium">
                                {t("mapLabel")}
                            </p>
                        </div>

                        <div className="absolute top-1/3 left-1/4 w-4 h-4 rounded-full bg-primary shadow-lg shadow-primary/30 animate-pulse" />
                        <div className="absolute top-1/2 left-1/2 w-5 h-5 rounded-full bg-primary shadow-lg shadow-primary/40 ring-4 ring-primary/20" />
                        <div className="absolute top-2/3 left-2/3 w-3 h-3 rounded-full bg-pet shadow-md shadow-pet/30" />
                        <div className="absolute top-1/4 right-1/4 w-4 h-4 rounded-full bg-primary/70 shadow-md animate-ping-slow" />
                    </div>

                    <div className="absolute -bottom-4 -left-4 bg-card rounded-2xl px-4 py-3 shadow-pet border border-border">
                        <div className="flex items-center gap-3">
                            <div className="w-9 h-9 rounded-xl bg-primary/10 flex items-center justify-center ring-1 ring-primary/20 shrink-0">
                                <mapHighlight.dog className="w-4 h-4 text-primary" />
                            </div>
                            <div>
                                <p className="text-xs font-semibold text-foreground">{t("floatingCard.name")}</p>
                                <p className="text-xs text-muted-foreground">{t("floatingCard.detail")}</p>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    )
}