"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Check } from "lucide-react";
import { AnimatedSection } from "@/components/portfolio/AnimatedSection";
import { SectionHeader } from "@/components/portfolio/SectionHeader";
import { experience } from "@/lib/experience";

export function ExperienceTimeline() {
  const reducedMotion = useReducedMotion();

  return (
    <AnimatedSection className="mt-14 px-5 pb-6 sm:mt-16 sm:px-8 sm:pb-8 lg:px-10" delay={0.1}>
      <div className="mx-auto w-full max-w-5xl">
        <SectionHeader eyebrow="Track record" title="Experience highlights" />

        <div className="mt-12 space-y-12 sm:mt-14 sm:space-y-14">
          {experience.map((job, index) => (
            <motion.article
              key={job.company}
              className="relative pl-9 sm:pl-10"
              initial={reducedMotion ? false : { opacity: 0, x: -16 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <span className={`absolute left-0 top-1.5 h-3.5 w-3.5 rounded-full ${job.color} ring-4 ring-night`} aria-hidden="true" />
              <span className="absolute bottom-1 left-[6px] top-8 w-px bg-white/12" aria-hidden="true" />

              <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between sm:gap-6">
                <div>
                  <h3 className="font-display text-[1.25rem] font-bold leading-[1.2] tracking-[-0.02em] text-white sm:text-[1.375rem]">
                    {job.company}
                  </h3>
                  <p className="mt-1.5 text-[0.9375rem] font-normal leading-snug text-white/55">{job.role}</p>
                </div>
                <p className="w-fit rounded-full bg-mango/12 px-3.5 py-1.5 text-[0.8125rem] font-medium tracking-[-0.01em] text-mango">
                  {job.dates}
                </p>
              </div>

              <ul className="mt-5 space-y-3.5">
                {job.details.map((detail) => (
                  <li key={detail} className="flex gap-3 text-body-sm">
                    <Check className="mt-[0.35rem] h-4 w-4 shrink-0 text-leaf" strokeWidth={2.5} />
                    <span>{detail}</span>
                  </li>
                ))}
              </ul>
            </motion.article>
          ))}
        </div>
      </div>
    </AnimatedSection>
  );
}
