import {
  PawPrint,
  HeartHandshake,
  Smile,
  Mail,
  MapPin,
  Heart,
  Clock,
  Accessibility,
  LandPlot,
  SoapDispenserDroplet,
  Search,
  X,
  ChevronLeft,
  ChevronRight,
  Camera,
  FileSearch2,
  type LucideIcon,
} from "lucide-react";

import {
  FaDog,
  FaMobileScreen,
  FaHouse,
  FaLocationDot,
  FaClock,
  FaRulerCombined,
  FaWheelchair,
  FaCircleCheck,
  FaCircleXmark,
  FaFaucet,
  FaPhone,
  FaCalendarDays,
  FaEnvelope,
  FaGlobe,
  FaUmbrellaBeach,
  FaRoad,
  FaCertificate,
  FaAward,
  FaStar,
  FaShower,
  FaTrash,
  FaSquareParking,
  FaMap,
  FaWrench,
  FaCheck,
  FaXmark,
  FaBox,
  FaArrowsSplitUpAndLeft,
  FaHospital,
  FaMobileScreenButton,
  FaMapLocationDot,
  FaRegFileLines,
  FaPaw,
  FaCameraRetro,
} from "react-icons/fa6";

export const FileText = FaRegFileLines;

import { FaAmbulance } from "react-icons/fa";
import { RiServiceFill } from "react-icons/ri";
import { GiJumpingDog } from "react-icons/gi";

/**
 * MapHeroCompact Icons:
 */

export const mapHeroIcons = {
  location: FaLocationDot,
};

/*
 * Parks Card Icons:
 */
export const parkCardIcons = {
  dog: FaDog,
  location: FaLocationDot,
  schedule: FaClock,
  accessibility: FaWheelchair,
  extension: FaRulerCombined,
  fountain: FaFaucet,
  globe: FaMapLocationDot,
  certification: FaAward,
  star: FaStar,
  services: FaWrench,
  check: FaCheck,
  close: FaXmark,
  arrows: FaArrowsSplitUpAndLeft,
  map: FaMapLocationDot,
};

/*
 * Vets Card Icons:
 */
export const vetCardIcons = {
  vetClinic: FaStethoscope,
  vetHospital: FaHospital,
  location: FaLocationDot,
  phone: FaPhone,
  mobile: FaMobileScreen,
  house: FaHouse,
  schedule: FaClock,
  daysOpen: FaCalendarDays,
  email: FaEnvelope,
  website: FaGlobe,
  map: FaMapLocationDot,
};

/**
 * Beach Card Icons:
 */
export const beachCardIcons = {
  umbrella: FaUmbrellaBeach,
  municipality: FaMap,
  location: FaLocationDot,
  schedule: FaClock,
  extension: FaRulerCombined,
  map: FaMapLocationDot,
  certification: FaCertificate,
  award: FaAward,
  star: FaStar,
  services: RiServiceFill,
  check: FaCheck,
  checkCircle: FaCircleCheck,
  closeCircle: FaCircleXmark,
  close: FaXmark,
  dogShower: FaShower,
  waterFountain: FaFaucet,
  trashBins: FaTrash,
  parking: FaSquareParking,
  agilityArea: GiJumpingDog,
  bagDispenser: FaBox,
  road: FaRoad,
};

/**
 * Icons used in different sections.
 */

export const placeCardIcons = {
  park: FaDog,
  beach: FaUmbrellaBeach,
  vetClinic: FaStethoscope,
  vetHospital: FaHospital,
  location: FaLocationDot,
  schedule: FaClock,
  phone: FaPhone,
  mobile: FaMobileScreenButton,
  emergency: FaAmbulance,
  globe: FaGlobe,
};
export const missionIcons = [PawPrint, HeartHandshake, Smile];
export const footerIcons = [Mail, MapPin, PawPrint];
export const cards = [
  MapPin,
  Clock,
  Accessibility,
  LandPlot,
  SoapDispenserDroplet,
];
export const search = [Search, X];
export const paginationIcons = [ChevronLeft, ChevronRight];
export const heroCard = { camera: FaCameraRetro, paw: FaPaw };
export const paw: LucideIcon = PawPrint;
export const heart: LucideIcon = Heart;
export const photoIcon: LucideIcon = Camera;

export const mapHighlight = { location: FaLocationDot, dog: FaDog };

export const searchIcon = [Search, X];

export const searchResult = [Search, FileSearch2];

export const loadingIcons = [PawPrint];

// Social Icons
export const icons = {
  email: Mail,
  location: MapPin,
};

import { FaInstagram, FaStethoscope } from "react-icons/fa";

export const socialIcons = [FaInstagram];
