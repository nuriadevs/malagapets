import { icons } from "@/data/icons";

export interface ContactItem {
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  href?: string;
  text: string;
  type?: "email" | "address";
}

export const contactData: ContactItem[] = [
  {
    icon: icons.email,
    href: "mailto:info@malagapets.com",
    text: "info@malagapets.com",
    type: "email",
  },
  {
    icon: icons.location,
    text: "Málaga, España",
    type: "address",
  },
];
