import { cn } from "@/lib/utils"
import { ContentLayoutProps } from "@/types/components"

export function ContentLayout({ icon, mainTitle, subtitle, className, children }: ContentLayoutProps) {
  return (
    <section className={cn("relative", className)}>
      <div className="container-app text-center pt-24 pb-12">
        <div className="space-y-6">
          <div className="flex items-center justify-center gap-3 sm:gap-4">
            {icon}
            {mainTitle}
          </div>
          {subtitle && (
            <div className="max-w-3xl mx-auto">
              {subtitle}
            </div>
          )}
        </div>
      </div>
      {children}
    </section>
  )
}