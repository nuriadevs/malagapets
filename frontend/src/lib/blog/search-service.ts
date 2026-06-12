import type { MappedPost, MappedPostCategory } from "@/types/blog";
import { API_URL as API } from "@/lib/config";

export interface SearchResponse {
  data: MappedPost[];
  pagination: {
    page: number;
    pageSize: number;
    pageCount: number;
    total: number;
  };
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

function mapSearchPost(p: {
  documentId?: string;
  slug: string;
  title: string;
  description?: string;
  cover?: { url: string };
  publishedAt?: string;
  updatedAt?: string;
  readingTime?: number;
  locale: string;
  tags?: string[];
  author?: string | { name: string; slug: string; avatar?: string };
  category?: string;
}): MappedPost {
  const rawAuthor = p.author as unknown;
  const author = rawAuthor
    ? typeof rawAuthor === "string"
      ? { name: rawAuthor, slug: rawAuthor, avatar: undefined }
      : {
          name: (rawAuthor as { name: string }).name,
          slug: (rawAuthor as { slug: string }).slug,
          avatar: (rawAuthor as { avatar?: string }).avatar,
        }
    : undefined;

  const category: MappedPostCategory | undefined = p.category
    ? {
        key: p.category,
        name: p.category,
        slug: p.category,
        color: CATEGORY_COLORS[p.category] ?? "blue",
      }
    : undefined;

  return {
    documentId: p.documentId,
    slug: p.slug,
    title: p.title,
    description: p.description,
    cover: p.cover?.url,
    publishedAt: p.publishedAt,
    updatedAt: p.updatedAt,
    readingTime: p.readingTime,
    locale: p.locale,
    tags: p.tags,
    author,
    category,
  };
}

/**
 * Busca posts por título.
 * Devuelve array vacío si el query está vacío.
 */
export async function searchPosts(
  query: string,
  locale: string,
  page = 1,
  limit = 9,
): Promise<SearchResponse> {
  if (!query.trim()) {
    return {
      data: [],
      pagination: { page, pageSize: limit, pageCount: 0, total: 0 },
    };
  }

  const params = new URLSearchParams({
    locale,
    q: query.trim(),
    page: String(page),
    limit: String(limit),
  });

  const res = await fetch(`${API}/api/posts?${params}`, {
    cache: "no-store",
  });

  if (!res.ok) throw new Error(`Error searching posts: ${res.status}`);

  const json = await res.json();

  return {
    data: (json.data ?? []).map(mapSearchPost),
    pagination: {
      page: json.pagination?.page ?? page,
      pageSize: json.pagination?.limit ?? limit,
      pageCount: json.pagination?.totalPages ?? 1,
      total: json.pagination?.total ?? 0,
    },
  };
}
