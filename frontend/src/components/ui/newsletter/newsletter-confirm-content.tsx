// src/components/ui/newsletter/newsletter-confirm-content.tsx
'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { CheckCircle, XCircle, Loader2 } from 'lucide-react';

interface Props {
  token?: string;
  email?: string;
}

type Status = 'loading' | 'success' | 'error' | 'already-confirmed';

export default function NewsletterConfirmContent({ token, email }: Props) {
  const [status, setStatus] = useState<Status>('loading');
  const [errorMessage, setErrorMessage] = useState<string>('');
  const router = useRouter();
  const t = useTranslations('newsletter.confirm');

  useEffect(() => {
    if (!token || !email) {
      setStatus('error');
      setErrorMessage(t('noToken'));
      return;
    }

    const confirmSubscription = async () => {
      try {
        const response = await fetch('/api/newsletter/confirm', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ token, email })
        });

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.error?.message || t('confirmFailed'));
        }

        // ✅ USAR CÓDIGO en lugar de flag
        if (data.code === 'ALREADY_CONFIRMED') {
          setStatus('already-confirmed');
        } else {
          setStatus('success');
        }

        setTimeout(() => {
          router.push(`/newsletter/success${email ? `?email=${encodeURIComponent(email)}` : ''}`);
        }, 2000);

      } catch (err) {
        console.error('Error confirmando suscripción:', err);
        setStatus('error');
        setErrorMessage(err instanceof Error ? err.message : t('unknown'));
      }
    };

    confirmSubscription();
  }, [token, email, router, t]);

  return (
    <div className="flex items-center justify-center min-h-screen p-4">
      <div className="max-w-md w-full rounded-2xl shadow-2xl p-8">

        {/* Loading */}
        {status === 'loading' && (
          <div className="text-center">
            <Loader2 className="w-16 h-16 text-cyan-600 animate-spin mx-auto mb-4" />
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
              {t('verifying')}
            </h1>
            <p className="text-gray-600 dark:text-gray-300">
              {t('pleaseWait')}
            </p>
          </div>
        )}

        {/* Success */}
        {status === 'success' && (
          <div className="text-center">
            <CheckCircle className="w-16 h-16 text-cyan-600 mx-auto mb-4 animate-bounce" />
            <h1 className="text-2xl font-bold mb-2">
              {t('successTitle')}
            </h1>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              {t('successMessage')}
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              {t('redirecting')}
            </p>
          </div>
        )}

        {/* Already Confirmed */}
        {status === 'already-confirmed' && (
          <div className="text-center">
            <CheckCircle className="w-16 h-16 text-cyan-600 mx-auto mb-4" />
            <h1 className="text-2xl font-bold mb-2">
              {t('alreadyConfirmedTitle')}
            </h1>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              {t('alreadyConfirmedMessage')}
            </p>
          </div>
        )}

        {/* Error */}
        {status === 'error' && (
          <div className="text-center">
            <XCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
              {t('errorTitle')}
            </h1>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              {errorMessage}
            </p>
            <button
              onClick={() => router.push('/')}
              className="w-full bg-cyan-600 hover:bg-cyan-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors"
            >
              {t('backToHome')}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}