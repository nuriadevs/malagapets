//src/data/social-links.ts
import { IconType } from "react-icons";
import { socialIcons } from "@/data/icons";
import { SOCIAL } from "@/lib/constants";

export type SocialLink = {
  label: string;
  href: string;
  icon: IconType;
  alt: string;
};

const [Instagram] = socialIcons;

export const socialLinks: SocialLink[] = [
  {
    label: "Instagram",
    href: SOCIAL.instagram,
    icon: Instagram,
    alt: "Instagram",
  },
];
