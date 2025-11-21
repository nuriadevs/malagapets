"use client";

import { Suspense } from "react";
import { SlugCategorySectionContentProps } from "@/types/blog";
import Link from "next/link";
import {Button} from "@/components/ui/button";
import { useTranslations } from "next-intl";
import { ContentLayout } from "@/components/common/content-layout-section";
import { LoadingContent } from "@/components/ui/loading-content";
import PostList from "@/components/blog/post/post-list";
import Pagination from "@/components/blog/pagination";


export default function SlugCategorySectionContent({
    category,
    posts,
    currentPage,
    totalArticles,
    isFirstPage,
    isLastPage,
    locale
}: SlugCategorySectionContentProps) {
    const t = useTranslations("blog.category");
    const tButton = useTranslations("blog.content");
    const tAccess = useTranslations("accessibility.category");

    // Capitalizar primera letra del nombre de la categoría
    const categoryTitle = category.name.charAt(0).toUpperCase() + category.name.slice(1);

    // Generar subtitle con count
    const articleCount = totalArticles === 1
        ? `1 ${t("article")}`
        : `${totalArticles} ${t("articles")}`;

    const subtitle = `${articleCount} ${t("resultsCount")}`;

    return (
        <ContentLayout
            mainTitle={categoryTitle}
            subtitle={subtitle}
            ariaLabel={tAccess("main", { name: categoryTitle })}
        >
            <div className="pb-15 pt-10 lg:pt-10">
                <div className="mx-auto max-w-7xl px-4 sm:px-8">
                    <Suspense fallback={<LoadingContent />} key={currentPage}>
                        {/* Empty State */}
                        {posts.length === 0 && (
                            <div className="flex h-40 items-center justify-center">
                                <span className="text-lg text-gray-500 dark:text-gray-400">
                                    {t("category.empty")}
                                </span>
                            </div>
                        )}

                        {/* Articles Grid */}
                        {posts.length > 0 && (
                            <div className="grid gap-10 md:grid-cols-2 lg:gap-10 xl:grid-cols-3">
                                {posts.map((post) => (
                                    <PostList
                                        key={post.id}
                                        post={post}
                                        variant="default"
                                    />
                                ))}
                            </div>
                        )}

                        {/* Pagination */}
                        {posts.length > 3 && (
                            <Pagination
                                pageIndex={currentPage}
                                isFirstPage={isFirstPage}
                                isLastPage={isLastPage}
                                basePath={`/${locale}/blog/categories/${category.slug}`}
                            />
                        )}

                                                        {/* Botón para volver al inicio */}
                                <div className="mt-10 flex justify-center">
                                    <Button
                                        aria-label={tButton("backToBlog")}
                                        asChild
                                        variant="ghost"
                                        size="xl"
                                        className="shadow-md border-1 hover:shadow-xl duration-300"
                                    >
                                        <Link href="/blog">
                                            {tButton("backToBlog")}
                                        </Link>
                                    </Button>
                                </div>
                    </Suspense>
                </div>
            </div>
        </ContentLayout>
    );
}