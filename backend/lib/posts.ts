import { readAllMDXFiles, readMDXFile } from "./mdx/reader";
import { cache } from "./cache";
import type { PostMeta, Post } from "@/types/post";

const CACHE_TTL = 60 * 5;

export async function getAllPosts(locale: string): Promise<PostMeta[]> {
  const cacheKey = `posts-${locale}`;
  const cached = cache.get<PostMeta[]>(cacheKey);
  if (cached) return cached;

  const posts = await readAllMDXFiles(locale);
  const sorted = posts
    .filter((p) => Boolean(p.publishedAt))
    .sort(
      (a, b) =>
        new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime(),
    );

  cache.set(cacheKey, sorted, CACHE_TTL);
  return sorted;
}

export async function getPostBySlug(
  slug: string,
  locale: string,
): Promise<Post | null> {
  try {
    return await readMDXFile(locale, slug);
  } catch {
    return null;
  }
}

export async function getPostsByCategory(
  category: string,
  locale: string,
): Promise<PostMeta[]> {
  const posts = await getAllPosts(locale);
  return posts.filter((p) => p.category === category);
}

export async function getPostsByAuthor(
  authorSlug: string,
  locale: string,
): Promise<PostMeta[]> {
  const posts = await getAllPosts(locale);
  return posts.filter((p) => p.author === authorSlug);
}

export async function getFeaturedPosts(
  locale: string,
  limit = 3,
): Promise<PostMeta[]> {
  const posts = await getAllPosts(locale);
  return posts.filter((p) => p.featured).slice(0, limit);
}

export async function getRelatedPosts(
  currentSlug: string,
  category: string,
  locale: string,
  limit = 3,
): Promise<PostMeta[]> {
  const posts = await getPostsByCategory(category, locale);
  return posts.filter((p) => p.slug !== currentSlug).slice(0, limit);
}

export async function getRecentPosts(
  locale: string,
  limit = 5,
): Promise<PostMeta[]> {
  const posts = await getAllPosts(locale);
  return posts.slice(0, limit);
}
