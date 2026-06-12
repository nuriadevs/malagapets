// src/app/[locale]/not-found.tsx
import { getTranslations } from "next-intl/server";
import { headers } from "next/headers";
import Link from "next/link";
import { routing } from "@/i18n/routing";
import type { Locale } from "@/i18n/config";

async function getLocale(): Promise<Locale> {
    const headersList = await headers();
    const referer = headersList.get("referer") ?? "";

    const match = referer.match(/\/([a-z]{2})(\/|$)/);
    const candidate = match?.[1];

    return routing.locales.includes(candidate as Locale)
        ? (candidate as Locale)
        : routing.defaultLocale;
}

export default async function NotFound() {
    const locale = await getLocale();
    const t = await getTranslations({ locale, namespace: "notFound" });

    return (
        <div className="flex min-h-dvh flex-col items-center justify-center gap-4">
            <h1 className="text-6xl font-bold">404</h1>
            <h2 className="text-xl font-semibold">{t("title")}</h2>
            <p className="text-sm text-muted-foreground">{t("description")}</p>
            <Link
                href={`/${locale}`}
                className="rounded-md bg-primary px-4 py-2 text-sm text-primary-foreground"
            >
                {t("back")}
            </Link>
        </div>
    );
}