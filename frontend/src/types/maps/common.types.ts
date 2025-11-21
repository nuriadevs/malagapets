// src/types/maps/common.types.ts

import { LatLngExpression } from 'leaflet';

/**
 * Base interface for all map locations
 */
export interface BaseMapLocation {
  id: string | number;
  name: string;
  coordinates: [number, number];
}

/**
 * Common map configuration
 */
export interface MapConfig {
  center: LatLngExpression;
  zoom: number;
  scrollWheelZoom?: boolean;
  dragging?: boolean;
}

/**
 * Map loading states
 */
export interface MapState<T> {
  data: T[];
  loading: boolean;
  error: string | null;
}

/**
 * Props for popup components
 */
export interface PopupRowProps {
  icon: string;
  label: string;
  value: string | React.ReactNode;
  color?: string;
}

export interface PopupHeaderProps {
  title: string;
  subtitle?: string;
  color?: string;
  icon?: string;
}

export interface PopupButtonProps {
  href: string;
  label: string;
  color?: string;
}
