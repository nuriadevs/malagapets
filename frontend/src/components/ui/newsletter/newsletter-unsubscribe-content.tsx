// src/components/ui/newsletter/newsletter-unsubscribe-content.tsx
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { AlertCircle, CheckCircle, XCircle, Loader2 } from 'lucide-react';

interface Props {
  email?: string;
}

type Status = 'confirm' | 'loading' | 'success' | 'error' | 'already-unsubscribed';

export default function NewsletterUnsubscribeContent({ email }: Props) {
  const [status, setStatus] = useState<Status>('confirm');
  const [errorMessage, setErrorMessage] = useState<string>('');
  const router = useRouter();
  const t = useTranslations('newsletter.unsubscribe');

  const handleUnsubscribe = async () => {
    if (!email) {
      setStatus('error');
      setErrorMessage(t('noEmail'));
      return;
    }

    setStatus('loading');

    try {
      const response = await fetch('/api/newsletter/unsubscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error?.message || t('unsubscribeFailed'));
      }

      // ✅ USAR CÓDIGO en lugar de flag
      if (data.code === 'ALREADY_UNSUBSCRIBED') {
        setStatus('already-unsubscribed');
      } else {
        setStatus('success');
      }

      // Redirigir después de 3 segundos
      setTimeout(() => {
        router.push('/');
      }, 3000);

    } catch (err) {
      console.error('Error dando de baja:', err);
      setStatus('error');
      setErrorMessage(err instanceof Error ? err.message : t('unknown'));
    }
  };

  const handleCancel = () => {
    router.push('/');
  };

  return (
    <div className="flex items-center justify-center min-h-screen p-4">
      <div className="max-w-md w-full bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-8">

        {/* Confirmación */}
        {status === 'confirm' && (
          <div className="text-center">
            <AlertCircle className="w-16 h-16 text-cyan-600 mx-auto mb-4" />
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
              {t('confirmTitle')}
            </h1>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              {t('confirmMessage')}
            </p>
            {email && (
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-6 font-mono bg-gray-100 dark:bg-gray-700 p-2 rounded">
                {email}
              </p>
            )}
            <div className="space-y-3">
              <button
                onClick={handleUnsubscribe}
                className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors"
              >
                {t('confirmButton')}
              </button>
              <button
                onClick={handleCancel}
                className="w-full bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-900 dark:text-white font-semibold py-3 px-6 rounded-lg transition-colors"
              >
                {t('cancelButton')}
              </button>
            </div>
          </div>
        )}

        {/* Loading */}
        {status === 'loading' && (
          <div className="text-center">
            <Loader2 className="w-16 h-16 text-cyan-600 animate-spin mx-auto mb-4" />
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
              {t('processing')}
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
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
              {t('successTitle')}
            </h1>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              {t('successMessage')}
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">
              {t('feedbackMessage')}
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              {t('redirecting')}
            </p>
          </div>
        )}

        {/* Already Unsubscribed */}
        {status === 'already-unsubscribed' && (
          <div className="text-center">
            <CheckCircle className="w-16 h-16 text-cyan-600 mx-auto mb-4" />
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
              {t('alreadyUnsubscribedTitle')}
            </h1>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              {t('alreadyUnsubscribedMessage')}
            </p>
            <button
              onClick={() => router.push('/')}
              className="w-full bg-cyan-600 hover:bg-cyan-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors"
            >
              {t('backToHome')}
            </button>
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
