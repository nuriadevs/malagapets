// src/app/[locale]/newsletter/error/page.tsx
import { Suspense } from 'react';
import { getTranslations } from 'next-intl/server';
import NewsletterErrorContent from '@/components/ui/newsletter/newsletter-error-content';
import { Metadata } from 'next';

type Props = {
    params: Promise<{ locale: string }>;
    searchParams: Promise<{ message?: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { locale } = await params; // ✅ Ahora hacemos await
    
    const t = await getTranslations({
        locale,
        namespace: 'newsletter.error'
    });

    return {
        title: t('meta.title'),
        description: t('meta.description'),
        robots: {
            index: false,
            follow: false,
        },
    };
}

export default async function NewsletterErrorPage(props: Props) {
    const searchParams = await props.searchParams;
    
    return (
        <main className="min-h-screen bg-gradient-to-b from-red-50 via-orange-50 to-white dark:from-gray-900 dark:via-gray-800 dark:to-gray-800">
            <Suspense fallback={<LoadingError />}>
                <NewsletterErrorContent message={searchParams.message} />
            </Suspense>
        </main>
    );
}

function LoadingError() {
    return (
        <div className="flex items-center justify-center min-h-screen">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600"></div>
        </div>
    );
}