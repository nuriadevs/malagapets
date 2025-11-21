"use client"

import Link from "next/link";
import { useTranslations } from "next-intl";
import PostList from "@/components/blog/post/post-list";
import { Button } from "@/components/ui/button"
import { BlogSectionContentProps } from "@/types/blog";
import { ContentLayout } from "@/components/common/content-layout-section";


export function BlogSectionContent({ posts }: BlogSectionContentProps) {
    const t = useTranslations("blog.content");
    const tAccess = useTranslations("accessibility.blog");

    return (
        <ContentLayout
            mainTitle={t("latest.title")}
            subtitle={t("latest.subtitle")}
            ariaLabel={tAccess("latestPosts")}
        >
            <div className="container max-w-7xl mx-auto py-10 px-4 sm:px-6 lg:px-8 relative pb-10 flex justify-center">
                {posts && posts.length > 0 && (
                    <div className="w-full">
                        {/* Primer post destacado - Layout hero */}
                        <div className="grid grid-cols-1 lg:grid-cols-1 gap-6 lg:gap-10 mb-10">
                            {posts.slice(0, 1).map(post => (
                                <PostList
                                    key={post.id}
                                    post={post}
                                    variant="hero"
                                    preloadImage={true}
                                />
                            ))}
                        </div>

                        {/* Posts 2-3 en grid responsivo */}
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-6 md:gap-10 mb-10">
                            {posts.slice(1, 3).map(post => (
                                <PostList
                                    key={post.id}
                                    post={post}
                                    variant="horizontal"
                                />
                            ))}
                        </div>

                        {/* Botón para ver todos los posts */}
                        <div className="mt-10 flex justify-center">
                            <Button
                                aria-label={t("viewAllPosts")}
                                asChild
                                variant="ghost"
                                size="xl"
                                className="shadow-md border-1 hover:shadow-xl duration-300"
                            >
                                <Link href="/blog/archive">
                                    {t("viewAllPosts")}
                                </Link>
                            </Button>
                        </div>
                    </div>
                )}
            </div>

        </ContentLayout>
    );
}