"use client";
import { Dot } from "lucide-react"
import { useTranslations } from "next-intl";
import Image from "next/image";
import { Link, usePathname } from "@/i18n/navigation";
import { socialLinks } from "@/data/social-links";
import { contactData } from "@/data/footer-data";
import { Timestamp } from "@/components/ui/timestamp";
import { NavigationLink } from "@/types/navigation";
import { ChevronDown } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

/**
 * Footer component.
 */
export function Footer() {
  const tApp = useTranslations("app");
  const tFooter = useTranslations("footer");
  const t = useTranslations("homepage");
  const tAccess = useTranslations("accessibility.footer");
  const tNav = useTranslations("navigation");
  const pathname = usePathname();

  const navigationItems: NavigationLink[] = tNav.raw(
    "links"
  ) as NavigationLink[];

  const isActiveGroup = (item: NavigationLink) => {
    if (pathname === item.href) return true;
    if (item.submenu) {
      return item.submenu.some(subItem => pathname === subItem.href);
    }
    return false;
  };

  return (
    <footer aria-label={tAccess("footerLabel")} >
      <div className="flex mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        {/* Main Content */}
        <div className="border-t py-10 sm:py-12 lg:py-16 w-full">
          <div className=" flex flex-col md:flex-row md:justify-between md:items-start gap-8 sm:gap-10 lg:gap-12 xl:gap-16">
            {/* Logo */}
            <div className="md:w-80 md:flex-shrink-0 space-y-6">
              <div className="w-14 h-14 lg:w-14 lg:h-14 bg-card border rounded-lg flex items-center justify-center">
                <Image
                  src="/images/pets.png"
                  alt="Logo MálagaPets"
                  width={40}
                  height={40}
                  className="w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 object-contain mr-2 sm:mr-2"
                  priority
                  quality={40}
                />
              </div>
              <p className="text-foreground/80 leading-relaxed text-sm sm:text-base">
                <>
                  {t("subtitle.part1")}
                  <span className="text-cyan-600 font-bold">{t("subtitle.highlight")}</span>
                  {t("subtitle.part2")}
                </>
              </p>
              {/* Social Links */}
              <nav aria-label={tAccess("socialNav")}>
                <ul className="flex space-x-2">
                  <p className="text-foreground/80" >{tFooter("social.followUs")}</p>
                  {socialLinks.map((link) => (
                    <li key={link.href}>
                      <a
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={link.label}
                        className="text-cyan-600 hover:text-cyan-500 focus:text-cyan-600 transition-all duration-200 transform hover:scale-110 focus:outline-none"
                      >
                        <link.icon className="w-5 h-5 md:w-6 md:h-6" />
                      </a>
                    </li>
                  ))}
                </ul>
              </nav>
            </div>

            {/* Links Section */}
            <div className="space-y-4 sm:space-y-6">
              <h3 className="text-cyan-600 font-bold text-xl md:text-2xl lg:text-3xl">
                {tFooter("navigation.title")}
              </h3>
              <nav aria-label={tAccess("mainLinksNav")}>
                <ul className="space-y-3">
                  {navigationItems.map((item: NavigationLink) => {
                    const isActive = isActiveGroup(item);
                    const label = tNav(item.labelKey);
                    const hasSubmenu = item.submenu && item.submenu.length > 0;

                    if (hasSubmenu) {
                      return (
                        <li key={item.key}>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <button
                                className={`
                                  group flex items-center gap-1 text-sm sm:text-base 
                                  transition-colors duration-200
                                  focus:outline-none focus:ring-2 focus:ring-cyan-600/50 focus:ring-offset-2
                                  focus:ring-offset-background rounded-sm py-1
                                  ${isActive
                                    ? "text-cyan-600"
                                    : "text-foreground/80 hover:text-cyan-600"
                                  }
                                `}
                              >
                                {label}
                                <ChevronDown className="h-3 w-3 transition-transform group-data-[state=open]:rotate-180" />
                              </button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent
                              align="start"
                              side="top"
                              className="min-w-[200px]"
                            >
                              {item.submenu!.map((subItem) => {
                                const isSubActive = pathname === subItem.href;
                                const subLabel = tNav(subItem.labelKey);

                                return (
                                  <DropdownMenuItem key={subItem.key} asChild>
                                    <Link
                                      href={subItem.href}
                                      className={`
                                        cursor-pointer transition-colors duration-200
                                        ${isSubActive
                                          ? "text-cyan-600 bg-accent/50"
                                          : "text-foreground/80 hover:text-cyan-600"
                                        }
                                      `}
                                    >
                                      {subLabel}
                                      {isSubActive && (
                                        <span className="sr-only">{tNav("currentPage")}</span>
                                      )}
                                    </Link>
                                  </DropdownMenuItem>
                                );
                              })}
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </li>
                      );
                    }

                    // Enlace normal sin submenu
                    return (
                      <li key={item.key}>
                        <Link
                          href={item.href}
                          aria-current={isActive ? "page" : undefined}
                          className={`
                            block text-sm sm:text-base transition-colors duration-200
                            focus:outline-none focus:ring-2 focus:ring-success/50 focus:ring-offset-2
                            focus:ring-offset-background rounded-sm py-1 leading-normal
                            ${isActive
                              ? "text-cyan-600"
                              : "text-foreground/80 hover:text-cyan-600"
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
            </div>

            {/* Contact Section */}
            <div className="space-y-4 sm:space-y-6">
              <h3 className="text-cyan-600 font-bold text-xl md:text-2xl lg:text-3xl">
                {tFooter("contact.title")}
              </h3>
              <ul className="space-y-3">
                {contactData.map((item, index) => (
                  <li
                    key={index}
                    className="flex items-center gap-3 min-h-[28px]"
                  >
                    <item.icon className="flex-shrink-0 text-cyan-600 w-5 h-5" />
                    <div className="min-w-0 flex-1">
                      {item.href ? (
                        <a
                          href={item.href}
                          className={`text-foreground/80 hover:text-cyan-600 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-success/50 focus:ring-offset-2 rounded-sm py-1 inline-block leading-normal ${item.type === "email" ? "break-all" : ""
                            }`}
                        >
                          {item.text}
                        </a>
                      ) : (
                        <span className="text-foreground/80 leading-normal text-sm sm:text-base">
                          {item.text}
                        </span>
                      )}
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Footer bottom */}
          <div className="border-t py-6 sm:py-8 mt-10 sm:mt-12 lg:mt-16">
            <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
              <p className="text-muted-foreground text-sm sm:text-base flex items-center gap-1 text-center sm:text-left">
                © <Timestamp /> {tApp("title")} 
              </p>
              <div className="flex flex-wrap justify-center sm:justify-end items-center gap-2 sm:gap-3">
                <Link
                  href="/legal/privacy"
                  className="text-muted-foreground hover:text-cyan-600 transition-colors duration-300"
                >
                  {tFooter("legal.privacity")}
                </Link>
                <Dot className="w-5 h-5 text-muted-foreground/50" />
                <Link
                  href="/legal/terms"
                  className="text-muted-foreground hover:text-cyan-600 transition-colors duration-300"
                >
                  {tFooter("legal.terms")}
                </Link>
                <Dot className="w-5 h-5 text-muted-foreground/50" />
                <Link
                  href="/legal/cookies"
                  className="text-muted-foreground hover:text-cyan-600 transition-colors duration-300"
                >
                  {tFooter("legal.cookies")}
                </Link>
              </div>
            </div>
          </div>

        </div>
      </div>
    </footer>
  );
}