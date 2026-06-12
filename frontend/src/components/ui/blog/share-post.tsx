"use client"

import { useId } from "react"
import { useTranslations } from "next-intl"
import SocialShareButton from "@/components/ui/blog/social-share-button"
import { socialButtons, generateShareUrl, type SocialPlatform } from "@/data/share-post-config"
import type { SharePostProps } from "@/types/blog-post"

/**
 * SharePost — botones para compartir un artículo en redes sociales.
 *
 * SEMÁNTICA:
 * - <div role="group" aria-labelledby> agrupa los botones de compartir
 * - Texto descriptivo referenciado con aria-labelledby
 */
export default function SharePost({ title = "", url }: SharePostProps) {
  const t = useTranslations("blog.sharePost")
  const shareId = useId()

  const handleShare = (platform: SocialPlatform): void => {
    const shareUrl = generateShareUrl(
      platform,
      url ?? (typeof window !== "undefined" ? window.location.href : ""),
      title
    )
    window.open(shareUrl, "_blank", "width=600,height=400,noopener,noreferrer")
  }

  return (
    <div className="flex items-center gap-4 flex-wrap">
      <p
        id={shareId}
        className="text-sm text-muted-foreground font-medium"
      >
        {t("shareText")}
      </p>
      <div
        role="group"
        aria-labelledby={shareId}
        className="flex items-center gap-2"
      >
        {socialButtons.map((button) => (
          <SocialShareButton
            key={button.platform}
            config={button}
            onClick={() => handleShare(button.platform)}
          />
        ))}
      </div>
    </div>
  )
}
