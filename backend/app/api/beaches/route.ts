import { NextRequest } from 'next/server'
import { getAllBeaches } from '@/lib/beaches'
import { okResponse, errorResponse, optionsResponse } from '@/utils/api-response'

export async function GET(req: NextRequest) {
  const origin = req.headers.get('origin')

  try {
    const beaches = await getAllBeaches()
    return okResponse({ data: beaches, total: beaches.length }, origin, 3600)
  } catch (error) {
    console.error('Error fetching beaches:', error)
    return errorResponse('Error fetching beaches', 500, origin)
  }
}

export async function OPTIONS(req: NextRequest) {
  return optionsResponse(req.headers.get('origin'))
}
