//src/data/social-links.ts
import { IconType } from "react-icons"
import {socialIcons} from "@/data/icons";
/**
 * Types for social media links
 */
export type SocialLink = {
  label: string
  href: string
  icon: IconType
  alt: string
}


const [Instagram] = socialIcons;

/**
 * Social media links
 */
export const socialLinks: SocialLink[] = [
  {
    label: "Instagram",
    href: "https://instagram.com/malagapets",
    icon: Instagram,
    alt: "Instagram"
  },

]
