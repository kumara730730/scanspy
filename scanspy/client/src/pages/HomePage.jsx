import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { ArrowRight, Building2, Code2, Gauge, LineChart, Radar, ShieldAlert, Sun } from "lucide-react";
import RevealInView from "../components/motion/RevealInView";
import { StaggerGroup, StaggerItem } from "../components/motion/StaggerGroup";
import TextReveal from "../components/motion/TextReveal";
import { useMotionPreferences } from "../components/motion/scrollMotion";
import { AccentDivider, PublicShell, SectionWrap, StatusRail, SurfacePanel } from "../components/PublicPrimitives";

export default function HomePage() {
  const navigate = useNavigate();
  const { prefersReducedMotion } = useMotionPreferences();
  const transitionRef = useRef(null);
  const sections = [
    { label: "Platform", id: "products" },
    { label: "Workflow", id: "about" },
    { label: "Capabilities", id: "insights" },
    { label: "Tech Lab", id: "tech-lab" },
  ];
  const { scrollYProgress } = useScroll();
  const { scrollYProgress: transitionProgress } = useScroll({
    target: transitionRef,
    offset: ["start end", "end start"],
  });
  const heroY = useTransform(scrollYProgress, [0, 0.24], [0, -80]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.24], [1, 0.45]);
  const glowY = useTransform(scrollYProgress, [0, 1], [0, -160]);
  const glowRotate = useTransform(scrollYProgress, [0, 1], [0, 24]);
  const chipY = useTransform(scrollYProgress, [0, 0.35], [0, -34]);
  const bridgeOpacity = useTransform(transitionProgress, [0.28, 0.56], [0, 0.98]);
  const bridgeY = useTransform(transitionProgress, [0.28, 0.56], [48, 0]);
  const bridgeScale = useTransform(transitionProgress, [0.28, 0.56], [0.15, 1]);
  const bridgeCardOneY = useTransform(transitionProgress, [0.28, 0.56], [26, 0]);
  const bridgeCardTwoY = useTransform(transitionProgress, [0.36, 0.64], [34, 0]);
  const bridgeCardThreeY = useTransform(transitionProgress, [0.44, 0.72], [42, 0]);
  const bridgeCardOneRotateX = useTransform(transitionProgress, [0.28, 0.56], [76, 0]);
  const bridgeCardTwoRotateX = useTransform(transitionProgress, [0.36, 0.64], [80, 0]);
  const bridgeCardThreeRotateX = useTransform(transitionProgress, [0.44, 0.72], [84, 0]);
  const bridgeCardOneRotateY = useTransform(transitionProgress, [0.28, 0.56], [-18, 0]);
  const bridgeCardTwoRotateY = useTransform(transitionProgress, [0.36, 0.64], [15, 0]);
  const bridgeCardThreeRotateY = useTransform(transitionProgress, [0.44, 0.72], [-15, 0]);
  const bridgeCardOneOpacity = useTransform(transitionProgress, [0.28, 0.44], [0, 1]);
  const bridgeCardTwoOpacity = useTransform(transitionProgress, [0.36, 0.52], [0, 1]);
  const bridgeCardThreeOpacity = useTransform(transitionProgress, [0.44, 0.6], [0, 1]);
  const bridgeCardOneScale = useTransform(transitionProgress, [0.28, 0.56], [0.82, 1]);
  const bridgeCardTwoScale = useTransform(transitionProgress, [0.36, 0.64], [0.82, 1]);
  const bridgeCardThreeScale = useTransform(transitionProgress, [0.44, 0.72], [0.82, 1]);
  const ringRotate = useTransform(transitionProgress, [0.18, 0.76], [0, 30]);
  const ringScale = useTransform(transitionProgress, [0.18, 0.76], [0.86, 1.1]);
  const ringY = useTransform(transitionProgress, [0.18, 0.76], [32, -14]);
  const cubesY = useTransform(transitionProgress, [0.18, 0.76], [46, -28]);
  const cubesRotate = useTransform(transitionProgress, [0.18, 0.76], [0, -18]);
  const handleSectionJump = (id) => {
    const node = document.getElementById(id);
    node?.scrollIntoView({ behavior: prefersReducedMotion ? "auto" : "smooth", block: "start" });
  };

  return (
    <PublicShell>
      <TopCommandBar
        sections={sections}
        onSectionJump={handleSectionJump}
        onConsole={() => navigate("/app")}
        onContact={() => handleSectionJump("contact")}
        onDocs={() => handleSectionJump("about")}
      />
      <SectionWrap ref={transitionRef} className="relative min-h-[150vh]">
        <motion.div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 bottom-8 z-[1] flex justify-center"
          style={prefersReducedMotion ? undefined : { y: ringY, rotate: ringRotate, scale: ringScale }}
        >
          <div className="hero-ring-layer">
            <div className="hero-ring hero-ring-lg" />
            <div className="hero-ring hero-ring-md" />
            <div className="hero-ring hero-ring-sm" />
          </div>
        </motion.div>
        <motion.div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 bottom-10 z-[2] flex justify-center"
          style={prefersReducedMotion ? undefined : { y: cubesY, rotate: cubesRotate }}
        >
          <div className="hero-cubes-layer">
            <span className="hero-cube hero-cube-a" />
            <span className="hero-cube hero-cube-b" />
            <span className="hero-cube hero-cube-c" />
            <span className="hero-cube hero-cube-d" />
            <span className="hero-cube hero-cube-e" />
          </div>
        </motion.div>
        <div className="absolute left-0 right-0 top-8 z-10">
          <StatusRail left="ScanSpy · System Operational" right="Security Recon Console · 2026" />
        </div>
        <motion.div
          aria-hidden
          className="pointer-events-none absolute left-1/2 top-24 h-[460px] w-[460px] -translate-x-1/2 rounded-full bg-cyan-400/10 blur-3xl"
          style={prefersReducedMotion ? undefined : { y: glowY, rotate: glowRotate }}
        />
        <motion.div className="sticky top-0 grid min-h-screen items-center gap-10 md:grid-cols-[1.1fr_0.9fr]" style={{ y: heroY, opacity: heroOpacity }}>
          <div>
            <RevealInView>
              <p className="mb-3 font-mono text-[11px] uppercase tracking-[0.24em] text-cyan-200/80">Production-grade endpoint discovery</p>
              <TextReveal
                as="h1"
                className="mb-5 font-heading text-4xl font-semibold text-cyan-100 md:text-7xl"
                text="Recon. Prioritized."
                amount={0.7}
              />
              <p className="mb-7 max-w-xl text-slate-300">
                One console for directory and file discovery, live scan telemetry, and risk-aware remediation workflow.
              </p>
            </RevealInView>

            <motion.div
              className="mb-5 flex flex-wrap gap-3"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55 }}
            >
              <button onClick={() => navigate("/app")} className="inline-flex items-center gap-2 rounded-lg border border-cyan-300/40 bg-cyan-500/15 px-5 py-3 text-sm text-cyan-100">
                Go To App <ArrowRight className="h-4 w-4" />
              </button>
              <button onClick={() => navigate("/app")} className="rounded-lg border border-cyber-border bg-cyber-surface/70 px-5 py-3 text-sm text-slate-200">
                Explore Product
              </button>
            </motion.div>

            <motion.div
              className="flex flex-wrap items-center gap-2 text-xs text-slate-300"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.15 }}
            >
              <span className="rounded-full border border-cyan-300/25 bg-cyan-500/10 px-3 py-1">Live SSE Stream</span>
              <span className="rounded-full border border-cyan-300/25 bg-cyan-500/10 px-3 py-1">Risk Scoring</span>
              <span className="rounded-full border border-cyan-300/25 bg-cyan-500/10 px-3 py-1">CSV + JSON Export</span>
            </motion.div>
          </div>

          <SurfacePanel className="relative">
            <div className="absolute -right-2 -top-2 flex items-center gap-2">
              <motion.div
                aria-hidden
                className="hidden rounded-full border border-cyan-300/30 bg-cyan-500/10 px-3 py-1 text-[10px] uppercase tracking-[0.15em] text-cyan-100 md:block"
                style={prefersReducedMotion ? undefined : { y: chipY }}
                initial={{ opacity: 0, y: -8 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.8 }}
              >
                Shielded
              </motion.div>
              <motion.div
                className="rounded-full border border-cyan-300/30 bg-cyan-500/15 px-3 py-1 text-[10px] uppercase tracking-[0.15em] text-cyan-100"
                initial={{ opacity: 0, y: -10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.8 }}
              >
                Live
              </motion.div>
            </div>
            <p className="mb-3 text-xs uppercase tracking-[0.2em] text-cyan-200/80">Threat Surface Snapshot</p>
            <p className="mb-6 font-heading text-5xl text-cyan-100">03:58</p>
            <div className="space-y-3 text-sm text-slate-300">
              <Metrics label="Requests Sent" value="1,248" />
              <Metrics label="Endpoints Found" value="92" />
              <Metrics label="High Risk" value="7" />
            </div>
            <motion.div
              className="mt-6 h-1 w-full rounded-full bg-cyan-300/20"
              initial={{ scaleX: 0.08, opacity: 0.4 }}
              whileInView={{ scaleX: 1, opacity: 1 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: prefersReducedMotion ? 0 : 1.1, ease: "easeOut" }}
            />
            <div className="mt-4 grid grid-cols-3 gap-2 text-center text-[11px] text-slate-300">
              <div className="rounded border border-cyber-border bg-slate-950/40 px-2 py-2">
                <p className="text-cyan-100">10</p>
                <p className="uppercase tracking-wide">Concurrency</p>
              </div>
              <div className="rounded border border-cyber-border bg-slate-950/40 px-2 py-2">
                <p className="text-cyan-100">&lt;120ms</p>
                <p className="uppercase tracking-wide">Batch Delay</p>
              </div>
              <div className="rounded border border-cyber-border bg-slate-950/40 px-2 py-2">
                <p className="text-cyan-100">Realtime</p>
                <p className="uppercase tracking-wide">Events</p>
              </div>
            </div>
          </SurfacePanel>
        </motion.div>

        <motion.div
          className="pointer-events-none absolute inset-x-0 bottom-12 z-20 [perspective:1200px]"
          style={prefersReducedMotion ? undefined : { opacity: bridgeOpacity, y: bridgeY }}
        >
          <div className="mx-auto max-w-4xl px-4">
            <div className="mb-4 flex items-center justify-center gap-3">
              <motion.div
                className="h-[1px] w-32 bg-cyan-300/50"
                style={prefersReducedMotion ? undefined : { scaleX: bridgeScale }}
              />
              <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-cyan-200/80">Scroll to explore modules</p>
              <motion.div
                className="h-[1px] w-32 bg-cyan-300/50"
                style={prefersReducedMotion ? undefined : { scaleX: bridgeScale }}
              />
            </div>
            <div className="grid grid-cols-3 gap-3">
              <motion.div
                className="rounded-lg border border-cyan-300/25 bg-slate-950/72 p-3 text-center text-[11px] text-slate-300 shadow-[0_10px_30px_rgba(2,8,23,0.45)] backdrop-blur-[1px]"
                style={prefersReducedMotion ? undefined : { y: bridgeCardOneY, rotateX: bridgeCardOneRotateX, rotateY: bridgeCardOneRotateY, opacity: bridgeCardOneOpacity, scale: bridgeCardOneScale, transformStyle: "preserve-3d" }}
              >
                <p className="text-cyan-100">/admin /backup /api</p>
                <p className="mt-1 font-mono uppercase tracking-[0.12em]">Path Discovery</p>
              </motion.div>
              <motion.div
                className="rounded-lg border border-cyan-300/25 bg-slate-950/72 p-3 text-center text-[11px] text-slate-300 shadow-[0_10px_30px_rgba(2,8,23,0.45)] backdrop-blur-[1px]"
                style={prefersReducedMotion ? undefined : { y: bridgeCardTwoY, rotateX: bridgeCardTwoRotateX, rotateY: bridgeCardTwoRotateY, opacity: bridgeCardTwoOpacity, scale: bridgeCardTwoScale, transformStyle: "preserve-3d" }}
              >
                <p className="text-cyan-100">High · Medium · Info</p>
                <p className="mt-1 font-mono uppercase tracking-[0.12em]">Risk Labeling</p>
              </motion.div>
              <motion.div
                className="rounded-lg border border-cyan-300/25 bg-slate-950/72 p-3 text-center text-[11px] text-slate-300 shadow-[0_10px_30px_rgba(2,8,23,0.45)] backdrop-blur-[1px]"
                style={prefersReducedMotion ? undefined : { y: bridgeCardThreeY, rotateX: bridgeCardThreeRotateX, rotateY: bridgeCardThreeRotateY, opacity: bridgeCardThreeOpacity, scale: bridgeCardThreeScale, transformStyle: "preserve-3d" }}
              >
                <p className="text-cyan-100">CSV · JSON · Logs</p>
                <p className="mt-1 font-mono uppercase tracking-[0.12em]">Share Results</p>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </SectionWrap>

      <SectionWrap id="products" className="py-20">
        <RevealInView>
          <p className="mb-3 text-xs uppercase tracking-[0.2em] text-cyan-200/80">Product Suite</p>
          <TextReveal as="h2" className="mb-3 max-w-3xl font-heading text-3xl text-slate-100 md:text-5xl" text="The ScanSpy Recon Stack" />
          <p className="mb-8 max-w-2xl text-sm text-slate-300">
            Core modules that move teams from discovery to triage and remediation with clear operational context.
          </p>
        </RevealInView>
        <div className="grid overflow-hidden rounded-2xl border border-cyan-300/15 bg-slate-950/70 md:grid-cols-2">
          <SuiteTile
            index="01"
            icon={Radar}
            title="Endpoint Discovery Engine"
            text="Enumerate hidden paths and files through tuned batching and stable concurrency controls."
            metricLabel="Coverage"
            metricValue="5M+ path patterns"
            accent="from-cyan-400/30 to-transparent"
          />
          <SuiteTile
            index="02"
            icon={ShieldAlert}
            title="Risk Labeling Layer"
            text="Translate raw findings into practical severity signals so remediation starts with highest-impact exposures."
            metricLabel="Prioritization"
            metricValue="High/Med/Low/Info"
            accent="from-violet-400/25 to-transparent"
          />
          <SuiteTile
            index="03"
            icon={LineChart}
            title="Live Stream Monitor"
            text="Track requests, status responses, and discovered endpoints in real time during active scans."
            metricLabel="Latency"
            metricValue="Sub-second updates"
            accent="from-emerald-400/20 to-transparent"
          />
          <SuiteTile
            index="04"
            icon={Code2}
            title="Export + Workflow Bridge"
            text="Push clean CSV/JSON outputs into engineering and security workflows without manual report formatting."
            metricLabel="Output"
            metricValue="CSV / JSON"
            accent="from-sky-400/20 to-transparent"
          />
        </div>
      </SectionWrap>

      <SectionWrap id="about" className="pb-10">
        <SurfacePanel>
          <RevealInView>
            <p className="mb-3 text-xs uppercase tracking-[0.2em] text-cyan-200/80">Developer First</p>
            <TextReveal as="h3" className="mb-4 max-w-3xl font-heading text-2xl text-slate-100 md:text-4xl" text="Built for security teams. Ready for production." />
          </RevealInView>
          <AccentDivider className="mb-5" />
          <pre className="overflow-x-auto rounded-xl border border-cyber-border bg-slate-950/70 p-4 font-mono text-xs text-slate-300">
{`const { scanId } = await startScan({
  targetUrl: "https://target.com",
  wordlist: "medium"
});`}
          </pre>
        </SurfacePanel>
      </SectionWrap>

      <SectionWrap id="insights" className="py-10">
        <RevealInView>
          <p className="mb-3 text-xs uppercase tracking-[0.2em] text-cyan-200/80">Capabilities</p>
          <h3 className="mb-6 font-heading text-2xl text-slate-100 md:text-3xl">Operational Context, Not Just Raw Output</h3>
        </RevealInView>
        <div className="grid gap-4 md:grid-cols-3">
          <ContextCard
            id="brand"
            title="Brand"
            text="ScanSpy blends modern cyber visual language with practical operator workflows built for daily usage."
            icon={Building2}
          />
          <ContextCard
            id="careers"
            title="Careers"
            text="We build high-signal security tooling for teams that care about speed, accuracy, and design clarity."
            icon={Gauge}
          />
          <ContextCard
            id="gallery"
            title="Gallery"
            text="Browse scan workflow snapshots, live telemetry views, and report-ready output experiences."
            icon={Radar}
          />
        </div>
      </SectionWrap>

      <SectionWrap id="tech-lab" className="py-8">
        <SurfacePanel className="overflow-hidden border-cyan-300/15 bg-slate-950/75">
          <div className="grid gap-6 md:grid-cols-[1.1fr_0.9fr]">
            <div>
              <p className="mb-2 font-mono text-xs uppercase tracking-[0.22em] text-cyan-200/80">Tech Lab</p>
              <h4 className="mb-3 font-heading text-2xl text-slate-100">Tune Scan Depth Like a Lab Workflow</h4>
              <p className="text-slate-300">
                Experiment with wordlists, pacing, and risk thresholds to optimize triage for your environment without changing core scan logic.
              </p>
            </div>
            <div className="rounded-xl border border-cyan-300/15 bg-slate-900/65 p-4 font-mono text-xs text-slate-300">
              <p className="mb-2 text-cyan-200">lab.profile = balanced</p>
              <p>depth: medium</p>
              <p>batch_delay: 120ms</p>
              <p>risk_threshold: medium+</p>
              <p className="mt-2 text-cyan-200">status: ready_for_scan</p>
            </div>
          </div>
        </SurfacePanel>
      </SectionWrap>

      <SectionWrap id="contact" className="py-8 pb-24">
        <SurfacePanel>
          <p className="mb-2 font-mono text-xs uppercase tracking-[0.2em] text-cyan-200/80">Contact</p>
          <p className="text-slate-300">
            Want a private rollout or custom setup? Reach us at{" "}
            <a className="text-cyan-200 underline decoration-cyan-400/50 underline-offset-4" href="mailto:team@scanspy.dev">
              team@scanspy.dev
            </a>.
          </p>
        </SurfacePanel>
      </SectionWrap>
    </PublicShell>
  );
}

