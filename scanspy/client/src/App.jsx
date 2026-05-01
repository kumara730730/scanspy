import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Route, Routes, useLocation } from "react-router-dom";
import HomePage from "./pages/HomePage";
import AppEntryPage from "./pages/AppEntryPage";
import ScanPage from "./pages/ScanPage";
import ResultsPage from "./pages/ResultsPage";
import ToastViewport from "./components/ToastViewport";

export default function App() {
  const location = useLocation();

  return (
    <div className="min-h-screen bg-cyber-bg text-slate-100 font-body">
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<PageTransition><HomePage /></PageTransition>} />
          <Route path="/app" element={<PageTransition><AppEntryPage /></PageTransition>} />
          <Route path="/scan/:scanId" element={<PageTransition><ScanPage /></PageTransition>} />
          <Route path="/scan/:scanId/results" element={<PageTransition><ResultsPage /></PageTransition>} />
        </Routes>
      </AnimatePresence>
      <ToastViewport />
    </div>
  );
}

function PageTransition({ children }) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <motion.div
      initial={prefersReducedMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={prefersReducedMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: -8 }}
      transition={prefersReducedMotion ? { duration: 0 } : { duration: 0.24 }}
    >
      {children}
    </motion.div>
  );
}
