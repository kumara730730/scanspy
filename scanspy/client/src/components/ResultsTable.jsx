import { useMemo, useState } from "react";
import StatusBadge from "./StatusBadge";
import RiskBadge from "./RiskBadge";
import { formatSize } from "../utils/formatSize";
import { useToast } from "../context/ToastContext";

const PAGE_SIZE = 50;
const ROW_HEIGHT = 50;
const VISIBLE_ROWS = 11;

export default function ResultsTable({ results }) {
  const [page, setPage] = useState(1);
  const [scrollTop, setScrollTop] = useState(0);
  const { push } = useToast();
  const pageCount = Math.max(1, Math.ceil(results.length / PAGE_SIZE));
  const startPage = (page - 1) * PAGE_SIZE;
  const pageRows = results.slice(startPage, startPage + PAGE_SIZE);

  const { from, to, visible } = useMemo(() => {
    const first = Math.floor(scrollTop / ROW_HEIGHT);
    const last = Math.min(pageRows.length, first + VISIBLE_ROWS);
    return { from: first, to: last, visible: pageRows.slice(first, last) };
  }, [scrollTop, pageRows]);

  return (
    <div className="rounded-xl border border-cyber-border bg-cyber-surface/80">
      <div className="grid grid-cols-5 border-b border-cyber-border px-4 py-2 text-xs uppercase text-slate-400">
        <span>Path</span><span>Status</span><span>Type</span><span>Size</span><span>Risk</span>
      </div>
      <div className="h-[560px] overflow-auto" onScroll={(e) => setScrollTop(e.currentTarget.scrollTop)}>
        <div style={{ height: pageRows.length * ROW_HEIGHT, position: "relative" }}>
          {visible.map((row, idx) => {
            const absolute = from + idx;
            return (
              <button
                type="button"
                key={`${row.path}-${absolute}`}
                style={{ top: absolute * ROW_HEIGHT, height: ROW_HEIGHT, position: "absolute", left: 0, right: 0 }}
                className="grid w-full grid-cols-5 items-center border-l-2 border-transparent px-4 text-left text-sm hover:border-cyan-400 hover:bg-slate-900/50"
                onClick={() => {
                  navigator.clipboard.writeText(row.path);
                  push({ tone: "info", message: `Copied ${row.path}` });
                }}
              >
                <span className="truncate font-mono">{row.path}</span>
                <StatusBadge code={row.statusCode} />
                <span className="truncate text-xs">{row.contentType}</span>
                <span>{formatSize(row.size)}</span>
                <RiskBadge level={row.riskLevel} />
              </button>
            );
          })}
        </div>
      </div>
      <div className="flex items-center justify-between border-t border-cyber-border px-4 py-2 text-sm">
        <p>Showing {from + 1}-{Math.min(to, pageRows.length)} of {pageRows.length} on page</p>
        <div className="flex gap-2">
          <button disabled={page <= 1} onClick={() => setPage((p) => p - 1)} className="rounded border border-cyber-border px-3 py-1 disabled:opacity-40">Prev</button>
          <span>{page}/{pageCount}</span>
          <button disabled={page >= pageCount} onClick={() => setPage((p) => p + 1)} className="rounded border border-cyber-border px-3 py-1 disabled:opacity-40">Next</button>
        </div>
      </div>
    </div>
  );
}
