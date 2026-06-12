"use client"

import { useState, useTransition } from "react"
import { useLocale, useTranslations } from "next-intl"
import { useParams } from "next/navigation"
import { buttonVariants } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { ChevronDown, Check } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useRouter, usePathname } from "@/i18n/navigation"
import type { Locale } from "@/i18n/routing"

const languages = [
  { code: "es", name: "Español", flag: "🇪🇸" },
  { code: "en", name: "English", flag: "🇬🇧" },
  { code: "de", name: "Deutsch", flag: "🇩🇪" },
  { code: "fr", name: "Français", flag: "🇫🇷" },
] as const

type LanguageCode = (typeof languages)[number]["code"]

export function LanguageSwitch() {
  const locale = useLocale() as Locale
  const pathname = usePathname()
  const router = useRouter()
  const params = useParams()

  const [isOpen, setIsOpen] = useState(false)
  const [isPending, startTransition] = useTransition()

  const tNav = useTranslations("navigation")
  const currentLanguage = languages.find((lang) => lang.code === locale)

  const handleLanguageChange = async (newLocale: LanguageCode) => {
    if (newLocale === locale) {
      setIsOpen(false)
      return
    }

    setIsOpen(false)

    const isBlogPost = pathname.includes("/blog/post/")
    const isBlogCategory = pathname.includes("/blog/categories/")
    const isBlogAuthor = pathname.includes("/blog/author/")
    const currentSlug = params.slug as string | undefined

    if (isBlogPost && currentSlug) {
      try {
        const response = await fetch(
          `/api/blog/localizations?slug=${encodeURIComponent(currentSlug)}&locale=${locale}`
        )
        if (response.ok) {
          const data = await response.json()
          if (data.currentLocale === newLocale) {
            startTransition(() => {
              router.replace(`/blog/post/${currentSlug}`, { locale: newLocale as Locale })
            })
            return
          }
          const localization = data.localizations?.find(
            (loc: { locale: string; slug: string }) => loc.locale === newLocale
          )
          if (localization?.slug) {
            startTransition(() => {
              router.replace(`/blog/post/${localization.slug}`, { locale: newLocale as Locale })
            })
            return
          }
        }
      } catch { /* fallback below */ }
      startTransition(() => router.replace("/blog", { locale: newLocale as Locale }))
      return
    }

    if (isBlogCategory && currentSlug) {
      try {
        const response = await fetch(
          `/api/blog/category-localizations?slug=${encodeURIComponent(currentSlug)}&locale=${locale}`
        )
        if (response.ok) {
          const data = await response.json()
          const localization = data.localizations?.find(
            (loc: { locale: string; slug: string }) => loc.locale === newLocale
          )
          if (localization?.slug) {
            startTransition(() => {
              router.replace(`/blog/categories/${localization.slug}`, { locale: newLocale as Locale })
            })
            return
          }
        }
      } catch { /* fallback below */ }
      startTransition(() => {
        router.replace(`/blog/categories/${currentSlug}`, { locale: newLocale as Locale })
      })
      return
    }

    if (isBlogAuthor && currentSlug) {
      try {
        const response = await fetch(
          `/api/blog/author-localizations?slug=${encodeURIComponent(currentSlug)}&locale=${locale}`
        )
        if (response.ok) {
          const data = await response.json()
          const localization = data.localizations?.find(
            (loc: { locale: string; slug: string }) => loc.locale === newLocale
          )
          if (localization?.slug) {
            startTransition(() => {
              router.replace(`/blog/author/${localization.slug}`, { locale: newLocale as Locale })
            })
            return
          }
        }
      } catch { /* fallback below */ }
      startTransition(() => router.replace("/blog", { locale: newLocale as Locale }))
      return
    }

    startTransition(() => {
      const dynamicParams: Record<string, string> = {}
      Object.entries(params).forEach(([key, value]) => {
        if (key !== "locale" && value) {
          dynamicParams[key] = Array.isArray(value) ? value.join("/") : value
        }
      })

      if (Object.keys(dynamicParams).length > 0) {
        router.replace(
          // @ts-expect-error -- TypeScript no infiere correctamente
          { pathname, params: dynamicParams },
          { locale: newLocale as Locale }
        )
      } else {
        router.replace(pathname, { locale: newLocale as Locale })
      }
    })
  }

  return (
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>

      {/* ── Trigger ─────────────────────────────────────────────────── */}
      <DropdownMenuTrigger asChild>
        <button
          type="button"
          disabled={isPending}
          aria-label={tNav("changeLanguage")}
          className={cn(
            buttonVariants({ variant: "ghost", size: "sm" }),
            "h-9 gap-2 px-3 rounded-xl border border-border bg-card",
            "hover:bg-accent hover:border-primary/30 hover:shadow-pet",
            "transition-all duration-200",
            "focus-visible:ring-2 focus-visible:ring-ring",
            "data-[state=open]:border-primary/40 data-[state=open]:bg-accent"
          )}
        >
          <span className="text-base leading-none" aria-hidden="true">
            {currentLanguage?.flag}
          </span>
          <span className="text-sm font-medium text-foreground/80 hidden sm:inline">
            {currentLanguage?.name}
          </span>
          <ChevronDown
            className={`w-3.5 h-3.5 text-muted-foreground shrink-0 transition-transform duration-200 ${isOpen ? "rotate-180" : ""} ${isPending ? "animate-spin" : ""}`}
            aria-hidden="true"
          />
        </button>
      </DropdownMenuTrigger>

      {/* ── Dropdown ────────────────────────────────────────────────── */}
      <DropdownMenuContent
        align="end"
        sideOffset={8}
        className="w-44 p-1.5 rounded-xl border border-border shadow-pet"
      >
        {languages.map((language) => {
          const isActive = locale === language.code
          return (
            <DropdownMenuItem
              key={language.code}
              onClick={() => handleLanguageChange(language.code)}
              disabled={isActive || isPending}
              className={`
                flex items-center gap-3 px-3 py-2.5 rounded-lg cursor-pointer
                transition-colors duration-150
                ${isActive
                  ? "bg-primary/10 text-primary font-medium cursor-default"
                  : "text-foreground/80 hover:bg-accent hover:text-foreground"
                }
              `}
            >
              <span className="text-base leading-none" aria-hidden="true">
                {language.flag}
              </span>
              <span className="text-sm flex-1">{language.name}</span>
              {isActive && (
                <Check
                  className="w-3.5 h-3.5 text-primary shrink-0"
                  aria-hidden="true"
                />
              )}
            </DropdownMenuItem>
          )
        })}
      </DropdownMenuContent>

    </DropdownMenu>
  )
}