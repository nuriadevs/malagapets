import { NextRequest } from "next/server";
import { getAllPosts, getPostsByCategory, getFeaturedPosts } from "@/lib/posts";
import { getAuthorBySlug } from "@/lib/authors";
import { paginate } from "@/utils/pagination";
import { okResponse, optionsResponse } from "@/utils/api-response";

export async function GET(req: NextRequest) {
  const origin = req.headers.get("origin");
  const { searchParams } = req.nextUrl;
  const locale = searchParams.get("locale") ?? "es";
  const category = searchParams.get("category");
  const featured = searchParams.get("featured");
  const query = searchParams.get("q")?.toLowerCase().trim();
  const page = Number(searchParams.get("page") ?? 1);
  const limit = Number(searchParams.get("limit") ?? 10);

  let posts =
    featured === "true"
      ? await getFeaturedPosts(locale)
      : category
        ? await getPostsByCategory(category, locale)
        : await getAllPosts(locale);

  if (query) {
    posts = posts.filter(
      (p) =>
        p.title?.toLowerCase().includes(query) ||
        p.description?.toLowerCase().includes(query) ||
        p.tags?.some((tag) => tag.toLowerCase().includes(query)),
    );
  }

  const enrichedPosts = await Promise.all(
    posts.map(async (post) => {
      if (!post.author) return post;
      const author = await getAuthorBySlug(post.author as string, locale);
      return {
        ...post,
        author: author
          ? {
              name: author.name,
              slug: author.slug,
              avatar: author.avatar?.url ?? null,
            }
          : { name: post.author, slug: post.author, avatar: null },
      };
    }),
  );

  return okResponse(paginate(enrichedPosts, page, limit), origin, 300);
}

export async function OPTIONS(req: NextRequest) {
  return optionsResponse(req.headers.get("origin"));
}
