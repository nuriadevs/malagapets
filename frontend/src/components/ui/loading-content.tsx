import { useTranslations } from 'next-intl';
import {loadingIcons} from '@/data/icons';

/**
 * Loading content component. 
 */
export function LoadingContent() {

  const [ PawPrint] = loadingIcons;
  const t = useTranslations("loading");

  const tAccessibility = useTranslations("accessibility");
  const tacces = tAccessibility.raw("loading");

  return (
    <main className="min-h-screen flex items-center justify-center px-4" role="main" aria-label={tacces.main}>
      <div className="max-w-md w-full text-center space-y-8">
        {/* Animation loading  */}
        <div className="relative" role="status" aria-label={tacces.loadingStatus}>
          {/* Circle */}
          <div className="w-20 h-20 mx-auto relative">
            <div className="absolute inset-0 border-4 border-muted rounded-full" aria-hidden="true"></div>
            <div className="absolute inset-0 border-4 border-success border-t-transparent rounded-full animate-spin" aria-hidden="true"></div>

            {/* Central Icon */}
            <div className="absolute inset-0 flex items-center justify-center">
              <PawPrint className="w-8 h-8 text-cyan-600" aria-hidden="true" />
            </div>
          </div>
          
        </div>

        {/* Text loading */}
        <div className="space-y-3" aria-live="polite" aria-label={tacces.loadingText}>
          <h2 className="text-xl font-semibold">
            {t('title')}
          </h2>
          <p className="text-muted-foreground">
            {t('description')}
          </p>
        </div>

        {/* Progress bar */}
        <div className="w-full bg-success rounded-full h-2 overflow-hidden" role="progressbar" aria-label={tacces.loadingProgress} aria-valuenow={undefined} aria-valuemin={0} aria-valuemax={100}>
          <div className="h-full bg-success-to-r from-primary to-primary/60 rounded-full animate-pulse" aria-hidden="true"></div>
        </div>

      </div>
    </main>
  );
}