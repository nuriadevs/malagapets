import { NextResponse } from 'next/server'
import { corsHeaders } from './cors'

export function okResponse<T>(data: T, origin?: string | null, cacheSeconds = 0) {
  const headers: Record<string, string> = {
    ...corsHeaders(origin),
  }
  if (cacheSeconds > 0) {
    headers['Cache-Control'] = `s-maxage=${cacheSeconds}, stale-while-revalidate=${cacheSeconds * 2}`
  }
  return NextResponse.json(data, { headers })
}

export function errorResponse(message: string, status: number, origin?: string | null) {
  return NextResponse.json(
    { error: message },
    { status, headers: corsHeaders(origin) }
  )
}

export function optionsResponse(origin?: string | null) {
  return new NextResponse(null, { status: 204, headers: corsHeaders(origin) })
}
