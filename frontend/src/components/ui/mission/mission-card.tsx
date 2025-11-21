import { useState } from 'react';
import { MissionCardProps } from "@/types/components";

/**
 * MissionCard component.
 * @param param - Props for the MissionCard component.
 */
export const MissionCard = ({
  title,
  description,
  icon: Icon,
  className = "",
  delay = 0
}: MissionCardProps) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className={`relative w-full group overflow-hidden
        bg-card/80 backdrop-blur-sm
        hover:bg-card/95
        p-8 sm:p-9 lg:p-8 xl:p-10
        rounded-3xl 
        transition-all duration-700 ease-out
        border-2 border-border/50 hover:border-cyan-500/60
        shadow-lg hover:shadow-[0_25px_0_25px_-0_25px_rgba(6,182,212,0.4)]
        hover:scale-[1.03] hover:-translate-y-1
        animate-fadeInUp
        ${className}`}
      style={{ animationDelay: `${delay}ms` }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="mb-5 sm:mb-6 flex justify-center">
        <div className={`w-14 h-14 sm:w-16 sm:h-16 lg:w-14 lg:h-14 xl:w-16 xl:h-16 
          bg-gradient-to-br from-cyan-600/60 to-cyan-600/30
          group-hover:from-cyan-600 group-hover:to-cyan-500
          rounded-2xl flex items-center justify-center 
          transition-all duration-500
          shadow-lg group-hover:shadow-cyan-600/50
          ${isHovered ? 'rotate-12 scale-110' : ''}`}>
          <Icon
            className="w-7 h-7 sm:w-8 sm:h-8 lg:w-7 lg:h-7 xl:w-8 xl:h-8 text-white
               group-hover:text-white 
              transition-all duration-500"
            aria-hidden="true"
            strokeWidth={2.5}
          />
        </div>
      </div>
      <h3 className="text-xl sm:text-2xl lg:text-xl xl:text-2xl 
        font-bold  mb-3 sm:mb-4 text-center text-foreground/80
        tracking-tight leading-tight
        group-hover:text-cyan-400 transition-colors duration-300">
        {title}
      </h3>
      <p className="text-base sm:text-lg lg:text-base text-foreground/80
        group-hover:text-foreground/100
        text-center leading-relaxed tracking-normal
        transition-colors duration-300">
        {description}
      </p>
    </div>
  );
};