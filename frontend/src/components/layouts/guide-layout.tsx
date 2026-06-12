// components/layouts/guide-layout.tsx
"use client";
import { cn } from "@/lib/utils";
import { GuideLayoutProps } from "@/types/components";

export function GuideLayout({
  icon,
  directoryTitle,
  mainTitle,
  subtitle,
  count,
  countLabel,
  sourceInfo,
  backgroundColor,
  children,
  headingId,
}: GuideLayoutProps) {
  return (
    <section
      aria-labelledby={headingId}
      className={cn("relative pt-10 sm:pt-12 lg:pt-14 pb-2 sm:pb-4 lg:pb-8", backgroundColor)}
    >
      <div className="container-app text-center relative">

        <div className="inline-flex items-center gap-3 bg-background/50 backdrop-blur-sm border border-primary/40 rounded-full px-6 py-3 mb-6 shadow-lg">
          {icon}
          <span className="font-semibold text-sm tracking-wide text-foreground">
            {directoryTitle}
          </span>
        </div>

        <h1
          id={headingId}
          className="text-4xl md:text-5xl font-bold mb-6 text-balance leading-tight text-foreground"
        >
          {mainTitle}
        </h1>

        {subtitle && (
          <p className="text-muted-foreground text-lg mb-8 max-w-2xl mx-auto">
            {subtitle}
          </p>
        )}

        <div className="flex flex-col items-center justify-center gap-3 sm:gap-6 mb-12">
          {count && (
            <div className="flex items-center gap-2 sm:gap-3 px-4 sm:px-6 py-2 sm:py-3">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-primary rounded-full flex items-center justify-center">
                <span className="text-lg sm:text-2xl font-bold text-primary-foreground">
                  {count}
                </span>
              </div>
              <span className="text-xl font-bold text-foreground">{countLabel}</span>
            </div>
          )}
          <div className="flex items-start justify-center gap-2 sm:gap-3 px-3 sm:px-4 py-1 sm:py-2">
            <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 bg-primary rounded-full animate-pulse shrink-0 mt-1 sm:mt-1.5" aria-hidden="true" />
            <span className="text-foreground text-sm sm:text-xl font-medium sm:font-semibold text-center leading-tight sm:leading-normal">
              {sourceInfo}
            </span>
          </div>
        </div>

        {children}
      </div>
    </section>
  );
}