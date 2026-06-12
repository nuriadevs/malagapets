import type { MappedCategory } from "@/types/blog-categories";
import type { MappedPostCategory } from "@/types/blog";
import { API_URL as API } from "@/lib/config";

export const CATEGORY_BASE: Record<string, string> = {
  es: "/blog/categorias",
  en: "/blog/categories",
  de: "/blog/kategorien",
  fr: "/blog/categories",
};

const CATEGORY_COLORS: Record<string, string> = {
  "guias-pet-friendly": "green",
  "productos-mascotas": "pink",
  "pet-friendly-guides": "green",
  "pet-products": "pink",
  "guides-pet-friendly": "green",
  "produits-animaux": "pink",
  "pet-friendly-fuehrer": "green",
  haustierprodukte: "pink",
};

interface RawCategory {
  documentId: string;
  slug: string;
  name: string;
  description?: string;
  locale?: string;
  color?: string;
}

function mapCategory(raw: RawCategory): MappedCategory {
  return {
    key: raw.documentId,
    slug: raw.slug,
    name: raw.name,
    description: raw.description,
    color: raw.color ?? CATEGORY_COLORS[raw.slug] ?? "blue",
  };
}

export async function getCategories(locale = "es"): Promise<MappedCategory[]> {
  const params = new URLSearchParams({ locale });
  const res = await fetch(`${API}/api/categories?${params}`, {
    next: { revalidate: 600 },
  });
  if (!res.ok) throw new Error(`Error fetching categories: ${res.status}`);
  const json = await res.json();
  const raw: RawCategory[] = json.data ?? json ?? [];

  return raw.filter((c) => !c.locale || c.locale === locale).map(mapCategory);
}

export async function getCategory(
  slug: string,
  locale: string,
): Promise<MappedCategory | null> {
  const params = new URLSearchParams({ locale });
  const res = await fetch(`${API}/api/categories/${slug}?${params}`, {
    next: { revalidate: 300 },
  });
  if (res.status === 404) return null;
  if (!res.ok)
    throw new Error(`Error fetching category "${slug}": ${res.status}`);
  const json = await res.json();
  const raw: RawCategory = json.data ?? json;
  if (raw.locale && raw.locale !== locale) return null;
  return mapCategory(raw);
}

export { CATEGORY_COLORS };
export type { MappedPostCategory };
