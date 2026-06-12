export type AuthorRole = 'editor' | 'author' | 'contributor'

export interface AuthorAvatar {
  url: string
  alternativeText?: string
  width?: number
  height?: number
}

export type Author = {
  slug: string
  name: string
  email?: string
  bio: string | Record<string, string>
  avatar?: AuthorAvatar
  social?: {
    twitter?: string
    instagram?: string
    website?: string
  }
  role?: AuthorRole
  documentId?: string
  locale?: string
  seo?: {
    metaTitle?: string
    metaDescription?: string
  }
}