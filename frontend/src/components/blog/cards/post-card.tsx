// src/components/blog/cards/post-card.tsx
import Image from "next/image";
import { useTranslations, useLocale } from "next-intl";
import Link from "next/link";
import { parseISO, format } from "date-fns";
import { photoIcon as CameraIcon } from "@/data/icons";
import {PostCardProps} from "@/types/components";
import Label from "@/components/ui/blog/label"
import { paw as PawIcon } from "@/data/icons";


export default function PostCard({
    post,
    variant = "default",
    pathPrefix = "",
    preloadImage = false,
    showDescription = true
}: PostCardProps) {

    const t = useTranslations("blog.content");
    const postUrl = `/blog/post/${pathPrefix ? `${pathPrefix}/` : ""}${post.slug}`;
      // ✅ URL correcta del autor
    const locale = useLocale();
    const authorUrl = `/${locale}/blog/author/${post.author.slug}`;

    // Variant: Horizontal (imagen a la izquierda, contenido a la derecha)
    if (variant === "horizontal") {
        return (
            <article aria-label={post.title} className="group relative flex flex-col p-4 gap-4 overflow-hidden rounded-2xl bg-card shadow-sm border border-border transition-all duration-300 hover:shadow-lg hover:-translate-y-1 sm:flex-row">
                <Link href={postUrl} className="relative aspect-[4/3] w-full shrink-0 overflow-hidden sm:aspect-square sm:w-48 rounded-lg">
                    {post.cover ? (
                        <Image
                            src={post.cover}
                            alt={post.title}
                            priority={preloadImage}
                            className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
                            fill
                            sizes="(max-width: 640px) 100vw, 192px"
                        />
                    ) : (
                        <div className="flex h-full w-full items-center justify-center bg-muted">
                            <CameraIcon className="h-12 w-12 text-muted-foreground" />
                        </div>
                    )}
                </Link>

                <div className="flex flex-1 flex-col justify-between p-6 sm:py-6 sm:pr-6 sm:pl-0">
                    <div className="space-y-3">
                        {post.category && (
                            <div className="inline-block pb-4">
                                <Label color={post.category.color} nomargin>
                                    {post.category.name}
                                </Label>
                            </div>
                        )}

                        <Link href={postUrl}>
                            <h3 className="text-xl font-semibold leading-normal text-foreground/80 transition-colors duration-200 line-clamp-2 group-hover:text-success mb-4">
                                {post.title}
                            </h3>
                        </Link>

                        {post.description && showDescription && (
                            <p className="text-sm leading-relaxed text-muted-foreground line-clamp-2">
                                {post.description}
                            </p>
                        )}
                    </div>

                    <div className="mt-4 flex items-center gap-3 text-sm text-muted-foreground">
                        {post.author && (
                            <>
                                <Link  href={authorUrl} className="flex items-center gap-2 transition-colors duration-200 hover:text-foreground">
                                    {post.author.avatar && (
                                        <Image
                                            src={post.author.avatar}
                                            alt={post.author.name}
                                            className="rounded-full object-cover"
                                            width={24}
                                            height={24}
                                        />
                                    )}
                                    <span className="font-medium">{post.author.name}</span>
                                </Link>
                                <span className="text-border">•</span>
                            </>
                        )}
                        {post.publishedAt && (
                            <time dateTime={post.publishedAt}>
                                {format(parseISO(post.publishedAt), "MMM d, yyyy")}
                            </time>
                        )}
                    </div>
                </div>
            </article>
        );
    }

    // Variant: Minimal (sin sombras, más compacto)
    if (variant === "minimal") {
        return (
            <article aria-label={post.title} className="group rounded-2xl bg-card shadow-md border border-border p-4 transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
                <Link href={postUrl} className="relative block aspect-square overflow-hidden rounded-xl">
                    {post.cover ? (
                        <Image
                            src={post.cover}
                            alt={post.title}
                            priority={preloadImage}
                            className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
                            fill
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        />
                    ) : (
                        <div className="flex h-full w-full items-center justify-center bg-muted">
                            <CameraIcon className="h-16 w-16 text-muted-foreground" />
                        </div>
                    )}
                </Link>

                <div className="mt-4 space-y-2">
                    {post.category && (
                        <div className="inline-block pb-4">
                            <Label color={post.category.color} nomargin>
                                {post.category.name}
                            </Label>
                        </div>
                    )}

                    <Link href={postUrl}>
                        <h3 className="text-lg font-semibold leading-snug text-foreground/80 transition-colors duration-200 line-clamp-2 group-hover:text-primary">
                            {post.title}
                        </h3>
                    </Link>

                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        {post.author && <span>{post.author.name}</span>}
                        {post.author && post.publishedAt && <span>•</span>}
                        {post.publishedAt && (
                            <time dateTime={post.publishedAt}>
                                {format(parseISO(post.publishedAt), "MMM d")}
                            </time>
                        )}
                    </div>
                </div>
            </article>
        );
    }

    // Variant: Hero (diseño horizontal grande para post destacado)
    if (variant === "hero") {
        return (
            <article aria-label={post.title} className="group relative flex flex-col overflow-hidden rounded-2xl bg-card shadow-lg border border-border transition-all duration-300 hover:shadow-xl hover:-translate-y-1 p-4 lg:flex-row lg:items-center lg:gap-6 lg:p-2">
                {/* Badge "Último Post" con animación pulse */}
                <div className="absolute top-4 right-4 z-10 flex items-center gap-2 rounded-full bg-success/90 px-4 py-2 shadow-lg animate-pulse">
                    <span className="relative flex h-4 w-4">
                        <PawIcon className="absolute inline-flex h-full w-full text-white" />
                    </span>
                    <span className="text-xs font-bold uppercase tracking-wider text-white" aria-label={t("lastPost")}>
                        {t("lastPost")}
                    </span>
                </div>

                <Link href={postUrl} className="relative w-full overflow-hidden rounded-lg lg:max-w-2xl">
                    {post.cover ? (
                        <>
                            {/* Imagen más grande para móvil (4:3 en lugar de cuadrada) */}
                            <div className="relative aspect-[4/3] w-full lg:hidden">
                                <Image
                                    src={post.cover}
                                    alt={post.title}
                                    priority={preloadImage}
                                    className="size-full object-cover transition duration-300 group-hover:scale-105"
                                    fill
                                    sizes="100vw"
                                />
                            </div>
                            {/* Imagen horizontal para desktop */}
                            <div className="hidden lg:block lg:relative lg:aspect-[16/10]">
                                <Image
                                    src={post.cover}
                                    alt={post.title}
                                    priority={preloadImage}
                                    className="size-full object-cover transition duration-300 group-hover:scale-105"
                                    fill
                                    sizes="672px"
                                />
                            </div>
                        </>
                    ) : (
                        <div className="flex aspect-[4/3] w-full items-center justify-center bg-muted lg:aspect-[16/10]">
                            <CameraIcon className="size-16 text-muted-foreground" />
                        </div>
                    )}
                </Link>

                <div className="w-full p-6 flex flex-col justify-between">
                    <div className="space-y-4">
                        {post.category && (
                            <div className="inline-block pb-4">
                                <Label color={post.category.color} nomargin>
                                    {post.category.name}
                                </Label>
                            </div>
                        )}

                        <Link href={postUrl}>
                            <h1 className="text-2xl font-bold leading-tight text-foreground/80 transition-colors duration-200 group-hover:text-success xl:text-3xl mb-4">
                                {post.title}
                            </h1>
                        </Link>

                        {post.description && showDescription && (
                            <p className="text-base leading-relaxed text-muted-foreground">
                                {post.description}
                            </p>
                        )}
                    </div>

                    <div className="mt-5 flex items-center gap-2 text-sm text-muted-foreground">
                        {post.author && (
                            <>
                                <Link href={authorUrl} className="flex items-center gap-3 transition-colors duration-200 hover:text-foreground">
                                    {post.author.avatar && (
                                        <div className="relative w-6 h-6 rounded-full overflow-hidden flex-shrink-0">
                                            <Image
                                                src={post.author.avatar}
                                                alt={post.author.name}
                                                className="object-cover"
                                                fill
                                                sizes="24px"
                                            />
                                        </div>
                                    )}
                                    <span className="font-medium">{post.author.name}</span>
                                </Link>
                            </>
                        )}
                        {post.publishedAt && (
                            <time dateTime={post.publishedAt}>
                                {format(parseISO(post.publishedAt), "MMM d, yyyy")}
                            </time>
                        )}
                    </div>
                </div>
            </article>
        );
    }

    // Variant: Default (diseño vertical con card cuadrado)
    return (
        <article aria-label={post.title} className="group relative flex flex-col overflow-hidden rounded-2xl bg-card shadow-sm border border-border transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
            <Link href={postUrl} className="relative aspect-square overflow-hidden">
                {post.cover ? (
                    <Image
                        src={post.cover}
                        alt={post.title}
                        priority={preloadImage}
                        className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                ) : (
                    <div className="flex h-full w-full items-center justify-center bg-muted">
                        <CameraIcon className="h-16 w-16 text-muted-foreground" />
                    </div>
                )}
            </Link>

            <div className="flex flex-1 flex-col p-6">
                <div className="flex-1 space-y-3">
                    {post.category && (
                        <div className="inline-block pb-4">
                            <Label color={post.category.color} nomargin>
                                {post.category.name}
                            </Label>
                        </div>
                    )}

                    <Link href={postUrl}>
                        <h3 className="text-xl font-semibold leading-tight text-foreground/80 transition-colors duration-200 line-clamp-2 group-hover:text-success">
                            {post.title}
                        </h3>
                    </Link>

                    {post.description && showDescription && (
                        <p className="text-sm leading-relaxed text-muted-foreground line-clamp-3">
                            {post.description}
                        </p>
                    )}
                </div>
                <div className="mt-6 flex items-center gap-3 border-t border-border pt-4">
                    {post.author && (
                        <Link  href={authorUrl} className="flex items-center gap-2 transition-opacity duration-200 hover:opacity-75">
                            {post.author.avatar && (
                                <Image
                                    src={post.author.avatar}
                                    alt={post.author.name}
                                    className="rounded-full object-cover"
                                    width={32}
                                    height={32}
                                />
                            )}
                            <span className="text-sm font-medium text-foreground/80">
                                {post.author.name}
                            </span>
                        </Link>
                    )}
                    {post.author && post.publishedAt && (
                        <span className="text-border">•</span>
                    )}
                    {post.publishedAt && (
                        <time className="text-sm text-muted-foreground" dateTime={post.publishedAt}>
                            {format(parseISO(post.publishedAt), "MMM d, yyyy")}
                        </time>
                    )}
                </div>
            </div>
        </article>
    );
}