import type { MappedAuthor, MappedPost , BlogBlock } from "@/types/strapi";
import type { SocialButtonConfig } from "@/data/share-post-config";
import { Locale } from "@/i18n/routing";
import { AuthorParams} from "@/lib/blog/author-service";


// Idiomas soportados
export type SupportedLocale = 'es' | 'en' | 'de' | 'fr';

/**
 * Props for the Blog Section Content component.
 */
export interface BlogSectionContentProps {
    posts: MappedPost[];
}

/**
 * Props for the Post List component.
 */
export interface PostListProps {
  post: MappedPost;
  variant?: "default" | "horizontal" | "minimal" | "hero";
  pathPrefix?: string;
  preloadImage?: boolean;
}

/**
 * Props for the Label component.
 */
export type ColorType = "green" | "blue" | "orange" | "purple" | "pink";
/**
 * Props for the Label component.
 */
export interface LabelProps {
  color?: ColorType | string;
  pill?: boolean;
  nomargin?: boolean;
  children?: React.ReactNode;
}

/**
 * Props for the Pagination component.
 */
export interface PaginationProps {
  pageIndex: number;
  isFirstPage: boolean;
  isLastPage: boolean;
  basePath?: string;
}

/**
 * Props for the Search Bar component.
 */
export interface SearchBarProps {
  basePath?: string;
}

/**
 * Props for the Search Input component.
 */
export interface SearchInputProps {
  q?: string;
  handleChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleClear?: () => void;
  placeholder?: string;
  ariaLabel?: string;
  clearAriaLabel?: string;
}

/**
 * Props for the Category Page component.
 */
export interface SlugCategorySectionProps {
  slug: string;
  locale: string;
  searchParams: Promise<{
    page?: string;
  }>;
}


/**
 *  Props for pagination parameters.
 */

export interface PaginationParams {
  currentPage: number;
  offset: number;
  limit: number;
  isFirstPage: boolean;
  isLastPage: (totalItems: number) => boolean;
  pageCount: (totalItems: number) => number;
}


/**
 * Props for the Slug Category Section Content component.
 */
export interface SlugCategorySectionContentProps {
    category: {
        id: number;
        name: string;
        slug: string;
        description?: string;
    };
    posts: MappedPost[];
    currentPage: number;
    totalArticles: number;
    isFirstPage: boolean;
    isLastPage: boolean;
    locale: string;
}

/**
 * Props for the Category Section Content component.
 */
export interface CategorySectionContentProps {
    categories: Array<{
        id: number;
        name: string;
        slug: string;
    }>;
    posts: MappedPost[];
    selectedCategory: string; // NUEVA PROP
    currentPage: number;
    totalPages: number; // NUEVA PROP
    isFirstPage: boolean;
    isLastPage: boolean;
    categoryCounts: Record<string, number>; // NUEVA PROP
    totalCount: number; // Renombrado de totalPosts
}


    /*
    * Props for the Author Section Content component.
    */
export interface AuthorSectionContentProps {
    author: MappedAuthor;
    posts: MappedPost[];
    currentPage: number;
    totalArticles: number;
    isFirstPage: boolean;
    isLastPage: boolean;
    locale: string;
}

/**
 * Props for the Archive Page.
 */
export interface ArchivePageProps {
    params: Promise<{ locale: Locale }>;
    searchParams: Promise<{
        page?: string;
    }>;
}

/**
 * Props for the Archive Section.
 */
export interface ArchiveSectionProps {
    locale: string;
    searchParams: Promise<{
        page?: string;
    }>;
}

/**
 * Props for the Archive Section Content component.
 */
export interface ArchiveSectionContentProps {
    posts: MappedPost[];
    currentPage: number;
    isFirstPage: boolean;
    isLastPage: boolean;
    totalPosts: number;
}

export interface AuthorCardProps {
  author: MappedAuthor;
}



export interface Category {
  id: number;
  name: string;
  slug: string;
}

export interface BlogCategoriesProps {
  categories: Category[];
  posts: MappedPost[];
}


export interface CategoryLabelProps {
  categories: Array<{
    name?: string;
    title?: string;
    slug: string | { current: string };
    color?: string;
  }>;
  nomargin?: boolean;
}


export interface NewsletterFormData {
    email: string;
    name?: string;
    locale?: SupportedLocale;
}

// ✅ Estructura de respuesta de Strapi
export interface ApiResponse {
    success?: boolean;
    code?: string; // ✅ Usado para i18n

    // ✅ Data contiene la información del suscriptor
    data?: {
        email?: string;
        name?: string;
        locale?: SupportedLocale;
        estado?: 'pending' | 'activo' | 'inactivo';
        confirmedAt?: string;
        // ❌ ELIMINAR (ya no se usan, reemplazados por code)
        // alreadySubscribed?: boolean;
        // pendingConfirmation?: boolean;
        // reactivated?: boolean;
    } | null;
    // ✅ Error puede ser string o estructura de Strapi
    error?: 
        | string 
        | {
            status?: number;
            name?: string;
            message?: string;
            details?: Record<string, unknown>;
            code?: string;
        };

    message?: string; // ⚠️ DEPRECATED: Mantener por compatibilidad, pero usar code
}


export interface PortableTextProps {
    value: BlogBlock[] | string | null | undefined;
}

export interface SocialShareButtonProps {
    config: SocialButtonConfig;
    onClick: () => void;
}



export interface BlogPageProps {
  params: Promise<{ locale: Locale }>;
  searchParams: Promise<{
    page?: string;
  }>;
}



export interface AuthorPageProps {
    params: Promise<AuthorParams>;
    searchParams: Promise<{
        page?: string;
    }>;
}