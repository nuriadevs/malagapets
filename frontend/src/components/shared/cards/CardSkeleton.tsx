// shared/cards/CardSkeleton.tsx
import { cn } from "@/lib/utils";
import { useTranslations } from "next-intl";
import type { CardSkeletonProps } from "@/components/shared/cards/card.types";


function SkeletonPulse({ className, delay = 0 }: { className?: string; delay?: number }) {
  return (
    <div
      className={cn("skeleton", className)}
      style={{ animationDelay: `${delay}ms` }}
      aria-hidden="true"
    />
  );
}


function SkeletonInfoRow({ delay = 0, valueWidth = "w-2/3" }: { delay?: number; valueWidth?: string }) {
  return (
    <div className="flex items-start gap-3 py-3" aria-hidden="true">
      <SkeletonPulse className="w-10 h-10 rounded-full shrink-0" delay={delay} />
      <div className="flex-1 space-y-2 pt-1">
        <SkeletonPulse className="h-3 w-20 rounded" delay={delay + 50} />
        <SkeletonPulse className={cn("h-4 rounded", valueWidth)} delay={delay + 100} />
      </div>
    </div>
  );
}


function SkeletonServicesGrid({ delay = 0 }: { delay?: number }) {
  return (
    <div className="flex flex-wrap gap-1.5 mt-2" aria-hidden="true">
      {Array.from({ length: 4 }).map((_, i) => (
        <SkeletonPulse
          key={i}
          className="h-6 w-20 rounded-full"
          delay={delay + i * 40}
        />
      ))}
    </div>
  );
}


const skeletonPresets: Record<NonNullable<CardSkeletonProps["variant"]>, { rows: number; hasServices: boolean; hasAction: boolean }> = {
  beach: { rows: 3, hasServices: true, hasAction: true },
  park: { rows: 5, hasServices: false, hasAction: true },
  vet: { rows: 4, hasServices: false, hasAction: true },
  generic: { rows: 3, hasServices: false, hasAction: false },
};

const widths = ["w-3/4", "w-2/3", "w-4/5", "w-1/2", "w-3/5"] as const;


export function CardSkeleton({
  variant = "generic",
  rows,
  hasServices,
  hasAction,
  className,
}: CardSkeletonProps) {
  const tAccess = useTranslations("accessibility.directory");
  const preset = skeletonPresets[variant];

  const finalRows = rows ?? preset.rows;
  const finalServices = hasServices ?? preset.hasServices;
  const finalAction = hasAction ?? preset.hasAction;

  return (
    <article
      aria-busy="true"
      aria-label={tAccess("loading")}
      className={cn(
        "relative flex flex-col overflow-hidden",
        "bg-card rounded-3xl border border-primary/20",
        "animate-fade-in",
        className
      )}
    >
      <span className="sr-only" role="status">
        {tAccess("loading-directory")}
      </span>

      <div
        className="absolute top-0 inset-x-0 h-[2px] bg-linear-to-r from-primary/30 to-primary/10"
        aria-hidden="true"
      />

      <div className="px-6 py-4 border-b border-primary/20 flex items-center gap-3">
        <SkeletonPulse className="w-12 h-12 rounded-2xl shrink-0" />
        <SkeletonPulse className="h-5 w-48 rounded-lg" delay={60} />
      </div>

      <div className="px-6 py-4 flex-1 space-y-0">
        {Array.from({ length: finalRows }).map((_, i) => (
          <SkeletonInfoRow
            key={i}
            delay={i * 80}
            valueWidth={widths[i % widths.length]}
          />
        ))}

        {finalServices && (
          <div className="py-3 flex items-start gap-3">
            <SkeletonPulse className="w-10 h-10 rounded-full shrink-0" delay={finalRows * 80} />
            <div className="flex-1 pt-1 space-y-2">
              <SkeletonPulse className="h-3 w-20 rounded" delay={finalRows * 80 + 50} />
              <SkeletonServicesGrid delay={finalRows * 80 + 100} />
            </div>
          </div>
        )}
      </div>

      {finalAction && (
        <div className="px-6 pt-3 pb-6 mt-auto">
          <SkeletonPulse className="h-11 w-full rounded-xl" delay={200} />
        </div>
      )}
    </article>
  );
}

interface CardSkeletonListProps {
  count?: number;
  variant?: CardSkeletonProps["variant"];
  className?: string;
}

export function CardSkeletonList({
  count = 1,
  variant = "generic",
  className,
}: CardSkeletonListProps) {
  return (
    <div className={cn("flex flex-col gap-4", className)}>
      {Array.from({ length: count }).map((_, i) => (
        <CardSkeleton key={i} variant={variant} />
      ))}
    </div>
  );
}