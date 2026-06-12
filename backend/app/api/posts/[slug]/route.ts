import { NextRequest } from 'next/server'
import { getPostBySlug, getRelatedPosts } from '@/lib/posts'
import { getAuthorBySlug } from '@/lib/authors'
import { okResponse, errorResponse, optionsResponse } from '@/utils/api-response'

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  const origin = req.headers.get('origin')
  const { slug } = await params
  const locale = req.nextUrl.searchParams.get('locale') ?? 'es'

  const post = await getPostBySlug(slug, locale)
  if (!post) return errorResponse('Post not found', 404, origin)

  const [author, related] = await Promise.all([
    post.meta.author ? getAuthorBySlug(post.meta.author, locale) : null,
    getRelatedPosts(slug, post.meta.category, locale),
  ])

  return okResponse(
    { meta: post.meta, content: post.content, author, related },
    origin,
    600
  )
}

export async function OPTIONS(req: NextRequest) {
  return optionsResponse(req.headers.get('origin'))
}