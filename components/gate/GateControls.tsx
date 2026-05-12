import { RotateCcw, RotateCw, Undo2 } from "lucide-react";

type Props = {
  selectedName?: string;
  canInteract: boolean;
  energy: number;
  onRotateLeft: () => void;
  onRotateRight: () => void;
  onReset: () => void;
};

export default function GateControls({ selectedName, canInteract, energy, onRotateLeft, onRotateRight, onReset }: Props) {
  return (
    <div className="flex flex-col gap-3 rounded-[24px] border border-white/10 bg-white/[0.055] p-3 shadow-[0_24px_70px_rgba(0,0,0,0.32)] backdrop-blur-md sm:flex-row sm:items-center sm:justify-between">
      <div>
        <p className="font-mono text-[0.68rem] uppercase tracking-[0.26em] text-[#d2b77a]/70">Alignment Energy: {energy}</p>
        <p className="mt-1 text-sm text-white/58">{selectedName ? `Selected: ${selectedName}` : "Select a shard, then rotate if needed."}</p>
      </div>
      <div className="grid grid-cols-3 gap-2 sm:flex">
        <button type="button" disabled={!canInteract} onClick={onRotateLeft} className="inline-flex items-center justify-center gap-2 rounded-2xl border border-white/10 bg-black/24 px-3 py-2 text-sm font-semibold text-white/78 transition hover:bg-white/10 disabled:cursor-not-allowed disabled:opacity-35">
          <RotateCcw className="h-4 w-4" /> Q
        </button>
        <button type="button" disabled={!canInteract} onClick={onRotateRight} className="inline-flex items-center justify-center gap-2 rounded-2xl border border-white/10 bg-black/24 px-3 py-2 text-sm font-semibold text-white/78 transition hover:bg-white/10 disabled:cursor-not-allowed disabled:opacity-35">
          <RotateCw className="h-4 w-4" /> E
        </button>
        <button type="button" onClick={onReset} className="inline-flex items-center justify-center gap-2 rounded-2xl border border-[#d2b77a]/20 bg-[#d2b77a]/10 px-3 py-2 text-sm font-semibold text-[#f8e6bd] transition hover:bg-[#d2b77a]/16">
          <Undo2 className="h-4 w-4" /> R
        </button>
      </div>
    </div>
  );
}
