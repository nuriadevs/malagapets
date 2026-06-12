import { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { SectionDivider } from "@/components/shared/cards";

// ─────────────────────────────────────────────────────────────────────────────
// PopupHeader
// ─────────────────────────────────────────────────────────────────────────────

interface PopupHeaderProps {
  title: string;
  icon?: ReactNode;
}

export function PopupHeader({ title, icon }: PopupHeaderProps) {
  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-start gap-2">
        {icon && (
          <span className={cn(
            "shrink-0 w-10 h-10 rounded-lg flex items-center justify-center",
            "transition-transform duration-200 group-hover/card:scale-105",
            "bg-primary/10 text-primary ring-1 ring-primary/20"
          )} aria-hidden="true">
            {icon}
          </span>
        )}
        <h2 className="font-bold text-base text-foreground leading-tight flex-1 min-w-0 pt-2 text-center">
          {title}
        </h2>
      </div>
      <SectionDivider />
    </div>
  );
}