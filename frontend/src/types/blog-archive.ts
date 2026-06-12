import type { Locale } from "@/i18n/routing"
import type { MappedPost } from "@/types/blog"

export interface ArchivePageProps {
  params: Promise<{ locale: Locale }>
  searchParams: Promise<{ page?: string }>
}

export interface ArchiveSectionProps {
  locale: string
  searchParams: Promise<{ page?: string }>
}

export interface ArchiveSectionContentProps {
  posts: MappedPost[]
  currentPage: number
  isFirstPage: boolean
  isLastPage: boolean
  totalPosts: number
  locale: string
}
