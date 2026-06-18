import { ContactStrip } from "@/components/portfolio/ContactStrip";
import { ExperienceTimeline } from "@/components/portfolio/ExperienceTimeline";
import { Hero } from "@/components/portfolio/Hero";
import { PageShell } from "@/components/portfolio/PageShell";
import { ProjectShowcase } from "@/components/portfolio/ProjectShowcase";
import { SkillsGrid } from "@/components/portfolio/SkillsGrid";
import { StatsStrip } from "@/components/portfolio/StatsStrip";

export default function HomePage() {
  return (
    <PageShell>
      <main>
        <Hero />
        <ProjectShowcase />
        <section id="track-record" aria-label="Track record" className="pb-20 sm:pb-28">
          <StatsStrip />
          <ExperienceTimeline />
        </section>
        <SkillsGrid />
        <ContactStrip />
      </main>
    </PageShell>
  );
}
