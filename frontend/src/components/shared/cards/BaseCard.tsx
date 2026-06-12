// shared/cards/BaseCard.tsx

import { memo } from "react";
import { cn } from "@/lib/utils";
import type { BaseCardProps } from "./card.types";
import { cardAriaId } from "./card.utils";
import { CardSkeleton } from "./CardSkeleton";

// variant eliminado — todas las cards usan --primary via globals.css
export const BaseCard = memo(function BaseCard({
  id,
  headerIcon,
  nameTitle,
  children,
  className,
  isLoading = false,
  skeleton,
}: Omit<BaseCardProps, "variant">) {
  if (isLoading) return skeleton ?? <CardSkeleton />;

  const ariaId = cardAriaId(id);

 return (
    <article
      aria-labelledby={ariaId}
      className={cn(
        "relative flex flex-col overflow-hidden",
        "bg-card rounded-3xl border border-primary/20 hover:border-primary/40",
        "transition-all duration-300",
        "hover:-translate-y-1",
        "hover:shadow-[0_12px_40px_color-mix(in_oklch,var(--primary)_12%,transparent)]",
        "animate-fade-in",
        className
      )}
    >
      <div
        className="absolute top-0 inset-x-0 h-[2px] bg-linear-to-r from-primary to-primary/60"
        aria-hidden="true"
      />
      <CardHeader id={ariaId} icon={headerIcon} title={nameTitle} />
      <div className="flex flex-col flex-1">{children}</div>
    </article>
  );
});

// ─────────────────────────────────────────────────────────────────────────────
// CardHeader
// ─────────────────────────────────────────────────────────────────────────────

interface CardHeaderInternalProps {
  id: string;
  icon: React.ReactNode;
  title?: string;
}

const CardHeader = memo(function CardHeader({ id, icon, title }: CardHeaderInternalProps) {
  return (

    <div className="px-6 py-4 border-b border-primary/20 flex items-center gap-3">
      <div
        className="w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 bg-primary/10 text-primary"
        aria-hidden="true"
      >
        {icon}
      </div>
      <h3
        id={id}
        className="flex-1 min-w-0 font-bold text-xl text-foreground leading-snug tracking-tight"
      >
        {title}
      </h3>
    </div>
  );
});

// ─────────────────────────────────────────────────────────────────────────────
// CardContent
// ─────────────────────────────────────────────────────────────────────────────

interface CardContentProps {
  children: React.ReactNode;
  className?: string;
}

export function CardContent({ children, className }: CardContentProps) {
  return (
    <div className={cn("px-6 py-4 flex-1 text-left", className)}>
      {children}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// CardFooter
// ─────────────────────────────────────────────────────────────────────────────

interface CardFooterProps {
  children: React.ReactNode;
  className?: string;
}

export function CardFooter({ children, className }: CardFooterProps) {
  return (
    <div className={cn("px-6 pt-3 pb-6 mt-auto", className)}>
      {children}
    </div>
  );
}