import { NextRequest, NextResponse } from 'next/server'

const ALLOWED = (process.env.ALLOWED_ORIGINS ?? 'http://localhost:3000')
  .split(',')
  .map(s => s.trim())

export function proxy(req: NextRequest) {
  const origin = req.headers.get('origin')

  if (!req.nextUrl.pathname.startsWith('/api')) {
    return NextResponse.next()
  }

  if (origin && !ALLOWED.includes(origin)) {
    return new NextResponse(JSON.stringify({ error: 'Not allowed' }), {
      status: 403,
      headers: { 'Content-Type': 'application/json' },
    })
  }

  return NextResponse.next()
}

export const config = {
  matcher: '/api/:path*',
}
