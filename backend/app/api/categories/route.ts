import { NextRequest } from 'next/server'
import { getAllCategories } from '@/lib/categories'
import { okResponse, optionsResponse } from '@/utils/api-response'

export async function GET(req: NextRequest) {
  const origin = req.headers.get('origin')
  const categories = await getAllCategories()
  return okResponse({ data: categories }, origin, 600)
}

export async function OPTIONS(req: NextRequest) {
  return optionsResponse(req.headers.get('origin'))
}
