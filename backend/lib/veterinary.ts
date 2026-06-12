import fs from 'fs/promises'
import path from 'path'

const CONTENT_DIR = path.join(process.cwd(), 'content')

export interface VetData {
  id: number
  type: 'hospital' | 'clinic'
  name: string
  address: string
  postalCode?: string
  phones: Array<{ type: string; number: string | null }>
  website?: string | null
  email?: string | null
  schedule?: string | null
  daysOpen?: string | null
  coordinates?: { lat: number; lng: number }
  googleMapsUrl?: string
}

export async function getAllVets(): Promise<VetData[]> {
  const filePath = path.join(CONTENT_DIR, 'veterinary', 'vets.json')
  const raw = await fs.readFile(filePath, 'utf-8')
  return JSON.parse(raw) as VetData[]
}

export async function getVetsByType(type: 'hospital' | 'clinic'): Promise<VetData[]> {
  const vets = await getAllVets()
  return vets.filter(v => v.type === type)
}
