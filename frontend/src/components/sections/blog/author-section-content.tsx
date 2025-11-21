"use client";

import { useTranslations } from "next-intl";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {AuthorSectionContentProps} from "@/types/blog";
import { FileTextIcon } from "@/data/icons"
import Image from "next/image";
import { ContentLayout } from "@/components/common/content-layout-section";
import PostList from "@/components/blog/post/post-list";
import Pagination from "@/components/blog/pagination";



export default function AuthorSectionContent({
    author,
    posts,
    currentPage,
    totalArticles,
    isFirstPage,
    isLastPage,
    locale
}: AuthorSectionContentProps) {

    const FileText = FileTextIcon;

    const t = useTranslations("blog");
    const tAccess = useTranslations("accessibility.categories");

    const authorImage = author.image?.src ? author.image : null;
    const basePath = `/${locale}/blog/author/${author.slug}`;

    return (
        <ContentLayout
            ariaLabel={tAccess("main")}
        >
            <div className="max-w-7xlcontainer max-w-7xl mx-auto px-">
                {/* Hero Section - Autor */}
                <div className="px-4 sm:px-6 lg:px-8 py-8 sm:py-4 lg:py-8 border-b">
                    <div className="max-w-4xl mx-auto py-8">
                        <div className="flex flex-col lg:flex-row items-center lg:items-start gap-6 sm:gap-8">

                            {/* Avatar */}
                            <div className="shrink-0 w-24 h-24 sm:w-32 sm:h-32">
                                {authorImage ? (
                                    <Image
                                        src={authorImage.src}
                                        alt={authorImage.alt}
                                        className="rounded-full object-cover w-full h-full"
                                        width={128}
                                        height={128}
                                    />
                                ) : (
                                    <div className="w-full h-full bg-gradient-to-br from-primary to-primary/60 flex items-center justify-center rounded-full">
                                        <span className="text-5xl font-bold text-primary-foreground">
                                            {author.name.charAt(0).toUpperCase()}
                                        </span>
                                    </div>
                                )}
                            </div>

                            {/* Información del Autor */}
                            <div className="flex-1 text-center lg:text-left">
                                <h1 className="text-3xl sm:text-4xl font-bold text-foreground/80">
                                    {author.name}
                                </h1>

                                {author.email && (
                                    <p className="mt-2 text-muted-foreground">
                                        {author.email}
                                    </p>
                                )}

                                {author.bio && (
                                    <p className="mt-4 text-base sm:text-lg leading-relaxed text-muted-foreground max-w-2xl">
                                        {author.bio}
                                    </p>
                                )}

                                <div className="mt-6">
                                    <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent text-accent-foreground text-sm font-medium">
                                        <FileText className="w-4 h-4" />
                                        {totalArticles} {totalArticles === 1 ? t("category.article") : t("category.articles")}
                                    </span>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Posts Section */}
                <div className="px-4 sm:px-6 lg:px-8 py-10 sm:py-12 lg:py-12">
                    <div className="max-w-7xl mx-auto">
                        <h2 className="text-2xl sm:text-3xl font-bold text-foreground/80 mb-12 text-center">
                            {t("content.author.allArticles")} {author.name}
                        </h2>

                        {posts.length > 0 ? (
                            <>
                                {/* Grid de Posts */}
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                                    {posts.map((post) => (
                                        <PostList key={post.id} post={post} variant="default" />
                                    ))}
                                </div>

                                {/* Paginación */}
                                {totalArticles > 6 && (
                                    <Pagination
                                        pageIndex={currentPage}
                                        isFirstPage={isFirstPage}
                                        isLastPage={isLastPage}
                                        basePath={basePath}
                                    />
                                )}
                            </>
                        ) : (
                            <div className="text-center py-12">
                                <p className="text-lg text-muted-foreground">
                                    {t("noArticles")}
                                </p>
                            </div>
                        )}
                    </div>
                </div>
                                {/* Botón para vovler al blog principal */}
                <div className="mb-7 mt-7 flex justify-center">
                    <Button
                        asChild
                        variant="ghost"
                        size="xl"
                        className="shadow-md hover:shadow-xl duration-300"
                    >
                        <Link href="/blog">{t("content.backToBlog")}</Link>
                    </Button>
                </div>
            </div>
        </ContentLayout>
    );
}