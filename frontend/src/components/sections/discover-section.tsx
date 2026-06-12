import { getTranslations } from "next-intl/server"
import type { MappedPost } from "@/types/blog"
import { getPosts } from "@/lib/blog/post-service"
import PostCard from "@/components/blog/cards/post-card"
import { Link } from "@/i18n/navigation"
import { Button } from "@/components/ui/button"

interface DiscoverSectionProps {
  locale: string
}

export default async function DiscoverSection({ locale }: DiscoverSectionProps) {
  const t = await getTranslations("discover")

  let posts: MappedPost[] = []
  try {
    const response = await getPosts(locale, 1, 4)
    posts = response.data ?? []
  } catch {
    posts = []
  }

  if (posts.length === 0) return null

  const [heroPost, ...restPosts] = posts
  const gridPosts = restPosts.slice(0, 2)

  return (
    <section
      aria-labelledby="discover-title"
      className="container-app py-16 sm:py-20"
    >

      <div className="mb-10 sm:mb-12 space-y-3">
        <span className="badge badge-pet text-xs font-semibold uppercase tracking-widest">
          {t("label")}
        </span>
        <h2
          id="discover-title"
          className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground/80 text-balance leading-tight"
        >
          {t("title")}
        </h2>
      </div>

      {heroPost && (
        <div className="mb-6">
          <PostCard post={heroPost} variant="hero" preloadImage />
        </div>
      )}

      {gridPosts.length > 0 && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-10">
          {gridPosts.map((post) => (
            <PostCard key={post.slug} post={post} variant="horizontal" />
          ))}
        </div>
      )}

      <div className="flex justify-center mt-4">
        <Button
          asChild
          size="xl"
          className="shadow-sm hover:shadow-pet transition-all duration-500 ease-in-out"
        >
          <Link href="/blog">{t("cta")}</Link>
        </Button>
      </div>

    </section>
  )
}