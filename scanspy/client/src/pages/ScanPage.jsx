import { useEffect, useMemo } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useNavigate, useParams } from "react-router-dom";
import { Clock3, SearchCheck, Send } from "lucide-react";
import { cancelScan } from "../api";
import { useScan } from "../hooks/useScan";
import { useScanStream } from "../hooks/useScanStream";
import { formatDuration } from "../utils/formatDuration";
import StatCard from "../components/StatCard";
import ProgressBar from "../components/ProgressBar";
import { useToast } from "../context/ToastContext";
import RevealInView from "../components/motion/RevealInView";
import { StaggerGroup, StaggerItem } from "../components/motion/StaggerGroup";
import { useMotionPreferences } from "../components/motion/scrollMotion";
import TextReveal from "../components/motion/TextReveal";
import { PublicShell, SectionWrap, StatusRail, SurfacePanel } from "../components/PublicPrimitives";

export default function ScanPage() {
  const { scanId } = useParams();
  const { data } = useScan(scanId);
  const events = useScanStream(scanId);
  const navigate = useNavigate();
  const { push } = useToast();
  const { prefersReducedMotion } = useMotionPreferences();
  const { scrollYProgress } = useScroll();
  const logsY = useTransform(scrollYProgress, [0, 1], [0, -24]);

  useEffect(() => {
    if (data?.status === "completed") navigate(`/scan/${scanId}/results`);
  }, [data?.status, navigate, scanId]);

  const found = useMemo(() => (data?.results || []).filter((r) => [200, 301, 302, 403].includes(r.statusCode)).length, [data?.results]);
  const progress = data?.totalPaths ? (data.requestsSent / data.totalPaths) * 100 : 0;

  return (
    <PublicShell className="py-8">
      <SectionWrap>
        <StatusRail left="ScanSpy · Live Execution" right={data?.status || "running"} />
      </SectionWrap>
      <SectionWrap>
        <RevealInView>
          <TextReveal as="h1" className="mb-3 font-heading text-3xl text-cyan-100 md:text-5xl" text="Scan Progress" amount={0.7} />
          <p className="mb-4 text-sm text-slate-300">{data?.target}</p>
          <SurfacePanel>
            <ProgressBar progress={progress} currentPath={data?.currentPath} done={data?.requestsSent || 0} total={data?.totalPaths || 0} />
          </SurfacePanel>
        </RevealInView>
      </SectionWrap>
      <SectionWrap className="py-6">
        <StaggerGroup className="grid gap-4 md:grid-cols-3">
          <StaggerItem><StatCard label="Requests Sent" value={data?.requestsSent || 0} icon={Send} color="text-cyan-300" /></StaggerItem>
          <StaggerItem><StatCard label="Found So Far" value={found} icon={SearchCheck} color="text-emerald-300" /></StaggerItem>
          <StaggerItem><StatCard label="Elapsed Time" value={formatDuration(data?.startTime, data?.endTime)} icon={Clock3} color="text-amber-300" /></StaggerItem>
        </StaggerGroup>
      </SectionWrap>
      <SectionWrap>
        <motion.div style={prefersReducedMotion ? undefined : { y: logsY }}>
          <SurfacePanel className="mb-6">
            <h2 className="mb-2 text-sm uppercase tracking-wider text-slate-400">Live Logs</h2>
            <div className="h-64 space-y-1 overflow-auto rounded bg-slate-950/60 p-3 font-mono text-xs">
              {events.length === 0 ? <p className="text-slate-400">Waiting for stream...</p> : events.slice(-80).map((event, idx) => (
                <p key={`${event.path || event.type}-${idx}`} className="text-slate-200">
                  [{event.type || "result"}] {event.path || "-"} {event.statusCode || ""}
                </p>
              ))}
            </div>
          </SurfacePanel>
        </motion.div>
        <RevealInView y={12}>
          <button
            onClick={async () => {
              await cancelScan(scanId);
              push({ tone: "info", message: "Scan cancelled" });
              navigate("/app");
            }}
            className="rounded border border-red-500/50 bg-red-500/10 px-4 py-2 text-sm"
          >
            Cancel Scan
          </button>
        </RevealInView>
      </SectionWrap>
    </PublicShell>
  );
}
