const MAP = {
  200: "bg-emerald-500/20 text-emerald-300 shadow-[0_0_8px_rgba(16,185,129,0.5)]",
  301: "bg-amber-500/20 text-amber-300 shadow-[0_0_8px_rgba(245,158,11,0.5)]",
  302: "bg-amber-500/20 text-amber-300 shadow-[0_0_8px_rgba(245,158,11,0.5)]",
  403: "bg-orange-500/20 text-orange-300",
  404: "bg-slate-500/20 text-slate-300",
  500: "bg-red-500/20 text-red-300 shadow-[0_0_8px_rgba(239,68,68,0.5)]",
};

const LABELS = {
  200: "200 OK",
  301: "301 REDIRECT",
  302: "302 REDIRECT",
  403: "403 FORBIDDEN",
  404: "404 NOT FOUND",
  500: "500 ERROR",
};

export default function StatusBadge({ code }) {
  const base = MAP[code] || "bg-cyan-500/15 text-cyan-300";
  return <span className={`rounded-full px-2 py-1 text-xs font-semibold ${base}`}>{LABELS[code] || `${code || 0} UNKNOWN`}</span>;
}
