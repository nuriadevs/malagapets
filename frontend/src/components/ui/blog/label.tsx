//import { cx } from "@/lib/utils";
import { cn } from "@/lib/utils";
import type { LabelProps, ColorType } from "@/types/blog";


export default function Label({
  color = "blue",
  nomargin = false,
  children,
}: LabelProps) {
  const textColors: Record<ColorType, string> = {
    green: "text-emerald-700 dark:text-emerald-400",
    blue: "text-blue-700 dark:text-blue-400",
    orange: "text-orange-700 dark:text-orange-400",
    purple: "text-purple-700 dark:text-purple-400",
    pink: "text-pink-700 dark:text-pink-400",
  };

  const bgColors: Record<ColorType, string> = {
    green: "bg-emerald-50 dark:bg-emerald-900/20",
    blue: "bg-blue-50 dark:bg-blue-900/20",
    orange: "bg-orange-50 dark:bg-orange-900/20",
    purple: "bg-purple-50 dark:bg-purple-900/20",
    pink: "bg-pink-50 dark:bg-pink-900/20",
  };

  // Si el color es uno de los predefinidos, usa las clases, si no, usa el color como background y texto
  const isPreset = color && ["green", "blue", "orange", "purple", "pink"].includes(color);

  return (
    <span
      className={cn(
        "inline-flex font-medium text-sm py-1 px-3 rounded-full mb-1 capitalize transition-colors",
        !nomargin && "mt-5",
        isPreset ? bgColors[color as ColorType] : undefined,
        isPreset ? textColors[color as ColorType] : undefined
      )}
      style={
        !isPreset && color
          ? { backgroundColor: color + "20", color: color }
          : undefined
      }
    >
      {children}
    </span>
  );
}

