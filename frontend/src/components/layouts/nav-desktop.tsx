"use client";

import { useTranslations } from "next-intl";
import { NavigationLink } from "@/types/navigation";
import { Link, usePathname } from "@/i18n/navigation";
import { useKeyboardNavigation } from "@/hooks/use-keyboard-navigation";
import { useEffect, useState, useRef } from "react";
import { ChevronDown } from "lucide-react";

export const DesktopNav = () => {
  const tNav = useTranslations("navigation");
  const pathname = usePathname();
  const [enabled, setEnabled] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState<string | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Obtener los enlaces desde las traducciones
  const navigationItems: NavigationLink[] = tNav.raw("links") as NavigationLink[];

  useEffect(() => {
    setEnabled(true);
  }, []);

  // Cerrar dropdown al hacer click fuera
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDropdownOpen(null);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  useKeyboardNavigation({
    enabled,
    selector: "[data-desktop-nav-link]",
    orientation: "horizontal",
  });

  const handleDropdownToggle = (key: string) => {
    setDropdownOpen(dropdownOpen === key ? null : key);
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
      <nav aria-label={tNav("mainNav")} className="flex items-center">
        <ul className="flex items-center space-x-6 lg:space-x-6 ">
          {navigationItems.map((item: NavigationLink) => {
            const isActive = isActiveGroup(item);
            const label = tNav(item.labelKey);
            const hasSubmenu = item.submenu && item.submenu.length > 0;

            if (hasSubmenu) {
              return (
                <li key={item.key} className="relative">
                  <div ref={dropdownOpen === item.key ? dropdownRef : null}>

                    <button
                      onClick={() => handleDropdownToggle(item.key)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' || e.key === ' ') {
                          e.preventDefault();
                          handleDropdownToggle(item.key);
                        }
                      }}
                      data-desktop-nav-link
                      className={`
                        flex items-center px-3 py-3 text-lg font-medium rounded-lg
                        transition-colors duration-300 ease-in-out
                        focus:outline-none focus:ring-2 focus:ring-cyan-600 focus:ring-offset-2
                        ${isActive
                          ? "text-cyan-600 bg-muted/50 font-semibold"
                          : "text-foreground/80 hover:text-cyan-600 hover:bg-muted/50"
                        }
                      `}
                      aria-expanded={dropdownOpen === item.key}
                      aria-haspopup="true"
                    >
                      {label}
                      <ChevronDown
                        className={`ml-1 h-4 w-4 transition-transform duration-200 ${dropdownOpen === item.key ? 'rotate-180' : ''
                          }`}
                      />
                      {isActive && (
                        <span className="sr-only">{tNav("currentPage")}</span>
                      )}
                    </button>

                    {/* Dropdown Menu */}
                    {dropdownOpen === item.key && (
                      <div className="absolute left-0 mt-2 w-48 bg-background border border-border rounded-lg shadow-lg z-50">
                        <ul className="py-2">
                          {item.submenu!.map((subItem) => {
                            const isSubActive = pathname === subItem.href;
                            const subLabel = tNav(subItem.labelKey);

                            return (
                              <li key={subItem.key}>
                                <Link
                                  href={subItem.href}
                                  onClick={() => setDropdownOpen(null)}
                                  className={`
                                    block px-4 py-2 text-sm font-medium
                                    transition-colors duration-200
                                    ${isSubActive
                                      ? "text-cyan-600 bg-muted/50 font-semibold"
                                      : "text-foreground/80 hover:text-cyan-600 hover:bg-muted/50"
                                    }
                                  `}
                                  aria-current={isSubActive ? "page" : undefined}
                                >
                                  {subLabel}
                                  {isSubActive && (
                                    <span className="sr-only">{tNav("currentPage")}</span>
                                  )}
                                </Link>
                              </li>
                            );
                          })}
                        </ul>
                      </div>
                    )}
                  </div>
                </li>
              );
            }

            // Elemento de navegación normal (sin submenu)
            return (
              <li key={item.key} className="relative">
                <Link
                  href={item.href}
                  data-desktop-nav-link
                  aria-current={isActive ? "page" : undefined}
                  className={`whitespace-nowrap
      inline-flex items-center px-3 py-3 text-lg font-medium rounded-lg
      transition-colors duration-300 ease-in-out
      focus:outline-none focus:ring-2 focus:ring-cyan-600 focus:ring-offset-2
      ${isActive
                      ? "text-cyan-600 bg-muted/50 font-semibold"
                      : "text-foreground/80 hover:text-cyan-600 hover:bg-muted/50"
                    }
    `}
                >
                  {label}
                </Link>
              </li>

            );
          })}
        </ul>
      </nav>
    </>
  );
};