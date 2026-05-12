"use client";

import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Eye, LockKeyhole, Sparkles } from "lucide-react";
import AlignmentBoard from "./AlignmentBoard";
import FragmentTray from "./FragmentTray";
import GateControls from "./GateControls";
import GlyphPreview from "./GlyphPreview";
import {
  BOARD_HEIGHT,
  BOARD_WIDTH,
  FRAGMENT_SIZE,
  SNAP_DISTANCE,
  STARTING_ENERGY,
  fragmentDefinitions,
  getTargetSlot,
  isRotationMatch,
  normalizeRotation,
  slotToPosition,
  type FragmentState,
} from "./glyphData";

const GateScene = dynamic(() => import("./GateScene"), { ssr: false });

type Phase = "idle" | "preview" | "playing" | "success" | "failure";
type DragState = {
  id: string;
  pointerId: number;
  startClientX: number;
  startClientY: number;
  startX: number;
  startY: number;
  boardScale: number;
  moved: boolean;
};

function shuffle<T>(items: T[]) {
  return [...items].sort(() => Math.random() - 0.5);
}

function createPuzzleFragments(randomize = true): FragmentState[] {
  const basePositions = [
    { x: 54, y: 28 },
    { x: 160, y: 30 },
    { x: 286, y: 34 },
    { x: 54, y: 188 },
    { x: 292, y: 178 },
    { x: 54, y: 326 },
    { x: 172, y: 350 },
    { x: 288, y: 326 },
    { x: 166, y: 134 },
    { x: 166, y: 266 },
  ];
  const positions = randomize ? shuffle(basePositions) : basePositions;
  const rotations = [0, 45, 315, 90, 270, 0, 45, 315, 135, 225];

  const definitions = randomize ? shuffle(fragmentDefinitions) : fragmentDefinitions;

  return definitions.map((fragment, index) => ({
    ...fragment,
    x: positions[index]?.x ?? 44,
    y: positions[index]?.y ?? 44,
    rotation: rotations[index] ?? 0,
    locked: false,
  }));
}

function distanceToTarget(fragment: FragmentState) {
  const slot = getTargetSlot(fragment);
  if (!slot) return Number.POSITIVE_INFINITY;
  const target = slotToPosition(slot);
  const dx = fragment.x - target.x;
  const dy = fragment.y - target.y;
  return Math.hypot(dx, dy);
}

function settleFragment(fragment: FragmentState): FragmentState {
  if (!fragment.isCorrect) return { ...fragment, locked: false };
  const slot = getTargetSlot(fragment);
  if (!slot) return { ...fragment, locked: false };
  const target = slotToPosition(slot);
  const close = distanceToTarget(fragment) <= SNAP_DISTANCE;
  const rotated = isRotationMatch(fragment.rotation, fragment.requiredRotation);

  if (close && rotated) {
    return { ...fragment, x: target.x, y: target.y, rotation: fragment.requiredRotation, locked: true };
  }

  return { ...fragment, locked: false };
}

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value));
}

