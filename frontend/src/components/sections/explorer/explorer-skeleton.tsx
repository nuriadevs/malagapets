// components/sections/explorer/explorer-skeleton.tsx

import { cn } from "@/lib/utils";

function Pulse({ className, delay = 0, style }: { className?: string; delay?: number; style?: React.CSSProperties }) {
  return (
    <div
      className={cn("skeleton rounded-lg", className)}
      style={{ animationDelay: `${delay}ms`, ...style }}
      aria-hidden="true"
    />
  );
}

function PlaceCardSkeleton({ delay = 0 }: { delay?: number }) {
  return (
    <div className="flex gap-3 p-3.5 rounded-xl border border-border bg-card">
      <Pulse className="shrink-0 w-8 h-8 rounded-lg" delay={delay} />
      <div className="flex-1 min-w-0 space-y-2 pt-0.5">
        <Pulse className="h-3.5 w-3/4" delay={delay + 40} />
        <Pulse className="h-3 w-1/2" delay={delay + 80} />
        <Pulse className="h-3 w-2/3" delay={delay + 120} />
      </div>
    </div>
  );
}


export function ExplorerSkeleton() {
  return (
    <div aria-busy="true" aria-label="Cargando explorador" className="animate-fade-in">

      <div className="relative border-b border-border/40 bg-linear-to-r from-muted/50 to-primary/5 py-12 sm:py-18">
        <div className="max-w-screen-2xl mx-auto w-full px-4 sm:px-6 lg:px-8 space-y-3">
          <Pulse className="h-6 w-24 rounded-full" />
          <Pulse className="h-9 w-72 sm:w-96" delay={60} />
          <Pulse className="h-4 w-48 sm:w-80" delay={120} />
        </div>
      </div>

      <div className="sticky top-16 z-20 bg-background/95 backdrop-blur-sm border-b border-border/40 py-3 px-4 sm:px-6 lg:px-8">
        <div className="flex gap-2">
          {[80, 64, 72, 76].map((w, i) => (
            <Pulse
              key={i}
              className={`h-8 rounded-full`}
              style={{ width: `${w}px` } as React.CSSProperties}
              delay={i * 40}
            />
          ))}
        </div>
      </div>

      <div className="p-4 sm:p-6 lg:p-8">
        <div className="grid grid-cols-1 lg:grid-cols-[22rem_1fr] gap-0">

          <div className="order-2 lg:order-1 flex flex-col border-r border-border/40 bg-background">

            <div className="flex items-center px-4 py-3 border-b border-border/40">
              <Pulse className="h-4 w-32" />
            </div>

            <div className="flex-1 p-3 space-y-2">
              {Array.from({ length: 5 }).map((_, i) => (
                <PlaceCardSkeleton key={i} delay={i * 60} />
              ))}
            </div>

            <div className="flex items-center justify-center gap-3 py-3 border-t border-border/40">
              <Pulse className="h-8 w-20 rounded-lg" delay={100} />
              <Pulse className="h-4 w-16" delay={140} />
              <Pulse className="h-8 w-20 rounded-lg" delay={180} />
            </div>
          </div>

          <div className="order-1 lg:order-2 h-[55vw] min-h-80 lg:h-[calc(100vh-9rem)]">
            <div className="h-full w-full skeleton rounded-none" />
          </div>

        </div>
      </div>
    </div>
  );
}