import { useEffect, useMemo, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Helmet } from "react-helmet-async";
import { useParams } from "react-router-dom";
import { Database, FileSearch, FolderOpen, Timer } from "lucide-react";
import { useScan } from "../hooks/useScan";
import { useFilters } from "../hooks/useFilters";
import { formatDuration } from "../utils/formatDuration";
import StatCard from "../components/StatCard";
import ResultsTable from "../components/ResultsTable";
import FilterBar from "../components/FilterBar";
import ExportButton from "../components/ExportButton";
import RevealInView from "../components/motion/RevealInView";
import { StaggerGroup, StaggerItem } from "../components/motion/StaggerGroup";
import { useMotionPreferences } from "../components/motion/scrollMotion";
import TextReveal from "../components/motion/TextReveal";
import { PublicShell, SectionWrap, StatusRail, SurfacePanel } from "../components/PublicPrimitives";

function downloadBlob(filename, text, mime) {
  const blob = new Blob([text], { type: mime });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = filename;
  anchor.click();
  URL.revokeObjectURL(url);
}

export default function ResultsPage() {
  const { scanId } = useParams();
  const { data, error } = useScan(scanId, 2500);
  const [activeTab, setActiveTab] = useState("all");
  const searchRef = useRef(null);
  const { prefersReducedMotion } = useMotionPreferences();
  const { scrollYProgress } = useScroll();
  const tableY = useTransform(scrollYProgress, [0, 1], [0, -20]);
  const results = data?.results || [];
  const { filtered, statusFilter, setStatusFilter, riskFilter, setRiskFilter, query, setQuery } = useFilters(results);

  useEffect(() => {
    const handler = (event) => {
      if (event.ctrlKey && event.key.toLowerCase() === "f") {
        event.preventDefault();
        searchRef.current?.focus();
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  const stats = useMemo(() => {
    const uniqueDirs = new Set(results.map((row) => row.path.split("/").slice(0, 2).join("/")));
    const totalFound = results.filter((row) => row.statusCode !== 404 && row.statusCode !== 0).length;
    return { uniqueDirs: uniqueDirs.size, totalFound };
  }, [results]);

  const tabs = {
    all: filtered,
    ok: filtered.filter((r) => r.statusCode === 200),
    redirects: filtered.filter((r) => [301, 302].includes(r.statusCode)),
    errors: filtered.filter((r) => r.statusCode >= 400 || r.statusCode === 0),
  };

  const shownRows = tabs[activeTab] || tabs.all;
  const slowResponses = results.filter((row) => row.responseTimeMs > 3000).length;

  return (
    <PublicShell className="py-8">
      <Helmet>
        <title>{`ScanSpy Results - ${scanId}`}</title>
        <meta name="description" content={`Directory scan results for ${data?.target || "target"}`} />
      </Helmet>
      <SectionWrap>
        <StatusRail left="ScanSpy · Reporting Console" right={data?.status || "completed"} />
      </SectionWrap>
      <SectionWrap>
        <RevealInView>
          <TextReveal as="h1" className="mb-2 font-heading text-3xl text-cyan-100 md:text-5xl" text="Scan Results" amount={0.7} />
          <SurfacePanel className="mb-6 text-sm">
            <p><span className="text-slate-400">Target:</span> {data?.target}</p>
            <p><span className="text-slate-400">Date:</span> {data?.startTime}</p>
            <p><span className="text-slate-400">Tool:</span> Dir/File Finder</p>
            <p><span className="text-slate-400">Status:</span> {data?.status}</p>
          </SurfacePanel>
        </RevealInView>
        {error ? <div className="mb-4 rounded border border-red-500/40 bg-red-500/10 p-3 text-sm">Failed to load: {error}</div> : null}
      </SectionWrap>
      <SectionWrap>
        <StaggerGroup className="mb-5 grid gap-4 md:grid-cols-4">
          <StaggerItem><StatCard label="Total Found" value={stats.totalFound} icon={FileSearch} color="text-emerald-300" /></StaggerItem>
          <StaggerItem><StatCard label="Requests Made" value={data?.requestsSent || 0} icon={Database} color="text-cyan-300" /></StaggerItem>
          <StaggerItem><StatCard label="Scan Duration" value={formatDuration(data?.startTime, data?.endTime)} icon={Timer} color="text-amber-300" /></StaggerItem>
          <StaggerItem><StatCard label="Unique Dirs" value={stats.uniqueDirs} icon={FolderOpen} color="text-violet-300" /></StaggerItem>
        </StaggerGroup>
      </SectionWrap>
      <SectionWrap>
        <RevealInView y={14}>
          <div className="mb-4 flex flex-wrap gap-2">
            <Pill label={`All Results (${tabs.all.length})`} active={activeTab === "all"} onClick={() => setActiveTab("all")} />
            <Pill label={`200 OK (${tabs.ok.length})`} active={activeTab === "ok"} onClick={() => setActiveTab("ok")} />
            <Pill label={`Redirects (${tabs.redirects.length})`} active={activeTab === "redirects"} onClick={() => setActiveTab("redirects")} />
            <Pill label={`Errors (${tabs.errors.length})`} active={activeTab === "errors"} onClick={() => setActiveTab("errors")} />
          </div>
        </RevealInView>
        {slowResponses > 0 ? <div className="mb-3 rounded border border-amber-500/30 bg-amber-500/10 p-2 text-xs">Rate-limit warning: {slowResponses} responses were slower than 3s.</div> : null}
      </SectionWrap>
      <SectionWrap>
        <RevealInView y={14}>
          <SurfacePanel className="mb-4">
            <FilterBar
              statusFilter={statusFilter}
              setStatusFilter={setStatusFilter}
              riskFilter={riskFilter}
              setRiskFilter={setRiskFilter}
              query={query}
              setQuery={setQuery}
              searchRef={searchRef}
            />
          </SurfacePanel>
        </RevealInView>
        <RevealInView y={14}>
          <div className="my-4 flex gap-2">
            <ExportButton label="Download CSV" onExport={() => downloadBlob("scanspy-results.csv", toCsv(shownRows), "text/csv")} />
            <ExportButton label="Download JSON" onExport={() => downloadBlob("scanspy-results.json", JSON.stringify(shownRows, null, 2), "application/json")} />
          </div>
        </RevealInView>
      </SectionWrap>
      <SectionWrap>
        <motion.div style={prefersReducedMotion ? undefined : { y: tableY }}>
          {shownRows.length === 0 ? (
            <SurfacePanel className="p-10 text-center text-slate-300">
              No results match current filters.
            </SurfacePanel>
          ) : (
            <ResultsTable results={shownRows} />
          )}
        </motion.div>
      </SectionWrap>
    </PublicShell>
  );
}

function Pill({ label, active, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`rounded-full border px-3 py-1 text-xs ${active ? "border-cyan-300 bg-cyan-500/20" : "border-cyber-border bg-cyber-surface/80"}`}
    >
      {label}
    </button>
  );
}

function toCsv(rows) {
  const header = "path,statusCode,contentType,size,riskLevel";
  const body = rows.map((row) => [row.path, row.statusCode, row.contentType, row.size, row.riskLevel].map((value) => `"${String(value).replaceAll("\"", "\"\"")}"`).join(","));
  return [header, ...body].join("\n");
}
