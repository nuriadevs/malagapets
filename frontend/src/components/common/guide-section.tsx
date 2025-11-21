// components/common/guide-section.tsx
"use client"
import { GuideLayoutProps } from "@/types/components";

export function GuideLayout({
    icon,
    directoryTitle,
    mainTitle,
    count,
    countLabel,
    sourceInfo,
    backgroundColor,
    children,
    headingId,
    ariaLabel,
}: GuideLayoutProps) {
    return (
        <section
            aria-labelledby={headingId}
            aria-label={ariaLabel}
            className={`relative pt-10 sm:pt-12 lg:pt-14 xl:pt-14 pb-2 sm:pb-4 lg:pb-6 xl:pb-8 ${backgroundColor}`}
        >
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl text-center relative py-10">
                {/* Directory Badge */}
                <div className="inline-flex items-center space-x-3 bg-background/50 backdrop-blur-sm border border-success/40 rounded-full px-6 py-3 mb-6 shadow-lg">
                    {icon}
                    <span className="font-semibold text-sm tracking-wide text-foreground/80">
                        {directoryTitle}
                    </span>
                </div>
                {/* Main Title */}
                <h1
                    className="text-4xl md:text-5xl font-bold mb-6 text-balance leading-tight text-foreground/80"
                >
                    {mainTitle}
                </h1>
                {/* Stats and Info */}
                <div className="flex flex-col items-center justify-center gap-3 sm:gap-6 mb-12">
                    {count && (
                        <div className="flex items-center space-x-2 sm:space-x-3 px-4 sm:px-6 py-2 sm:py-3">
                            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-cyan-600/70 rounded-full flex items-center justify-center">
                                <span className="text-lg sm:text-2xl font-bold text-white ">
                                    {count}
                                </span>
                            </div>
                            <span className="text-xl font-bold text-foreground/80">{countLabel}</span>
                        </div>
                    )}
                    <div className="flex items-start justify-center gap-2 sm:gap-3 px-3 sm:px-4 py-1 sm:py-2">
                        <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 bg-cyan-600 rounded-full animate-pulse flex-shrink-0 mt-1 sm:mt-1.5"></div>
                        <span className="text-foreground/80 text-sm sm:text-xl font-medium sm:font-semibold text-center leading-tight sm:leading-normal">
                            {sourceInfo}
                        </span>
                    </div>
                </div>
                {/* Content */}
                {children}
            </div>
        </section>
    );
}