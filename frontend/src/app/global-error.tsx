// src/app/global-error.tsx
"use client";

import { useTranslations } from "next-intl";
import { useEffect } from "react";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  const t = useTranslations("error");

  return (
    <html>
      <body>
        <div className="flex min-h-dvh flex-col items-center justify-center gap-4">
          <h2 className="text-xl font-semibold">{t("title")}</h2>
          <button
            onClick={reset}
            className="rounded-md bg-primary px-4 py-2 text-sm text-primary-foreground"
          >
            {t("retry")}
          </button>
        </div>
      </body>
    </html>
  );
}