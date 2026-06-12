import { ReactNode } from "react";

export type ColorType = "green" | "blue" | "orange" | "purple" | "pink";

export interface MappedAuthor {
  documentId?: string;
  name: string;
  slug: string;
  email?: string;
  bio?: string;
  url?: string;
  image?: { src: string; alt: string } | null;
}

export interface MappedPostAuthor {
  name: string;
  slug: string;
  avatar?: string;
}

export interface MappedPostCategory {
  key: string;
  name: string;
  slug: string;
  color?: ColorType | string;
}

export interface MappedPost {
  documentId?: string;
  slug: string;
  title: string;
  description?: string;
  cover?: string;
  publishedAt?: string;
  updatedAt?: string;
  readingTime?: number;
  locale: string;
  localizations?: { locale: string; slug: string }[];
  author?: MappedPostAuthor;
  category?: MappedPostCategory;
  tags?: string[];
}

export interface PaginationParams {
  currentPage: number;
  offset: number;
  limit: number;
  isFirstPage: boolean;
  isLastPage: (totalItems: number) => boolean;
  pageCount: (totalItems: number) => number;
}

export interface PaginationInfo {
  page: number;
  pageSize: number;
  pageCount: number;
  total: number;
}

export interface LabelProps {
  color?: ColorType | string;
  pill?: boolean;
  nomargin?: boolean;
  children?: ReactNode;
}

export interface PostListProps {
  post: MappedPost;
  variant?: "default" | "horizontal" | "minimal" | "hero";
  pathPrefix?: string;
  preloadImage?: boolean;
}

export interface AuthorSectionContentProps {
  author: MappedAuthor;
  posts: MappedPost[];
  currentPage: number;
  totalArticles: number;
  isFirstPage: boolean;
  isLastPage: boolean;
  locale: string;
}
