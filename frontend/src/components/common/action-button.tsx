// components/common/action-button.tsx
import {ActionButtonProps} from "@/types/common";
import { Button } from "@/components/ui/button";

export function ActionButton({
    href,
    onClick,
    icon,
    children,
    variant = 'maps',
    className = "",
    ariaLabel,
    external = false
}: ActionButtonProps) {
    const baseClasses = "group/action transition-all duration-300 hover:scale-[1.02]";

    const variantClasses = {
        maps: "bg-cyan-600 hover:bg-cyan-700 focus-visible:ring-cyan-500 text-white h-14",
        phone: "bg-green-600 hover:bg-green-700 focus-visible:ring-green-500 text-white h-12",
        website: "bg-blue-600 hover:bg-blue-700 focus-visible:ring-blue-500 text-white h-12"
    };

    const iconClasses = "w-4 h-4 text-white transition-transform duration-300 group-hover/action:rotate-12 group-hover/action:scale-110";

    if (href) {
        return (
            <Button
                asChild
                size="lg"
                className={`${baseClasses} ${variantClasses[variant]} ${className}`}
            >
                <a
                    href={href}
                    target={external ? "_blank" : undefined}
                    rel={external ? "noopener noreferrer" : undefined}
                    aria-label={ariaLabel}
                >
                    <div className={iconClasses}>
                        {icon}
                    </div>
                    {children}
                </a>
            </Button>
        );
    }

    return (
        <Button
            onClick={onClick}
            size="lg"
            className={`${baseClasses} ${variantClasses[variant]} ${className}`}
            aria-label={ariaLabel}
        >
            <div className={iconClasses}>
                {icon}
            </div>
            {children}
        </Button>
    );
}