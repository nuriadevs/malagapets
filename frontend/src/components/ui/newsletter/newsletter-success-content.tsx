// src/components/ui/newsletter/newsletter-success-content.tsx
'use client';

import { useTranslations } from 'next-intl';
import { CheckCircle, Mail, ArrowRight, Sparkles } from 'lucide-react';
import Link from 'next/link';

interface NewsletterSuccessContentProps {
    email?: string;
}

export default function NewsletterSuccessContent({ email }: NewsletterSuccessContentProps) {
    const t = useTranslations('newsletter.success');

    return (
        <div className="flex items-center justify-center min-h-screen px-4 py-12">
            <div className="max-w-2xl w-full rounded-2xl shadow-2xl p-8 md:p-12">
                <div className="text-center transition-all duration-700 opacity-100 translate-y-0">
                    <div className="inline-flex items-center justify-center w-20 h-20 rounded-full  mb-6 animate-bounce-once">
                        <CheckCircle className="w-10 h-10 text-cyan-600" />
                    </div>

                    <div className="mb-6">
                        <Sparkles className="w-8 h-8 text-yellow-500 inline-block animate-pulse" />
                    </div>

                    <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
                        {t('title')}
                    </h1>

                    {email && (
                        <div className="flex items-center justify-center gap-2 text-gray-600 dark:text-gray-300 mb-6">
                            <Mail className="w-5 h-5" />
                            <span className="font-medium">{email}</span>
                        </div>
                    )}

                    <p className="text-lg text-gray-600 dark:text-gray-300 mb-8 max-w-md mx-auto">
                        {t('message')}
                    </p>

                    {/* ✅ CORRECCIÓN: Sección "¿Qué sigue?" */}
                    <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-6 mb-8">
                        <h2 className="text-xl font-semibold  mb-4">
                            {t('whatNext.title')}
                        </h2>
                        <ul className="space-y-3 text-left max-w-md mx-auto">
                            <li className="flex items-start gap-3">
                                <CheckCircle className="w-5 h-5 text-cyan-600 dark:text-cyan-400 flex-shrink-0 mt-0.5" />
                                <span className="text-gray-700 dark:text-gray-300">{t('whatNext.item1')}</span>
                            </li>
                            <li className="flex items-start gap-3">
                                <CheckCircle className="w-5 h-5 text-cyan-600 dark:text-cyan-400 flex-shrink-0 mt-0.5" />
                                <span className="text-gray-700 dark:text-gray-300">{t('whatNext.item2')}</span>
                            </li>
                            <li className="flex items-start gap-3">
                                <CheckCircle className="w-5 h-5 text-cyan-600 dark:text-cyan-400 flex-shrink-0 mt-0.5" />
                                <span className="text-gray-700 dark:text-gray-300">{t('whatNext.item3')}</span>
                            </li>
                        </ul>
                    </div>

                    {/* ✅ CORRECCIÓN: Botones usando la estructura correcta */}
                    <div className="flex flex-col sm:flex-row gap-4 justify-center mb-6">
                        <Link
                            href="/"
                            className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-cyan-600 hover:bg-cyan-700 text-white font-semibold rounded-lg transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl"
                        >
                            {t('buttons.home')}
                            <ArrowRight className="w-5 h-5" />
                        </Link>

                        <Link
                            href="/blog"
                            className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-cyan-600 hover:bg-cyan-700 text-white font-semibold rounded-lg transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl"
                        >
                            {t('buttons.blog')}
                            <ArrowRight className="w-5 h-5" />
                        </Link>
                    </div>

                    {/* ✅ CORRECCIÓN: Nota usando la estructura correcta */}
                    <div className="text-sm text-gray-500 dark:text-gray-400 italic">
                        {t('note')}
                    </div>
                </div>
            </div>
        </div>
    );
}