"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ChevronRight } from "lucide-react";
import type { Project } from "@/lib/projects";

type ProjectCardProps = {
  project: Project;
  featured?: boolean;
};

export function ProjectCard({ project, featured = false }: ProjectCardProps) {
  const reducedMotion = useReducedMotion();
  const Icon = project.icon;

  return (
    <motion.a
      href={project.href}
      target="_blank"
      rel="noreferrer"
      className={`group relative flex flex-col overflow-hidden rounded-2xl border glass transition focus:outline-none focus-visible:ring-4 focus-visible:ring-mango/40 ${
        featured
          ? "border-imperial/30 p-7 hover:border-imperial/50 hover:shadow-glow-imperial sm:p-9"
          : "p-5 hover:border-white/20 hover:bg-white/[0.07] sm:p-6"
      }`}
      whileHover={reducedMotion ? undefined : { y: -4 }}
      transition={{ duration: 0.25 }}
    >
      {featured && (
        <div
          className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-imperial/20 blur-3xl"
          aria-hidden="true"
        />
      )}

      <div className={`relative flex ${featured ? "flex-col gap-6 sm:flex-row sm:items-start sm:gap-8" : "items-start gap-4 sm:gap-5"}`}>
        <span
          className={`grid shrink-0 place-items-center rounded-[16px] border ${project.tone} ${
            featured ? "h-[4.25rem] w-[4.25rem] sm:h-20 sm:w-20 sm:rounded-[18px]" : "h-14 w-14 sm:h-[3.75rem] sm:w-[3.75rem]"
          }`}
        >
          {project.logo ? (
            <img
              className="max-h-10 w-12 object-contain sm:max-h-11 sm:w-14"
              src={project.logo}
              alt=""
              loading="lazy"
            />
          ) : Icon ? (
            <Icon className={featured ? "h-8 w-8 sm:h-9 sm:w-9" : "h-7 w-7 sm:h-8 sm:w-8"} strokeWidth={2} />
          ) : null}
        </span>

        <div className="min-w-0 flex-1">
          <div className="flex items-start justify-between gap-4">
            <span
              className={`block font-display font-bold tracking-[-0.02em] text-white ${
                featured ? "text-[1.625rem] leading-[1.15] sm:text-[1.875rem]" : "text-[1.125rem] leading-[1.2] sm:text-[1.25rem]"
              }`}
            >
              {project.name}
            </span>
            <ChevronRight
              className={`mt-0.5 shrink-0 text-white/35 transition group-hover:translate-x-0.5 group-hover:text-mango ${featured ? "h-6 w-6" : "h-5 w-5"}`}
              strokeWidth={2.25}
            />
          </div>
          <p className={`text-body-sm ${featured ? "mt-4 max-w-2xl" : "mt-2.5"}`}>{project.description}</p>

          {featured && project.tags && (
            <div className="mt-6 flex flex-wrap gap-2.5">
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full border border-white/10 bg-white/5 px-3.5 py-1.5 font-mono text-[0.6875rem] font-medium uppercase tracking-[0.12em] text-white/60"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}

          {featured && project.highlights && (
            <ul className="mt-7 space-y-3.5 border-t border-white/10 pt-7">
              {project.highlights.map((highlight) => (
                <li key={highlight} className="flex gap-3 text-body-sm">
                  <span className="mt-[0.6rem] h-1 w-1 shrink-0 rounded-full bg-mango" aria-hidden="true" />
                  {highlight}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </motion.a>
  );
}
