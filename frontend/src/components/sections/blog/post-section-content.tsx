// components/blog/post/post-section-content.tsx
"use client";

import Image from "next/image";
import Link from "next/link";
import { useTranslations,useLocale } from "next-intl";
import { PortableText } from "@/components/blog/post/portable-text";
import { formatDateShort } from "@/lib/strapi/helpers";
import { BookOpenIcon } from "@heroicons/react/24/outline";
import { Button } from "@/components/ui/button";
import CategoryLabel from "@/components/blog/categories/category";
import AuthorCard from "@/components/blog/cards/authorCard";
import type { PostSectionContentProps } from "@/types/components";
import SharePost from "@/components/ui/blog/share-post";

export default function PostSectionContent({
    post,
    postUrl
}: PostSectionContentProps) {
    const t = useTranslations("blog.content");
    const tAccess = useTranslations("accessibility.main");
    
    const locale = useLocale();
    const authorUrl = `/${locale}/blog/author/${post.author?.slug}`;
    
    return (
        <section
            aria-label={tAccess("postSingle")}
            className="relative pb-2 sm:pb-4 lg:pb-6 xl:pb-8"
        >
            {/* Header del Post */}
            <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-8">
                {/* Categoría */}
                {post.category && (
                    <div className="flex justify-center mb-6">
                        <CategoryLabel
                            categories={[
                                {
                                    title: post.category.name,
                                    slug: { current: post.category.slug },
                                    color: post.category.color,
                                },
                            ]}
                        />
                    </div>
                )}

                {/* Título */}
                <h1 className="text-foreground/80 mb-5 text-center text-3xl font-semibold tracking-tight lg:text-5xl lg:leading-snug">
                    {post.title}
                </h1>

                {/* Descripción */}
                {post.description && (
                    <p className="text-muted-foreground text-center mb-8">
                        {post.description}
                    </p>
                )}
                {/* Autor y metadata */}
                {post.author && (
                    <div className="flex items-center justify-center gap-4 mt-7 text-muted-foreground">
                        {/* Avatar */}
                        {post.author.image && (
                            <Link
                                href={authorUrl}
                                className="relative flex-shrink-0 w-12 h-12 rounded-full overflow-hidden ring-2 ring-border hover:ring-success transition-all"
                            >
                                <Image
                                    src={post.author.image.src}
                                    alt={post.author.name}
                                    fill
                                    sizes="48px"
                                    className="object-cover"
                                />
                            </Link>
                        )}

                        {/* Info del autor */}
                        <div className="text-left">
                            <h4 className="font-medium text-lg text-foreground/80 mb-1">
                                <Link
                                    href={authorUrl}
                                    className="hover:text-success transition-colors"
                                >
                                    {post.author.name}
                                </Link>
                            </h4>
                            <div className="flex items-center gap-1 text-sm">
                                <time dateTime={post.publishedAt}>
                                    {formatDateShort(post.publishedAt)}
                                </time>
                                <span className="flex w-2 h-2 rounded-full bg-accent" />
                                <BookOpenIcon className="w-4 h-4" />
                                <p>{post.estReadingTime} {t("minReader")} </p>
                            </div>
                        </div>
                    </div>
                )}
            </div>

            {/* Imagen principal */}
            {post.mainImage && (
                <div className="relative z-0 mx-auto aspect-video max-w-screen-lg overflow-hidden mb-12 px-4 sm:px-6 lg:px-8">
                    <div className="relative w-full h-full rounded-lg overflow-hidden shadow-lg">
                        <Image
                            src={post.mainImage.src}
                            alt={post.mainImage.alt || "Thumbnail"}
                            fill
                            priority
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1200px"
                            className="object-cover"
                        />
                    </div>
                </div>
            )}
            {/* Contenido del artículo */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
                <article className="mx-auto max-w-4xl">
                    {/* Portable Text Content */}
                    <div className="mx-auto my-3">
                        {post.body && post.body.length > 0 ? (
                            <PortableText value={post.body} />
                        ) : (
                            <div className="text-center py-12">
                                <p className="text-muted-foreground/80">
                                    {t("noContent")}
                                </p>
                            </div>
                        )}
                    </div>
                    
                    <div className="border-t border-border pt-8 mt-12 mb-12 flex justify-center">
                        <SharePost
                            title={post.title}
                            url={postUrl}
                        />
                    </div>
                </article>
                
                {/* Botón para volver al blog principal */}
                <div className="mb-7 mt-7 flex justify-center">
                    <Button
                        asChild
                        variant="ghost"
                        size="xl"
                        className="shadow-md hover:shadow-xl duration-300"
                    >
                        <Link href="/blog">{t("backToBlog")}</Link>
                    </Button>
                </div>
                
                {/* Card del autor */}
                <div className="pt-4">
                    {post.author && <AuthorCard author={post.author} />}
                </div>
            </div>
        </section>
    );
}