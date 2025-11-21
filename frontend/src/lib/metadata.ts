// src/lib/metadata.ts
import { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { Locale } from "@/i18n/routing";
import { 
  SITE_URL, 
  SITE_NAME, 
  DEFAULT_IMAGE, 
  TWITTER_HANDLE, 
  GOOGLE_VERIFICATION 
} from "@/config/constants";

// Normaliza las keywords que pueden venir como string (coma-separado) o como array desde next-intl
function normalizeKeywords(input: string | string[] | undefined): string[] {
  if (!input) return [];
  if (Array.isArray(input)) return input.map((k) => String(k).trim()).filter(Boolean);
  return String(input)
    .split(",")
    .map((k) => k.trim())
    .filter(Boolean);
}

// Tipos de contenido
type ContentType = "website" | "article" | "profile";

interface BaseMetadataParams {
  params: Promise<{ locale: Locale }>;
}

interface PageMetadataParams extends BaseMetadataParams {
  title?: string;
  description?: string;
  keywords?: string[];
  image?: string;
  imageAlt?: string;
  type?: ContentType;
  publishedTime?: string;
  modifiedTime?: string;
  authors?: string[];
  tags?: string[];
  canonical?: string;
  noIndex?: boolean;
  noFollow?: boolean;
}
/*
interface BlogPostMetadataParams extends BaseMetadataParams {
  params: Promise<{ locale: Locale; slug: string }>;
  post: {
    title: string;
    description: string;
    image?: string;
    imageAlt?: string;
    publishedTime: string;
    modifiedTime?: string;
    authors?: string[];
    tags?: string[];
    category?: string;
  };
}

interface CategoryMetadataParams extends BaseMetadataParams {
  params: Promise<{ locale: Locale; slug: string }>;
  category: {
    name: string;
    description: string;
    image?: string;
  };
}
*/
// ============================================
// 2. MEJORA EN METADATA.TS
// ============================================
// Añade viewport a generateRootMetadata (si no está en layout):

export async function generateRootMetadata({
  params,
}: BaseMetadataParams): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "metadata" });

  const title = t("title");
  const description = t("description");
  const keywords = normalizeKeywords(t("keywords"));

  return {
    metadataBase: new URL(SITE_URL),
    title: {
      default: title,
      template: `%s | ${SITE_NAME}`,
    },
    description,
    keywords,
    
    // ✅ AÑADIR CLASSIFICATION
    classification: "pets, animals, guides, veterinary",
    
    // ✅ AÑADIR RATING
   // rating: "general",

    authors: [{ name: SITE_NAME, url: SITE_URL }],
    creator: SITE_NAME,
    publisher: SITE_NAME,

    // ✅ MEJORAR FORMAT DETECTION
    formatDetection: {
      telephone: true,  // Permitir detección de teléfonos
      email: true,      // Permitir detección de emails
      address: true,    // Permitir detección de direcciones
    },

    openGraph: {
      type: "website",
      locale: locale,
      url: `${SITE_URL}/${locale}`,
      siteName: SITE_NAME,
      title,
      description,
      images: [
        {
          url: DEFAULT_IMAGE,
          width: 1200,
          height: 630,
          alt: title,
          type: "image/jpeg",
        },
      ],
    },

    twitter: {
      card: "summary_large_image",
      site: TWITTER_HANDLE,
      creator: TWITTER_HANDLE,
      title,
      description,
      images: [DEFAULT_IMAGE],
    },

    robots: {
      index: true,
      follow: true,
      nocache: false,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },

    alternates: {
      canonical: `${SITE_URL}/${locale}`,
      languages: {
        es: `${SITE_URL}/es`,
        en: `${SITE_URL}/en`,
        de: `${SITE_URL}/de`,
        fr: `${SITE_URL}/fr`,
        "x-default": `${SITE_URL}/es`, // ✅ IMPORTANTE: x-default
      },
    },

    icons: {
      icon: [
        { url: "/favicon.ico", sizes: "any" },
        { url: "/icon-192.png", sizes: "192x192", type: "image/png" },
        { url: "/icon-512.png", sizes: "512x512", type: "image/png" },
      ],
      apple: [{ url: "/apple-icon.png", sizes: "180x180", type: "image/png" }],
      
      // ✅ AÑADIR SHORTCUT ICON
      shortcut: [{ url: "/favicon.ico" }],
    },

    manifest: "/manifest.webmanifest",

    verification: {
      google: GOOGLE_VERIFICATION,
      // ✅ AÑADIR MÁS VERIFICACIONES
      // yandex: process.env.NEXT_PUBLIC_YANDEX_VERIFICATION,
      // bing: process.env.NEXT_PUBLIC_BING_VERIFICATION,
      // other: {
      //   "facebook-domain-verification": process.env.NEXT_PUBLIC_FB_VERIFICATION,
      // },
    },

    category: "Pets",
    applicationName: SITE_NAME,
    referrer: "origin-when-cross-origin",
  };
}
// ============================================
// 2. METADATA PARA PÁGINAS GENÉRICAS
// ============================================
export async function generatePageMetadata({
  params,
  title,
  description,
  keywords = [],
  image,
  imageAlt,
  type = "website",
  canonical,
  noIndex = false,
  noFollow = false,
}: PageMetadataParams): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "metadata" });

  const pageTitle = title || t("title");
  const pageDescription = description || t("description");
  const pageImage = image || DEFAULT_IMAGE;
  const pageImageAlt = imageAlt || pageTitle;
  const pageCanonical = canonical || `${SITE_URL}/${locale}`;

  return {
    title: pageTitle,
    description: pageDescription,
    keywords: keywords.length > 0 ? keywords : undefined,

    openGraph: {
      type,
      locale,
      url: pageCanonical,
      siteName: SITE_NAME,
      title: pageTitle,
      description: pageDescription,
      images: [
        {
          url: pageImage,
          width: 1200,
          height: 630,
          alt: pageImageAlt,
        },
      ],
    },

    twitter: {
      card: "summary_large_image",
      site: TWITTER_HANDLE,
      creator: TWITTER_HANDLE,
      title: pageTitle,
      description: pageDescription,
      images: [pageImage],
    },

    robots: {
      index: !noIndex,
      follow: !noFollow,
      nocache: noIndex,
      googleBot: {
        index: !noIndex,
        follow: !noFollow,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },

    alternates: {
      canonical: pageCanonical,
      languages: {
        es: `${SITE_URL}/es`,
        en: `${SITE_URL}/en`,
        de: `${SITE_URL}/de`,
        fr: `${SITE_URL}/fr`,
        "x-default": `${SITE_URL}/es`,
      },
    },
  };
}

