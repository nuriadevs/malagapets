"use client";

import { useTranslations } from "next-intl";
import { SearchSectionContentProps } from "@/types/components";
import PostList from "@/components/blog/post/post-list";
import Pagination from "@/components/blog/pagination";
import SearchBar from "@/components/blog/search/search-bar";
import { ContentLayout } from "@/components/common/content-layout-section";
import { searchResult } from "@/data/icons";

export default function SearchSectionContent({
    query,
    posts,
    totalPosts,
    currentPage,
    isFirstPage,
    isLastPage,
    locale,
    postsPerPage
}: SearchSectionContentProps) {

    const [Search, FileSearch2] = searchResult;
    const t = useTranslations("search");

    // Truncar query si es muy largo
    const truncatedQuery = query && query.length > 15
        ? `${query.slice(0, 15)}...`
        : query;

    const subtitle = query
        ? t("resultsCount", {
            count: totalPosts,
            articles: totalPosts === 1 ? t("article") : t("articles")
        })
        : t("subtitle");

    return (
        <ContentLayout
            mainTitle={query ? t("resultsFor", { query: truncatedQuery }) : t("title")}
            subtitle={subtitle}
        >
            <div className="mx-auto max-w-7xl px-4 sm:px-8">
                {/* Search Bar */}
                <div className="mb-12">
                    <SearchBar basePath={`/${locale}/blog`} />
                </div>

                {/* Empty State - Sin búsqueda */}
                {!query ? (
                    <div className="text-center py-20 rounded-2xl border-2 border-dashed border-cyan-600/30 bg-gradient-to-br from-cyan-500/5 to-transparent">
                        <div className="relative inline-flex items-center justify-center mb-6">
                            <div className="absolute inset-0 bg-cyan-600/10 rounded-full blur-xl"></div>
                            <div className="relative size-20 flex items-center justify-center bg-gradient-to-br from-cyan-500/20 to-cyan-600/10 rounded-full border border-cyan-600/20 shadow-lg">
                                <Search
                                    className="size-10 text-cyan-600"
                                    strokeWidth={2}
                                />
                            </div>
                        </div>
                        <h3 className="text-xl font-semibold text-foreground mb-2">
                            {t("emptyState.title")}
                        </h3>
                        <p className="text-sm text-foreground/60 max-w-md mx-auto">
                            {t("subtitle")}
                        </p>
                    </div>
                ) : posts.length === 0 ? (
                    /* No Results State */
                    <div className="text-center py-20 rounded-2xl border-2 border-dashed border-cyan-600/30 bg-gradient-to-br from-cyan-500/5 to-transparent">
                        <div className="relative inline-flex items-center justify-center mb-6">
                            <div className="absolute inset-0 bg-cyan-600/10 rounded-full blur-xl"></div>
                            <div className="relative size-20 flex items-center justify-center bg-gradient-to-br from-cyan-500/20 to-cyan-600/10 rounded-full border border-cyan-600/20 shadow-lg">
                                <FileSearch2
                                    className="size-10 text-cyan-600"
                                    strokeWidth={2}
                                />
                            </div>
                        </div>
                        <h3 className="text-xl font-semibold text-foreground mb-2">
                            {t("noResults.title")}
                        </h3>
                        <p className="text-sm text-foreground/60 max-w-md mx-auto">
                            {t("noResults.description")}
                        </p>
                        <div className="mt-6 inline-flex items-center gap-2 text-xs text-foreground/50 bg-cyan-500/5 px-4 py-2 rounded-full border border-orange-500/10">
                            <span className="font-mono font-semibold">{query}</span>
                        </div>
                    </div>
                ) : (
                    /* Results */
                    <>
                        {/* Results Header */}
                        <div className="mb-8 flex items-center justify-between flex-wrap gap-4">
                            <div className="flex items-center gap-3">
                                <div className="size-10 flex items-center justify-center bg-cyan-600/10 rounded-full border border-cyan-600/20">
                                    <FileSearch2
                                        className="size-5 text-cyan-600"
                                        strokeWidth={2}
                                    />
                                </div>
                                <div>
                                    <p className="text-sm font-medium text-foreground/70">
                                        {t("resultsCount", {
                                            count: totalPosts,
                                            articles: totalPosts === 1 ? t("article") : t("articles")
                                        })}
                                    </p>
                                    <p className="text-xs text-foreground/50">
                                        {t("searchTerm")}: <span className="font-semibold text-cyan-600">{query}</span>
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Posts Grid */}
                        <div className="grid gap-8 md:grid-cols-2 lg:gap-10 xl:grid-cols-3">
                            {posts.map((post) => (
                                <PostList key={post.id} post={post} variant="default" />
                            ))}
                        </div>

                        {/* Pagination */}
                        {totalPosts > postsPerPage && (
                            <div className="mt-16 flex justify-center">
                                <Pagination
                                    pageIndex={currentPage}
                                    isFirstPage={isFirstPage}
                                    isLastPage={isLastPage}
                                    basePath={`/${locale}/blog/search?q=${encodeURIComponent(query)}`}
                                />
                            </div>
                        )}
                    </>
                )}
            </div>
        </ContentLayout>
    );
}