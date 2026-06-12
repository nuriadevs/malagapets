import type {
  MappedAuthor,
  MappedPost,
  PaginationInfo,
  MappedPostAuthor,
} from "@/types/blog";
import { API_URL as API } from "@/lib/config";

export const AUTHOR_BASE: Record<string, string> = {
  es: "/blog/autor",
  en: "/blog/author",
  de: "/blog/autor",
  fr: "/blog/auteur",
};

const CATEGORY_COLORS: Record<string, string> = {
  // ES
  "guias-pet-friendly": "green",
  "productos-mascotas": "pink",
  // EN
  "pet-friendly-guides": "green",
  "pet-products": "pink",
  // FR
  "guides-pet-friendly": "green",
  "produits-animaux": "pink",
  // DE
  "pet-friendly-fuehrer": "green",
  haustierprodukte: "pink",
};

export async function getAuthors(): Promise<MappedAuthor[]> {
  const res = await fetch(`${API}/api/authors`, {
    next: { revalidate: 600 },
  });
  if (!res.ok) throw new Error("Error fetching authors");
  return res.json();
}

export async function getAuthorBySlug(
  slug: string,
  locale: string,
): Promise<MappedAuthor | null> {
  const params = new URLSearchParams({ locale });
  const res = await fetch(`${API}/api/authors/${slug}?${params}`, {
    next: { revalidate: 300 },
  });
  if (res.status === 404) return null;
  if (!res.ok)
    throw new Error(`Error fetching author "${slug}": ${res.status}`);

  const json = await res.json();
  const raw = json.author ?? json.data ?? json;

  return {
    documentId: raw.documentId,
    name: raw.name,
    slug: raw.slug,
    email: raw.email,
    bio: raw.bio,
    image: raw.avatar?.url
      ? { src: raw.avatar.url, alt: raw.avatar.alternativeText ?? raw.name }
      : null,
  };
}

export async function getPostsByAuthor(
  slug: string,
  locale: string,
  page = 1,
  pageSize = 6,
): Promise<{ data: MappedPost[]; pagination: PaginationInfo }> {
  const params = new URLSearchParams({
    locale,
    page: String(page),
    limit: String(pageSize),
  });
  const res = await fetch(`${API}/api/authors/${slug}?${params}`, {
    next: { revalidate: 300 },
  });
  if (!res.ok)
    throw new Error(`Error fetching posts for author "${slug}": ${res.status}`);

  const json = await res.json();

  const rawAuthor = json.author;
  const mappedAuthor: MappedPostAuthor = {
    name: rawAuthor?.name ?? slug,
    slug: rawAuthor?.slug ?? slug,
    avatar: rawAuthor?.avatar?.url,
  };

  const rawPosts = json.data ?? [];
  const data: MappedPost[] = rawPosts.map(
    (p: {
      documentId?: string;
      slug: string;
      title: string;
      description?: string;
      cover?: { url: string };
      publishedAt?: string;
      updatedAt?: string;
      readingTime?: number;
      locale: string;
      category?: string;
      tags?: string[];
    }) => ({
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
      author: mappedAuthor,
      category: p.category
        ? {
            name: p.category,
            slug: p.category,
            color: CATEGORY_COLORS[p.category] ?? "blue",
          }
        : undefined,
    }),
  );

  const rawPagination = json.pagination ?? {};

  return {
    data,
    pagination: {
      page: rawPagination.page ?? 1,
      pageSize: rawPagination.limit ?? pageSize,
      pageCount: rawPagination.totalPages ?? 1,
      total: rawPagination.total ?? data.length,
    },
  };
}
