import Link from "next/link";
import { ArrowLeft, Mail } from "lucide-react";

export default function NotFound() {
  return (
    <main className="grid min-h-screen place-items-center px-6 py-16">
      <section className="w-full max-w-md rounded-[28px] border border-night/10 bg-white/68 px-6 py-8 text-center shadow-[0_12px_40px_rgba(11,13,20,0.06)] backdrop-blur sm:px-8 sm:py-10">
        <p className="font-mono text-[0.65rem] uppercase tracking-[0.34em] text-night/42">404</p>
        <h1 className="mt-4 font-display text-4xl font-bold leading-none text-night sm:text-5xl">Nothing here.</h1>
        <p className="mt-4 text-sm leading-6 text-night/66 sm:text-[0.98rem]">
          This page isn&apos;t available from your location.
        </p>
        <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:justify-center">
          <Link
            className="inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-night px-4 text-sm font-bold text-white shadow-[0_10px_22px_rgba(11,13,20,0.16)] transition hover:-translate-y-0.5 hover:bg-night/90"
            href="mailto:joshuagoucher94@gmail.com"
          >
            <Mail className="h-4 w-4" />
            Email Joshua
          </Link>
          <Link
            className="inline-flex h-11 items-center justify-center gap-2 rounded-xl border border-night/12 bg-white/70 px-4 text-sm font-bold text-night transition hover:-translate-y-0.5 hover:bg-white"
            href="/"
          >
            <ArrowLeft className="h-4 w-4" />
            Go to site
          </Link>
        </div>
      </section>
    </main>
  );
}
