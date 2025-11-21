// src/components/JsonLd.tsx

// ============================================
// JSON-LD SCHEMA.ORG - SEO ESTRUCTURADO
// ============================================

// Tipos base sin dependencias externas
type JsonLdData = 
  | (Record<string, unknown> & {
      "@context": string;
      "@type": string;
    })
  | (Record<string, unknown> & {
      "@context": string;
      "@graph": JsonLdData[];
    });

interface BreadcrumbItem {
  name: string;
  url: string;
}

interface BlogPost {
  title: string;
  description: string;
  slug: string;
  publishedAt: string;
  modifiedAt?: string;
  cover?: {
    url: string;
    alt?: string;
  };
  tags?: string[];
  category?: string;
  author?: {
    name: string;
    url?: string;
  };
}

// ============================================
// COMPONENTE PRINCIPAL
// ============================================
interface JsonLdProps {
  data: JsonLdData | JsonLdData[];
}

export default function JsonLd({ data }: JsonLdProps) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ 
        __html: JSON.stringify(data, null, 0) // Sin espacios para producción
      }}
      suppressHydrationWarning
    />
  );
}

// ============================================
// BREADCRUMB
// ============================================
export function generateBreadcrumbJsonLd(items: BreadcrumbItem[]): JsonLdData {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

// ============================================
// ORGANIZATION
// ============================================
interface OrganizationOptions {
  siteUrl: string;
  name?: string;
  description?: string;
  email?: string;
  phone?: string;
  address?: {
    streetAddress: string;
    addressLocality: string;
    addressRegion: string;
    postalCode: string;
    addressCountry: string;
  };
}

export function generateOrganizationJsonLd({
  siteUrl,
  name = "MálagaPets",
  description = "Tu guía completa sobre cuidado de mascotas en Málaga",
  email,
  phone,
  address,
}: OrganizationOptions): JsonLdData {
  const org: JsonLdData = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name,
    description,
    url: siteUrl,
    logo: {
      "@type": "ImageObject",
      url: `${siteUrl}/logo.png`,
      width: 512,
      height: 512,
    },
    sameAs: [
      "https://facebook.com/malagapets",
      "https://twitter.com/malagapets",
      "https://instagram.com/malagapets",
    ],
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "Customer Service",
      availableLanguage: ["es", "en", "de", "fr"],
      ...(email && { email }),
      ...(phone && { telephone: phone }),
    },
  };

  if (address) {
    org.address = {
      "@type": "PostalAddress",
      ...address,
    };
  }

  return org;
}

// ============================================
// WEBSITE
// ============================================
export function generateWebsiteJsonLd(siteUrl: string): JsonLdData {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "MálagaPets",
    url: siteUrl,
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${siteUrl}/blog/search?q={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
  };
}

// ============================================
// BLOG
// ============================================
export function generateBlogJsonLd(
  posts: BlogPost[],
  siteUrl: string
): JsonLdData {
  return {
    "@context": "https://schema.org",
    "@type": "Blog",
    name: "MálagaPets Blog",
    description: "Blog sobre cuidado de mascotas en Málaga",
    url: `${siteUrl}/blog`,
    inLanguage: ["es", "en", "de", "fr"],
    blogPost: posts.slice(0, 10).map((post) => {
      const blogPost: Record<string, unknown> = {
        "@type": "BlogPosting",
        headline: post.title,
        description: post.description,
        url: `${siteUrl}/blog/post/${post.slug}`,
        datePublished: post.publishedAt,
      };

      if (post.modifiedAt) {
        blogPost.dateModified = post.modifiedAt;
      }

      if (post.cover) {
        blogPost.image = {
          "@type": "ImageObject",
          url: post.cover.url,
          ...(post.cover.alt && { caption: post.cover.alt }),
        };
      }

      return blogPost;
    }),
  };
}

// ============================================
// ARTICLE/BLOGPOSTING
// ============================================
export function generateArticleJsonLd(
  article: BlogPost,
  siteUrl: string
): JsonLdData {
  const schema: JsonLdData = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: article.title,
    description: article.description,
    url: `${siteUrl}/blog/post/${article.slug}`,
    datePublished: article.publishedAt,
    dateModified: article.modifiedAt || article.publishedAt,
    inLanguage: "es",
    publisher: {
      "@type": "Organization",
      name: "MálagaPets",
      logo: {
        "@type": "ImageObject",
        url: `${siteUrl}/logo.png`,
        width: 512,
        height: 512,
      },
    },
  };

  // Autor
  if (article.author) {
    schema.author = {
      "@type": "Person",
      name: article.author.name,
      ...(article.author.url && { url: article.author.url }),
    };
  }

  // Imagen destacada
  if (article.cover) {
    schema.image = {
      "@type": "ImageObject",
      url: article.cover.url,
      ...(article.cover.alt && { caption: article.cover.alt }),
    };
  }

  // Keywords
  if (article.tags && article.tags.length > 0) {
    schema.keywords = article.tags.join(", ");
  }

  // Categoría
  if (article.category) {
    schema.articleSection = article.category;
  }

  return schema;
}

// ============================================
// FAQ SCHEMA
// ============================================
interface FAQItem {
  question: string;
  answer: string;
}

export function generateFAQJsonLd(faqs: FAQItem[]): JsonLdData {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
}

// ============================================
// HOWTO SCHEMA (Para guías)
// ============================================
interface HowToStep {
  name: string;
  text: string;
  image?: string;
}

