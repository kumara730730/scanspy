export default function StatCard({ label, value, icon: Icon, color = "text-cyan-300" }) {
  return (
    <div className="rounded-xl border border-cyber-border bg-cyber-surface/70 p-4 shadow-glow">
      <div className="mb-2 flex items-center justify-between">
        <p className="text-xs uppercase tracking-widest text-slate-400">{label}</p>
        {Icon ? <Icon className={`h-4 w-4 ${color}`} /> : null}
      </div>
      <p className={`text-2xl font-semibold ${color}`}>{value}</p>
    </div>
  );
}
