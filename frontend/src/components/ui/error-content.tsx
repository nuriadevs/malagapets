'use client'

import { useTranslations } from 'next-intl'
import { ErrorContentProps } from '@/types/components'
import { useEffect } from 'react'
import { errorIcons } from '@/data/icons'
import { Button } from "@/components/ui/button"


/* Error Content Component */
export function ErrorContent({ error, reset }: ErrorContentProps) {

  const [AlertTriangle, RefreshCw, Home, Bug] = errorIcons;

  const t = useTranslations("error")
  const tAccessibility = useTranslations("accessibility")
  const tacces = tAccessibility.raw("error")

  useEffect(() => {
    console.error('Error capturado:', error)
  }, [error])

  return (
    <main className="flex-1 flex items-center justify-center px-4 py-16" role="main" aria-label={tacces.main}>
      <div className="max-w-2xl w-full text-center space-y-8">
        {/* Icon and error state */}
        <div className="space-y-4" role="banner" aria-label={tacces.errorState}>
          <div className="flex justify-center">
            <div className="p-4 bg-destructive/10 rounded-full" role="img" aria-label={tacces.warningIcon}>
              <AlertTriangle className="w-16 h-16 text-destructive" aria-hidden="true"/>
            </div>
          </div>
          <div className="text-6xl font-bold text-destructive/80 font-mono" aria-hidden="true">
            ERROR
          </div>
        </div>

        {/* Main Content */}
        <div className="space-y-4">
          <h1 className="text-3xl font-bold tracking-tight">
            {t('title')}
          </h1>
          <p className="text-lg text-muted-foreground max-w-lg mx-auto">
            {t('description')}
          </p>

          {/* Show error details in development */}
          {process.env.NODE_ENV === 'development' && (
            <details className="mt-6 p-4 bg-muted rounded-lg text-left" aria-label={tacces.technicalDetails}>
              <summary className="cursor-pointer text-sm font-medium text-muted-foreground hover:text-foreground">
                {t('technicalDetails')}
              </summary>
              <div className="mt-3 text-xs font-mono text-destructive break-all" role="alert" aria-label={tacces.errorDetails}>
                {error.message}
                {error.digest && (
                  <div className="mt-2 opacity-70">
                    Digest: {error.digest}
                  </div>
                )}
              </div>
            </details>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center" role="group" aria-label={tacces.availableActions}>
          <Button
            onClick={reset}
            className="cursor-pointer inline-flex items-center gap-2 bg-success text-primary-foreground px-6 py-3 rounded-lg hover:bg-success/80 transition-colors font-medium"
            aria-label={tacces.retryAction}
                        variant={"ghost"}
            size={"default"}
          >
            <RefreshCw className="w-4 h-4" aria-hidden="true" />
            {t('retry')}
          </Button>
          <Button
            onClick={() => window.location.href = '/'}
            className="cursor-pointer inline-flex items-center gap-2 border border-input bg-background hover:bg-accent hover:text-accent-foreground px-6 py-3 rounded-lg transition-colors font-medium"
            aria-label={tacces.backToHome}
            variant={"ghost"}
            size={"default"}
          >
            <Home className="w-4 h-4" aria-hidden="true" />
            {t('backHome')}
          </Button>
        </div>
        {/* Help Information */}
        <section className="mt-12 p-6 bg-muted/50 rounded-xl" aria-labelledby="help-section">
          <h2 id="help-section" className="text-lg font-semibold mb-3 flex items-center gap-2 justify-center">
            <Bug className="w-5 h-5" aria-hidden="true" />
            {t('help.title')}
          </h2>
          <div className="space-y-2 text-sm text-muted-foreground">
            <p>{t('help.description')}</p>
            <div className="flex justify-center gap-4 mt-4" role="list" aria-label={tacces.suggestions}>
              <span className="px-3 py-1 bg-background rounded-md text-xs" role="listitem">
                {t('help.temporary')}
              </span>
              <span className="px-3 py-1 bg-background rounded-md text-xs" role="listitem">
                {t('help.refresh')}
              </span>
            </div>
          </div>
        </section>
      </div>
    </main>
  )
}