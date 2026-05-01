import { useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { ArrowRight, Gauge, Radar, ShieldAlert } from "lucide-react";
import { startScan } from "../api";
import { useToast } from "../context/ToastContext";
import RevealInView from "../components/motion/RevealInView";
import { StaggerGroup, StaggerItem } from "../components/motion/StaggerGroup";
import { useMotionPreferences } from "../components/motion/scrollMotion";
import TextReveal from "../components/motion/TextReveal";
import { AccentDivider, PublicShell, SectionWrap, StatusRail, SurfacePanel } from "../components/PublicPrimitives";

export default function AppEntryPage() {
  const [targetUrl, setTargetUrl] = useState("");
  const [wordlist, setWordlist] = useState("medium");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { push } = useToast();
  const { prefersReducedMotion } = useMotionPreferences();
  const { scrollYProgress } = useScroll();
  const panelScale = useTransform(scrollYProgress, [0, 0.35], [1, 0.96]);
  const labelY = useTransform(scrollYProgress, [0, 0.45], [0, -28]);
  const sideY = useTransform(scrollYProgress, [0, 0.6], [0, -40]);

  const handleStart = async (event) => {
    event.preventDefault();
    setLoading(true);
    try {
      const { scanId } = await startScan({ targetUrl, wordlist });
      navigate(`/scan/${scanId}`);
    } catch (error) {
      push({ tone: "error", message: error.message });
    } finally {
      setLoading(false);
    }
  };

  return (
    <PublicShell>
      <SectionWrap>
        <StatusRail left="ScanSpy · Launch Console" right="Workflow Ready · Live Mode" />
      </SectionWrap>
      <SectionWrap className="grid items-start gap-8 md:grid-cols-[1.05fr_0.95fr]">
        <div>
          <RevealInView>
            <motion.p
              className="mb-3 inline-flex rounded-full border border-cyan-300/30 bg-cyan-500/10 px-4 py-1 font-mono text-[11px] uppercase tracking-[0.24em] text-cyan-200"
              style={prefersReducedMotion ? undefined : { y: labelY }}
            >
              Scan Control Center
            </motion.p>
            <TextReveal
              as="h1"
              className="mb-4 font-heading text-4xl font-semibold text-cyan-200 md:text-6xl"
              text="Launch a New Scan"
              amount={0.7}
            />
            <p className="mb-8 max-w-2xl text-slate-300">
              Start with a target and depth profile, then move through live monitoring and export-ready results.
            </p>
          </RevealInView>
          <motion.form
            onSubmit={handleStart}
            className="mb-6 grid gap-3 rounded-xl border border-cyber-border bg-cyber-surface/70 p-5 md:grid-cols-[1fr_160px_150px]"
            style={prefersReducedMotion ? undefined : { scale: panelScale }}
          >
            <input
              value={targetUrl}
              onChange={(e) => setTargetUrl(e.target.value)}
              required
              placeholder="https://target.com"
              className="rounded bg-slate-900 px-3 py-2 outline-none focus:ring-2 focus:ring-cyber-teal"
            />
            <select
              value={wordlist}
              onChange={(e) => setWordlist(e.target.value)}
              className="rounded bg-slate-900 px-3 py-2"
            >
              <option value="small">small</option>
              <option value="medium">medium</option>
              <option value="large">large</option>
            </select>
            <button
              disabled={loading}
              className="rounded border border-cyan-300/40 bg-cyan-500/10 px-4 py-2 hover:shadow-glow disabled:opacity-50"
            >
              {loading ? "Starting..." : "Start Scan"}
            </button>
          </motion.form>
          <RevealInView y={20} className="mb-8 rounded-xl border border-cyan-300/20 bg-cyan-500/5 p-4 text-sm text-slate-200">
            <p className="font-medium text-cyan-100">Tip:</p>
            <p>Use medium first for fast triage, then rerun critical domains with large depth for fuller endpoint coverage.</p>
          </RevealInView>
        </div>

        <motion.div style={prefersReducedMotion ? undefined : { y: sideY }}>
          <SurfacePanel className="mb-4">
            <p className="mb-2 text-xs uppercase tracking-[0.2em] text-cyan-200/80">Flow Preview</p>
            <TextReveal as="h2" className="mb-3 font-heading text-2xl text-slate-100" text="Start → Monitor → Export" amount={0.8} />
            <AccentDivider className="mb-4" />
            <ul className="space-y-2 text-sm text-slate-300">
              <li>1. Submit target URL and scan depth</li>
              <li>2. Watch live paths and response signals</li>
              <li>3. Export filtered findings for remediation</li>
            </ul>
          </SurfacePanel>
          <button
            onClick={() => navigate("/")}
            className="inline-flex items-center gap-2 rounded-lg border border-cyan-300/40 bg-cyan-500/15 px-5 py-3 text-sm text-cyan-100"
          >
            Back To Landing <ArrowRight className="h-4 w-4" />
          </button>
        </motion.div>
      </SectionWrap>

      <SectionWrap className="py-16">
        <StaggerGroup className="grid gap-4 md:grid-cols-3">
          <StaggerItem>
            <FeatureCard
              icon={Gauge}
              title="Speed"
              text="10-request concurrency with batch pacing for reliable throughput."
            />
          </StaggerItem>
          <StaggerItem>
            <FeatureCard
              icon={Radar}
              title="Depth"
              text="Hundreds of common paths, files, and sensitive endpoint patterns."
            />
          </StaggerItem>
          <StaggerItem>
            <FeatureCard
              icon={ShieldAlert}
              title="Reporting"
              text="Live logs, risk scoring, exportable JSON and CSV reports."
            />
          </StaggerItem>
        </StaggerGroup>
      </SectionWrap>
    </PublicShell>
  );
}

function FeatureCard({ icon: Icon, title, text }) {
  return (
    <div className="rounded-xl border border-cyber-border bg-cyber-surface/60 p-4">
      <Icon className="mb-3 h-5 w-5 text-cyan-300" />
      <h3 className="mb-2 font-heading text-xl">{title}</h3>
      <p className="text-sm text-slate-300">{text}</p>
    </div>
  );
}
