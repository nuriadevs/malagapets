import type { MissionCardProps } from "@/types/components";
import { cn } from "@/lib/utils";

export const MissionCard = ({ title, description, icon: Icon, className = "", delay = 0 }: MissionCardProps) => {
    return (
        <article
            aria-label={title}
            className={cn(
                "relative w-full group overflow-hidden",
                "bg-card/80 backdrop-blur-sm",
                "p-8 xl:p-10",
                "rounded-3xl",
                "transition-[background-color,border-color,box-shadow,transform] duration-700 ease-out",
                "border-2 border-border/50 hover:border-primary/40",
                "shadow-lg hover:shadow-xl",
                "motion-safe:animate-fadeInUp",
                className
            )}
            style={{ animationDelay: `${delay}ms` }}
        >
            <div className="mb-6 flex justify-center">
                <div
                    className="
            w-14 h-14 xl:w-16 xl:h-16
            bg-linear-to-br from-primary to-primary/80
            group-hover:from-primary/60 group-hover:to-primary/50
            rounded-2xl flex items-center justify-center
            transition-transform duration-500 ease-out shadow-lg
            group-hover:shadow-primary/50
            group-hover:rotate-12 group-hover:scale-110
          "
                    aria-hidden="true"
                >
                    <Icon
                        className="w-7 h-7 xl:w-8 xl:h-8 text-title transition-transform duration-500"
                        strokeWidth={2.5}
                    />
                </div>
            </div>

            <h3 className="
        text-xl xl:text-2xl font-bold mb-4 text-center
        {/* text-foreground en lugar de text-foreground/80 — WCAG AA */}
        text-foreground tracking-tight leading-tight
        group-hover:text-primary transition-colors duration-300
      ">
                {title}
            </h3>

            <p className="
        text-base text-muted-foreground
        text-center leading-relaxed
        group-hover:text-foreground transition-colors duration-300
      ">
                {description}
            </p>
        </article>
    );
};

export default MissionCard;
