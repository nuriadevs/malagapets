// src/components/ui/contact/contact-form.tsx
"use client";

import { useState, useTransition } from "react";
import { useTranslations } from "next-intl";
import { formIcons } from "@/data/icons";
import toast from "react-hot-toast";
import Link from "next/link";
import { FormField } from "./form-field";
import { FormTextarea } from "./form-textarea";
import { FormData, FormErrors } from "@/types/components";
import { useFormValidation } from "@/hooks/use-form-validation";

export function ContactForm() {

    const SuccessIcon = formIcons.success;
    const SendIcon = formIcons.send;
    const LoaderIcon = formIcons.loader;

    const t = useTranslations("contact.form");
    const tAccess = useTranslations("accessibility.contact");
    const [formData, setFormData] = useState<FormData>({
        name: "",
        email: "",
        subject: "",
        message: "",
        website: "",
    });
    const [errors, setErrors] = useState<FormErrors>({});
    const [isPending, startTransition] = useTransition();
    const { validateField, validateForm } = useFormValidation();

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));

        if (errors[name as keyof FormErrors]) {
            setErrors((prev) => ({ ...prev, [name]: "" }));
        }
    };

    const handleBlur = (
        e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const { name, value } = e.target;
        const error = validateField(name as keyof FormData, value);
        if (error) {
            setErrors((prev) => ({ ...prev, [name]: error }));
        }
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (formData.website) {
            console.warn("Bot detected - honeypot filled");
            return;
        }

        const validationErrors = validateForm(formData);
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            toast.error(t("errors.validationFailed"), {
                duration: 4000,
                position: "top-center",
            });
            return;
        }

        startTransition(async () => {
            const loadingToast = toast.loading(t("sending"), {
                position: "top-center",
            });

            try {
                const response = await fetch("/api/contact", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(formData),
                });

                const data = await response.json();
                toast.dismiss(loadingToast);

                if (!response.ok) {
                    let errorMessage = t("errorMessage");
                    if (response.status === 429) {
                        errorMessage = data.error || "Demasiadas solicitudes. Intenta de nuevo más tarde.";
                    } else if (response.status === 400) {
                        errorMessage = data.error || "Datos inválidos";
                    } else if (data.error) {
                        errorMessage = data.error;
                    }

                    toast.error(errorMessage, {
                        duration: 5000,
                        position: "top-center",
                    });
                    return;
                }

                toast.success(t("successMessage"), {
                    duration: 5000,
                    position: "top-center",
                    icon: <SuccessIcon className="w-5 h-5 text-white" />,
                });

                setFormData({
                    name: "",
                    email: "",
                    subject: "",
                    message: "",
                    website: "",
                });
                setErrors({});
            } catch (error) {
                toast.dismiss(loadingToast);
                console.error("Error submitting form:", error);
                toast.error(
                    error instanceof Error ? error.message : t("errorMessage"),
                    { duration: 5000, position: "top-center" }
                );
            }
        });
    };

    return (
        <div className="bg-card/50 backdrop-blur-sm rounded-2xl shadow-xl p-6 sm:p-8 lg:p-10 border border-border">
            <h2 className="text-foreground/80 text-3xl sm:text-4xl font-bold mb-6">{t("title")}</h2>

            <form onSubmit={handleSubmit} className="space-y-6" noValidate aria-label={tAccess('contactForm')}>
                <FormField
                    label={t("fields.name")}
                    name="name"
                    type="text"
                    value={formData.name}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={errors.name}
                    disabled={isPending}
                    placeholder={t("placeholders.name")}
                    autoComplete="name"
                    required
                />

                <FormField
                    label={t("fields.email")}
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={errors.email}
                    disabled={isPending}
                    placeholder={t("placeholders.email")}
                    autoComplete="email"
                    required
                />

                <FormField
                    label={t("fields.subject")}
                    name="subject"
                    type="text"
                    value={formData.subject}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={errors.subject}
                    disabled={isPending}
                    placeholder={t("placeholders.subject")}
                    autoComplete="off"
                    required
                />

                <FormTextarea
                    label={t("fields.message")}
                    name="message"
                    rows={6}
                    value={formData.message}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={errors.message}
                    disabled={isPending}
                    placeholder={t("placeholders.message")}
                    autoComplete="off"
                    required
                />

                <button
                    type="submit"
                    disabled={isPending}
                    className="cursor-pointer w-full bg-success hover:bg-success/80 disabled:bg-muted text-white font-semibold py-3 px-6 rounded-lg transition-all duration-200 flex items-center justify-center gap-2 shadow-lg hover:shadow-xl disabled:cursor-not-allowed disabled:opacity-50"
                >
                    {isPending ? (
                        <>
                            <LoaderIcon className="w-5 h-5 animate-spin text-muted-foreground" />
                           <span className="text-muted-foreground"> {t("sending")}</span>
                        </>
                    ) : (
                        <>
                            <SendIcon className="w-5 h-5 text-white" />
                            <span className="text-white"> {t("submit")}</span>
                        </>
                    )}
                </button>

                {/* Honeypot */}
                <input
                    type="text"
                    name="website"
                    value={formData.website}
                    onChange={handleChange}
                    style={{ position: "absolute", left: "-9999px", width: "1px", height: "1px" }}
                    tabIndex={-1}
                    autoComplete="off"
                    aria-hidden="true"
                />
                <p className="text-xs text-muted-foreground text-center">
                    {t("privacy.text")}{" "}
                    <Link
                        href="/legal/politica-privacidad"
                        className="text-success hover:underline focus:outline-none focus:ring-2 focus:ring-success focus:ring-offset-2 rounded"
                    >
                        {t("privacy.link")}
                    </Link>
                </p>
            </form>
        </div>
    );
}