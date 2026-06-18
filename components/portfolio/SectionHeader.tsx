"use client";

type SectionHeaderProps = {
  eyebrow: string;
  title: string;
  className?: string;
};

export function SectionHeader({ eyebrow, title, className = "" }: SectionHeaderProps) {
  return (
    <header className={className}>
      <p className="text-eyebrow">{eyebrow}</p>
      <h2 className="text-section-title mt-4">{title}</h2>
    </header>
  );
}
