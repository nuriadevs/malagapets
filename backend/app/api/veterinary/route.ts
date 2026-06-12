import { NextRequest } from 'next/server'
import { getAllVets, getVetsByType } from '@/lib/veterinary'
import { okResponse, errorResponse, optionsResponse } from '@/utils/api-response'

export async function GET(req: NextRequest) {
  const origin = req.headers.get('origin')
  const type = req.nextUrl.searchParams.get('type') as 'hospital' | 'clinic' | null

  try {
    const vets = type
      ? await getVetsByType(type)
      : await getAllVets()

    return okResponse({ data: vets, total: vets.length }, origin, 3600)
  } catch (error) {
    console.error('Error fetching vets:', error)
    return errorResponse('Error fetching veterinary centers', 500, origin)
  }
}

export async function OPTIONS(req: NextRequest) {
  return optionsResponse(req.headers.get('origin'))
}
