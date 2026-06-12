import type { Locale } from "@/i18n/routing"
import type { MappedPost } from "@/types/blog"

export interface SearchPageProps {
  params: Promise<{ locale: Locale }>
  searchParams: Promise<{ q?: string; page?: string }>
}

export interface SearchSectionProps {
  params: Promise<{ locale: Locale }>
  searchParams: Promise<{ q?: string; page?: string }>
}

export interface SearchSectionContentProps {
  query: string
  posts: MappedPost[]
  totalPosts: number
  currentPage: number
  isFirstPage: boolean
  isLastPage: boolean
  locale: string
  postsPerPage: number
}

export interface SearchBarProps {
  basePath?: string
}

export interface SearchInputProps {
  q?: string
  handleChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
  handleClear?: () => void
  placeholder?: string
  ariaLabel?: string
  clearAriaLabel?: string
}
