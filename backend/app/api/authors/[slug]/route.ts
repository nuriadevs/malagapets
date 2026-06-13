import { NextRequest } from "next/server";
import { getAuthorBySlug } from "@/lib/authors";
import { getPostsByAuthor } from "@/lib/posts";
import { paginate } from "@/utils/pagination";
import {
  okResponse,
  errorResponse,
  optionsResponse,
} from "@/utils/api-response";
import type { PostMeta } from "@/types/post";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ slug: string }> },
) {
  const origin = req.headers.get("origin");
  const { slug } = await params;
  const locale = req.nextUrl.searchParams.get("locale") ?? "es";
  const page = Number(req.nextUrl.searchParams.get("page") ?? 1);
  const limit = Number(req.nextUrl.searchParams.get("limit") ?? 10);

  const author = await getAuthorBySlug(slug, locale);
  if (!author) return errorResponse("Author not found", 404, origin);

  let posts: PostMeta[] = [];
  try {
    posts = await getPostsByAuthor(slug, locale);
  } catch {
    posts = [];
  }

  return okResponse({ author, ...paginate(posts, page, limit) }, origin, 300);
}

export async function OPTIONS(req: NextRequest) {
  return optionsResponse(req.headers.get("origin"));
}
