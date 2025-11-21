// src/components/ui/newsletter/newsletter-error-content.tsx
'use client';

import { useTranslations } from 'next-intl';
import { XCircle, Home, Mail } from 'lucide-react';
import Link from 'next/link';

interface NewsletterErrorContentProps {
    message?: string;
}

export default function NewsletterErrorContent({ message }: NewsletterErrorContentProps) {
    const t = useTranslations('newsletter.error');

    return (
        <div className="flex items-center justify-center min-h-screen px-4 py-12">
            <div className="max-w-2xl w-full bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-8 md:p-12">
                <div className="text-center transition-all duration-700 opacity-100 translate-y-0">
                    <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-red-100 dark:bg-red-900/30 mb-6">
                        <XCircle className="w-10 h-10 text-red-600 dark:text-red-400" />
                    </div>

                    <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                        {t('title')}
                    </h1>

                    <p className="text-lg text-gray-600 dark:text-gray-300 mb-4">
                        {message || t('defaultMessage')}
                    </p>

                    <p className="text-sm text-gray-500 dark:text-gray-400 mb-8">
                        {t('help')}
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link
                            href="/"
                            className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-gray-600 hover:bg-gray-700 text-white font-semibold rounded-lg transition-all duration-200"
                        >
                            <Home className="w-5 h-5" />
                            {t('homeButton')}
                        </Link>

                        <Link
                            href="/contact"
                            className="inline-flex items-center justify-center gap-2 px-6 py-3 border-2 border-blue-600 text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 font-semibold rounded-lg transition-all duration-200"
                        >
                            <Mail className="w-5 h-5" />
                            {t('contactButton')}
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}