// src/components/blog/newsletter/newsletter.tsx
'use client';

import { useTranslations } from "next-intl";
import { useLocale } from "next-intl";
import Link from 'next/link';
import { useState, useTransition, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import toast from "react-hot-toast";
import { newsletter } from '@/data/icons';
import { NewsletterFormData, ApiResponse } from "@/types/blog";
import { isValidEmail } from "@/utils/validation";

export default function Newsletter() {

    const [MailIcon, UserIcon] = newsletter;

    const t = useTranslations('blog.newsletter');
    const tAccess = useTranslations('accessibility.newsletter');
    const locale = useLocale();

    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [isPending, startTransition] = useTransition();

    const getMessageFromCode = useCallback((code: string): string => {
        return t(`messages.${code}`) || t('messages.error');
    }, [t]);

    const handleSubmit = useCallback(async (e: React.FormEvent) => {
        e.preventDefault();

        const trimmedEmail = email.trim().toLowerCase();
        const trimmedName = name.trim();

        if (!trimmedEmail) {
            toast.error(t('messages.emptyEmail'), {
                duration: 4000,
                position: "top-center",
            });
            return;
        }

        if (!trimmedName) {
            toast.error(t('messages.emptyName'), {
                duration: 4000,
                position: "top-center",
            });
            return;
        }

        if (trimmedName.length > 30) {
            toast.error(t('messages.nameTooLong'), {
                duration: 4000,
                position: "top-center",
            });
            return;
        }

        if (!isValidEmail(trimmedEmail)) {
            toast.error(t('messages.invalidEmail'), {
                duration: 4000,
                position: "top-center",
            });
            return;
        }

        startTransition(async () => {
            const loadingToast = toast.loading(t('form.submittingButton'), {
                position: "top-center",
            });

            try {
                console.log('🌍 Enviando suscripción con locale:', locale); // Debug

                const response = await fetch("/api/newsletter", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        email: trimmedEmail,
                        name: trimmedName,
                        locale: locale
                    } as NewsletterFormData),
                });

                console.log("Newsletter API response:", response);

                const data: ApiResponse = await response.json();
                toast.dismiss(loadingToast);

                if (!response.ok || !data.success) {
                    let errorMessage = t('messages.error');

                    if (typeof data.error === 'string') {
                        errorMessage = data.error;
                    } else if (data.error?.message) {
                        errorMessage = data.error.message;
                    } else if (data.code) {
                        errorMessage = t(`messages.${data.code}`);
                    }

                    toast.error(errorMessage, {
                        duration: 5000,
                        position: "top-center",
                        icon: '⚠️',
                    });
                    return;
                }

                const message = data.code ? getMessageFromCode(data.code) : t('messages.SUBSCRIPTION_CREATED');

                let icon = '✅';
                if (data.code === 'PENDING_CONFIRMATION') icon = '📧';
                if (data.code === 'REACTIVATED') icon = '🔄';
                if (data.code === 'ALREADY_CONFIRMED') icon = 'ℹ️';

                toast.success(message, {
                    duration: 6000,
                    position: "top-center",
                    icon,
                });

                setEmail('');
                setName('');

            } catch (error) {
                toast.dismiss(loadingToast);
                console.error("Error submitting newsletter:", error);
                toast.error(t('messages.error'), {
                    duration: 5000,
                    position: "top-center",
                    icon: '❌',
                });
            }
        });
    }, [email, name, t, getMessageFromCode, locale]);

    return (
        <section
            className="relative z-10 overflow-hidden py-12"
            aria-label={tAccess('title')}
        >
            <div className="mx-auto max-w-7xl px-4 sm:px-8">
                <div className="rounded-2xl px-6 py-10 shadow-xl border sm:px-10">

                    {/* Header Section */}
                    <div className="mb-8 text-center lg:text-left">
                        <h3 className="mb-3 text-3xl font-bold text-cyan-600">
                            {t('title')}
                        </h3>
                        <p className="text-base text-foreground/70 max-w-2xl mx-auto lg:mx-0">
                            {t('description')}
                        </p>
                    </div>

                    {/* Form Section */}
                    <form onSubmit={handleSubmit} noValidate>
                        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1fr_auto] gap-4 items-start">

                            {/* Campo Nombre */}
                            <div className="relative w-full">
                                <UserIcon
                                    className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-cyan-600 pointer-events-none z-10"
                                    strokeWidth={2}
                                    aria-hidden="true"
                                />
                                <input
                                    id="newsletter-name"
                                    type="text"
                                    name="name"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    placeholder={t('form.namePlaceholder')}
                                    disabled={isPending}
                                    required
                                    minLength={2}
                                    maxLength={30}
                                    pattern="[a-záéíóúñüA-ZÁÉÍÓÚÑÜ\s'-]+"
                                    aria-label={t('form.namePlaceholder')}
                                    aria-required="true"
                                    autoComplete="name"
                                    className="
                                        w-full h-14 pl-12 pr-4 rounded-xl
                                        border-2 border-cyan-600/40 bg-background/50
                                        backdrop-blur-sm shadow-sm
                                        transition-all duration-300 ease-out
                                        focus:ring-4 focus:ring-cyan-600/20 focus:border-cyan-600
                                        focus:outline-none focus:bg-background
                                        hover:border-cyan-600/60 hover:shadow-md
                                        disabled:opacity-50 disabled:cursor-not-allowed
                                        text-foreground placeholder:text-muted-foreground/60
                                    "
                                />
                            </div>

                            {/* Campo Email */}
                            <div className="relative w-full">
                                <MailIcon
                                    className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-cyan-600 pointer-events-none z-10"
                                    strokeWidth={2}
                                    aria-hidden="true"
                                />
                                <input
                                    id="newsletter-email"
                                    type="email"
                                    name="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder={t('form.emailPlaceholder')}
                                    disabled={isPending}
                                    required
                                    aria-label={t('form.emailPlaceholder')}
                                    aria-required="true"
                                    aria-invalid={email.length > 0 && !isValidEmail(email)}
                                    autoComplete="email"
                                    className="
                                        w-full h-14 pl-12 pr-4 rounded-xl
                                        border-2 border-cyan-600/40 bg-background/50
                                        backdrop-blur-sm shadow-sm
                                        transition-all duration-300 ease-out
                                        focus:ring-4 focus:ring-cyan-600/20 focus:border-cyan-600
                                        focus:outline-none focus:bg-background
                                        hover:border-cyan-600/60 hover:shadow-md
                                        disabled:opacity-50 disabled:cursor-not-allowed
                                        text-foreground placeholder:text-muted-foreground/60
                                    "
                                />
                            </div>

                            {/* Botón Submit */}
                            <Button
                                type="submit"
                                disabled={isPending || !email || !name}
                                size="newsletter"
                                className="
                                    w-full lg:w-auto h-14
                                    cursor-pointer text-white font-semibold
                                    whitespace-nowrap px-8
                                    transition-all duration-300
                                    hover:scale-[1.02] active:scale-95
                                    disabled:hover:scale-100
                                    shadow-lg hover:shadow-xl
                                "
                                variant="letter"
                                aria-label={isPending ? t('form.submittingButton') : t('form.submitButton')}
                            >
                                {isPending ? (
                                    <span className="flex items-center gap-2">
                                        <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                                        </svg>
                                        {t('form.submittingButton')}
                                    </span>
                                ) : (
                                    t('form.submitButton')
                                )}
                            </Button>
                        </div>

                        {/* Texto de privacidad */}
                        <p className="mt-5 text-xs text-muted-foreground/80 text-center lg:text-left">
                            {t('privacy.text')}{' '}
                            <Link
                                href="/legal/privacy"
                                className="underline hover:text-cyan-600 transition-colors font-medium"
                            >
                                {t('privacy.link')}
                            </Link>
                        </p>
                    </form>
                </div>
            </div>
        </section>
    );
}