export default function AlignmentGate() {
  const router = useRouter();
  const [phase, setPhase] = useState<Phase>("idle");
  const [fragments, setFragments] = useState<FragmentState[]>(() => createPuzzleFragments(false));
  const [energy, setEnergy] = useState(STARTING_ENERGY);
  const [selectedId, setSelectedId] = useState<string>();
  const [drag, setDrag] = useState<DragState | null>(null);
  const [previewShattered, setPreviewShattered] = useState(false);
  const successTimer = useRef<number | undefined>(undefined);

  const correctLocked = useMemo(() => fragments.filter((fragment) => fragment.isCorrect && fragment.locked).length, [fragments]);
  const solved = correctLocked === 6;
  const selected = fragments.find((fragment) => fragment.id === selectedId);
  const nearId = useMemo(() => {
    if (phase !== "playing") return undefined;
    const candidate = fragments.find((fragment) => fragment.isCorrect && !fragment.locked && distanceToTarget(fragment) <= SNAP_DISTANCE + 16);
    return candidate?.id;
  }, [fragments, phase]);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.localStorage.getItem("intelligence_gate_passed") === "true") {
      router.replace("/home");
    }

    // Development reset helper: localStorage.removeItem("intelligence_gate_passed")
    window.__resetAlignmentGate = () => window.localStorage.removeItem("intelligence_gate_passed");
  }, [router]);

  useEffect(() => {
    if (solved && phase === "playing") {
      setPhase("success");
      if (typeof window !== "undefined") {
        window.localStorage.setItem("intelligence_gate_passed", "true");
        successTimer.current = window.setTimeout(() => router.replace("/home"), 1800);
      }
    }
  }, [phase, router, solved]);

  useEffect(() => {
    if (energy <= 0 && phase === "playing" && !solved) {
      setPhase("failure");
      setSelectedId(undefined);
      setDrag(null);
    }
  }, [energy, phase, solved]);

  useEffect(() => () => {
    if (successTimer.current) window.clearTimeout(successTimer.current);
  }, []);

  const spendEnergy = useCallback(() => {
    setEnergy((current) => Math.max(0, current - 1));
  }, []);

  const begin = useCallback(() => {
    setFragments(createPuzzleFragments());
    setEnergy(STARTING_ENERGY);
    setSelectedId(undefined);
    setPreviewShattered(false);
    setPhase("preview");

    window.setTimeout(() => setPreviewShattered(true), 1550);
    window.setTimeout(() => setPhase("playing"), 2250);
  }, []);

  const retry = useCallback(() => begin(), [begin]);

  const resetCurrent = useCallback(() => {
    if (phase === "success") return;
    begin();
  }, [begin, phase]);

  const rotateSelected = useCallback((direction: -1 | 1) => {
    if (phase !== "playing" || !selectedId || energy <= 0) return;

    let rotated = false;
    setFragments((current) => current.map((fragment) => {
      if (fragment.id !== selectedId || fragment.locked) return fragment;
      rotated = true;
      return settleFragment({ ...fragment, rotation: normalizeRotation(fragment.rotation + direction * 45) });
    }));

    if (rotated) spendEnergy();
  }, [energy, phase, selectedId, spendEnergy]);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key.toLowerCase() === "q") rotateSelected(-1);
      if (event.key.toLowerCase() === "e") rotateSelected(1);
      if (event.key.toLowerCase() === "r") resetCurrent();
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [resetCurrent, rotateSelected]);

  const onPointerDown = useCallback((event: React.PointerEvent<HTMLButtonElement>, id: string) => {
    if (phase !== "playing" || energy <= 0) return;
    const fragment = fragments.find((item) => item.id === id);
    if (!fragment || fragment.locked) {
      setSelectedId(id);
      return;
    }

    const board = event.currentTarget.parentElement;
    const rect = board?.getBoundingClientRect();
    const boardScale = rect ? rect.width / BOARD_WIDTH : 1;

    event.currentTarget.setPointerCapture(event.pointerId);
    setSelectedId(id);
    setDrag({
      id,
      pointerId: event.pointerId,
      startClientX: event.clientX,
      startClientY: event.clientY,
      startX: fragment.x,
      startY: fragment.y,
      boardScale,
      moved: false,
    });
  }, [energy, fragments, phase]);

  const onPointerMove = useCallback((event: PointerEvent) => {
    setDrag((currentDrag) => {
      if (!currentDrag) return currentDrag;
      const dx = (event.clientX - currentDrag.startClientX) / currentDrag.boardScale;
      const dy = (event.clientY - currentDrag.startClientY) / currentDrag.boardScale;
      const moved = currentDrag.moved || Math.hypot(dx, dy) > 4;

      setFragments((current) => current.map((fragment) => {
        if (fragment.id !== currentDrag.id || fragment.locked) return fragment;
        return {
          ...fragment,
          x: clamp(currentDrag.startX + dx, 28, BOARD_WIDTH - FRAGMENT_SIZE - 28),
          y: clamp(currentDrag.startY + dy, 24, BOARD_HEIGHT - FRAGMENT_SIZE - 30),
          locked: false,
        };
      }));

      return { ...currentDrag, moved };
    });
  }, []);

  const onPointerUp = useCallback(() => {
    setDrag((currentDrag) => {
      if (!currentDrag) return currentDrag;

      setFragments((current) => current.map((fragment) => fragment.id === currentDrag.id ? settleFragment(fragment) : fragment));
      if (currentDrag.moved) spendEnergy();
      return null;
    });
  }, [spendEnergy]);

  useEffect(() => {
    if (!drag) return;
    window.addEventListener("pointermove", onPointerMove);
    window.addEventListener("pointerup", onPointerUp, { once: true });
    window.addEventListener("pointercancel", onPointerUp, { once: true });
    return () => {
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerup", onPointerUp);
      window.removeEventListener("pointercancel", onPointerUp);
    };
  }, [drag, onPointerMove, onPointerUp]);

  return (
    <main className="gate-screen relative min-h-screen overflow-hidden text-white">
      <GateScene unlocked={phase === "success"} />
      <div className="pointer-events-none fixed inset-0 z-0 bg-[radial-gradient(circle_at_50%_40%,transparent_0%,rgba(0,0,0,0.18)_48%,rgba(0,0,0,0.72)_100%)]" />
      <section className="relative z-10 mx-auto flex min-h-screen w-full max-w-7xl flex-col px-4 py-5 sm:px-6 lg:px-8">
        <header className="flex items-center justify-between gap-4 py-2">
          <div className="flex items-center gap-3">
            <div className="grid h-10 w-10 place-items-center rounded-2xl border border-[#d2b77a]/20 bg-[#d2b77a]/10 text-[#f5d99b] shadow-[0_0_28px_rgba(210,183,122,0.16)]">
              <LockKeyhole className="h-5 w-5" />
            </div>
            <div>
              <p className="font-display text-2xl font-semibold tracking-wide text-[#f8e9c9]">The Alignment Gate</p>
              <p className="font-mono text-[0.62rem] uppercase tracking-[0.28em] text-white/38">Cognitive access trial</p>
            </div>
          </div>
          <p className="hidden max-w-xs text-right text-sm leading-6 text-white/48 sm:block">Restore the mark before the signal decays.</p>
        </header>

        <div className="grid flex-1 items-center gap-6 py-6 lg:grid-cols-[0.9fr_1.1fr] lg:gap-10">
          <aside className="mx-auto w-full max-w-md lg:mx-0">
            <AnimatePresence mode="wait">
              {phase === "idle" && (
                <motion.div key="idle" initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -18 }} className="rounded-[34px] border border-white/10 bg-white/[0.055] p-6 shadow-[0_30px_100px_rgba(0,0,0,0.32)] backdrop-blur-xl sm:p-8">
                  <div className="mb-8 grid place-items-center"><GlyphPreview /></div>
                  <div className="space-y-4">
                    <p className="font-display text-4xl font-semibold leading-none text-[#f8e9c9] sm:text-5xl">Observe carefully.</p>
                    <p className="text-lg leading-8 text-white/62">The form will break once.</p>
                    <button type="button" onClick={begin} className="group mt-2 inline-flex w-full items-center justify-center gap-3 rounded-2xl border border-[#d2b77a]/30 bg-[#d2b77a]/16 px-5 py-4 text-sm font-bold uppercase tracking-[0.22em] text-[#f8e9c9] shadow-[0_18px_50px_rgba(210,183,122,0.12)] transition hover:-translate-y-0.5 hover:bg-[#d2b77a]/22 focus:outline-none focus-visible:ring-4 focus-visible:ring-[#d2b77a]/30">
                      <Eye className="h-5 w-5 transition group-hover:scale-110" /> Begin Alignment
                    </button>
                  </div>
                </motion.div>
              )}

              {phase === "preview" && (
                <motion.div key="preview" initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 1.02 }} className="rounded-[34px] border border-[#d2b77a]/14 bg-black/24 p-6 text-center shadow-[0_30px_100px_rgba(0,0,0,0.34)] backdrop-blur-xl sm:p-8">
                  <GlyphPreview shattered={previewShattered} />
                  <p className="mt-5 font-mono text-xs uppercase tracking-[0.3em] text-[#d2b77a]/76">Commit the symmetry to memory</p>
                </motion.div>
              )}

              {(phase === "playing" || phase === "success" || phase === "failure") && (
                <motion.div key="status" initial={{ opacity: 0, x: -18 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 18 }} className="space-y-4">
                  <div className="rounded-[34px] border border-white/10 bg-white/[0.055] p-5 shadow-[0_30px_100px_rgba(0,0,0,0.32)] backdrop-blur-xl sm:p-6">
                    <p className="font-display text-4xl font-semibold leading-none text-[#f8e9c9] sm:text-5xl">{phase === "success" ? "Pattern restored." : phase === "failure" ? "The form collapsed." : "Restore the mark."}</p>
                    <p className="mt-4 text-base leading-7 text-white/58">{phase === "success" ? "Access granted." : phase === "failure" ? "Observe more carefully." : "Restore the mark before the signal decays."}</p>
                    {phase === "failure" && <button type="button" onClick={retry} className="mt-5 w-full rounded-2xl border border-[#d2b77a]/24 bg-[#d2b77a]/14 px-5 py-3 text-sm font-bold uppercase tracking-[0.22em] text-[#f8e9c9] transition hover:bg-[#d2b77a]/22">Retry Alignment</button>}
                  </div>
                  <FragmentTray fragments={fragments} />
                  <GateControls selectedName={selected?.label} canInteract={phase === "playing" && Boolean(selected) && !selected?.locked && energy > 0} energy={energy} onRotateLeft={() => rotateSelected(-1)} onRotateRight={() => rotateSelected(1)} onReset={resetCurrent} />
                </motion.div>
              )}
            </AnimatePresence>
          </aside>

          <section className="relative mx-auto w-full max-w-[560px] lg:max-w-[640px]">
            <div className="absolute -inset-6 rounded-[46px] bg-[#d2b77a]/[0.035] blur-3xl" />
            {(phase === "playing" || phase === "success" || phase === "failure") ? (
              <>
                <AlignmentBoard fragments={fragments} selectedId={selectedId} draggingId={drag?.id} nearId={nearId} solved={phase === "success"} onSelect={setSelectedId} onPointerDown={onPointerDown} />
                <div className="mt-4 flex items-center justify-between gap-4 px-1 font-mono text-[0.62rem] uppercase tracking-[0.24em] text-white/35">
                  <span>Q/E rotate</span><span>R reset</span><span>Touch enabled</span>
                </div>
              </>
            ) : (
              <div className="relative mx-auto grid aspect-[420/520] w-full max-w-[420px] place-items-center overflow-hidden rounded-[34px] border border-[#d2b77a]/16 bg-black/20 shadow-[inset_0_0_70px_rgba(210,183,122,0.05),0_28px_90px_rgba(0,0,0,0.34)] backdrop-blur-xl">
                <div className="absolute h-[72%] w-[54%] rounded-full border border-[#d2b77a]/10" />
                <div className="absolute h-px w-[68%] bg-gradient-to-r from-transparent via-[#d2b77a]/16 to-transparent" />
                <div className="absolute h-[68%] w-px bg-gradient-to-b from-transparent via-[#d2b77a]/22 to-transparent" />
                <Sparkles className="h-12 w-12 animate-gatePulse text-[#d2b77a]/55" />
                <p className="absolute bottom-10 px-8 text-center font-mono text-[0.62rem] uppercase tracking-[0.28em] text-white/34">The chamber is sealed until observation begins</p>
              </div>
            )}
          </section>
        </div>
      </section>
    </main>
  );
}

declare global {
  interface Window {
    __resetAlignmentGate?: () => void;
  }
}