function TopCommandBar({ sections, onSectionJump, onConsole, onContact, onDocs }) {
  return (
    <div className="sticky top-3 z-50 mb-4">
      <div className="mx-auto flex max-w-[1240px] items-center gap-2 rounded-xl border border-cyan-300/20 bg-slate-950/80 px-3 py-2 text-[11px] text-slate-200 shadow-[0_8px_28px_rgba(0,0,0,0.35)] backdrop-blur">
        <button
          className="mr-2 rounded-md border border-cyan-300/25 bg-cyan-500/10 px-2.5 py-[6px] font-heading text-sm leading-none text-cyan-100"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          aria-label="Scroll to top"
        >
          SS
        </button>
        <span className="mr-2 text-emerald-400">●</span>
        <div className="flex flex-1 flex-wrap items-center gap-1">
          {sections.map((item) => (
            <button
              key={item.id}
              onClick={() => onSectionJump(item.id)}
              className="rounded-md px-2 py-1 font-mono uppercase tracking-[0.14em] text-slate-300 transition hover:bg-cyan-500/10 hover:text-cyan-100"
            >
              {item.label}
            </button>
          ))}
        </div>
        <div className="h-6 w-px bg-cyan-300/20" />
        <button
          onClick={onConsole}
          className="rounded-md border border-cyan-300/30 bg-cyan-500/15 px-3 py-1 font-mono uppercase tracking-[0.12em] text-cyan-100"
        >
          Start Scan
        </button>
        <button
          onClick={onDocs}
          className="rounded-md border border-cyan-300/25 px-3 py-1 font-mono uppercase tracking-[0.12em] text-slate-200 hover:bg-cyan-500/10"
        >
          Docs
        </button>
        <button
          onClick={onContact}
          className="rounded-md border border-cyan-300/25 px-3 py-1 font-mono uppercase tracking-[0.12em] text-slate-200 hover:bg-cyan-500/10"
        >
          Contact
        </button>
        <button
          onClick={() => document.body.classList.toggle("font-boost")}
          className="rounded-md border border-cyan-300/25 p-1.5 text-slate-200 hover:bg-cyan-500/10"
          aria-label="Toggle font boost"
        >
          <Sun className="h-3.5 w-3.5" />
        </button>
      </div>
    </div>
  );
}

