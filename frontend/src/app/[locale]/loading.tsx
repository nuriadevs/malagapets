// src/app/[locale]/loading.tsx
import { LoadingContent } from "@/components/ui/loading-content";

export default function Loading() {
  return (
    <div className="flex min-h-[80vh] items-center justify-center">
      <LoadingContent />
    </div>
  );
}