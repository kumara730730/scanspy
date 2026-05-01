export default function FilterBar({
  statusFilter,
  setStatusFilter,
  riskFilter,
  setRiskFilter,
  query,
  setQuery,
  searchRef,
}) {
  return (
    <div className="grid gap-3 rounded-xl border border-cyber-border bg-cyber-surface/80 p-4 md:grid-cols-3">
      <select className="rounded border border-cyber-border bg-slate-900 px-3 py-2" value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
        <option value="all">All Status</option>
        <option value="200">200</option>
        <option value="301">301</option>
        <option value="302">302</option>
        <option value="403">403</option>
        <option value="404">404</option>
        <option value="500">500</option>
      </select>
      <select className="rounded border border-cyber-border bg-slate-900 px-3 py-2" value={riskFilter} onChange={(e) => setRiskFilter(e.target.value)}>
        <option value="all">All Risk</option>
        <option value="high">High</option>
        <option value="medium">Medium</option>
        <option value="low">Low</option>
        <option value="info">Info</option>
      </select>
      <input
        ref={searchRef}
        placeholder="Search path..."
        className="rounded border border-cyber-border bg-slate-900 px-3 py-2 outline-none focus:border-cyber-teal"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
    </div>
  );
}
