// components/layouts/main.tsx

import { cn } from "@/lib/utils";
import { getTranslations } from "next-intl/server";
import { MainProps } from "@/types/components";

export async function Main({
  children,
  ariaLabelKey,
  ariaLabel = "",
  className,
  style,
}: MainProps) {
  const t = await getTranslations("accessibility");
  const finalAriaLabel = ariaLabelKey ? t(ariaLabelKey) : ariaLabel;

  return (
    <main
      id="main-content"
      className={cn("relative w-full min-h-screen", className)}
      style={style}
      aria-label={finalAriaLabel}
    >
      <div className="relative z-10 h-full">
        {children}
      </div>
    </main>
  );
}