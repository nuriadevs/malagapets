import type { MappedPost, MappedPostCategory } from "@/types/blog";
import type { MappedPostDetail } from "@/types/blog-post";
import { API_URL as API } from "@/lib/config";

interface RawPostCover {
  url: string;
  alternativeText?: string;
  width?: number;
  height?: number;
}

interface RawPostSeo {
  metaTitle?: string;
  metaDescription?: string;
  keywords?: string[];
  canonicalURL?: string;
  ogImage?: string;
}

interface RawPost {
  documentId?: string;
  slug: string;
  title: string;
  description?: string;
  locale: string;
  readingTime?: number;
  publishedAt?: string;
  updatedAt?: string;
  author?:
    | string
    | {
        name: string;
        slug: string;
        avatar?: string;
        email?: string;
        bio?: string;
        documentId?: string;
        image?: { url?: string; alternativeText?: string };
      };
  category?: string;
  tags?: string[];
  cover?: RawPostCover;
  content?: string;
  localizations?: { locale: string; slug: string }[];
  seo?: RawPostSeo;
}

export interface Pagination {
  page: number;
  pageSize: number;
  pageCount: number;
  total: number;
}

export interface PostsResponse {
  data: MappedPost[];
  pagination: Pagination;
}

const CATEGORY_COLORS: Record<string, string> = {
  "guias-pet-friendly": "green",
  "productos-mascotas": "pink",
  "pet-friendly-guides": "green",
  "pet-products": "pink",
  "guides-pet-friendly": "green",
  "produits-animaux": "pink",
  "pet-friendly-fuehrer": "green",
  haustierprodukte: "pink",
};

function mapPost(raw: RawPost): MappedPost {
  const rawAuthor = raw.author as unknown;
  const author = rawAuthor
    ? typeof rawAuthor === "string"
      ? { name: rawAuthor, slug: rawAuthor, avatar: undefined }
      : {
          name: (rawAuthor as { name: string }).name,
          slug: (rawAuthor as { slug: string }).slug,
          avatar: (rawAuthor as { avatar?: string }).avatar ?? undefined,
        }
    : undefined;

  const category: MappedPostCategory | undefined = raw.category
    ? {
        key: raw.category,
        name: raw.category,
        slug: raw.category,
        color: CATEGORY_COLORS[raw.category] ?? "blue",
      }
    : undefined;

  return {
    documentId: raw.documentId,
    slug: raw.slug,
    title: raw.title,
    description: raw.description,
    cover: raw.cover?.url,
    publishedAt: raw.publishedAt,
    updatedAt: raw.updatedAt,
    readingTime: raw.readingTime,
    locale: raw.locale,
    tags: raw.tags,
    author,
    category,
  };
}

function mapPostDetail(raw: unknown): MappedPostDetail {
  const data = raw as {
    meta?: {
      documentId?: string;
      slug: string;
      title: string;
      description?: string;
      cover?: { url?: string; alternativeText?: string };
      publishedAt?: string;
      updatedAt?: string;
      readingTime?: number;
      locale: string;
      tags?: string[];
      category?: string;
      localizations?: { locale: string; slug: string }[];
      seo?: RawPostSeo;
    };
    content?: string;
    author?: {
      name?: string;
      slug?: string;
      email?: string;
      bio?: string;
      documentId?: string;
      avatar?: string | { url?: string; alternativeText?: string };
    };
  };

  const meta = data.meta;
  const rawAuthor = data.author;

  let avatarUrl: string | null = null;
  let avatarAlt = rawAuthor?.name ?? "";

  if (rawAuthor?.avatar) {
    const av = rawAuthor.avatar;
    if (typeof av === "string" && av.length > 0) {
      avatarUrl = av;
    } else if (typeof av === "object" && av.url && av.url.length > 0) {
      avatarUrl = av.url;
      avatarAlt = av.alternativeText ?? rawAuthor.name ?? "";
    }
  }

  const author: MappedPostDetail["author"] = rawAuthor
    ? {
        name: rawAuthor.name ?? "",
        slug: rawAuthor.slug ?? "",
        email: rawAuthor.email,
        bio: rawAuthor.bio,
        documentId: rawAuthor.documentId,
        image: avatarUrl ? { src: avatarUrl, alt: avatarAlt } : null,
      }
    : undefined;

  const category: MappedPostCategory | undefined = meta?.category
    ? {
        key: meta.category,
        name: meta.category,
        slug: meta.category,
        color: CATEGORY_COLORS[meta.category] ?? "blue",
      }
    : undefined;

  return {
    documentId: meta?.documentId,
    slug: meta?.slug ?? "",
    title: meta?.title ?? "",
    description: meta?.description,
    cover: meta?.cover?.url,
    coverAlt: meta?.cover?.alternativeText,
    publishedAt: meta?.publishedAt,
    updatedAt: meta?.updatedAt,
    readingTime: meta?.readingTime,
    locale: meta?.locale ?? "",
    tags: meta?.tags,
    content: data.content,
    localizations: meta?.localizations,
    seo: meta?.seo,
    author,
    category,
  };
}

export async function getPosts(
  locale: string,
  page = 1,
  limit = 10,
  category?: string,
): Promise<PostsResponse> {
  const params = new URLSearchParams({
    locale,
    page: String(page),
    limit: String(limit),
  });
  if (category) params.set("category", category);
  const res = await fetch(`${API}/api/posts?${params}`, {
    next: { revalidate: 300 },
  });
  if (!res.ok) throw new Error(`Error fetching posts: ${res.status}`);
  const json = await res.json();
  return {
    data: (json.data ?? []).map(mapPost),
    pagination: json.pagination ?? {
      page,
      pageSize: limit,
      pageCount: 1,
      total: 0,
    },
  };
}

export async function getFeaturedPosts(
  locale: string,
  limit = 3,
): Promise<PostsResponse> {
  const params = new URLSearchParams({
    locale,
    featured: "true",
    limit: String(limit),
  });
  const res = await fetch(`${API}/api/posts?${params}`, {
    next: { revalidate: 300 },
  });
  if (!res.ok) throw new Error(`Error fetching featured posts: ${res.status}`);
  const json = await res.json();
  return {
    data: (json.data ?? []).map(mapPost),
    pagination: json.pagination ?? {
      page: 1,
      pageSize: limit,
      pageCount: 1,
      total: 0,
    },
  };
}

export async function getPost(
  slug: string,
  locale: string,
): Promise<MappedPost | null> {
  const res = await fetch(`${API}/api/posts/${slug}?locale=${locale}`, {
    next: { revalidate: 600 },
  });
  if (res.status === 404) return null;
  if (!res.ok) throw new Error(`Error fetching post "${slug}": ${res.status}`);
  const json = await res.json();
  return mapPost(json.data ?? json);
}

export async function getPostDetail(
  slug: string,
  locale: string,
): Promise<MappedPostDetail | null> {
  const res = await fetch(`${API}/api/posts/${slug}?locale=${locale}`, {
    cache: "no-store",
  });
  if (res.status === 404) return null;
  if (!res.ok)
    throw new Error(`Error fetching post detail "${slug}": ${res.status}`);
  const json = await res.json();
  return mapPostDetail(json);
}
