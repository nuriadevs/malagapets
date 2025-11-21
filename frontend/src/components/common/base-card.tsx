// components/common/base-card.tsx
import { BaseCardProps } from "@/types/components";


export function BaseCard({
    id,
    headerIcon,
    headerSubtitle,
    headerColor = "bg-cyan-600",
    children,
    className = ""
}: BaseCardProps) {
    return (
        <article
            aria-labelledby={`card-${id}-title`}
            className={`animate-fade-in hover-lift bg-card border border-success/20 rounded-xl overflow-hidden shadow-lg hover:shadow-vet transition-all duration-300 hover-lift-subtle h-fit self-start ${className}`}
        >
            {/* Header */}
            <div className={`relative px-6 py-5 ${headerColor}`}>
                <div className="absolute inset-0 bg-black/10"></div>
                <div className="relative flex items-center justify-start space-x-3 text-white">
                    <div className="p-2 bg-white/20 rounded-lg backdrop-blur-sm">
                        {headerIcon}
                    </div>
                    <span className="font-semibold text-sm uppercase tracking-wider text-left leading-6">
                        {headerSubtitle}
                    </span>
                </div>
            </div>

            {/* Content */}
            <div className="p-6 space-y-6">
                {children}
            </div>
        </article>
    );
}