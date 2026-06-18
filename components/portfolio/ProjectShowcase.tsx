"use client";

import { AnimatedSection } from "@/components/portfolio/AnimatedSection";
import { ProjectCard } from "@/components/portfolio/ProjectCard";
import { SectionHeader } from "@/components/portfolio/SectionHeader";
import { featuredProject, otherProjects } from "@/lib/projects";

export function ProjectShowcase() {
  return (
    <AnimatedSection id="work" className="px-5 py-20 sm:px-8 sm:py-28 lg:px-10">
      <div className="mx-auto w-full max-w-5xl">
        <SectionHeader eyebrow="Selected work" title="Projects" />

        <div className="mt-12 space-y-5 sm:mt-14">
          <ProjectCard project={featuredProject} featured />
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {otherProjects.map((project) => (
              <ProjectCard key={project.name} project={project} />
            ))}
          </div>
        </div>
      </div>
    </AnimatedSection>
  );
}
