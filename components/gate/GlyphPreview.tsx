import { motion } from "framer-motion";
import GlyphFragment from "./GlyphFragment";
import { fragmentDefinitions, getTargetSlot, slotToPosition } from "./glyphData";

export default function GlyphPreview({ shattered = false }: { shattered?: boolean }) {
  const correct = fragmentDefinitions.filter((fragment) => fragment.isCorrect);

  return (
    <div className="relative h-[330px] w-[300px] sm:h-[390px] sm:w-[360px]" aria-label="Complete alignment glyph preview">
      <div className="absolute inset-6 rounded-full border border-[#d2b77a]/10 bg-[#d2b77a]/[0.03] shadow-[0_0_70px_rgba(210,183,122,0.12)]" />
      <div className="absolute left-1/2 top-1/2 h-[520px] w-[420px] origin-center -translate-x-1/2 -translate-y-1/2 scale-[0.62] sm:scale-[0.72]">
        {correct.map((fragment, index) => {
          const slot = getTargetSlot(fragment);
          if (!slot) return null;
          const pos = slotToPosition(slot);
          const scatterX = index % 2 === 0 ? -90 - index * 12 : 90 + index * 12;
          const scatterY = index < 2 ? -70 : index < 4 ? 10 : 85;
          return (
            <motion.div
              key={fragment.id}
              className="absolute h-[82px] w-[82px] text-[#d2b77a]"
              initial={false}
              animate={shattered ? { x: pos.x + scatterX, y: pos.y + scatterY, rotate: (index - 2) * 32, opacity: 0.2 } : { x: pos.x, y: pos.y, rotate: 0, opacity: 1 }}
              transition={{ duration: shattered ? 0.72 : 0.5, ease: [0.2, 0.8, 0.2, 1] }}
            >
              <GlyphFragment {...fragment} locked />
            </motion.div>
          );
        })}
      </div>
      <div className="absolute left-1/2 top-[18%] h-[64%] w-px -translate-x-1/2 bg-gradient-to-b from-transparent via-[#d2b77a]/50 to-transparent" />
    </div>
  );
}
