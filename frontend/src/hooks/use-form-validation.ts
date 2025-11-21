import { useTranslations } from "next-intl";
import { FormData, FormErrors } from "@/types/components";

export function useFormValidation() {
    const t = useTranslations("contact.form.errors");

    const validateField = (name: keyof FormData, value: string): string => {
        switch (name) {
            case "name":
                if (value.trim().length < 2) return t("nameMin");
                if (value.trim().length > 100) return t("nameMax");
                return "";
            case "email":
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailRegex.test(value)) return t("emailInvalid");
                return "";
            case "subject":
                if (value.trim().length < 3) return t("subjectMin");
                if (value.trim().length > 200) return t("subjectMax");
                return "";
            case "message":
                if (value.trim().length < 10) return t("messageMin");
                if (value.trim().length > 2000) return t("messageMax");
                return "";
            default:
                return "";
        }
    };

    const validateForm = (formData: FormData): FormErrors => {
        const newErrors: FormErrors = {};
        const fieldsToValidate: Array<keyof FormData> = ["name", "email", "subject", "message"];

        fieldsToValidate.forEach((key) => {
            const error = validateField(key, formData[key]);
            if (error) {
                newErrors[key as keyof FormErrors] = error;
            }
        });

        return newErrors;
    };

    return { validateField, validateForm };
}