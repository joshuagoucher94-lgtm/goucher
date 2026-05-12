import type { FragmentState } from "./glyphData";

export default function FragmentTray({ fragments }: { fragments: FragmentState[] }) {
  const locked = fragments.filter((fragment) => fragment.locked).length;
  const correct = fragments.filter((fragment) => fragment.isCorrect).length;

  return (
    <div className="rounded-[24px] border border-white/10 bg-white/[0.045] p-4 backdrop-blur-md">
      <div className="flex items-center justify-between gap-4">
        <p className="font-mono text-[0.68rem] uppercase tracking-[0.24em] text-white/45">Restored</p>
        <p className="font-mono text-xs text-[#d2b77a]">{locked}/{correct}</p>
      </div>
      <div className="mt-3 h-2 overflow-hidden rounded-full bg-black/30">
        <div className="h-full rounded-full bg-gradient-to-r from-[#8d7950] to-[#f1d38b] transition-all duration-500" style={{ width: `${(locked / correct) * 100}%` }} />
      </div>
      <p className="mt-3 text-sm leading-6 text-white/54">The mark obeys a quiet order: mirrored families, rising point-count, and paired direction.</p>
    </div>
  );
}
