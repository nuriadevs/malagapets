import { getPosts } from "@/lib/blog/post-service"
import type { MappedPost } from "@/types/blog"
import { BLOG_FEATURED_LIMIT } from "@/lib/blog/constants"
import BlogSectionContent from "./blog-section-content"

interface BlogSectionProps {
  locale: string
}

/**
 * Server component — carga los últimos posts y los pasa al layout de presentación.
 * Carga 1 hero + 2 horizontales = 3 posts en total por defecto.
 */
export default async function BlogSection({ locale }: BlogSectionProps) {
  let posts: MappedPost[] = []

  try {
    const response = await getPosts(locale, 1, BLOG_FEATURED_LIMIT + 1)
    posts = response.data ?? []
  } catch {
    posts = []
  }

  return <BlogSectionContent posts={posts} locale={locale} />
}
