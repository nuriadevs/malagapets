"use client";

import { useRouter, usePathname } from "next/navigation";
import { CategorySectionContentProps } from "@/types/blog";
import { Suspense } from "react";
import { useTranslations } from "next-intl";
import { ContentLayout } from "@/components/common/content-layout-section";
import { LoadingContent } from "@/components/ui/loading-content";
import PostList from "@/components/blog/post/post-list";
import { Button } from "@/components/ui/button";
import { paginationIcons } from "@/data/icons";



export default function CategorySectionContent({
    categories,
    posts,
    selectedCategory,
    currentPage,
    totalPages,
    isFirstPage,
    isLastPage,
    categoryCounts,
    totalCount
}: CategorySectionContentProps) {
    const router = useRouter();
    const pathname = usePathname();
    const t = useTranslations("blog.content");
    const tAccess = useTranslations("accessibility.categories");

    const  [ ChevronLeft, ChevronRight ] = paginationIcons;

    // Cambiar categoría (resetea a página 1)
    const handleCategoryChange = (categorySlug: string) => {
        const params = new URLSearchParams();
        if (categorySlug !== "All") {
            params.set("category", categorySlug);
        }
        params.set("page", "1");
        router.push(`${pathname}?${params.toString()}`);
    };

    // Cambiar página
    const goToPage = (page: number) => {
        const params = new URLSearchParams();
        if (selectedCategory !== "All") {
            params.set("category", selectedCategory);
        }
        params.set("page", page.toString());
        router.push(`${pathname}?${params.toString()}`);
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    return (
        <ContentLayout
            mainTitle={t("category.title")}
            subtitle={t("category.subtitle")}
            ariaLabel={tAccess("main")}
        >
            <div className="pb-15 pt-10 lg:pt-10">
                <div className="mx-auto max-w-7xl px-4 sm:px-8">
                    <Suspense fallback={<LoadingContent />} key={currentPage}>
                        {/* Category Tabs */}
                        <div className="flex flex-wrap items-center justify-center gap-4 mb-12">
                            <Button
                                size="lg"
                                variant="ghost"
                                onClick={() => handleCategoryChange("All")}
                                className={`rounded-full cursor-pointer ${
                                    selectedCategory === "All"
                                        ? "bg-success text-success-foreground border-success hover:bg-success hover:text-white"
                                        : ""
                                }`}
                            >
                                {t("all")} ({totalCount})
                            </Button>

                            {categories.map((category) => {
                                const count = categoryCounts[category.slug] || 0;
                                if (count === 0) return null;
                                return (
                                    <Button
                                        size="lg"
                                        key={category.id}
                                        variant="ghost"
                                        onClick={() => handleCategoryChange(category.slug)}
                                        className={`rounded-full cursor-pointer capitalize ${
                                            selectedCategory === category.slug
                                                ? "bg-success text-success-foreground border-success hover:bg-success hover:text-white"
                                                : ""
                                        }`}
                                    >
                                        {category.name} ({count})
                                    </Button>
                                );
                            })}
                        </div>

                        {/* Articles Grid */}
                        <div className="grid gap-10 md:grid-cols-2 lg:gap-10 xl:grid-cols-3 mb-12">
                            {posts.map((post) => (
                                <PostList key={post.id} post={post} variant="default" />
                            ))}
                        </div>

                        {/* Empty State */}
                        {posts.length === 0 && (
                            <div className="py-20 text-center">
                                <p className="text-lg text-gray-600 dark:text-gray-400">
                                    {t("category.noPosts")}
                                </p>
                            </div>
                        )}

                        {/* Pagination - Solo si hay más de 1 página */}
                        {totalPages > 1 && (
                            <div className="flex items-center justify-center gap-2 mt-12">
                                {/* Botón Anterior */}
                                <Button
                                    className="cursor-pointer text-foreground"
                                    variant="outline"
                                    size="icon"
                                    onClick={() => goToPage(currentPage - 1)}
                                    disabled={isFirstPage}
                                    aria-label="Página anterior"
                                >
                                    <ChevronLeft className="h-4 w-4" />
                                </Button>
                                {/* Números de página */}
                                <div className="flex gap-2">
                                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => {
                                        const showPage =
                                            page === 1 ||
                                            page === totalPages ||
                                            Math.abs(page - currentPage) <= 1;

                                        const showEllipsis =
                                            (page === 2 && currentPage > 3) ||
                                            (page === totalPages - 1 && currentPage < totalPages - 2);

                                        if (!showPage && !showEllipsis) return null;

                                        if (showEllipsis) {
                                            return (
                                                <span
                                                    key={`ellipsis-${page}`}
                                                    className="flex items-center justify-center w-9 h-9"
                                                >
                                                    ...
                                                </span>
                                            );
                                        }

                                        return (
                                            <Button
                                            
                                                key={page}
                                                variant={currentPage === page ? "default" : "outline"}
                                                size="icon"
                                                onClick={() => goToPage(page)}
                                                className={
                                                    currentPage === page
                                                        ? "bg-success text-success-foreground hover:bg-success"
                                                        : "cursor-pointer"
                                                }
                                            >
                                                {page}
                                            </Button>
                                        );
                                    })}
                                </div>

                                {/* Botón Siguiente */}
                                <Button
                                    className="cursor-pointer text-foreground"
                                    variant="outline"
                                    size="icon"
                                    onClick={() => goToPage(currentPage + 1)}
                                    disabled={isLastPage}
                                    aria-label="Página siguiente"
                                >
                                    <ChevronRight className="h-4 w-4" />
                                </Button>
                            </div>
                        )}
                    </Suspense>
                </div>
            </div>
        </ContentLayout>
    );
}