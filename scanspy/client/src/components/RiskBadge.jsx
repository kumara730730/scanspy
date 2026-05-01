const STYLE = {
  High: "bg-red-500/20 text-red-300",
  Medium: "bg-amber-500/20 text-amber-300",
  Low: "bg-emerald-500/20 text-emerald-300",
  Info: "bg-blue-500/20 text-blue-300",
};

export default function RiskBadge({ level }) {
  const normalized = level || "Info";
  return (
    <span className={`inline-flex items-center gap-2 rounded-full px-2 py-1 text-xs font-semibold ${STYLE[normalized] || STYLE.Info}`}>
      <span className={`h-2 w-2 rounded-full ${normalized === "High" ? "animate-pulse bg-red-400" : normalized === "Medium" ? "bg-amber-400" : normalized === "Low" ? "bg-emerald-400" : "bg-blue-400"}`} />
      {normalized === "High" ? "HIGH RISK" : normalized.toUpperCase()}
    </span>
  );
}
