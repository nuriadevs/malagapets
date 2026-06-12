"use client"

import { useTranslations } from "next-intl"
import Image from "next/image"
import { Link } from "@/i18n/navigation"
import { socialLinks } from "@/data/social-links"
import { CurrentYear } from "@/components/ui/timestamp"
import type { NavigationLink } from "@/types/navigation"
import { CONTACT_EMAIL } from "@/lib/constants"
import { Heart, Mail } from "lucide-react"

export function Footer() {
  const tApp = useTranslations("app")
  const tFooter = useTranslations("footer")
  const t = useTranslations("homepage")
  const tAccess = useTranslations("accessibility.footer")
  const tNav = useTranslations("navigation")

  const navigationItems: NavigationLink[] = tNav.raw("links") as NavigationLink[]


  return (
    <footer
      className="relative w-full border-t border-border"
      id="contacto"
    >
      <div className="container-app">

        <div className="py-14 sm:py-16 lg:py-20 grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8 xl:gap-12">

          <div className="sm:col-span-2 lg:col-span-1 space-y-6">

            <Link
              href="/"
              className="inline-flex items-center gap-3 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-lg"
              aria-label={tAccess("homeLink", { title: tApp("title") })}
            >
              <div className="w-12 h-12 bg-card border border-border rounded-xl flex items-center justify-center shrink-0 shadow-sm group-hover:shadow-pet transition-all duration-300 group-hover:-translate-y-0.5">
                <Image
                  src="/images/icon.svg"
                  alt=""
                  aria-hidden="true"
                  width={36}
                  height={36}
                  className="w-7 h-7 object-contain"
                  priority
                  quality={75}
                />
              </div>
              <span className="text-xl font-bold tracking-tight text-foreground group-hover:text-gradient-primary transition-all duration-300">
                {tApp("title")}
              </span>
            </Link>

            <p className="text-sm text-muted-foreground leading-relaxed max-w-xs">
              {t("subtitle.part1")}
              <span className="text-primary-text font-semibold">
                {t("subtitle.highlight")}
              </span>
              {t("subtitle.part2")}
            </p>

            <nav aria-label={tAccess("socialNav")}>
              <p className="text-xs font-semibold uppercase tracking-widest text-foreground/60 mb-3">
                {tFooter("social.followUs")}
              </p>
              <ul className="flex items-center gap-2">
                {socialLinks.map((link) => (
                  <li key={link.href}>
                    <a
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={link.label}
                      className="
            group/icon flex items-center justify-center w-10 h-10 sm:w-9 sm:h-9 rounded-xl
            border border-border bg-card
            hover:bg-gradient-brand hover:border-transparent hover:shadow-pet
            transition-all duration-300 hover:-translate-y-0.5
            focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring
          "
                    >
                      <link.icon
                        className="w-4 h-4 text-muted-foreground group-hover/icon:text-primary-text transition-colors duration-300"
                        aria-hidden="true"
                      />
                    </a>
                  </li>
                ))}

                <li>
                  <a
                    href={`mailto:${CONTACT_EMAIL}`}
                    aria-label={tFooter("contact.emailLabel")}
                    className="
          group/mail flex items-center justify-center w-10 h-10 sm:w-9 sm:h-9 rounded-xl
          border border-border bg-card
          hover:bg-gradient-brand hover:border-transparent hover:shadow-pet
          transition-all duration-300 hover:-translate-y-0.5
          focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring
        "
                  >
                    <Mail
                      className="w-4 h-4 text-muted-foreground group-hover/mail:text-primary-text transition-colors duration-300"
                      aria-hidden="true"
                    />
                  </a>
                </li>
              </ul>
            </nav>
          </div>

          <div className="space-y-5">
            <h3 className="text-xs font-bold uppercase tracking-widest text-foreground/60">
              {tFooter("sections.resources.title")}
            </h3>
            <nav aria-label={tAccess("explorer")}>
              <ul className="space-y-3">
                {navigationItems
                  .filter((item) => item.key === "explorer" || item.key === "directory")
                  .flatMap((item) =>
                    item.key === "directory" && item.submenu
                      ? item.submenu
                      : [item]
                  )
                  .map((item) => (
                    <li key={item.key}>
                      <Link
                        href={item.href}
                        className="
          group/link text-sm text-muted-foreground
          hover:text-foreground transition-colors duration-200
          inline-flex items-center gap-1.5
        "
                      >
                        <span className="w-0 group-hover/link:w-2 h-px bg-primary transition-all duration-300 shrink-0" aria-hidden="true" />
                        {tNav(item.labelKey)}
                      </Link>
                    </li>
                  ))}
              </ul>
            </nav>
          </div>

          <div className="space-y-5">
            <h3 className="text-xs font-bold uppercase tracking-widest text-foreground/60">
              {tFooter("sections.blog.title")}
            </h3>
            <nav aria-label={tAccess("blogNav")}>
              <ul className="space-y-3">
                {[
                  { href: "/blog", label: tNav("allPosts") },
                  { href: "/blog/categorias", label: tNav("categories") },
                  { href: "/blog/buscar", label: tNav("search") },
                ].map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className="
                        group/link text-sm text-muted-foreground
                        hover:text-foreground transition-colors duration-200
                        inline-flex items-center gap-1.5
                      "
                    >
                      <span className="w-0 group-hover/link:w-2 h-px bg-primary transition-all duration-300 shrink-0" aria-hidden="true" />
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>

          <div className="space-y-5">
            <h3 className="text-xs font-bold uppercase tracking-widest text-foreground/60">
              {tFooter("sections.legal.title")}
            </h3>
            <nav aria-label={tAccess("legalNav")}>
              <ul className="space-y-3">
                {navigationItems
                  .find((item) => item.key === "legal")
                  ?.submenu?.map((item) => (
                    <li key={item.key}>
                      <Link
                        href={item.href}
                        className="
                group/link text-sm text-muted-foreground
                hover:text-foreground transition-colors duration-200
                inline-flex items-center gap-1.5
              "
                      >
                        <span className="w-0 group-hover/link:w-2 h-px bg-primary transition-all duration-300 shrink-0" aria-hidden="true" />
                        {tNav(item.labelKey)}
                      </Link>
                    </li>
                  ))}
              </ul>
            </nav>
          </div>

        </div>

        <hr className="divider-section" aria-hidden="true" />

        <div className="py-8 flex flex-col xs:flex-row items-center justify-between gap-2">

          <p className="text-sm text-muted-foreground text-center">
            © <CurrentYear />{" "}
            <span className="text-gradient-primary font-semibold">
              {tApp("title")}
            </span>
          </p>

          <p className="text-xs text-muted-foreground text-center inline-flex items-center justify-center gap-1.5 flex-wrap">
            {tFooter("credit.madeWith")}
            <Heart className="w-3.5 h-3.5 text-primary-text fill-primary animate-pulse" aria-hidden="true" />
            {tFooter("credit.by")}{" "}
            <a
              href="https://nuriavazquez.dev/"
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-primary-text hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded"
            >
              {tFooter("credit.author")}
            </a>
          </p>
        </div>
      </div>
    </footer >
  )
}