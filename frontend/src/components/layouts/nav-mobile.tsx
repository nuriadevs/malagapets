"use client"

import { useState, useRef, useEffect } from "react"
import { Link, usePathname } from "@/i18n/navigation"
import { useTranslations } from "next-intl"
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
  DrawerClose,
} from "@/components/ui/drawer"
import { Menu, X, ChevronDown } from "lucide-react"
import { useKeyboardNavigation } from "@/hooks/use-keyboard-navigation"
import type { NavigationLink } from "@/types/navigation"


export function MobileNav() {
  const [isOpen, setIsOpen] = useState(false)
  const [expandedSubmenu, setExpandedSubmenu] = useState<string | null>(null)
  const pathname = usePathname()
  const [firstElement, setFirstElement] = useState<HTMLElement | null>(null)
  const triggerRef = useRef<HTMLButtonElement | null>(null)

  const tNav = useTranslations("navigation")
  const tApp = useTranslations("app")

  const navigationItems: NavigationLink[] = tNav.raw("links") as NavigationLink[]

  const visibleItems = navigationItems.filter(
    (item) => !["legal"].includes(item.key)
  )

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => firstElement?.focus(), 100)
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "unset"
      setTimeout(() => triggerRef.current?.focus(), 100)
    }
    return () => { document.body.style.overflow = "unset" }
  }, [isOpen, firstElement])

  const closeDrawer = () => setIsOpen(false)

  useKeyboardNavigation({
    enabled: isOpen,
    selector: "[data-mobile-nav-link]",
    onEscape: closeDrawer,
  })

  const toggleSubmenu = (key: string) => {
    setExpandedSubmenu(expandedSubmenu === key ? null : key)
  }

  const isActiveGroup = (item: NavigationLink) => {
    if (pathname === item.href) return true
    if (item.submenu) return item.submenu.some((sub) => pathname === sub.href)
    return false
  }

  return (
    <Drawer direction="right" open={isOpen} onOpenChange={setIsOpen}>

      <DrawerTrigger asChild>
        <button
          ref={triggerRef}
          className={`
            p-2 rounded-xl border transition-all duration-200
            focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2
            ${isOpen
              ? "bg-primary/10 border-primary/30 text-primary shadow-pet"
              : "bg-transparent border-transparent text-foreground/70 hover:bg-accent hover:border-border hover:text-foreground"
            }
          `}
          aria-label={isOpen ? tNav("closeMenu") : tNav("openMenu")}
          aria-expanded={isOpen}
          aria-controls="mobile-navigation"
        >
          {isOpen
            ? <X size={22} aria-hidden="true" />
            : <Menu size={22} aria-hidden="true" />
          }
        </button>
      </DrawerTrigger>

      <DrawerContent
        className="h-full w-72 fixed right-0 top-0"
        aria-labelledby="mobile-nav-title"
      >
        <div className="flex flex-col h-full bg-background border-l border-border">

          <DrawerHeader className="p-0">
            <DrawerTitle className="sr-only">{tNav("mainNav")}</DrawerTitle>
            <DrawerDescription className="sr-only">{tNav("mobileNav")}</DrawerDescription>

            <div className="flex items-center justify-between px-5 py-4 border-b border-border">
              <span className="text-base font-bold text-foreground tracking-tight">
                {tApp("title")}
              </span>
              <DrawerClose asChild>
                <button
                  className="
                    p-1.5 rounded-lg border border-transparent text-muted-foreground
                    hover:bg-accent hover:border-border hover:text-foreground
                    transition-all duration-200
                    focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring
                  "
                  aria-label={tNav("closeMenu")}
                >
                  <X size={18} aria-hidden="true" />
                </button>
              </DrawerClose>
            </div>
          </DrawerHeader>

          <nav
            className="flex-1 px-3 py-4 overflow-y-auto"
            aria-label={tNav("mobileNav")}
            id="mobile-navigation"
          >
            <ul className="space-y-1">
              {visibleItems.map((item: NavigationLink, index: number) => {
                const isActive = isActiveGroup(item)
                const isFirst = index === 0
                const label = tNav(item.labelKey)
                const hasSubmenu = item.submenu && item.submenu.length > 0
                const isSubmenuExpanded = expandedSubmenu === item.key

                if (hasSubmenu) {
                  return (
                    <li key={item.key}>
                      <button
                        ref={isFirst ? setFirstElement : undefined}
                        onClick={() => toggleSubmenu(item.key)}
                        data-mobile-nav-link
                        tabIndex={isOpen ? 0 : -1}
                        aria-expanded={isSubmenuExpanded}
                        aria-controls={`submenu-${item.key}`}
                        className={`
                          w-full flex items-center justify-between px-4 py-3 rounded-xl text-base font-medium text-left
                          transition-all duration-200 border-l-2
                          focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2
                          ${isActive
                            ? "text-primary bg-primary/8 border-primary"
                            : "text-foreground/75 hover:text-foreground hover:bg-accent border-transparent"
                          }
                        `}
                      >
                        <span>{label}</span>
                        <ChevronDown
                          size={15}
                          className={`text-muted-foreground transition-transform duration-200 ${isSubmenuExpanded ? "rotate-180" : ""}`}
                          aria-hidden="true"
                        />
                        {isActive && <span className="sr-only">{tNav("currentPage")}</span>}
                      </button>

                      {isSubmenuExpanded && (
                        <ul
                          id={`submenu-${item.key}`}
                          className="mt-1 ml-3 pl-3 border-l border-border/50 space-y-0.5"
                        >
                          {item.submenu!.map((subItem) => {
                            const isSubActive = pathname === subItem.href
                            const subLabel = tNav(subItem.labelKey)
                            return (
                              <li key={subItem.key}>
                                <Link
                                  href={subItem.href}
                                  onClick={closeDrawer}
                                  aria-current={isSubActive ? "page" : undefined}
                                  data-mobile-nav-link
                                  tabIndex={isOpen ? 0 : -1}
                                  className={`
                                    flex items-center px-3 py-2.5 rounded-lg text-sm
                                    transition-all duration-200
                                    focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2
                                    ${isSubActive
                                      ? "text-primary font-semibold bg-primary/8"
                                      : "text-muted-foreground hover:text-foreground hover:bg-accent"
                                    }
                                  `}
                                >
                                  {subLabel}
                                  {isSubActive && <span className="sr-only">{tNav("currentPage")}</span>}
                                </Link>
                              </li>
                            )
                          })}
                        </ul>
                      )}
                    </li>
                  )
                }

                return (
                  <li key={item.key}>
                    <Link
                      ref={isFirst ? setFirstElement : undefined}
                      href={item.href}
                      onClick={closeDrawer}
                      aria-current={isActive ? "page" : undefined}
                      data-mobile-nav-link
                      tabIndex={isOpen ? 0 : -1}
                      className={`
                        flex items-center px-4 py-3 rounded-xl text-base font-medium
                        transition-all duration-200 border-l-2
                        focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2
                        ${isActive
                          ? "text-primary bg-primary/8 border-primary"
                          : "text-foreground/75 hover:text-foreground hover:bg-accent border-transparent"
                        }
                      `}
                    >
                      {label}
                      {isActive && <span className="sr-only">{tNav("currentPage")}</span>}
                    </Link>
                  </li>
                )
              })}
            </ul>
          </nav>

          <div className="px-5 py-4 border-t border-border bg-muted/20">
            <p className="text-xs text-muted-foreground text-center">
              © {tApp("title")}
            </p>
          </div>

        </div>
      </DrawerContent>
    </Drawer>
  )
}