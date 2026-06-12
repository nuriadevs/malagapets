import type { Metadata } from 'next'

type PostMetaInput = {
  title: string
  description: string
  keywords?: string[]
  coverImage?: string
  locale: string
  slug: string
}

export function generatePostMetadata({
  title,
  description,
  keywords,
  coverImage,
  locale,
  slug,
}: PostMetaInput): Metadata {
  return {
    title,
    description,
    keywords,
    openGraph: {
      title,
      description,
      type: 'article',
      locale,
      images: coverImage ? [{ url: coverImage }] : [],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: coverImage ? [coverImage] : [],
    },
    alternates: {
      canonical: `/blog/post/${slug}`,
    },
  }
}
