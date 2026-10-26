import type { PageKey } from "@/types";

export interface NavItem {
  key: PageKey;
  label: string;
  href: string;
  description: string;
  priority: number;
}

/**
 * Single source of truth for routes. The navbar, footer, home page cards
 * and sitemap are all generated from this list.
 */
export const NAV_ITEMS: NavItem[] = [
  {
    key: "home",
    label: "Home",
    href: "/",
    description: "Introduction and links",
    priority: 1,
  },
  {
    key: "skills",
    label: "Skills",
    href: "/skills",
    description: "Technologies and the years of hands-on experience behind them.",
    priority: 0.8,
  },
  {
    key: "experience",
    label: "Experience",
    href: "/experience",
    description: "Roles, the products I shipped and where I studied.",
    priority: 0.9,
  },
  {
    key: "projects",
    label: "Projects",
    href: "/projects",
    description: "Academic projects with source code and live links.",
    priority: 0.8,
  },
];
