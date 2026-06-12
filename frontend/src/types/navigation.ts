import { routing } from "@/i18n/routing";

type Pathname = Exclude<keyof typeof routing.pathnames, `${string}[${string}]`>;

export interface NavigationLink {
  key: string;
  href: Pathname;
  labelKey: string;
  submenu?: NavigationLink[];
}
