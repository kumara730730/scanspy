import { forwardRef } from "react";

export function PublicShell({ children, className = "" }) {
  return <main className={`hero-grid min-h-screen overflow-x-clip px-6 py-10 ${className}`}>{children}</main>;
}

export const SectionWrap = forwardRef(function SectionWrap({ children, className = "", ...rest }, ref) {
  return <section ref={ref} className={`mx-auto w-full max-w-6xl ${className}`} {...rest}>{children}</section>;
});

export function SurfacePanel({ children, className = "" }) {
  return (
    <div className={`rounded-2xl border border-cyber-border bg-cyber-surface/70 p-5 backdrop-blur ${className}`}>
      {children}
    </div>
  );
}

export function StatusRail({ left, right }) {
  return (
    <div className="mb-10 flex flex-wrap items-center justify-between gap-3 text-xs uppercase tracking-[0.2em] text-cyan-200/80">
      <span className="rounded-full border border-cyan-300/30 bg-cyan-500/10 px-3 py-1">{left}</span>
      <span>{right}</span>
    </div>
  );
}

export function AccentDivider({ className = "" }) {
  return <div className={`h-[1px] w-full bg-gradient-to-r from-transparent via-cyan-300/60 to-transparent ${className}`} />;
}
