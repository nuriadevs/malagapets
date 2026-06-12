import { notFound } from "next/navigation"
import { getPostDetail } from "@/lib/blog/post-service"
import type { PostSectionProps } from "@/types/blog-post"
import PostSectionLayout from "@/components/sections/blog/post-section-layout"


export default async function PostSection({
  slug,
  locale,
  postUrl,
}: PostSectionProps) {
  const post = await getPostDetail(slug, locale)
  if (!post) notFound()

  return <PostSectionLayout post={post} postUrl={postUrl} />
}
