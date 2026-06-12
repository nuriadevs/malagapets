// src/types/maps/common.types.ts

import { LatLngExpression } from "leaflet";

export interface BaseMapLocation {
  id: string | number;
  name: string;
  coordinates: [number, number];
}

export interface MapConfig {
  center: LatLngExpression;
  zoom: number;
  scrollWheelZoom?: boolean;
  dragging?: boolean;
}

export interface MapState<T> {
  data: T[];
  loading: boolean;
  error: string | null;
}

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
