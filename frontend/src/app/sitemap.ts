// src/app/sitemap.ts
import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/constants";
import { getPathname } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";
import { getPosts } from "@/lib/blog/post-service";
import type { AppPathnames } from "@/i18n/routing";

type Locale = (typeof routing.locales)[number];

type StaticHref = Exclude<AppPathnames, `${string}[${string}]`>;

// ── Rutas estáticas con metadatos SEO ──────────────────────────
const STATIC_ROUTES: {
  href: StaticHref;
  priority: number;
  changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"];
}[] = [
  { href: "/", priority: 1.0, changeFrequency: "daily" },
  { href: "/explorer", priority: 0.9, changeFrequency: "weekly" },
  { href: "/directory", priority: 0.9, changeFrequency: "weekly" },
  { href: "/directory/veterinary", priority: 0.8, changeFrequency: "weekly" },
  { href: "/directory/parks", priority: 0.8, changeFrequency: "weekly" },
  { href: "/directory/beaches", priority: 0.8, changeFrequency: "weekly" },
  { href: "/blog", priority: 0.8, changeFrequency: "daily" },
  { href: "/blog/categories", priority: 0.7, changeFrequency: "weekly" },
  { href: "/blog/archive", priority: 0.6, changeFrequency: "monthly" },
  { href: "/legal", priority: 0.3, changeFrequency: "yearly" },
  { href: "/legal/privacy", priority: 0.3, changeFrequency: "yearly" },
  { href: "/legal/terms", priority: 0.3, changeFrequency: "yearly" },
  { href: "/legal/cookies", priority: 0.3, changeFrequency: "yearly" },
];

function buildUrl(href: StaticHref, locale: Locale): string {
  return `${SITE_URL}${getPathname({ locale, href })}`;
}

function buildAlternates(href: StaticHref) {
  const languages = Object.fromEntries(
    routing.locales.map((locale) => [locale, buildUrl(href, locale)]),
  );
  return {
    languages: {
      ...languages,
      "x-default": buildUrl(href, routing.defaultLocale),
    },
  };
}

function buildPostUrl(slug: string, locale: Locale): string {
  return `${SITE_URL}/${locale}/blog/post/${slug}`;
}

async function getAllDefaultLocalePosts() {
  const all = [];
  let page = 1;
  let pageCount = 1;

  do {
    const { data, pagination } = await getPosts(
      routing.defaultLocale,
      page,
      100,
    );
    pageCount = pagination.pageCount;
    all.push(...data);
    page++;
  } while (page <= pageCount);

  return all;
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // ── Estáticas: una entrada por ruta y por idioma ──────────────
  const staticEntries: MetadataRoute.Sitemap = STATIC_ROUTES.flatMap((route) =>
    routing.locales.map((locale) => ({
      url: buildUrl(route.href, locale),
      changeFrequency: route.changeFrequency,
      priority: route.priority,
      alternates: buildAlternates(route.href),
    })),
  );

  // ── Posts: una entrada por post y por idioma disponible ──────
  const postEntries: MetadataRoute.Sitemap = [];

  try {
    const posts = await getAllDefaultLocalePosts();

    for (const post of posts) {
      const slugByLocale = new Map<Locale, string>();
      slugByLocale.set(routing.defaultLocale, post.slug);

      for (const loc of post.localizations ?? []) {
        if (routing.locales.includes(loc.locale as Locale)) {
          slugByLocale.set(loc.locale as Locale, loc.slug);
        }
      }

      const languages = {
        ...Object.fromEntries(
          [...slugByLocale.entries()].map(([locale, slug]) => [
            locale,
            buildPostUrl(slug, locale),
          ]),
        ),
        "x-default": buildPostUrl(post.slug, routing.defaultLocale),
      };

      const lastModified = post.updatedAt
        ? new Date(post.updatedAt)
        : undefined;

      for (const [locale, slug] of slugByLocale) {
        postEntries.push({
          url: buildPostUrl(slug, locale),
          lastModified,
          changeFrequency: "monthly",
          priority: 0.7,
          alternates: { languages },
        });
      }
    }
  } catch (error) {
    console.error("Sitemap: error al obtener posts del blog:", error);
  }

  return [...staticEntries, ...postEntries];
}
