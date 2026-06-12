import type { Locale } from "@/i18n/routing";
import type { MappedPost } from "@/types/blog";

export interface MappedCategory {
  key: string;
  slug: string;
  name: string;
  description?: string;
  color?: string;
  count?: number;
}

export interface CategoriesPageProps {
  params: Promise<{ locale: Locale }>;
  searchParams: Promise<{ page?: string; category?: string }>;
}

export interface CategoryPageProps {
  params: Promise<{ locale: Locale; slug: string }>;
  searchParams: Promise<{ page?: string }>;
}

export interface CategorySectionProps {
  locale: string;
  searchParams: Promise<{ page?: string; category?: string }>;
}

export interface SlugCategorySectionProps {
  slug: string;
  locale: string;
  searchParams: Promise<{ page?: string }>;
}

export interface CategorySectionContentProps {
  categories: MappedCategory[];
  posts: MappedPost[];
  selectedCategory: string;
  currentPage: number;
  totalPages: number;
  isFirstPage: boolean;
  isLastPage: boolean;
  categoryCounts: Record<string, number>;
  totalCount: number;
  locale: string;
}

export interface SlugCategorySectionContentProps {
  category: MappedCategory;
  posts: MappedPost[];
  currentPage: number;
  totalArticles: number;
  isFirstPage: boolean;
  isLastPage: boolean;
  locale: string;
}
