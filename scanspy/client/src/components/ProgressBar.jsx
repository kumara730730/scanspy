export default function ProgressBar({ progress, currentPath, done, total }) {
  return (
    <div>
      <div className="mb-2 flex items-center justify-between text-xs text-slate-300">
        <span>Scanning {currentPath || "/"}...</span>
        <span>[{done}/{total || "?"} paths]</span>
      </div>
      <div className="relative h-4 overflow-hidden rounded-full border border-cyber-border bg-slate-900">
        <div className="scan-shimmer animate-shimmer absolute inset-0 opacity-60" />
        <div className="relative h-full rounded-full bg-cyber-teal transition-all duration-300" style={{ width: `${Math.max(2, progress)}%` }} />
      </div>
    </div>
  );
}
