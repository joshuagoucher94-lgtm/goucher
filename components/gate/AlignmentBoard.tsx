import { motion } from "framer-motion";
import GlyphFragment from "./GlyphFragment";
import { BOARD_HEIGHT, BOARD_WIDTH, FRAGMENT_SIZE, type FragmentState } from "./glyphData";

type Props = {
  fragments: FragmentState[];
  selectedId?: string;
  draggingId?: string;
  nearId?: string;
  solved: boolean;
  onPointerDown: (event: React.PointerEvent<HTMLButtonElement>, id: string) => void;
  onSelect: (id: string) => void;
};

export default function AlignmentBoard({ fragments, selectedId, draggingId, nearId, solved, onPointerDown, onSelect }: Props) {
  return (
    <div className="relative mx-auto aspect-[420/520] w-full max-w-[420px] touch-none select-none overflow-hidden rounded-[34px] border border-[#d2b77a]/16 bg-black/24 shadow-[inset_0_0_70px_rgba(210,183,122,0.055),0_28px_90px_rgba(0,0,0,0.34)] backdrop-blur-xl" style={{ maxHeight: "min(68vh, 520px)" }}>
      <div className="absolute left-1/2 top-1/2 h-[76%] w-px -translate-x-1/2 -translate-y-1/2 bg-gradient-to-b from-transparent via-[#d2b77a]/35 to-transparent" />
      <div className="absolute left-1/2 top-1/2 h-[72%] w-[54%] -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#d2b77a]/10" />
      <div className="absolute left-1/2 top-1/2 h-[46%] w-[36%] -translate-x-1/2 -translate-y-1/2 rounded-full border border-dashed border-[#d2b77a]/10" />
      <div className={`absolute left-1/2 top-1/2 h-[80%] w-[70%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#d2b77a]/[0.035] blur-3xl transition-opacity duration-700 ${solved ? "opacity-100" : "opacity-35"}`} />
      <div className="absolute left-1/2 top-1/2 origin-center" style={{ width: BOARD_WIDTH, height: BOARD_HEIGHT, transform: "translate(-50%, -50%) scale(var(--board-scale, 1))" }}>
        {fragments.map((fragment) => {
          const selected = selectedId === fragment.id;
          const dragging = draggingId === fragment.id;
          const near = nearId === fragment.id;
          return (
            <motion.button
              key={fragment.id}
              type="button"
              aria-label={fragment.label}
              onClick={() => onSelect(fragment.id)}
              onPointerDown={(event) => onPointerDown(event, fragment.id)}
              className={`absolute h-[82px] w-[82px] touch-none rounded-[24px] outline-none transition-shadow duration-200 ${fragment.locked ? "cursor-default" : "cursor-grab active:cursor-grabbing"} ${selected ? "ring-2 ring-[#f4d58d]/60" : ""}`}
              style={{ left: fragment.x, top: fragment.y, zIndex: dragging ? 40 : selected ? 30 : fragment.locked ? 12 : 20 }}
              animate={{ rotate: fragment.rotation, scale: dragging ? 1.05 : fragment.locked ? 0.98 : 1 }}
              transition={{ type: "spring", stiffness: 520, damping: 34 }}
            >
              <span className={`absolute inset-0 rounded-[24px] transition ${fragment.locked ? "bg-[#d2b77a]/12 shadow-[0_0_34px_rgba(210,183,122,0.45)]" : near ? "bg-[#d2b77a]/10 shadow-[0_0_24px_rgba(210,183,122,0.30)]" : selected ? "bg-white/[0.055] shadow-[0_0_24px_rgba(255,255,255,0.12)]" : "bg-white/[0.025]"}`} />
              <GlyphFragment {...fragment} active={selected || near} locked={fragment.locked} />
            </motion.button>
          );
        })}
      </div>
      <style jsx>{`
        @media (max-width: 520px) {
          div { --board-scale: 0.78; }
        }
      `}</style>
    </div>
  );
}
