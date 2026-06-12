import { readAuthorFile, readAllAuthors } from './mdx/reader'
import { cache } from './cache'
import type { Author } from '@/types/author'

export async function getAllAuthors(): Promise<Author[]> {
  const cacheKey = 'authors-all'
  const cached = cache.get<Author[]>(cacheKey)
  if (cached) return cached

  const authors = await readAllAuthors()
  cache.set(cacheKey, authors, 60 * 10)
  return authors
}

export async function getAuthorBySlug(slug: string, locale = 'es'): Promise<Author | null> {
  try {
    return await readAuthorFile(slug, locale)
  } catch {
    return null
  }
}
