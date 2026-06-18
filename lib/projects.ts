import { Coffee, Landmark, Sparkles } from "lucide-react";
import type { LucideIcon } from "lucide-react";

export type Project = {
  name: string;
  href: string;
  description: string;
  icon?: LucideIcon;
  logo?: string;
  tone: string;
  featured?: boolean;
  tags?: string[];
  highlights?: string[];
};

export const projects: Project[] = [
  {
    name: "Pithead Roastworks",
    href: "https://pithead.co.uk",
    description:
      "Full-stack ecommerce rebuild for a specialty coffee roastery in Pontypridd, UK — brand redesign, Supabase catalog, Stripe Connect checkout, and mobile-first marketing site.",
    icon: Coffee,
    tone: "bg-imperial text-cream border-imperial/40",
    featured: true,
    tags: ["Next.js", "Supabase", "Stripe"],
    highlights: [
      "Brand redesign: coal/cream/imperial red design system with Inter typography",
      "Next.js 16 marketing site — Pit Mocha hero, menu board, location, wholesale",
      "Supabase-backed product catalog, admin auth, and order persistence",
      "Stripe Connect Standard checkout with webhooks and admin order management",
    ],
  },
  {
    name: "ClimasMerida.com",
    href: "https://climasmerida.com",
    description: "Air conditioning and minisplit services in Merida.",
    logo: "/climas-merida-logo.webp",
    tone: "bg-white text-night",
  },
  {
    name: "crisp.mx",
    href: "https://crisp.mx",
    description: "Clean payment links for Mexico businesses.",
    icon: Sparkles,
    tone: "bg-mango/20 text-mango",
  },
  {
    name: "Yucatan.guide",
    href: "https://yucatan.guide",
    description: "Useful travel notes and local finds.",
    icon: Landmark,
    tone: "bg-leaf/20 text-leaf",
  },
];

export const featuredProject = projects.find((p) => p.featured)!;
export const otherProjects = projects.filter((p) => !p.featured);
