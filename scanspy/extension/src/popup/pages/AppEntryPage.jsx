import { useEffect, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { ArrowRight, Gauge, Radar, ShieldAlert } from "lucide-react";
import { getActiveTabUrl, startScan } from "../api";
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

  useEffect(() => {
    getActiveTabUrl().then(url => {
      if (url && (url.startsWith('http://') || url.startsWith('https://'))) {
        setTargetUrl(url);
      }
    }).catch(console.error);
  }, []);
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
      <SectionWrap className="flex flex-col items-center justify-center pt-8">
        <div className="w-full max-w-2xl">
          <RevealInView>
            <motion.p
              className="mb-3 inline-flex rounded-full border border-cyan-300/30 bg-cyan-500/10 px-4 py-1 font-mono text-[11px] uppercase tracking-[0.24em] text-cyan-200"
              style={prefersReducedMotion ? undefined : { y: labelY }}
            >
              Scan Control Center
            </motion.p>
            <TextReveal
              as="h1"
              className="mb-4 font-heading text-4xl font-semibold text-cyan-200"
              text="Launch a New Scan"
              amount={0.7}
            />
            <p className="mb-8 text-slate-300">
              Start with a target and depth profile to begin monitoring endpoints.
            </p>
          </RevealInView>
          <motion.form
            onSubmit={handleStart}
            className="mb-6 flex flex-col gap-4 rounded-xl border border-cyber-border bg-cyber-surface/70 p-6"
            style={prefersReducedMotion ? undefined : { scale: panelScale }}
          >
            <div className="flex flex-col gap-2">
              <label className="text-xs uppercase tracking-widest text-cyan-200/60">Target URL</label>
              <input
                value={targetUrl}
                onChange={(e) => setTargetUrl(e.target.value)}
                required
                placeholder="https://target.com"
                className="w-full rounded bg-slate-900 px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-cyber-teal"
              />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col gap-2">
                <label className="text-xs uppercase tracking-widest text-cyan-200/60">Scan Depth</label>
                <select
                  value={wordlist}
                  onChange={(e) => setWordlist(e.target.value)}
                  className="w-full rounded bg-slate-900 px-4 py-3 text-sm"
                >
                  <option value="small">small</option>
                  <option value="medium">medium</option>
                  <option value="large">large</option>
                </select>
              </div>
              <div className="flex flex-col justify-end">
                <button
                  disabled={loading}
                  className="h-[46px] w-full rounded border border-cyan-300/40 bg-cyan-500/10 px-4 font-medium text-cyan-100 hover:shadow-glow disabled:opacity-50"
                >
                  {loading ? "Starting..." : "Start Scan"}
                </button>
              </div>
            </div>
          </motion.form>
          <RevealInView y={20} className="mb-8 rounded-xl border border-cyan-300/20 bg-cyan-500/5 p-4 text-sm text-slate-200">
            <p className="font-medium text-cyan-100">Tip:</p>
            <p>Use medium first for fast triage, then rerun critical domains with large depth for fuller endpoint coverage.</p>
          </RevealInView>
        </div>
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
