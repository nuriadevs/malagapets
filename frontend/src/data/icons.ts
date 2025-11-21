import {
  PawPrint,
  HeartHandshake,
  Smile,
  Mail,
  MapPin,
  Heart,
  Instagram,
  Clock,
  Accessibility,
  LandPlot,
  SoapDispenserDroplet,
  Search,
  X,
  ChevronLeft,
  ChevronRight,
  Phone,
  Calendar,
  Camera,
  Send,
  Loader2,
  Hospital, 
  Stethoscope,
  FileSearch2,
  FileText,
  AlertTriangle,
  RefreshCw,
  Home,
  Bug,
  Globe,
  Award,
  Star,
  Wrench,
  Check,
  Droplets,
  Trash2,
  ParkingCircle,
  CircleDot,
  Package,
  Map,
  Smartphone,
  House,
  User,
  type LucideIcon,
} from "lucide-react";

/**
 * Icons used in different sections.
 */

export const missionIcons = [PawPrint, HeartHandshake, Smile];
export const footerIcons = [Mail, MapPin, PawPrint];
export const socialIcons = [Instagram];
export const cards = [
  MapPin,
  Clock,
  Accessibility,
  LandPlot,
  SoapDispenserDroplet,
];
export const search = [Search, X];
export const paginationIcons = [ChevronLeft, ChevronRight];

export const paw: LucideIcon = PawPrint;
export const heart: LucideIcon = Heart;
export const photoIcon: LucideIcon = Camera;
export const FileTextIcon: LucideIcon = FileText;

export const vetsIcon = [Hospital, Stethoscope];

export const searchIcon = [Search, X];

export const searchResult = [Search, FileSearch2];

export const errorIcons = [AlertTriangle, RefreshCw, Home, Bug];

export const loadingIcons = [PawPrint];

export const notFoundIcons = [Home, Search, PawPrint];

export const newsletter = [Mail, User];

export const formIcons = {
  send: Send,
  loader: Loader2,
  success: PawPrint,
} as const;

// Social Icons
export const icons = {
  email: Mail,
  location: MapPin,
};

// Iconos para cards de parques
export const cardIcons = {
  location: MapPin,
  schedule: Clock,
  accessibility: Accessibility,
  extension: LandPlot,
  fountain: SoapDispenserDroplet,
  globe: Globe,
  certification: Award,
  star: Star,
  services: Wrench,
  check: Check,
  close: X,
};

// Iconos para cards de veterinarias
export const vetCardIcons = {
  location: MapPin,
  phone: Phone,
  mobile: Smartphone,
  house: House,
  schedule: Clock,
  daysOpen: Calendar,
  email: Mail,
  website: Globe
};

// Iconos para cards de playas
export const beachCardIcons = {
  municipality: Map,
  location: MapPin,
  schedule: Clock,
  extension: LandPlot,
  globe: Globe,
  certification: Award,
  star: Star,
  services: Wrench,
  check: Check,
  close: X,
  dogShower: Droplets,
  waterFountain: SoapDispenserDroplet,
  trashBins: Trash2,
  parking: ParkingCircle,
  agilityArea: CircleDot,
  bagDispenser: Package,
};