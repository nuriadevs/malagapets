"use client"
import { ContentLayoutProps } from "@/types/components";

/**
 * Content layout component for displaying a section with an icon, title, subtitle, and background.
 * @param param0 - Props for the content layout.
 * @returns The content layout component.
 */

export function ContentLayout({
    icon,
    mainTitle,
    subtitle,
    backgroundColor,
    sectionLabel,
    ariaLabel,
    children
}: ContentLayoutProps) {
    return (
        <section
            aria-label={ariaLabel || sectionLabel}
            className={`relative pb-2 sm:pb-4 lg:pb-6 xl:pb-8${backgroundColor}`}
        >
            <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative pt-16 pb-8 flex justify-center ">
                <div className="grid grid-cols-1 gap-4 lg:gap-6 xl:gap-8 items-center">
                    <div className="space-y-4 lg:space-y-6 xl:space-y-8 text-center ">
                        <h1 className="py-2 text-4xl md:text-5xl font-semibold mb-0 leading-tight flex items-center justify-center gap-3 sm:gap-4 text-foreground/80">                            {icon}
                            {mainTitle}
                        </h1>
                        <span className="text-xl sm:text-xl lg:text-2xl leading-relaxed font-medium text-muted-foreground">
                            {subtitle}
                        </span>
                    </div>
                </div>
            </div>
            {children}
        </section>
    );
}