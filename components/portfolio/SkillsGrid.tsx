"use client";

import { motion, useReducedMotion } from "framer-motion";
import { AnimatedSection } from "@/components/portfolio/AnimatedSection";
import { SectionHeader } from "@/components/portfolio/SectionHeader";
import { skills } from "@/lib/experience";

export function SkillsGrid() {
  const reducedMotion = useReducedMotion();

  return (
    <AnimatedSection id="capabilities" className="px-5 py-20 sm:px-8 sm:py-28 lg:px-10">
      <div className="mx-auto w-full max-w-5xl">
        <SectionHeader eyebrow="Capabilities" title="Working range" />

        <motion.div
          className="mt-12 grid grid-cols-1 gap-3 sm:mt-14 sm:grid-cols-2 sm:gap-3.5 lg:grid-cols-3"
          initial={reducedMotion ? false : "hidden"}
          whileInView="show"
          viewport={{ once: true, margin: "-60px" }}
          variants={{
            hidden: {},
            show: { transition: { staggerChildren: 0.05 } },
          }}
        >
          {skills.map((skill) => {
            const Icon = skill.icon;
            return (
              <motion.div
                key={skill.label}
                className="flex min-h-[3.25rem] items-center gap-3.5 rounded-2xl border border-white/10 bg-white/[0.03] px-5 py-4 text-[0.9375rem] font-medium leading-snug tracking-[-0.01em] text-white/72"
                variants={{
                  hidden: { opacity: 0, y: 12 },
                  show: { opacity: 1, y: 0, transition: { duration: 0.4 } },
                }}
              >
                <Icon className="h-[1.125rem] w-[1.125rem] shrink-0 text-mango" strokeWidth={2} />
                <span>{skill.label}</span>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </AnimatedSection>
  );
}
