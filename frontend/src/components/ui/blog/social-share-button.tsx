"use client"

import { useTranslations } from "next-intl"
import type { SocialShareButtonProps } from "@/types/blog-post"

/**
 * Botón individual de compartir en redes sociales.
 *
 * SEMÁNTICA:
 * - <button> con aria-label descriptivo
 * - Icono con aria-hidden (el label del botón lo describe)
 * - min 44x44px táctil (w-11 h-11)
 */
export default function SocialShareButton({ config, onClick }: SocialShareButtonProps) {
  const tAccess = useTranslations("accessibility.sharePost")
  const Icon = config.icon

  return (
    <button
      onClick={onClick}
      type="button"
      className={`
        flex items-center justify-center w-11 h-11 rounded-full
        ${config.bgColor} ${config.hoverColor}
        transition-all duration-300 ease-in-out hover:scale-110
        focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2
        cursor-pointer
      `}
      aria-label={tAccess(config.ariaLabelKey)}
    >
      <Icon className="w-5 h-5 text-white" aria-hidden="true" />
    </button>
  )
}
