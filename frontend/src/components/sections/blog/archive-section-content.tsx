"use client";

import { Suspense } from "react";
import { useTranslations } from "next-intl";
import Link from "next/link";
import type { ArchiveSectionContentProps } from "@/types/blog";
import { ContentLayout } from "@/components/common/content-layout-section";
import { LoadingContent } from "@/components/ui/loading-content";
import PostList from "@/components/blog/post/post-list";
import Pagination from "@/components/blog/pagination";
import { Button } from "@/components/ui/button";


export default function ArchiveSectionContent({
    posts,
    currentPage,
    isFirstPage,
    isLastPage,
    totalPosts
}: ArchiveSectionContentProps) {
    const t = useTranslations("blog.content");
    const tAccess = useTranslations("accessibility.main");

    return (
        <ContentLayout
            mainTitle={t("archive.title")}
            subtitle={t("archive.subtitle")}
            ariaLabel={tAccess("archive")}
        >
            <div className="pb-15 pt-10 lg:pt-10">
                <div className="mx-auto max-w-7xl px-4 sm:px-8">
                    <Suspense fallback={<LoadingContent />} key={currentPage}>
                        {posts && posts.length === 0 ? (
                            <div className="flex h-40 items-center justify-center">
                                <span className="text-lg text-muted-foreground">
                                    {t("noPosts")}
                                </span>
                            </div>
                        ) : (
                            <>
                                <div className="grid gap-10 md:grid-cols-2 lg:gap-10 xl:grid-cols-3">
                                    {posts.map(post => (
                                        <PostList 
                                            key={post.id} 
                                            post={post} 
                                            variant="default" 
                                        />
                                    ))}
                                </div>

                                {totalPosts > 0 && (
                                    <Pagination
                                        pageIndex={currentPage}
                                        isFirstPage={isFirstPage}
                                        isLastPage={isLastPage}
                                        basePath="/blog/archive"
                                    />
                                )}

                                {/* Botón para volver al inicio */}
                                <div className="mt-10 flex justify-center">
                                    <Button
                                        aria-label={t("backToBlog")}
                                        asChild
                                        variant="ghost"
                                        size="xl"
                                        className="shadow-md border-1 hover:shadow-xl duration-300"
                                    >
                                        <Link href="/blog">
                                            {t("backToBlog")}
                                        </Link>
                                    </Button>
                                </div>
                            </>
                        )}
                    </Suspense>
                </div>
            </div>
        </ContentLayout>
    );
}