"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function RootGateRedirect() {
  const router = useRouter();

  useEffect(() => {
    const passed = typeof window !== "undefined" && window.localStorage.getItem("intelligence_gate_passed") === "true";
    router.replace(passed ? "/home" : "/gate");
  }, [router]);

  return (
    <main className="grid min-h-screen place-items-center bg-night text-cream">
      <p className="font-mono text-xs uppercase tracking-[0.34em] text-cream/60">Calibrating entry signal</p>
    </main>
  );
}
