import { FaFacebook, FaLinkedin, FaWhatsapp, FaTelegram } from "react-icons/fa"
import type { SocialPlatform, SocialButtonConfig } from "@/types/blog-post"

export type { SocialPlatform }

export function generateShareUrl(
  platform: SocialPlatform,
  url: string,
  title: string
): string {
  const encoded = encodeURIComponent(url)
  const encodedTitle = encodeURIComponent(title)

  const urls: Record<SocialPlatform, string> = {
    facebook:  `https://www.facebook.com/sharer/sharer.php?u=${encoded}`,
    linkedin:  `https://www.linkedin.com/sharing/share-offsite/?url=${encoded}`,
    whatsapp:  `https://wa.me/?text=${encodedTitle}%20${encoded}`,
    telegram:  `https://t.me/share/url?url=${encoded}&text=${encodedTitle}`,
  }
  return urls[platform]
}

export const socialButtons: SocialButtonConfig[] = [
  {
    platform: "facebook",
    icon: FaFacebook,
    bgColor: "bg-[#1877F2]",
    hoverColor: "hover:bg-[#166fe5]",
    ariaLabelKey: "facebook",
  },
  {
    platform: "linkedin",
    icon: FaLinkedin,
    bgColor: "bg-[#0A66C2]",
    hoverColor: "hover:bg-[#0958a8]",
    ariaLabelKey: "linkedin",
  },
  {
    platform: "whatsapp",
    icon: FaWhatsapp,
    bgColor: "bg-[#25D366]",
    hoverColor: "hover:bg-[#1ebe5d]",
    ariaLabelKey: "whatsapp",
  },
  {
    platform: "telegram",
    icon: FaTelegram,
    bgColor: "bg-[#26A5E4]",
    hoverColor: "hover:bg-[#1d96d4]",
    ariaLabelKey: "telegram",
  },
]
