import {
  BadgeCheck,
  BriefcaseBusiness,
  Check,
  Coffee,
  Headphones,
  Heart,
  MessageCircle,
  Sparkles,
  UsersRound,
  Wrench,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

export type ProofStat = {
  value: string;
  numericValue?: number;
  prefix?: string;
  suffix?: string;
  label: string;
  context: string;
  icon: LucideIcon;
};

export type Skill = {
  label: string;
  icon: LucideIcon;
};

export type Experience = {
  company: string;
  role: string;
  dates: string;
  color: string;
  details: string[];
};

export const proof: ProofStat[] = [
  { value: "97", numericValue: 97, label: "QA average", context: "Peek Pro", icon: BadgeCheck },
  { value: "~6t", numericValue: 6, prefix: "~", suffix: "t", label: "coffee roasted", context: "Tamp Culture", icon: Coffee },
  { value: "120", numericValue: 120, label: "coffees sold daily", context: "Tamp Culture", icon: Coffee },
  { value: "8", numericValue: 8, label: "staff managed", context: "Tamp Culture", icon: UsersRound },
];

export const skills: Skill[] = [
  { label: "Technical support", icon: Headphones },
  { label: "CRM / support tools", icon: MessageCircle },
  { label: "Onboarding", icon: UsersRound },
  { label: "Customer success", icon: Heart },
  { label: "AI tools and workflow experiments", icon: Sparkles },
  { label: "Bricks-and-mortar business operations", icon: BriefcaseBusiness },
  { label: "WordPress / Shopify ecommerce", icon: Sparkles },
  { label: "QuickBooks", icon: Check },
  { label: "Coffee equipment / parts sourcing", icon: Wrench },
];

export const experience: Experience[] = [
  {
    company: "Peek Pro",
    role: "Senior L2 Technical Support",
    dates: "June 2024 - May 2026",
    color: "bg-mango",
    details: [
      "Technical support across phone, email, and helpdesk for activity and rental travel operators.",
      "Maintained a 97 QA average while troubleshooting partner issues across booking, payments, and operator workflows.",
      "Turned partner issues into clearer docs, onboarding moments, and product feedback.",
    ],
  },
  {
    company: "Tamp Culture Coffee",
    role: "Co-founder and Operations Manager",
    dates: "March 2014 - September 2021",
    color: "bg-papaya",
    details: [
      "Built a specialty coffee business from a van to a custom-built high street kiosk.",
      "Ran the brand, culture, service, and bricks-and-mortar operations while managing a team of 8 staff.",
      "Sold around 120 coffees a day and grew WordPress ecommerce SEO to 5,000 unique visitors per month.",
    ],
  },
];
