import { Index } from "flexsearch";
import { getAllPosts } from "./posts";
import { cache } from "./cache";
import type { PostMeta } from "@/types/post";

export async function searchPosts(
  query: string,
  locale: string,
): Promise<PostMeta[]> {
  if (!query || query.length < 2) return [];

  const allPosts = await getAllPosts(locale);
  const cacheKey = `search-index-${locale}`;

  let index = cache.get<Index>(cacheKey);

  if (!index) {
    index = new Index({ tokenize: "forward", resolution: 9 });
    allPosts.forEach((post, i) => {
      index!.add(
        i,
        `${post.title} ${post.description} ${post.tags?.join(" ")}`,
      );
    });
    cache.set(cacheKey, index, 60 * 10);
  }

  const results = index.search(query, { limit: 10 }) as number[];
  return results.map((i) => allPosts[i]).filter(Boolean);
}
