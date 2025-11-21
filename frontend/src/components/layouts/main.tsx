// components/layouts/main.tsx

import { useTranslations } from "next-intl";
import { MainProps } from "@/types/components";
import Image from "next/image";

export const Main = ({
  children,
  className = "",
  ariaLabelKey,
  ariaLabel = "",
  backgroundImage,
  style,
  overlay = "bg-gradient-to-b from-black/60 via-black/50 to-black/60",
}: MainProps) => {
  const t = useTranslations("accessibility");
  const finalAriaLabel = ariaLabelKey ? t(ariaLabelKey) : ariaLabel;

  return (
    <main
      className={`relative w-full min-h-screen ${className}`}
      style={style}
      aria-label={finalAriaLabel}
    >
      {backgroundImage && (
        <div className="absolute inset-0 w-full h-full">
          <Image
            src={backgroundImage}
            alt="background image"
            fill
            priority
            fetchPriority="high"
            quality={80}
            className="object-cover object-center"
            sizes="100vw"
          />
          <div className={`absolute inset-0 ${overlay} z-10`} />
        </div>
      )}

      <div className={backgroundImage ? "relative z-20 h-full" : ""}>
        {children}
      </div>
    </main>
  );
};
