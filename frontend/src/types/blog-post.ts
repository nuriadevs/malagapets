import type {
  MappedAuthor,
  MappedPostCategory,
  MappedPost,
} from "@/types/blog";

export interface MappedPostDetail {
  documentId?: string;
  slug: string;
  title: string;
  description?: string;
  cover?: string;
  coverAlt?: string;
  publishedAt?: string;
  updatedAt?: string;
  readingTime?: number;
  locale: string;
  author?: MappedAuthor;
  category?: MappedPostCategory;
  tags?: string[];
  content?: string;
  contentType?: "mdx" | "html" | "markdown";
  localizations?: { locale: string; slug: string }[];
  seo?: {
    metaTitle?: string;
    metaDescription?: string;
    keywords?: string[];
    canonicalURL?: string;
    ogImage?: string;
  };
  related?: MappedPost[];
}

export interface PostSectionProps {
  slug: string;
  locale: string;
  postUrl: string;
}

export interface PostSectionContentProps {
  post: MappedPostDetail;
  postUrl?: string;
}

export interface AuthorCardProps {
  author: MappedAuthor;
}

export interface SharePostProps {
  title?: string;
  url?: string;
}

export type SocialPlatform = "facebook" | "linkedin" | "whatsapp" | "telegram";

export interface SocialButtonConfig {
  platform: SocialPlatform;
  icon: React.ComponentType<{ className?: string }>;
  bgColor: string;
  hoverColor: string;
  ariaLabelKey: string;
}

export interface SocialShareButtonProps {
  config: SocialButtonConfig;
  onClick: () => void;
}
