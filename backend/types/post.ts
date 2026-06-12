export type PostStatus = "published" | "draft" | "archived";

export type PostMeta = {
  slug: string;
  title: string;
  description: string;
  author: string;
  category: string;
  tags: string[];
  publishedAt: string;
  updatedAt?: string;
  cover?: {
    url: string;
    alternativeText: string;
    width: number;
    height: number;
  };
  locale: string;
  localizations?: { locale: string; slug: string }[];
  seo?: {
    metaTitle: string;
    metaDescription: string;
    keywords?: string[];
    canonicalURL?: string;
    ogImage?: string;
  };
  featured?: boolean;
  readingTime: number;
  documentId?: string;
};

export type Post = {
  meta: PostMeta;
  content: string;
};
