import fs from 'fs/promises'
import path from 'path'

const CONTENT_DIR = path.join(process.cwd(), 'content')

export interface BeachData {
  id: number
  name: string
  municipality: string
  locality?: string
  location: string
  length?: string | null
  area?: string | null
  coordinates: { lat: number; lng: number }
  services: {
    dogShower: boolean
    waterFountain: boolean
    trashBins: boolean
    parking: boolean
    agilityArea: boolean
    bagDispenser: boolean
  }
  schedule: {
    summer?: string
    winter?: string
    yearRound?: boolean
  }
  access?: {
    type?: string
    by_car?: boolean
    distance_from_center?: string | null
    access_road?: string | null
    references?: string
  }
  certifications?: string[]
  highlights?: string[]
  googleMapsUrl?: string
  status?: string
}

export async function getAllBeaches(): Promise<BeachData[]> {
  const filePath = path.join(CONTENT_DIR, 'beaches', 'beaches.json')
  const raw = await fs.readFile(filePath, 'utf-8')
  return JSON.parse(raw) as BeachData[]
}