function FeatureCard({ index, icon: Icon, title, text }) {
  return (
    <div className="rounded-xl border border-cyber-border bg-cyber-surface/60 p-5">
      <p className="mb-2 font-mono text-xs text-cyan-300">{index}</p>
      <Icon className="mb-3 h-5 w-5 text-cyan-300" />
      <h3 className="mb-2 font-heading text-xl">{title}</h3>
      <p className="text-sm text-slate-300">{text}</p>
    </div>
  );
}

function SuiteTile({ index, icon: Icon, title, text, metricLabel, metricValue, accent }) {
  return (
    <div className="group relative border-b border-r border-cyan-300/10 p-7 md:min-h-[280px]">
      <div className={`pointer-events-none absolute inset-0 bg-gradient-to-br ${accent} opacity-40 transition group-hover:opacity-70`} />
      <div className="relative z-10">
        <p className="mb-4 font-mono text-[10px] uppercase tracking-[0.22em] text-slate-400">{index}</p>
        <div className="mb-4 inline-flex rounded-md border border-cyan-300/20 bg-cyan-500/10 p-2">
          <Icon className="h-4 w-4 text-cyan-200" />
        </div>
        <h4 className="mb-3 font-heading text-3xl text-slate-100">{title}</h4>
        <p className="mb-7 max-w-xl text-sm text-slate-300">{text}</p>
        <div className="border-t border-cyan-300/15 pt-4">
          <p className="text-lg font-semibold text-cyan-200">{metricValue}</p>
          <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-slate-400">{metricLabel}</p>
        </div>
      </div>
    </div>
  );
}

function ContextCard({ id, title, text, icon: Icon }) {
  return (
    <SurfacePanel id={id} className="border-cyan-300/15 bg-slate-950/70 p-5">
      <div className="mb-3 inline-flex rounded-md border border-cyan-300/20 bg-cyan-500/10 p-2">
        <Icon className="h-4 w-4 text-cyan-200" />
      </div>
      <p className="mb-2 font-mono text-xs uppercase tracking-[0.2em] text-cyan-200/80">{title}</p>
      <p className="text-sm text-slate-300">{text}</p>
    </SurfacePanel>
  );
}

function Metrics({ label, value }) {
  return (
    <div className="flex items-center justify-between rounded-lg border border-cyber-border bg-slate-950/50 px-3 py-2">
      <span>{label}</span>
      <span className="font-medium text-cyan-100">{value}</span>
    </div>
  );
}
