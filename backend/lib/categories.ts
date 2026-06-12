import { readCategoryFile, readAllCategories } from './mdx/reader'
import { cache } from './cache'
import type { Category } from '@/types/category'

export async function getAllCategories(): Promise<Category[]> {
  const cacheKey = 'categories-all'
  const cached = cache.get<Category[]>(cacheKey)
  if (cached) return cached

  const categories = await readAllCategories()
  cache.set(cacheKey, categories, 60 * 10)
  return categories
}

export async function getCategoryBySlug(slug: string): Promise<Category | null> {
  try {
    return await readCategoryFile(slug)
  } catch {
    return null
  }
}
