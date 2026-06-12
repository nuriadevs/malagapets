import { ReactNode } from "react";
import { LucideIcon } from "lucide-react";

export interface ContentLayoutProps {
  icon?: ReactNode;
  mainTitle?: ReactNode;
  subtitle?: ReactNode;
  className?: string;
  children?: ReactNode;
}

export interface MissionCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
  className?: string;
  delay: number;
}

export interface MainProps {
  children: ReactNode;
  className?: string;
  ariaLabelKey?: string;
  ariaLabel?: string;
  backgroundImage?: string;
  style?: React.CSSProperties;
  overlay?: string;
}

export interface SimplePaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  ariaLabel?: string;
}

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
  headingId: string;
  ariaLabel?: string;
}

export type CardAccentVariant = "default" | "beach" | "park" | "vet";

export interface CardStatusBadge {
  isOpen: boolean;
  label: string;
}

export interface BaseCardProps {
  id: string | number;
  headerIcon: ReactNode;
  headerSubtitle: string;
  children: ReactNode;
  className?: string;
  accentVariant?: CardAccentVariant;
  statusBadge?: CardStatusBadge | null;
  tags?: string[];
}

export interface CardSkeletonProps {
  rows?: number;
  className?: string;
}

export interface ServiceBadgeProps {
  label: string;
  available: boolean;
  icon?: ReactNode;
  className?: string;
  statusLabel?: string;
}

export interface InfoItemProps {
  icon: ReactNode;
  label: string;
  value?: string;
  children?: ReactNode;
  variant?: "horizontal" | "vertical";
  className?: string;
  iconBg?: string;
}

export interface SearchFilterProps {
  placeholder: string;
  ariaLabel: string;
  onSearch?: (query: string) => void;
  value?: string;
  className?: string;
}

export interface SearchResultsInfoProps {
  totalResults: number;
  filteredResults: number;
  searchQuery: string;
  itemName: string;
  itemNamePlural: string;
}
