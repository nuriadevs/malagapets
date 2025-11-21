// src/app/[locale]/newsletter/confirm/page.tsx
import { Suspense } from 'react';
import { getTranslations } from 'next-intl/server';
import NewsletterConfirmContent from '@/components/ui/newsletter/newsletter-confirm-content';
import { Metadata } from 'next';

type Props = {
    params: Promise<{ locale: string }>; // ← Promise
    searchParams: Promise<{ token?: string; email?: string }>; // ← Promise
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { locale } = await params; // ← await

    const t = await getTranslations({
        locale,
        namespace: 'newsletter.confirm'
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

export default async function NewsletterConfirmPage({ searchParams }: Props) {
    const { token, email } = await searchParams; // ← await

    return (
        <main className="min-h-screen">
            <Suspense fallback={<LoadingConfirmation />}>
                <NewsletterConfirmContent
                    token={token}
                    email={email}
                />
            </Suspense>
        </main>
    );
}

function LoadingConfirmation() {
    return (
        <div className="flex items-center justify-center min-h-screen">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-cyan-600"></div>
        </div>
    );
}