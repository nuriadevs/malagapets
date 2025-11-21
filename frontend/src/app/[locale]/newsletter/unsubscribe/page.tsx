// src/app/[locale]/newsletter/unsubscribe/page.tsx
import { Suspense } from 'react';
import NewsletterUnsubscribeContent from '@/components/ui/newsletter/newsletter-unsubscribe-content';

interface PageProps {
  searchParams: Promise<{ email?: string }>;
}

export const metadata = {
  title: 'Cancelar suscripción - Newsletter | MálagaPets',
  description: 'Cancelar suscripción a la newsletter de MálagaPets'
};

export default async function UnsubscribePage({ searchParams }: PageProps) {
  const params = await searchParams;
  
  return (
    <Suspense fallback={<div>Cargando...</div>}>
      <NewsletterUnsubscribeContent email={params.email} />
    </Suspense>
  );
}
