import { useMemo, useState } from "react";

export function useFilters(results) {
  const [statusFilter, setStatusFilter] = useState("all");
  const [riskFilter, setRiskFilter] = useState("all");
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    return results.filter((item) => {
      const statusOk = statusFilter === "all" || String(item.statusCode) === statusFilter;
      const riskOk = riskFilter === "all" || item.riskLevel?.toLowerCase() === riskFilter;
      const queryOk = !query || item.path.toLowerCase().includes(query.toLowerCase());
      return statusOk && riskOk && queryOk;
    });
  }, [results, statusFilter, riskFilter, query]);

  return {
    filtered,
    statusFilter,
    setStatusFilter,
    riskFilter,
    setRiskFilter,
    query,
    setQuery,
  };
}
