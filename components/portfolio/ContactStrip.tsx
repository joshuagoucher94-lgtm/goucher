"use client";

import { Mail, MapPin } from "lucide-react";
import { AnimatedSection } from "@/components/portfolio/AnimatedSection";

export function ContactStrip() {
  return (
    <AnimatedSection className="border-t border-white/10 px-5 py-16 sm:px-8 sm:py-20 lg:px-10">
      <div className="mx-auto flex w-full max-w-5xl flex-col items-start justify-between gap-8 sm:flex-row sm:items-center">
        <div>
          <p className="font-display text-[1.375rem] font-bold leading-[1.15] tracking-[-0.02em] text-white sm:text-[1.5rem]">
            Let&apos;s talk.
          </p>
          <p className="mt-2.5 flex items-center gap-2 text-[0.9375rem] leading-none text-white/50">
            <MapPin className="h-3.5 w-3.5 text-leaf" />
            Merida, Mexico
          </p>
        </div>
        <a
          className="inline-flex h-12 items-center justify-center gap-2.5 rounded-xl border border-white/15 bg-white/5 px-6 text-[0.9375rem] font-medium tracking-[-0.01em] text-white transition hover:-translate-y-0.5 hover:border-mango/40 hover:bg-white/10 focus:outline-none focus-visible:ring-4 focus-visible:ring-mango/40"
          href="mailto:joshuagoucher94@gmail.com"
        >
          <Mail className="h-4 w-4" />
          joshuagoucher94@gmail.com
        </a>
      </div>
      <p className="text-eyebrow mx-auto mt-14 w-full max-w-5xl text-[0.625rem] tracking-[0.22em] text-white/25">
        &copy; {new Date().getFullYear()} Joshua Goucher
      </p>
    </AnimatedSection>
  );
}