export function generateHowToJsonLd(
  title: string,
  description: string,
  steps: HowToStep[]
): JsonLdData {
  return {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: title,
    description,
    step: steps.map((step, index) => {
      const howToStep: Record<string, unknown> = {
        "@type": "HowToStep",
        position: index + 1,
        name: step.name,
        text: step.text,
      };

      if (step.image) {
        howToStep.image = {
          "@type": "ImageObject",
          url: step.image,
        };
      }

      return howToStep;
    }),
  };
}

// ============================================
// LOCAL BUSINESS (Veterinarios/Parques)
// ============================================
interface LocalBusinessOptions {
  name: string;
  description: string;
  type: "VeterinaryCare" | "Park" | "PetStore" | "AnimalShelter";
  address: {
    streetAddress: string;
    addressLocality: string;
    postalCode: string;
    addressCountry: string;
  };
  geo: {
    latitude: number;
    longitude: number;
  };
  url?: string;
  phone?: string;
  email?: string;
  openingHours?: string[];
  priceRange?: string;
  image?: string;
}

export function generateLocalBusinessJsonLd(
  options: LocalBusinessOptions
): JsonLdData {
  const {
    name,
    description,
    type,
    address,
    geo,
    url,
    phone,
    email,
    openingHours,
    priceRange,
    image,
  } = options;

  const business: JsonLdData = {
    "@context": "https://schema.org",
    "@type": type,
    name,
    description,
    address: {
      "@type": "PostalAddress",
      ...address,
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: geo.latitude,
      longitude: geo.longitude,
    },
  };

  if (url) business.url = url;
  if (phone) business.telephone = phone;
  if (email) business.email = email;
  if (openingHours) business.openingHoursSpecification = openingHours;
  if (priceRange) business.priceRange = priceRange;
  if (image) {
    business.image = {
      "@type": "ImageObject",
      url: image,
    };
  }

  return business;
}

// ============================================
// HELPER: Combinar múltiples schemas
// ============================================
export function combineSchemas(...schemas: JsonLdData[]): JsonLdData {
  return {
    "@context": "https://schema.org",
    "@graph": schemas,
  };
}

// ============================================
// EJEMPLO DE USO
// ============================================
/*
// En tu página de blog post:
import JsonLd, { 
  generateArticleJsonLd, 
  generateBreadcrumbJsonLd, 
  combineSchemas 
} from '@/components/JsonLd';

export default function BlogPostPage({ post }) {
  const breadcrumbs = [
    { name: "Inicio", url: "https://malagapets.com" },
    { name: "Blog", url: "https://malagapets.com/blog" },
    { name: post.title, url: `https://malagapets.com/blog/post/${post.slug}` },
  ];

  const schema = combineSchemas(
    generateBreadcrumbJsonLd(breadcrumbs),
    generateArticleJsonLd(post, "https://malagapets.com")
  );

  return (
    <>
      <JsonLd data={schema} />
      <article>{post.content}</article>
    </>
  );
}

// En página de veterinario:
import JsonLd, { generateLocalBusinessJsonLd } from '@/components/JsonLd';

export default function VetPage({ vet }) {
  const schema = generateLocalBusinessJsonLd({
    name: vet.name,
    description: vet.description,
    type: "VeterinaryCare",
    address: {
      streetAddress: vet.address,
      addressLocality: "Málaga",
      postalCode: vet.postalCode,
      addressCountry: "ES",
    },
    geo: {
      latitude: vet.lat,
      longitude: vet.lng,
    },
    phone: vet.phone,
    openingHours: vet.hours,
  });

  return (
    <>
      <JsonLd data={schema} />
      <div>{vet.name}</div>
    </>
  );
}

// En página con FAQ:
import JsonLd, { generateFAQJsonLd } from '@/components/JsonLd';

export default function FAQPage() {
  const faqs = [
    {
      question: "¿Cómo cuido a mi perro en verano?",
      answer: "Es importante mantenerlo hidratado, evitar las horas de más calor..."
    },
    // más FAQs...
  ];

  return (
    <>
      <JsonLd data={generateFAQJsonLd(faqs)} />
      <div>FAQ content</div>
    </>
  );
}
*/

// ============================================
// NOTAS IMPORTANTES
// ============================================
/*
✅ VENTAJAS DE ESTA VERSIÓN:
- Sin dependencias externas
- TypeScript seguro con tipos propios
- Compatible con Next.js 15
- Todos los schemas principales incluidos

📋 VALIDACIÓN:
1. Google Rich Results Test: https://search.google.com/test/rich-results
2. Schema.org Validator: https://validator.schema.org/
3. Google Search Console > Mejoras

⚠️ ERRORES COMUNES A EVITAR:
❌ URLs relativas (siempre usar URLs absolutas)
❌ Fechas en formato incorrecto (usar ISO 8601)
❌ Imágenes sin URLs absolutas
❌ Múltiples @context (usar combineSchemas)
❌ Campos requeridos vacíos (mejor omitir)

🎯 SCHEMAS DISPONIBLES:
✅ Breadcrumb (navegación)
✅ Organization (empresa)
✅ WebSite (sitio web + búsqueda)
✅ Blog (listado de posts)
✅ Article/BlogPosting (post individual)
✅ FAQ (preguntas frecuentes)
✅ HowTo (guías paso a paso)
✅ LocalBusiness (veterinarios, parques, tiendas)

💡 PRÓXIMOS PASOS:
1. Implementar en tus páginas principales
2. Validar con Google Rich Results Test
3. Verificar en Google Search Console después de indexar
4. Monitorear mejoras en CTR y posicionamiento
*/