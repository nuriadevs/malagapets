"use client"

import { useTranslations } from "next-intl"
import { Link, usePathname } from "@/i18n/navigation"
import { useKeyboardNavigation } from "@/hooks/use-keyboard-navigation"
import { useEffect, useState, useRef } from "react"
import { ChevronDown } from "lucide-react"
import type { NavigationLink } from "@/types/navigation"


export const DesktopNav = () => {
  const tNav = useTranslations("navigation")
  const pathname = usePathname()
  const [dropdownOpen, setDropdownOpen] = useState<string | null>(null)
  const dropdownRef = useRef<HTMLDivElement>(null)

  const navigationItems: NavigationLink[] = tNav.raw("links") as NavigationLink[]

  const visibleItems = navigationItems.filter(
    (item) => !["legal"].includes(item.key)
  )


  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDropdownOpen(null)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  useKeyboardNavigation({
    enabled: true,
    selector: "[data-desktop-nav-link]",
    orientation: "horizontal",
  })

  const handleDropdownToggle = (key: string) => {
    setDropdownOpen(dropdownOpen === key ? null : key)
  }

  const isActiveGroup = (item: NavigationLink) => {
    if (pathname === item.href) return true
    if (item.submenu) {
      return item.submenu.some((sub) => pathname === sub.href)
    }
    return false
  }

  return (
    <nav aria-label={tNav("mainNav")} className="flex items-center">
      <ul className="flex items-center gap-1">

        {visibleItems.map((item: NavigationLink) => {
          const isActive = isActiveGroup(item)
          const label = tNav(item.labelKey)
          const hasSubmenu = item.submenu && item.submenu.length > 0

          if (hasSubmenu) {
            return (
              <li key={item.key} className="relative">
                <div ref={dropdownOpen === item.key ? dropdownRef : null}>

                  <button
                    onClick={() => handleDropdownToggle(item.key)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") {
                        e.preventDefault()
                        handleDropdownToggle(item.key)
                      }
                    }}
                    data-desktop-nav-link
                    aria-expanded={dropdownOpen === item.key}
                    aria-haspopup="menu"
                    className={`
                      group relative flex items-center gap-1.5 px-4 py-2.5 rounded-lg text-base font-medium
                      transition-all duration-200
                      focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2
                      ${isActive
                        ? "text-primary-text"
                        : "text-foreground/70 hover:text-foreground"
                      }
                    `}
                  >
                    <span
                      className="absolute inset-0 rounded-lg bg-accent opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                      aria-hidden="true"
                    />

                    <span className="relative">{label}</span>
                    <ChevronDown
                      className={`relative w-4 h-4 transition-transform duration-200 ${dropdownOpen === item.key ? "rotate-180" : ""}`}
                      aria-hidden="true"
                    />


                    {isActive && (
                      <span
                        className="absolute bottom-0.5 left-3 right-3 h-0.5 rounded-full bg-primary"
                        aria-hidden="true"
                      />
                    )}
                    {isActive && <span className="sr-only">{tNav("currentPage")}</span>}
                  </button>

                  {dropdownOpen === item.key && (
                    <div className="absolute left-0 top-full mt-2 w-45 z-50 animate-slide-down">
                      <div className="rounded-xl border border-border bg-popover shadow-pet p-1.5">
                        <ul>
                          {item.submenu!.map((subItem) => {
                            const isSubActive = pathname === subItem.href
                            const subLabel = tNav(subItem.labelKey)
                            return (
                              <li key={subItem.key}>
                                <Link
                                  href={subItem.href}
                                  onClick={() => setDropdownOpen(null)}
                                  aria-current={isSubActive ? "page" : undefined}
                                  className={`
                                    group/sub flex items-center gap-2 px-3 py-2.5 rounded-lg text-sm font-medium
                                    transition-colors duration-150
                                    ${isSubActive
                                      ? "text-primary font-semibold bg-primary/10"
                                      : "text-foreground/75 hover:text-foreground hover:bg-accent"
                                    }
                                  `}
                                >
                                  <span
                                    className="w-0 group-hover/sub:w-1.5 h-px bg-primary transition-all duration-200 shrink-0"
                                    aria-hidden="true"
                                  />
                                  {subLabel}
                                  {isSubActive && <span className="sr-only">{tNav("currentPage")}</span>}
                                </Link>
                              </li>
                            )
                          })}
                        </ul>
                      </div>
                    </div>
                  )}
                </div>
              </li>
            )
          }

          return (
            <li key={item.key} className="relative">
              <Link
                href={item.href}
                data-desktop-nav-link
                aria-current={isActive ? "page" : undefined}
                className={`
                  group relative flex items-center px-4 py-2.5 rounded-lg text-base font-medium
                  transition-all duration-200
                  focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2
                  ${isActive
                    ? "text-primary-text"
                    : "text-foreground/70 hover:text-foreground"
                  }
                `}
              >
                <span
                  className="absolute inset-0 rounded-lg bg-accent opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                  aria-hidden="true"
                />
                <span className="relative">{label}</span>

                {isActive && (
                  <span
                    className="absolute bottom-0.5 left-3 right-3 h-0.5 rounded-full bg-primary"
                    aria-hidden="true"
                  />
                )}
                {isActive && <span className="sr-only">{tNav("currentPage")}</span>}
              </Link>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}