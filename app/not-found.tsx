import Link from "next/link";
import { ArrowLeft, Mail } from "lucide-react";

export default function NotFound() {
  return (
    <>
      <div className="gradient-mesh" aria-hidden="true" />
      <main className="relative grid min-h-screen place-items-center px-6 py-16">
        <section className="w-full max-w-md rounded-2xl border border-white/10 bg-white/5 px-6 py-8 text-center backdrop-blur-md sm:px-8 sm:py-10">
          <p className="text-eyebrow">404</p>
          <h1 className="text-section-title mt-5">Nothing here.</h1>
          <p className="text-body-sm mt-5">
            This page isn&apos;t available from your location.
          </p>
          <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:justify-center">
            <Link
              className="inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-mango px-4 text-sm font-bold text-night shadow-button transition hover:-translate-y-0.5 hover:bg-mango/90 focus:outline-none focus-visible:ring-4 focus-visible:ring-mango/40"
              href="mailto:joshuagoucher94@gmail.com"
            >
              <Mail className="h-4 w-4" />
              Email Joshua
            </Link>
            <Link
              className="inline-flex h-11 items-center justify-center gap-2 rounded-xl border border-white/15 bg-white/5 px-4 text-sm font-bold text-white transition hover:-translate-y-0.5 hover:bg-white/10 focus:outline-none focus-visible:ring-4 focus-visible:ring-mango/40"
              href="/"
            >
              <ArrowLeft className="h-4 w-4" />
              Go to site
            </Link>
          </div>
        </section>
      </main>
    </>
  );
}