// ============================================
// 3. METADATA PARA POSTS DE BLOG
// ============================================
/*
export async function generateBlogPostMetadata({
  params,
  post,
}: BlogPostMetadataParams): Promise<Metadata> {
  const { locale, slug } = await params;
  const postUrl = `${SITE_URL}/${locale}/blog/post/${slug}`;
  const postImage = post.image || DEFAULT_IMAGE;

  return {
    title: post.title,
    description: post.description,
    keywords: post.tags,

    openGraph: {
      type: "article",
      locale,
      url: postUrl,
      siteName: SITE_NAME,
      title: post.title,
      description: post.description,
      images: [
        {
          url: postImage,
          width: 1200,
          height: 630,
          alt: post.imageAlt || post.title,
        },
      ],
      publishedTime: post.publishedTime,
      modifiedTime: post.modifiedTime,
      authors: post.authors,
      tags: post.tags,
      section: post.category,
    },

    twitter: {
      card: "summary_large_image",
      site: TWITTER_HANDLE,
      creator: TWITTER_HANDLE,
      title: post.title,
      description: post.description,
      images: [postImage],
    },

    robots: {
      index: true,
      follow: true,
      nocache: false,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },

    alternates: {
      canonical: postUrl,
      languages: {
        es: `${SITE_URL}/es/blog/post/${slug}`,
        en: `${SITE_URL}/en/blog/post/${slug}`,
        de: `${SITE_URL}/de/blog/post/${slug}`,
        fr: `${SITE_URL}/fr/blog/post/${slug}`,
        "x-default": `${SITE_URL}/es/blog/post/${slug}`,
      },
    },

    authors: post.authors?.map((author) => ({ name: author })),
  };
}

// ============================================
// 4. METADATA PARA CATEGORÍAS DE BLOG
// ============================================
export async function generateCategoryMetadata({
  params,
  category,
}: CategoryMetadataParams): Promise<Metadata> {
  const { locale, slug } = await params;
  const t = await getTranslations({ locale, namespace: "metadata" });
  const categoryUrl = `${SITE_URL}/${locale}/blog/categories/${slug}`;
  const categoryImage = category.image || DEFAULT_IMAGE;

  const title = `${category.name} - ${t("category.suffix")}`;
  const description =
    category.description ||
    t("category.defaultDescription", { name: category.name });

  return {
    title,
    description,

    openGraph: {
      type: "website",
      locale,
      url: categoryUrl,
      siteName: SITE_NAME,
      title,
      description,
      images: [
        {
          url: categoryImage,
          width: 1200,
          height: 630,
          alt: category.name,
        },
      ],
    },

    twitter: {
      card: "summary_large_image",
      site: TWITTER_HANDLE,
      creator: TWITTER_HANDLE,
      title,
      description,
      images: [categoryImage],
    },

    robots: {
      index: true,
      follow: true,
      nocache: false,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },

    alternates: {
      canonical: categoryUrl,
      languages: {
        es: `${SITE_URL}/es/blog/categories/${slug}`,
        en: `${SITE_URL}/en/blog/categories/${slug}`,
        de: `${SITE_URL}/de/blog/categories/${slug}`,
        fr: `${SITE_URL}/fr/blog/categories/${slug}`,
        "x-default": `${SITE_URL}/es/blog/categories/${slug}`,
      },
    },
  };
}
*/
// ============================================
// 5. METADATA PARA GUÍAS (PARKS, VETS)
// ============================================
export async function generateGuideMetadata({
  params,
  guideType,
}: BaseMetadataParams & { guideType: "parks" | "vets" }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "metadata" });

  const title = t(`guides.${guideType}.title`);
  const description = t(`guides.${guideType}.description`);
  const keywords = normalizeKeywords(t(`guides.${guideType}.keywords`));
  const guideUrl = `${SITE_URL}/${locale}/guides/${guideType}`;

  return {
    title,
    description,
  keywords,

    openGraph: {
      type: "website",
      locale,
      url: guideUrl,
      siteName: SITE_NAME,
      title,
      description,
      images: [
        {
          url: DEFAULT_IMAGE,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },

    twitter: {
      card: "summary_large_image",
      site: TWITTER_HANDLE,
      creator: TWITTER_HANDLE,
      title,
      description,
      images: [DEFAULT_IMAGE],
    },

    robots: {
      index: true,
      follow: true,
      nocache: false,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },

    alternates: {
      canonical: guideUrl,
      languages: {
        es: `${SITE_URL}/es/guides/${guideType}`,
        en: `${SITE_URL}/en/guides/${guideType}`,
        de: `${SITE_URL}/de/guides/${guideType}`,
        fr: `${SITE_URL}/fr/guides/${guideType}`,
        "x-default": `${SITE_URL}/es/guides/${guideType}`,
      },
    },
  };
}

// ============================================
// 6. METADATA PARA MAPAS
// ============================================
export async function generateMapMetadata({
  params,
  mapType,
}: BaseMetadataParams & { mapType: "parks" | "vets" }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "metadata" });

  const title = t(`maps.${mapType}.title`);
  const description = t(`maps.${mapType}.description`);
  const keywords = normalizeKeywords(t(`maps.${mapType}.keywords`));
  const mapUrl = `${SITE_URL}/${locale}/maps/${mapType}`;

  return {
    title,
    description,
  keywords,

    openGraph: {
      type: "website",
      locale,
      url: mapUrl,
      siteName: SITE_NAME,
      title,
      description,
      images: [
        {
          url: DEFAULT_IMAGE,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },

    twitter: {
      card: "summary_large_image",
      site: TWITTER_HANDLE,
      creator: TWITTER_HANDLE,
      title,
      description,
      images: [DEFAULT_IMAGE],
    },

    robots: {
      index: true,
      follow: true,
      nocache: false,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },

    alternates: {
      canonical: mapUrl,
      languages: {
        es: `${SITE_URL}/es/maps/${mapType}`,
        en: `${SITE_URL}/en/maps/${mapType}`,
        de: `${SITE_URL}/de/maps/${mapType}`,
        fr: `${SITE_URL}/fr/maps/${mapType}`,
        "x-default": `${SITE_URL}/es/maps/${mapType}`,
      },
    },
  };
}

// ============================================
// 7. METADATA PARA ABOUT
// ============================================
export async function generateAboutMetadata({
  params,
}: BaseMetadataParams): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "metadata" });

  const title = t("about.title");
  const description = t("about.description");
  const keywords = normalizeKeywords(t("about.keywords"));
  const aboutUrl = `${SITE_URL}/${locale}/about`;

  return {
    title,
    description,
    keywords,

    openGraph: {
      type: "website",
      locale,
      url: aboutUrl,
      siteName: SITE_NAME,
      title,
      description,
      images: [
        {
          url: DEFAULT_IMAGE,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },

    twitter: {
      card: "summary_large_image",
      site: TWITTER_HANDLE,
      creator: TWITTER_HANDLE,
      title,
      description,
      images: [DEFAULT_IMAGE],
    },

    robots: {
      index: true,
      follow: true,
      nocache: false,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },

    alternates: {
      canonical: aboutUrl,
      languages: {
        es: `${SITE_URL}/es/about`,
        en: `${SITE_URL}/en/about`,
        de: `${SITE_URL}/de/about`,
        fr: `${SITE_URL}/fr/about`,
        "x-default": `${SITE_URL}/es/about`,
      },
    },
  };
}

// ============================================
// 8. FUNCIÓN DE UTILIDAD PARA STRUCTURED DATA (JSON-LD)
// ============================================
export function generateBlogPostingStructuredData(post: {
  title: string;
  description: string;
  image?: string;
  publishedTime: string;
  modifiedTime?: string;
  authors?: string[];
  slug: string;
  locale: Locale;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.description,
    image: post.image || DEFAULT_IMAGE,
    datePublished: post.publishedTime,
    dateModified: post.modifiedTime || post.publishedTime,
    author: post.authors?.map((author) => ({
      "@type": "Person",
      name: author,
    })) || [{ "@type": "Person", name: SITE_NAME }],
    publisher: {
      "@type": "Organization",
      name: SITE_NAME,
      logo: {
        "@type": "ImageObject",
        url: `${SITE_URL}/logo.png`,
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${SITE_URL}/${post.locale}/blog/post/${post.slug}`,
    },
  };
}


