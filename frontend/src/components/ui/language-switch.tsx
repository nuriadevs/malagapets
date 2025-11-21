// src/components/language-switch.tsx
"use client";

import { useState, useTransition } from "react";
import { useLocale } from "next-intl";
import { useParams } from "next/navigation";
import { ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useRouter, usePathname } from "@/i18n/navigation";
import { Locale } from "@/i18n/routing";

const languages = [
  { code: "es", name: "Español", flag: "🇪🇸" },
  { code: "en", name: "English", flag: "🇬🇧" },
  { code: "de", name: "Deutschland", flag: "🇩🇪" },
  { code: "fr", name: "France", flag: "🇫🇷" },
] as const;

type LanguageCode = (typeof languages)[number]["code"];

export function LanguageSwitch() {
  const locale = useLocale() as Locale;
  const pathname = usePathname();
  const router = useRouter();
  const params = useParams();

  const [isOpen, setIsOpen] = useState(false);
  const [isPending, startTransition] = useTransition();

  const currentLanguage = languages.find((lang) => lang.code === locale);

  const handleLanguageChange = async (newLocale: LanguageCode) => {
    if (newLocale === locale) {
      setIsOpen(false);
      return;
    }

    console.log('🔄 Cambio de idioma:', {
      from: locale,
      to: newLocale,
      pathname,
      params,
    });

    setIsOpen(false);

    const isBlogPost = pathname.includes('/blog/post/');
    const isBlogCategory = pathname.includes('/blog/categories/');
    const isBlogAuthor = pathname.includes('/blog/author/');
    const currentSlug = params.slug as string | undefined;

    // ========================================
    // 📝 BLOG POST
    // ========================================
    if (isBlogPost && currentSlug) {
      try {
        console.log('📝 Buscando versión localizada del artículo...');
        const response = await fetch(
          `/api/blog/localizations?slug=${encodeURIComponent(currentSlug)}&locale=${locale}`
        );

        if (response.ok) {
          const data = await response.json();

          if (data.currentLocale === newLocale) {
            startTransition(() => {
              router.replace(
                `/blog/post/${currentSlug}`,
                { locale: newLocale as Locale }
              );
            });
            return;
          }

          const localization = data.localizations?.find(
            (loc: { locale: string; slug: string }) => loc.locale === newLocale
          );

          if (localization && localization.slug) {
            console.log('✅ Versión localizada encontrada:', localization.slug);
            startTransition(() => {
              router.replace(
                `/blog/post/${localization.slug}`,
                { locale: newLocale as Locale }
              );
            });
            return;
          }
        }

        console.log('⚠️ No se encontró versión localizada, redirigiendo al blog');
        startTransition(() => {
          router.replace('/blog', { locale: newLocale as Locale });
        });
        return;
      } catch (error) {
        console.error('❌ Error al buscar localizaciones:', error);
        startTransition(() => {
          router.replace('/blog', { locale: newLocale as Locale });
        });
        return;
      }
    }

    // ========================================
    // 📂 CATEGORY
    // ========================================
    if (isBlogCategory && currentSlug) {
      try {
        console.log('📂 Buscando versión localizada de la categoría...');
        const response = await fetch(
          `/api/blog/category-localizations?slug=${encodeURIComponent(currentSlug)}&locale=${locale}`
        );
        
        if (response.ok) {
          const data = await response.json();
          const localization = data.localizations?.find(
            (loc: { locale: string; slug: string }) => loc.locale === newLocale
          );
          
          if (localization && localization.slug) {
            console.log('✅ Categoría localizada encontrada:', localization.slug);
            startTransition(() => {
              router.replace(
                `/blog/categories/${localization.slug}`,
                { locale: newLocale as Locale }
              );
            });
            return;
          }
        }
        
        console.log('⚠️ Usando mismo slug para categoría');
        startTransition(() => {
          router.replace(
            `/blog/categories/${currentSlug}`,
            { locale: newLocale as Locale }
          );
        });
        return;
      } catch (error) {
        console.error('❌ Error al buscar categoría:', error);
        startTransition(() => {
          router.replace(
            `/blog/categories/${currentSlug}`,
            { locale: newLocale as Locale }
          );
        });
        return;
      }
    }

    // ========================================
    // 👤 AUTHOR - ✅ VERSIÓN CORREGIDA
    // ========================================
    if (isBlogAuthor && currentSlug) {
      try {
        console.log('👤 Buscando versión localizada del autor...');
        console.log('   • Slug actual:', currentSlug);
        console.log('   • Idioma actual:', locale);
        console.log('   • Idioma destino:', newLocale);

        const response = await fetch(
          `/api/blog/author-localizations?slug=${encodeURIComponent(currentSlug)}&locale=${locale}`
        );

        if (response.status === 200) {
          const data = await response.json();
          console.log('📦 Respuesta de localizaciones:', data);
          const localization = data.localizations?.find(
            (loc: { locale: string; slug: string }) => loc.locale === newLocale
          );
          if (localization && localization.slug) {
            console.log('✅ Autor localizado encontrado:', {
              locale: localization.locale,
              slug: localization.slug,
            });
            startTransition(() => {
              router.replace(
                `/blog/author/${localization.slug}`,
                { locale: newLocale as Locale }
              );
            });
            return;
          } else {
            console.log('⚠️ No se encontró localización para:', newLocale);
            console.log('   Localizaciones disponibles:', data.localizations);
          }
        } else if (response.status === 404) {
          console.warn('⚠️ Autor no existe en el idioma seleccionado, redirigiendo al blog');
          startTransition(() => {
            router.replace('/blog', { locale: newLocale as Locale });
          });
          return;
        } else {
          console.error('❌ Error en respuesta:', response.status);
          // Opcional: muestra un mensaje amigable al usuario
          startTransition(() => {
            router.replace('/blog', { locale: newLocale as Locale });
          });
          return;
        }

        // Si no se encuentra localización, ir al blog
        console.log('⚠️ Redirigiendo al blog por falta de localización');
        startTransition(() => {
          router.replace('/blog', { locale: newLocale as Locale });
        });
        return;
      } catch (error) {
        console.error('❌ Error al buscar localización de autor:', error);
        startTransition(() => {
          router.replace('/blog', { locale: newLocale as Locale });
        });
        return;
      }
    }

    // ========================================
    // 🌐 OTRAS PÁGINAS
    // ========================================
    startTransition(() => {
      const dynamicParams: Record<string, string> = {};

      Object.entries(params).forEach(([key, value]) => {
        if (key !== 'locale' && value) {
          dynamicParams[key] = Array.isArray(value) ? value.join('/') : value;
        }
      });

      if (Object.keys(dynamicParams).length > 0) {
        router.replace(
          // @ts-expect-error -- TypeScript no infiere correctamente
          { pathname, params: dynamicParams },
          { locale: newLocale as Locale }
        );
      } else {
        router.replace(pathname, { locale: newLocale as Locale });
      }
    });
  };

  return (
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          className="flex items-center space-x-2 px-3 py-2 bg-input/30 hover:bg-muted/50 focus:ring-2 focus:ring-cyan-600 focus:ring-offset-2 transition-all duration-200"
          aria-label="Cambiar idioma"
          disabled={isPending}
        >
          <span className="text-base" aria-hidden="true">
            {currentLanguage?.flag}
          </span>
          <span className="text-sm font-medium">{currentLanguage?.name}</span>
          <ChevronDown
            className={`w-4 h-4 transition-transform duration-200 ${
              isOpen ? "rotate-180" : ""
            } ${isPending ? "animate-spin" : ""}`}
            aria-hidden="true"
          />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-48" align="end" sideOffset={8}>
        {languages.map((language) => (
          <DropdownMenuItem
            key={language.code}
            onClick={() => handleLanguageChange(language.code)}
            disabled={locale === language.code || isPending}
            className={`flex items-center space-x-3 px-4 py-2 cursor-pointer transition-colors duration-150 ${
              locale === language.code
                ? "bg-cyan-50 dark:bg-cyan-900/40 text-cyan-700 dark:text-cyan-300 font-medium"
                : "text-foreground hover:bg-muted/50"
            }`}
          >
            <span className="text-lg" aria-hidden="true">
              {language.flag}
            </span>
            <span>{language.name}</span>
            {locale === language.code && (
              <div
                className="ml-auto w-2 h-2 bg-cyan-600 rounded-full"
                aria-label="Idioma actual"
              />
            )}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}