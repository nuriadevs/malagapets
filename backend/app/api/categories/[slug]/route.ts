import { NextRequest } from 'next/server'
import { getCategoryBySlug } from '@/lib/categories'
import { getPostsByCategory } from '@/lib/posts'
import { paginate } from '@/utils/pagination'
import { okResponse, errorResponse, optionsResponse } from '@/utils/api-response'

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  const origin = req.headers.get('origin')
  const { slug } = await params
  const locale = req.nextUrl.searchParams.get('locale') ?? 'es'
  const page   = Number(req.nextUrl.searchParams.get('page') ?? 1)
  const limit  = Number(req.nextUrl.searchParams.get('limit') ?? 10)

  const category = await getCategoryBySlug(slug)
  if (!category) return errorResponse('Category not found', 404, origin)

  const posts = await getPostsByCategory(slug, locale)
  return okResponse({ category, ...paginate(posts, page, limit) }, origin, 300)
}

export async function OPTIONS(req: NextRequest) {
  return optionsResponse(req.headers.get('origin'))
}
