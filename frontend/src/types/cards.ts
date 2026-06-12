// shared/cards/card.types.ts

import type { ReactNode } from "react";

export type DirectoryVariant = "beach" | "park" | "vet" | "generic";

export interface BaseCardProps {
  id: string | number;
  headerIcon: ReactNode;
  headerTitle?: string;
  nameTitle?: string;
  variant?: DirectoryVariant;
  children: ReactNode;
  className?: string;
  isLoading?: boolean;
  skeleton?: ReactNode;
}

export interface CardSkeletonProps {
  variant?: DirectoryVariant;
  rows?: number;
  hasServices?: boolean;
  hasAction?: boolean;
  className?: string;
}

export interface InfoItemProps {
  icon: ReactNode;
  label?: string;
  value?: string | null;
  variant?: "horizontal" | "compact" | "default";
  children?: ReactNode;
  className?: string;
}

export interface BeachCardData {
  id: string | number;
  name: string;
  municipality: string;
  locality?: string;
  location: string;
  length?: string;
  area?: string;
  coordinates: { lat: number; lng: number };
  services: {
    dogShower: boolean;
    waterFountain: boolean;
    trashBins: boolean;
    parking: boolean;
    agilityArea: boolean;
    bagDispenser: boolean;
  };
  schedule: {
    summer?: string;
    winter?: string;
    yearRound?: string;
  };
  access?: {
    type?: string;
    by_car?: boolean;
    distance_from_center?: string;
    access_road?: string;
    references?: string;
  };
  certifications?: string[];
  highlights?: string[];
  googleMapsUrl?: string;
}

export interface ParkCardData {
  id: string | number;
  name: string;
  address?: string;
  schedule?: string;
  accessibility?: boolean;
  extension?: string;
  fountain?: boolean;
  biZone?: boolean;
  description?: string;
  googleMapsUrl?: string;
  coordinates?: { lat: number; lng: number };
}

export interface VetCardData {
  id: string | number;
  type: "hospital" | "clinic";
  name: string;
  address: string;
  postalCode?: string;
  phones: Array<{ type: string; number: string }>;
  schedule?: string;
  daysOpen?: string;
  website?: string;
  email?: string;
  googleMapsUrl?: string;
  coordinates?: { lat: number; lng: number };
}

export type AnyCardData = BeachCardData | ParkCardData | VetCardData;
