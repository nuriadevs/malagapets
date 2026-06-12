import { ReactNode } from "react";
import { cn } from "@/lib/utils";

// ─────────────────────────────────────────────────────────────────────────────
// PopupRow
// ─────────────────────────────────────────────────────────────────────────────

interface PopupRowProps {
    icon: ReactNode;
    label: string;
    value: ReactNode;
    className?: string;
}

export function PopupRow({ icon, label, value, className }: PopupRowProps) {
    return (
        <div className={cn("flex items-start gap-3 py-2", className)}>
            <div className="w-7 h-7 bg-primary/10 rounded-full flex items-center justify-center shrink-0 text-primary">
                {icon}
            </div>
            <div className="flex-1">
                <span className="text-primary font-semibold text-sm block mb-1">
                    {label}
                </span>
                <div className="text-sm text-muted-foreground">{value}</div>
            </div>
        </div>
    );
}