import { useTranslations } from "next-intl";

export default function SkipLink() {
    const t = useTranslations("accessibility");

    return (
        <a
            href="#main-content"
            className="
                sr-only focus:not-sr-only
                fixed top-2 left-2 z-9999
                rounded-md bg-background px-4 py-2
                text-sm font-medium text-foreground
                ring-2 ring-ring
                focus:outline-none
            "
        >
            {t("skipToContent")}
        </a>
    );
}
