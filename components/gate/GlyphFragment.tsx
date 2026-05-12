import type { FragmentDefinition } from "./glyphData";

type Props = Pick<FragmentDefinition, "shape" | "dots" | "side" | "scale"> & {
  className?: string;
  active?: boolean;
  locked?: boolean;
};

function dotsFor(count: number) {
  const positions = count === 1
    ? [[50, 22]]
    : count === 2
      ? [[43, 22], [57, 22]]
      : count === 3
        ? [[36, 22], [50, 22], [64, 22]]
        : [[32, 22], [44, 22], [56, 22], [68, 22]];

  return positions.map(([cx, cy], index) => <circle key={`${cx}-${index}`} cx={cx} cy={cy} r="3.2" fill="currentColor" opacity="0.9" />);
}

function ShapePath({ shape }: { shape: Props["shape"] }) {
  if (shape === "crescent") {
    return <path d="M58 13C36 17 22 33 22 51c0 17 12 30 33 34-8-9-12-20-12-34 0-15 5-27 15-38Z" />;
  }

  if (shape === "triangle") {
    return <path d="M18 76 50 16l32 60H18Z" />;
  }

  return <path d="M18 34c20-10 44-10 64 0v28c-20 10-44 10-64 0V34Z" />;
}

export default function GlyphFragment({ shape, dots, side, scale = 1, className = "", active, locked }: Props) {
  const mirror = side === "right" ? "translate(100 0) scale(-1 1)" : undefined;

  return (
    <div className={`glyph-fragment grid place-items-center ${className}`} style={{ transform: `scale(${scale})` }}>
      <svg viewBox="0 0 100 100" className="h-full w-full overflow-visible" aria-hidden="true">
        <g transform={mirror} style={{ transformOrigin: "50px 50px" }}>
          <g fill="currentColor">
            <ShapePath shape={shape} />
          </g>
        </g>
        <g className={locked ? "text-[#fff0bd]" : active ? "text-[#ffd98a]" : "text-[#d2b77a]"}>{dotsFor(dots)}</g>
        <path d="M50 6v10M50 84v10M6 50h10M84 50h10" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" opacity="0.34" fill="none" />
      </svg>
    </div>
  );
}
