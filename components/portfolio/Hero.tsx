"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ChevronDown, Mail, MapPin } from "lucide-react";

const container = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.12, delayChildren: 0.1 },
  },
};

const item = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as const } },
};

export function Hero() {
  const reducedMotion = useReducedMotion();

  return (
    <section className="relative flex min-h-[100svh] flex-col justify-center px-5 pb-20 pt-12 sm:px-8 lg:px-10">
      <motion.div
        className="mx-auto w-full max-w-5xl"
        variants={reducedMotion ? undefined : container}
        initial={reducedMotion ? false : "hidden"}
        animate="show"
      >
        <motion.header variants={reducedMotion ? undefined : item} className="flex items-center gap-5">
          <div className="grid h-[4.5rem] w-[4.5rem] shrink-0 place-items-center rounded-2xl bg-mango text-night shadow-glow sm:h-20 sm:w-20">
            <span className="font-display text-[1.75rem] font-extrabold leading-none tracking-[-0.04em] sm:text-[2rem]">jg</span>
          </div>
          <div className="min-w-0">
            <h1 className="font-display text-[1.625rem] font-bold leading-[1.15] tracking-[-0.02em] text-white sm:text-[2rem]">
              Joshua Goucher
            </h1>
            <p className="mt-2 flex items-center gap-2 text-[0.9375rem] font-normal leading-none text-white/55">
              <MapPin className="h-3.5 w-3.5 shrink-0 text-leaf" />
              Merida, Mexico
            </p>
          </div>
        </motion.header>

        <motion.div variants={reducedMotion ? undefined : item} className="mt-14 sm:mt-20 lg:mt-24">
          <h2 className="text-display-hero flex flex-col gap-2 sm:gap-3">
            <span className="text-white/88">an</span>
            <span className="text-mango">ideas</span>
            <span className="text-white/88">guy</span>
          </h2>
          <p className="text-body mt-8 max-w-xl sm:mt-10">
            I build useful little web things and help teams untangle operational problems. Mostly support, systems,
            service, and the bit where an idea becomes real.
          </p>
        </motion.div>

        <motion.div variants={reducedMotion ? undefined : item} className="mt-10 sm:mt-12">
          <a
            className="inline-flex h-12 items-center justify-center gap-2.5 rounded-xl bg-mango px-7 text-[0.9375rem] font-semibold tracking-[-0.01em] text-night shadow-button transition hover:-translate-y-0.5 hover:bg-mango/90 focus:outline-none focus-visible:ring-4 focus-visible:ring-mango/40"
            href="mailto:joshuagoucher94@gmail.com"
            aria-label="Email Joshua"
          >
            <Mail className="h-[1.125rem] w-[1.125rem]" />
            Email me
          </a>
        </motion.div>
      </motion.div>

      <motion.a
        href="#work"
        className="absolute bottom-10 left-1/2 flex -translate-x-1/2 flex-col items-center gap-2 text-white/35 transition hover:text-white/60"
        aria-label="Scroll to selected work"
        animate={reducedMotion ? undefined : { y: [0, 6, 0] }}
        transition={reducedMotion ? undefined : { duration: 2, repeat: Infinity, ease: "easeInOut" }}
      >
        <span className="text-eyebrow text-[0.625rem] tracking-[0.24em]">Work</span>
        <ChevronDown className="h-5 w-5" strokeWidth={1.75} />
      </motion.a>
    </section>
  );
}
