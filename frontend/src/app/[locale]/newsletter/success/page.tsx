// src/app/[locale]/newsletter/success/page.tsx
import { Suspense } from 'react';
import { getTranslations } from 'next-intl/server';
import NewsletterSuccessContent from '@/components/ui/newsletter/newsletter-success-content'; 
import { Metadata } from 'next';

type Props = {
  params: Promise<{ locale: string }>; // ← Promise
  searchParams: Promise<{ email?: string }>; // ← Promise
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params; // ← await

  const t = await getTranslations({
    locale,
    namespace: 'newsletter.success'
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

export default async function NewsletterSuccessPage({ searchParams }: Props) {
  const { email } = await searchParams; // ← await

  return (
    <main className="min-h-screen">
      <Suspense fallback={<LoadingSuccess />}>
        <NewsletterSuccessContent email={email} />
      </Suspense>
    </main>
  );
}

function LoadingSuccess() {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"></div>
    </div>
  );
}