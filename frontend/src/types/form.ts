import { InputHTMLAttributes, TextareaHTMLAttributes } from "react";


export interface FormFieldProps extends InputHTMLAttributes<HTMLInputElement> {
    label: string;
    name: string;
    error?: string;
    required?: boolean;
}


export interface FormTextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
    label: string;
    name: string;
    error?: string;
    required?: boolean;
}
