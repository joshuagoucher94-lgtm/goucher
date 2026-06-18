"use client";

import { motion, useInView, useReducedMotion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { AnimatedSection } from "@/components/portfolio/AnimatedSection";
import type { ProofStat } from "@/lib/experience";
import { proof } from "@/lib/experience";

function AnimatedStat({ stat }: { stat: ProofStat }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-40px" });
  const reducedMotion = useReducedMotion();
  const [displayValue, setDisplayValue] = useState(reducedMotion ? stat.value : "0");

  useEffect(() => {
    if (!isInView || stat.numericValue === undefined) {
      if (isInView) setDisplayValue(stat.value);
      return;
    }

    if (reducedMotion) {
      setDisplayValue(stat.value);
      return;
    }

    const duration = 1200;
    const start = performance.now();
    const target = stat.numericValue;
    const prefix = stat.prefix ?? "";
    const suffix = stat.suffix ?? "";

    let frame: number;
    const tick = (now: number) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = Math.round(target * eased);
      setDisplayValue(`${prefix}${current}${suffix}`);
      if (progress < 1) frame = requestAnimationFrame(tick);
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [isInView, reducedMotion, stat]);

  const Icon = stat.icon;

  return (
    <motion.div
      ref={ref}
      className="min-w-[9.5rem] flex-shrink-0 snap-start px-6 py-7 sm:min-w-0 sm:px-8 sm:py-9"
      initial={reducedMotion ? false : { opacity: 0, y: 16 }}
      animate={isInView ? { opacity: 1, y: 0 } : undefined}
      transition={{ duration: 0.5 }}
    >
      <Icon className="h-5 w-5 text-mango" strokeWidth={2} />
      <p className="mt-4 font-display text-[2rem] font-bold leading-none tracking-[-0.03em] text-white sm:text-[2.25rem]">
        {displayValue}
      </p>
      <p className="mt-2.5 text-[0.9375rem] font-medium leading-snug tracking-[-0.01em] text-white/75">{stat.label}</p>
      <p className="mt-1.5 text-[0.8125rem] leading-snug text-white/40">{stat.context}</p>
    </motion.div>
  );
}

export function StatsStrip() {
  return (
    <AnimatedSection className="px-5 sm:px-8 lg:px-10">
      <div className="mx-auto w-full max-w-5xl">
        <div className="overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03]">
          <div className="flex snap-x snap-mandatory overflow-x-auto sm:grid sm:grid-cols-4 sm:overflow-visible">
            {proof.map((stat, index) => (
              <div
                key={stat.label}
                className={index !== 0 ? "border-l border-white/10 max-sm:border-l-0" : ""}
              >
                <AnimatedStat stat={stat} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </AnimatedSection>
  );
}
