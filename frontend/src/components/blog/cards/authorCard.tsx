// components/blog/AuthorCard.tsx
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { useTranslations, useLocale } from "next-intl";
import Link from "next/link";
import { ArrowRightIcon } from "@heroicons/react/24/outline";
import type { AuthorCardProps } from "@/types/blog";

export default function AuthorCard({ author }: AuthorCardProps) {
  const t = useTranslations("blog.card");
  const locale = useLocale();
  const authorImage = author.image?.src ? author.image : null;

  // ✅ URL correcta del autor
  const authorUrl = `/${locale}/blog/author/${author.slug}`;

  return (
    <div className="px-4 mx-auto sm:px-6 lg:px-8 max-w-7xl">
      <div className="max-w-4xl mx-auto">
        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 p-6 
                        bg-card text-foreground
                        rounded-lg border border-border shadow-sm
                        transition-colors hover-lift">

          {/* Avatar */}
          <div className="relative shrink-0 w-20 h-20 sm:w-24 sm:h-24">

            {authorImage ? (
              <Image
                src={authorImage.src}
                alt={authorImage.alt}
                className="rounded-full object-cover"
                fill
                sizes="(max-width: 640px) 80px, 96px"
              />
            ) : (
              <div className="w-full h-full bg-gradient-to-br from-primary to-primary/60 flex items-center justify-center rounded-full">
                <span className="text-2xl font-bold text-primary-foreground">
                  {author.name.charAt(0).toUpperCase()}
                </span>
              </div>
            )}

          </div>

          {/* Información del autor */}
          <div className="flex-1 min-w-0 text-center sm:text-left">
            <h3 className="text-xl font-semibold text-foreground/80">{author.name}</h3>
            {author.bio && (
              <p className="mt-2 text-base leading-relaxed text-muted-foreground line-clamp-2">
                {author.bio}
              </p>
            )}

            <div className="mt-4">
              <Button variant="ghost" size="default" asChild>
                <Link
                  href={authorUrl}
                  className="inline-flex items-center gap-2 rounded-md group"
                >
                  {t("readProfile")}
                  <ArrowRightIcon className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}