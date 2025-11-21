// components/common/info-item.tsx
import { InfoItemProps } from '@/types/components';

export function InfoItem({
    icon,
    label,
    value,
    children,
    className = "",
    variant = 'default'
}: InfoItemProps) {
    if (variant === 'compact') {
        return (
            <div className={`flex items-start gap-3 bg-gradient-to-r from-success/5 via-success/8 to-success/5 border border-success/10 rounded-xl backdrop-blur-sm px-4 py-3 shadow-sm ${className}`}>
                <div className="p-2 bg-success/15 rounded-xl border border-success/20 shadow-sm">
                    {icon}
                </div>
                <div className="text-left">
                    <p className="text-sm text-left text-success/80 font-semibold mb-1.5 uppercase tracking-wide">{label}</p>
                    {value && <span className="text-sm font-medium text-left text-card-foreground">{value}</span>}
                    <div className="text-left">
                        {children}
                    </div>
                </div>
            </div>
        );
    }

    if (variant === 'horizontal') {
        return (
            <div className={`flex items-start space-x-4 p-4 bg-gradient-to-r from-success/5 via-success/8 to-success/5 border border-success/10 rounded-xl backdrop-blur-sm ${className}`}>
                <div className="p-2.5 bg-success/15 rounded-xl border border-success/20 shadow-sm">
                    {icon}
                </div>
                <div className="flex-1 min-w-0 text-left">
                    <p className="text-sm text-left text-success/80 font-semibold mb-1.5 uppercase tracking-wide">{label}</p>
                    {value && <p className="text-left text-card-foreground text-sm leading-relaxed font-medium">{value}</p>}
                    <div className="text-left">
                        {children}
                    </div>
                </div>
            </div>
        );
    }

    // Default variant
    return (
        <div className={`bg-gradient-to-r from-success/5 via-success/8 to-success/5 border border-success/10 rounded-xl backdrop-blur-sm p-5 shadow-sm text-left ${className}`}>
            <div className="flex items-start space-x-3 mb-4">
                <div className="p-2 bg-success/15 rounded-xl border border-success/20 shadow-sm">
                    {icon}
                </div>
                <div className="text-left">
                    <span className="text-sm text-left text-success/80 font-semibold mb-1.5 uppercase tracking-wide">{label}</span>
                </div>
            </div>
            <div className="space-y-2.5 text-left">
                {value && <p className=" text-left text-card-foreground text-sm leading-relaxed font-medium">{value}</p>}
                <div className="text-left">
                    {children}
                </div>
            </div>
        </div>
    );
}