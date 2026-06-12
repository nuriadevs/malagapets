import { NextRequest } from 'next/server'
import { getAllAuthors } from '@/lib/authors'
import { okResponse, optionsResponse } from '@/utils/api-response'

export async function GET(req: NextRequest) {
  const origin = req.headers.get('origin')
  const authors = await getAllAuthors()
  return okResponse({ data: authors }, origin, 600)
}

export async function OPTIONS(req: NextRequest) {
  return optionsResponse(req.headers.get('origin'))
}
