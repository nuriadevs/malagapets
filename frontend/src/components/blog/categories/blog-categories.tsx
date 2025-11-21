// components/blog-categories.tsx
"use client";

import { useState } from "react";
import PostList from "@/components/blog/post/post-list";
import { Button } from "@/components/ui/button";
import type { BlogCategoriesProps } from "@/types/blog";


export default function BlogCategories({
  categories,
  posts,
}: BlogCategoriesProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");

  // Contar artículos por categoría
  const getCategoryCount = (categorySlug: string) => {
    return posts.filter(
      (post) => post.category?.slug === categorySlug
    ).length;
  };

  // Filtrar artículos por categoría
  const filteredPosts =
    selectedCategory === "All"
      ? posts
      : posts.filter(
          (post) => post.category?.slug === selectedCategory
        );

      console.log("Filtered Posts:", filteredPosts.length);

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-8">

      {/* Category Tabs */}
      <div className="flex flex-wrap items-center justify-center gap-4 mb-12">
        <Button
        size= "lg"
          variant="ghost"
          onClick={() => setSelectedCategory("All")}
          className={`rounded-full cursor-pointer ${
            selectedCategory === "All"
                  ? "bg-success text-success-foreground border-success hover:bg-success hover:text-white"
              : ""
          }`}
        >
          Todos ({posts.length})
        </Button>

        {categories.map((category) => {
          const count = getCategoryCount(category.slug);
          if (count === 0) return null;
          return (
            <Button
            size= "lg"
              key={category.id}
              variant="ghost"
              onClick={() => setSelectedCategory(category.slug)}
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
      <div className="grid gap-10 md:grid-cols-2 lg:gap-10 xl:grid-cols-3">
        {filteredPosts.map((post) => (
          <PostList
            key={post.id}
            post={post}
            variant="default"
          />
        ))}
      </div>

      {/* Empty State */}
      {filteredPosts.length === 0 && (
        <div className="py-20 text-center">
          <p className="text-lg text-gray-600 dark:text-gray-400">
            No hay artículos en esta categoría todavía.
          </p>
        </div>
      )}

    </div>
  );
}