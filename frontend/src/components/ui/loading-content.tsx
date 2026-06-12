import { useTranslations } from "next-intl"
import { loadingIcons } from "@/data/icons"


export function LoadingContent() {
  const [PawPrint] = loadingIcons
  const t = useTranslations("loading")
  const tAccess = useTranslations("accessibility")
  const tacces = tAccess.raw("loading")

  return (
    <div
      className="min-h-[40vh] flex items-center justify-center px-4"
      aria-label={tacces.main}
    >
      <div className="max-w-md w-full text-center space-y-8">

        <div role="status" aria-label={tacces.loadingStatus}>
          <div className="w-20 h-20 mx-auto relative">
            <div
              className="absolute inset-0 border-4 border-border rounded-full"
              aria-hidden="true"
            />
            <div
              className="absolute inset-0 border-4 border-primary border-t-transparent rounded-full animate-spin"
              aria-hidden="true"
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <PawPrint className="w-8 h-8 text-primary" aria-hidden="true" />
            </div>
          </div>
        </div>

        <div
          className="space-y-3"
          aria-live="polite"
          aria-label={tacces.loadingText}
        >
          <p className="text-xl font-semibold text-foreground">
            {t("title")}
          </p>
          <p className="text-sm text-muted-foreground">
            {t("description")}
          </p>
        </div>

        <div
          className="w-full bg-muted rounded-full h-1.5 overflow-hidden"
          role="progressbar"
          aria-label={tacces.loadingProgress}
          aria-valuemin={0}
          aria-valuemax={100}
        >
          <div
            className="h-full w-1/2 bg-primary rounded-full animate-pulse"
            aria-hidden="true"
          />
        </div>

      </div>
    </div>
  )
}
