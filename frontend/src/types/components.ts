import { ReactNode } from "react";
import { type MapType } from "@/hooks/use-map-loader";
import type { FormattedPhone } from "@/types/veterinary";
import { LucideIcon } from "lucide-react";
import { MappedPost, MappedPostDetail } from "@/types/strapi";
import { CategoryParams } from "@/lib/blog/category-service";
/**
 * Props for the Main component.
 */
export interface MainProps {
  children: ReactNode;
  className?: string;
  ariaLabelKey?: string;
  ariaLabel?: string;
  backgroundImage?: string;
  style?: React.CSSProperties;
  overlay?: string;
}

/**
 * Props for the MapIframe component.
 */
export interface MapIframeProps {
  mapType: MapType;
  translationKey?: string;
}

/**
 * Props for the ContentLayout component.
 */
export interface ContentLayoutProps {
  icon?: ReactNode;
  mainTitle?: string | ReactNode;
  subtitle?: string | ReactNode;
  ariaLabel?: string;
  backgroundColor?: string;
  sectionLabel?: string;
  children: ReactNode;
  heroImage?: ReactNode;
}

/**
 * Props for the GuideLayout component.
 */
export interface GuideLayoutProps {
  icon: ReactNode;
  directoryTitle: string;
  mainTitle: string;
  subtitle?: string;
  count?: number;
  countLabel: string;
  sourceInfo: string;
  backgroundColor?: string;
  children: ReactNode;
  headingId?: string;
  ariaLabel?: string;
}

/**
 * Props for the BaseCard component.
 */
export interface BaseCardProps {
  id: string | number;
  title?: string;
  headerIcon: ReactNode;
  headerSubtitle: string;
  headerColor?: string;
  children: ReactNode;
  className?: string;
}

/**
 * Props for the ParkInfoItems component.
 */
export interface ParkInfoItemsProps {
  data: {
    direccion: string;
    horarios: string;
    accesoPMR: string;
    extension: string;
    fuente: string;
  };
}

/**
 * Props for the SearchFilter component.
 */
export interface SearchFilterProps {
  placeholder: string;
  ariaLabel: string;
  onSearch?: (query: string) => void;
  value?: string;
  className?: string;
}

/**
 * Props for the SearchResultsInfo component.
 */
export interface SearchResultsInfoProps {
  totalResults: number;
  filteredResults: number;
  searchQuery: string;
  itemName: string;
  itemNamePlural: string;
}

/**
 * Props for the SimplePagination component.
 */
export interface SimplePaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  ariaLabel?: string;
}

/**
 * Props for the VeterinaryCard component.
 */
export interface VeterinaryCardProps {
  center: import("@/lib/data/vets").Vet;
}

export interface VetInfoItemsProps {
  center: {
    address: string;
    postalCode?: string;
    phones: FormattedPhone[];
    schedule?: string;
    daysOpen?: string;
    website?: string;
    email?: string;
  };
}


export interface BeachInfoItemsProps {
    data: {
        municipality: string;
        locality?: string;
        location: string;
        length: string;
        area: string;
        dogShower: boolean;
        waterFountain: boolean;
        trashBins: boolean;
        parking: boolean;
        agilityArea: boolean;
        bagDispenser: boolean;
        summerSchedule?: string;
        winterSchedule?: string;
        year_round?: string;
        certifications?: string[];
        highlights?: string[];
    };
}


/**
 * Form data structure for contact form submissions.
 */
export interface FormData {
  name: string;
  email: string;
  subject: string;
  message: string;
  website: string;
}

/*
 * Structure for form validation errors.
 */
export interface FormErrors {
  name?: string;
  email?: string;
  subject?: string;
  message?: string;
}

/**
 * Props for the MissionCard component.
 */
export interface MissionCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
  className?: string;
  delay: number;
}

/**
 * Props for the PostCard component.
 */
export interface PostCardProps {
  post: MappedPost;
  variant?: "default" | "horizontal" | "minimal" | "hero";
  pathPrefix?: string;
  preloadImage?: boolean;
  showDescription?: boolean;
}

/**
 * Props for the PostSectionContent component.
 */
export interface PostSectionContentProps {
  post: MappedPostDetail;
  postUrl?: string;
}

/**
 * Props for the SharePost component.
 */
export interface SharePostProps {
  title?: string;
  url?: string;
}

/**
 * Props for the AuthorSection component.
 */
export interface AuthorSectionProps {
  slug: string;
  locale: string;
  searchParams: Promise<{
    page?: string;
  }>;
}

/**
 * Props for the CategoryPage component.
 */
export interface CategoryPageProps {
  params: Promise<CategoryParams>;
  searchParams: Promise<{
    page?: string;
  }>;
}

/**
 * Props for the CategoriesPage component.
 */
export interface CategoriesPageProps {
    searchParams: Promise<{
        page?: string;
        category?: string;
    }>;
}

/**
 * Props for the CategorySection component.
 */
export interface CategorySectionProps {
    searchParams: Promise<{
        page?: string;
        category?: string;
    }>;
    locale: string;
}

/**
 * Props for the SearchPage component.
 */
export interface SearchPageProps {
    params: Promise<{ locale: string }>;
    searchParams: Promise<{
        q?: string;
        page?: string;
    }>;
}

/**
 * Props for the SearchSection component.
 */
export interface SearchSectionProps {
    params: Promise<{ locale: string }>;
    searchParams: Promise<{
        q?: string;
        page?: string;
    }>;
}

/**
 * Props for the SearchSectionContent component.
 */
export interface SearchSectionContentProps {
    query: string;
    posts: MappedPost[];
    totalPosts: number;
    currentPage: number;
    isFirstPage: boolean;
    isLastPage: boolean;
    locale: string;
    postsPerPage: number;
}


/**
 * Props for the InfoItem component.
 */
export interface InfoItemProps {
    icon: ReactNode;
    label: string;
    value?: string;
    children?: ReactNode;
    className?: string;
    variant?: 'default' | 'compact' | 'horizontal';
}


/**
 * Props for the Error component.
 */
export interface ErrorProps {
  error: Error & { digest?: string }
  reset: () => void
}

/**
 * Props for the ErrorContent component.
 */
export interface ErrorContentProps {
  error: Error & { digest?: string }
  reset: () => void
}
