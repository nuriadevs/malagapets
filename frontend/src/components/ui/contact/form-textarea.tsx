
import {FormTextareaProps} from "@/types/form";

export function FormTextarea({ label, name, error, required, ...props }: FormTextareaProps) {
    return (
        <div>
            <label htmlFor={name} className="block text-sm font-medium mb-2">
                {label} {required && <span className="text-destructive">*</span>}
            </label>
            <textarea
                id={name}
                name={name}
                required={required}
                aria-required={required}
                aria-invalid={!!error}
                aria-describedby={error ? `${name}-error` : undefined}
                className={`w-full px-4 py-3 rounded-lg border bg-background focus:ring-2 focus:ring-success focus:border-transparent transition-all outline-none resize-none disabled:opacity-50 disabled:cursor-not-allowed ${
                    error ? "border-destructive" : "border-input"
                }`}
                {...props}
            />
            {error && (
                <p id={`${name}-error`} className="mt-1 text-sm text-destructive" role="alert">
                    {error}
                </p>
            )}
        </div>
    );
}