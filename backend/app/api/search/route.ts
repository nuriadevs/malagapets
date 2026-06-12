import { NextRequest } from 'next/server'
import { searchPosts } from '@/lib/search'
import { okResponse, optionsResponse } from '@/utils/api-response'

export async function GET(req: NextRequest) {
  const origin = req.headers.get('origin')
  const q      = req.nextUrl.searchParams.get('q') ?? ''
  const locale = req.nextUrl.searchParams.get('locale') ?? 'es'

  const results = await searchPosts(q, locale)
  return okResponse({ results, query: q, total: results.length }, origin)
}

export async function OPTIONS(req: NextRequest) {
  return optionsResponse(req.headers.get('origin'))
}
