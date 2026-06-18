import type { ReactNode } from "react";

type PageShellProps = {
  children: ReactNode;
};

export function PageShell({ children }: PageShellProps) {
  return (
    <>
      <div className="gradient-mesh" aria-hidden="true" />
      <div className="relative">{children}</div>
    </>
  );
}
