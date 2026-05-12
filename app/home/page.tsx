import {
  BadgeCheck,
  BriefcaseBusiness,
  Check,
  ChevronRight,
  Coffee,
  Headphones,
  Heart,
  Landmark,
  Mail,
  MapPin,
  MessageCircle,
  Sparkles,
  Sun,
  UsersRound,
  Wrench,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

type Project = {
  name: string;
  href: string;
  description: string;
  icon?: LucideIcon;
  logo?: string;
  customIcon?: "riviera" | "campeche";
  tone: string;
};

const projects: Project[] = [
  { name: "ClimasMerida.com", href: "https://climasmerida.com", description: "Air conditioning and minisplit services in Merida.", logo: "/climas-merida-logo.webp", tone: "bg-white text-night" },
  { name: "crisp.mx", href: "https://crisp.mx", description: "Clean payment links for Mexico businesses.", icon: Sparkles, tone: "bg-cream text-papaya" },
  { name: "Yucatan.guide", href: "https://yucatan.guide", description: "Useful travel notes and local finds.", icon: Landmark, tone: "bg-leaf text-white" },
  { name: "Riviera.guide", href: "https://riviera.guide", description: "Riviera Maya, self-guided.", customIcon: "riviera", tone: "bg-plum text-white" },
  { name: "Campeche.guide", href: "https://campeche.guide", description: "Campeche guide and local travel ideas.", customIcon: "campeche", tone: "bg-papaya text-white" },
];

const proof = [
  { value: "97", label: "QA average", context: "Peek Pro", icon: BadgeCheck },
  { value: "~6t", label: "coffee roasted", context: "Tamp Culture", icon: Coffee },
  { value: "120", label: "coffees sold daily", context: "Tamp Culture", icon: Coffee },
  { value: "8", label: "staff managed", context: "Tamp Culture", icon: UsersRound },
];

const skills = [
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

const experience = [
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

function CustomProjectIcon({ type }: { type: "riviera" | "campeche" }) {
  if (type === "riviera") {
    return (
      <svg className="h-8 w-8 sm:h-9 sm:w-9" viewBox="0 0 48 48" fill="none" aria-hidden="true">
        <circle cx="32" cy="14" r="6" stroke="currentColor" strokeWidth="3" />
        <path d="M32 3v4M32 21v4M21 14h4M39 14h4M24.2 6.2l2.8 2.8M37 19l2.8 2.8" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
        <path d="M14 39c4-7 6-14 6-23" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
        <path d="M20 16c-5-2-9-1-13 3 5 0 8 1 11 4M20 16c4-4 9-5 15-2-5 2-8 4-11 8M12 42c4-2 8-2 12 0s8 2 12 0" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    );
  }

  return (
    <svg className="h-8 w-8 sm:h-9 sm:w-9" viewBox="0 0 48 48" fill="none" aria-hidden="true">
      <path d="M8 41h32M12 41V19h24v22M10 19h28L24 9 10 19Z" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M16 41V30a4 4 0 0 1 8 0v11M28 41V30a4 4 0 0 1 8 0v11M14 19v-6h6v6M28 19v-6h6v6" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M22 25h4" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
    </svg>
  );
}

export default function HomePage() {
  return (
    <main className="mx-auto min-h-screen w-full max-w-[480px] px-4 pb-28 pt-5 sm:max-w-[560px] sm:px-6 lg:max-w-5xl lg:pb-16">
      <section className="relative overflow-hidden rounded-[28px] border border-night/10 bg-cream/72 px-5 pb-5 pt-5 shadow-soft backdrop-blur sm:px-7 sm:pt-7 lg:grid lg:grid-cols-[0.9fr_1.1fr] lg:gap-10 lg:rounded-[32px] lg:p-10">
        <div className="absolute right-5 top-5 text-mango" aria-hidden="true">
          <Sparkles className="h-8 w-8 animate-pulse" strokeWidth="2.1" />
        </div>
        <div className="lg:sticky lg:top-8 lg:self-start">
          <header className="flex items-center gap-4 pr-10">
            <div className="grid h-16 w-16 shrink-0 place-items-center rounded-2xl bg-night text-mango shadow-[0_18px_35px_rgba(11,13,20,0.22)] sm:h-24 sm:w-24">
              <span className="font-display text-3xl font-bold leading-none sm:text-5xl">jg</span>
            </div>
            <div className="min-w-0">
              <h1 className="font-display text-[1.8rem] font-bold leading-[0.98] text-night sm:text-[2.6rem]">Joshua Goucher</h1>
              <p className="mt-2 flex items-center gap-1.5 text-[0.98rem] font-semibold text-night/72">
                <MapPin className="h-4 w-4 shrink-0 text-leaf" /> Merida, Mexico
              </p>
            </div>
          </header>
          <div className="mt-5 flex items-center gap-2">
            <a className="inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-night px-4 text-sm font-bold text-white shadow-[0_10px_22px_rgba(11,13,20,0.18)] transition hover:-translate-y-0.5 hover:bg-night/90" href="mailto:joshuagoucher94@gmail.com" aria-label="Email Joshua">
              <Mail className="h-5 w-5" /> Email me
            </a>
          </div>
          <div className="mt-6 sm:mt-8">
            <p className="font-display text-[2.75rem] font-bold leading-[0.9] text-night sm:text-[4rem] lg:text-[4.8rem]">an ideas guy</p>
            <p className="mt-4 max-w-md text-base leading-7 text-night/74 sm:mt-5 sm:text-lg">I build useful little web things and help teams untangle operational problems. Mostly support, systems, service, and the bit where an idea becomes real.</p>
          </div>
        </div>
        <div className="mt-8 lg:mt-0">
          <div id="projects" className="space-y-2 scroll-mt-6" aria-label="Projects">
            {projects.map((project) => {
              const Icon = project.icon;
              return (
                <a key={project.name} className="group flex min-h-[74px] items-center gap-3 rounded-2xl border border-night/12 bg-white/58 p-3 shadow-[0_8px_26px_rgba(11,13,20,0.06)] transition hover:-translate-y-0.5 hover:border-night/20 hover:bg-white/86 focus:outline-none focus-visible:ring-4 focus-visible:ring-mango/45 sm:min-h-[86px] sm:gap-4" href={project.href} target="_blank" rel="noreferrer">
                  <span className={`grid h-14 w-14 shrink-0 place-items-center rounded-[16px] sm:h-16 sm:w-16 sm:rounded-[18px] ${project.tone}`}>
                    {project.logo ? <img className="max-h-10 w-12 object-contain sm:max-h-11 sm:w-14" src={project.logo} alt="" loading="lazy" /> : project.customIcon ? <CustomProjectIcon type={project.customIcon} /> : Icon ? <Icon className="h-7 w-7 sm:h-8 sm:w-8" strokeWidth="2.2" /> : null}
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block font-display text-xl font-bold leading-tight text-night sm:text-[1.45rem]">{project.name}</span>
                    <span className="mt-1 block text-[0.9rem] leading-snug text-night/68 sm:text-[0.96rem]">{project.description}</span>
                  </span>
                  <ChevronRight className="h-7 w-7 shrink-0 text-night transition group-hover:translate-x-0.5" strokeWidth="2.6" />
                </a>
              );
            })}
          </div>
          <section className="mt-5 grid grid-cols-2 overflow-hidden rounded-2xl bg-night text-white shadow-[0_18px_38px_rgba(11,13,20,0.18)] sm:grid-cols-4">
            {proof.map((item, index) => {
              const Icon = item.icon;
              return (
                <div key={item.label} className={`min-h-[116px] p-4 ${index !== 0 ? "border-l border-white/14" : ""}`}>
                  <Icon className="h-7 w-7 text-mango" />
                  <p className="mt-2 font-display text-3xl font-bold leading-none">{item.value}</p>
                  <p className="mt-1 text-sm font-semibold leading-tight text-white/90">{item.label}</p>
                  <p className="mt-1 text-xs leading-tight text-white/55">{item.context}</p>
                </div>
              );
            })}
          </section>
        </div>
      </section>
      <section className="mt-6 rounded-[28px] border border-night/10 bg-white/58 p-5 shadow-[0_12px_40px_rgba(11,13,20,0.07)] backdrop-blur sm:p-7 lg:mx-auto lg:max-w-3xl">
        <div className="flex items-center gap-3"><Sun className="h-7 w-7 text-mango" strokeWidth="2.1" /><h2 className="font-display text-2xl font-bold text-night sm:text-3xl">Experience highlights</h2></div>
        <div className="mt-6 space-y-7">
          {experience.map((job) => (
            <article key={job.company} className="relative pl-8">
              <span className={`absolute left-0 top-1 h-4 w-4 rounded-full ${job.color} ring-4 ring-white`} aria-hidden="true" />
              <span className="absolute bottom-1 left-[7px] top-7 w-px bg-night/16" aria-hidden="true" />
              <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
                <div><h3 className="font-display text-xl font-bold leading-tight text-night">{job.company}</h3><p className="text-sm font-bold text-night/70">{job.role}</p></div>
                <p className="w-fit rounded-full bg-mango px-3 py-1 text-xs font-bold text-night">{job.dates}</p>
              </div>
              <ul className="mt-3 space-y-2">
                {job.details.map((detail) => <li key={detail} className="flex gap-2 text-[0.96rem] leading-6 text-night/76"><Check className="mt-1 h-4 w-4 shrink-0 text-leaf" strokeWidth="2.7" /><span>{detail}</span></li>)}
              </ul>
            </article>
          ))}
        </div>
      </section>
      <section className="mt-6 rounded-[28px] border border-night/10 bg-cream/72 p-5 shadow-[0_12px_40px_rgba(11,13,20,0.06)] backdrop-blur sm:p-7 lg:mx-auto lg:max-w-3xl">
        <div className="flex items-center gap-3"><BriefcaseBusiness className="h-7 w-7 text-plum" strokeWidth="2.1" /><h2 className="font-display text-2xl font-bold text-night sm:text-3xl">Working range</h2></div>
        <div className="mt-5 grid grid-cols-1 gap-2.5 sm:grid-cols-2">
          {skills.map((skill) => { const Icon = skill.icon; return <div key={skill.label} className="flex min-h-12 items-center gap-3 rounded-2xl border border-night/12 bg-white/52 px-4 py-3 text-sm font-semibold text-night/82"><Icon className="h-5 w-5 shrink-0 text-night" strokeWidth="2.1" /><span>{skill.label}</span></div>; })}
        </div>
      </section>
    </main>
  );
}
