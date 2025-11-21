"use client";

import { useState, useRef, useEffect } from "react";
import { NavigationLink } from "@/types/navigation";
import { Link, usePathname } from "@/i18n/navigation";
import { useTranslations } from "next-intl";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
  DrawerClose,
} from "@/components/ui/drawer";
import { MenuIcon, X, ChevronDown } from "lucide-react";
import { Timestamp } from "@/components/ui/timestamp";
import { useKeyboardNavigation } from "@/hooks/use-keyboard-navigation";

/**
 * Mobile navigation component.
 * @returns {JSX.Element}
 */
export function MobileNav() {
  const [isOpen, setIsOpen] = useState(false);
  const [announcementText, setAnnouncementText] = useState("");
  const [expandedSubmenu, setExpandedSubmenu] = useState<string | null>(null);
  const pathname = usePathname();
  const [firstElement, setFirstElement] = useState<HTMLElement | null>(null);
  const triggerRef = useRef<HTMLButtonElement | null>(null);

  const tNav = useTranslations("navigation");
  const tNameApp = useTranslations("app");

  const navigationItems: NavigationLink[] = tNav.raw(
    "links"
  ) as NavigationLink[];

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => firstElement?.focus(), 100);
      setAnnouncementText(tNav("menuOpened"));
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
      setAnnouncementText(tNav("menuClosed"));
      setExpandedSubmenu(null); // Reset submenu when closing
      setTimeout(() => triggerRef.current?.focus(), 100);
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen, tNav, firstElement]);

  const closeDrawer = () => setIsOpen(false);

  useKeyboardNavigation({
    enabled: isOpen,
    selector: "[data-mobile-nav-link]",
    onEscape: closeDrawer,
  });

  const toggleSubmenu = (key: string) => {
    setExpandedSubmenu(expandedSubmenu === key ? null : key);
  };

  const isActiveGroup = (item: NavigationLink) => {
    if (pathname === item.href) return true;
    if (item.submenu) {
      return item.submenu.some(subItem => pathname === subItem.href);
    }
    return false;
  };

  return (
    <>
      <div aria-live="polite" aria-atomic="true" className="sr-only">
        {announcementText}
      </div>

      <Drawer direction="right" open={isOpen} onOpenChange={setIsOpen}>
        <DrawerTrigger asChild>
          <button
            ref={triggerRef}
            className="p-2 hover:bg-muted/50 rounded-lg transition-colors duration-200
                 focus:outline-none focus:ring-2 focus:ring-cyan-600 focus:ring-offset-2"
            aria-label={isOpen ? tNav("closeMenu") : tNav("openMenu")}
            aria-expanded={isOpen}
            aria-controls="mobile-navigation"
          >
            <MenuIcon
              size={24}
              className="text-foreground"
              aria-hidden="true"
            />
          </button>
        </DrawerTrigger>

        <DrawerContent
          className="h-full w-[280px] fixed right-0 top-0"
          aria-labelledby="mobile-nav-title"
        >
          <div className="flex flex-col h-full bg-background border-l border-border">
            {/* Header */}
            <DrawerHeader>
              <DrawerTitle className="sr-only">
                {tNav("mainNav")}
              </DrawerTitle>
              <DrawerDescription className="sr-only">
                {tNav("mobileNav")}
              </DrawerDescription>
              <div className="flex justify-end p-4">
                <DrawerClose asChild>
                  <button
                    className="p-2 hover:bg-muted/50 rounded-lg transition-colors duration-200
          focus:outline-none focus:ring-2 focus:ring-cyan-600 focus:ring-offset-2"
                    aria-label={tNav("closeMenu")}
                  >
                    <X
                      size={20}
                      className="text-muted-foreground"
                      aria-hidden="true"
                    />
                  </button>
                </DrawerClose>
              </div>
            </DrawerHeader>

            {/* Navigation */}
            <nav
              className="flex-1 px-4 py-2 overflow-y-auto"
              aria-label={tNav("mobileNav")}
              id="mobile-navigation"
            >
              <ul className="space-y-2">
                {navigationItems.map((item: NavigationLink, index: number) => {
                  const isActive = isActiveGroup(item);
                  const isFirst = index === 0;
                  const label = tNav(item.labelKey);
                  const hasSubmenu = item.submenu && item.submenu.length > 0;
                  const isSubmenuExpanded = expandedSubmenu === item.key;

                  if (hasSubmenu) {
                    return (
                      <li key={item.key}>
                        {/* Main menu item with submenu */}
                        <button
                          ref={isFirst ? setFirstElement : undefined}
                          onClick={() => toggleSubmenu(item.key)}
                          data-mobile-nav-link
                          tabIndex={isOpen ? 0 : -1}
                          aria-expanded={isSubmenuExpanded}
                          aria-controls={`submenu-${item.key}`}
                          className={`
                            w-full flex items-center justify-between px-4 py-3 rounded-lg
                            transition-all duration-200 font-medium text-left
                            focus:outline-none focus:ring-2 focus:ring-cyan-600 focus:ring-offset-2
                            ${
                              isActive
                                ? "text-cyan-600 bg-muted/50 font-semibold"
                                : "text-foreground/80 hover:text-cyan-600 hover:bg-muted/50"
                            }
                          `}
                        >
                          <span>{label}</span>
                          <ChevronDown
                            size={16}
                            className={`transition-transform duration-200 ${
                              isSubmenuExpanded ? 'rotate-180' : ''
                            }`}
                            aria-hidden="true"
                          />
                          {isActive && (
                            <span className="sr-only">
                              {" "}
                              {tNav("currentPage")}
                            </span>
                          )}
                        </button>

                        {/* Submenu */}
                        {isSubmenuExpanded && (
                          <ul 
                            id={`submenu-${item.key}`}
                            className="mt-2 ml-4 space-y-1 border-muted "
                          >
                            {item.submenu!.map((subItem) => {
                              const isSubActive = pathname === subItem.href;
                              const subLabel = tNav(subItem.labelKey);

                              return (
                                <li key={subItem.key}>
                                  <Link
                                    href={subItem.href}
                                    onClick={closeDrawer}
                                    aria-current={isSubActive ? "page" : undefined}
                                    data-mobile-nav-link
                                    tabIndex={isOpen ? 0 : -1}
                                    className={`
                                      flex items-center px-3 py-2 rounded-lg 
                                      transition-all duration-200 font-medium
                                      focus:outline-none focus:ring-2 focus:ring-cyan-600 focus:ring-offset-2
                                      ${
                                        isSubActive
                                          ? "text-cyan-600 bg-muted/50 font-semibold"
                                          : "text-foreground/70 hover:text-cyan-600 hover:bg-muted/30"
                                      }
                                    `}
                                  >
                                    {subLabel}
                                    {isSubActive && (
                                      <span className="sr-only">
                                        {" "}
                                        {tNav("currentPage")}
                                      </span>
                                    )}
                                  </Link>
                                </li>
                              );
                            })}
                          </ul>
                        )}
                      </li>
                    );
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
                          flex items-center px-4 py-3 rounded-lg
                          transition-all duration-200 font-medium
                          focus:outline-none focus:ring-2 focus:ring-cyan-600 focus:ring-offset-2
                          ${
                            isActive
                              ? "text-cyan-600 bg-muted/50 font-semibold"
                              : "text-foreground/80 hover:text-cyan-600 hover:bg-muted/50"
                          }
                        `}
                      >
                        {label}
                        {isActive && (
                          <span className="sr-only">
                            {" "}
                            {tNav("currentPage")}
                          </span>
                        )}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </nav>

            {/* Footer */}
            <div className="p-4 border-t border-border bg-muted/20">
              <div className="flex items-center justify-center">
                <p className="text-xs text-muted-foreground flex items-center">
                  © <Timestamp />  {tNameApp("title")}
                </p>
              </div>
            </div>
          </div>
        </DrawerContent>
      </Drawer>
    </>
  );
}