import { motion, AnimatePresence } from "framer-motion";
import { useToast } from "../context/ToastContext";

const toneStyles = {
  info: "border-cyan-400/40 bg-cyan-500/10",
  success: "border-emerald-400/40 bg-emerald-500/10",
  error: "border-red-400/40 bg-red-500/10",
};

export default function ToastViewport() {
  const { toasts } = useToast();
  return (
    <div className="fixed right-4 top-4 z-50 space-y-2">
      <AnimatePresence>
        {toasts.map((toast) => (
          <motion.div
            key={toast.id}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            className={`rounded-lg border px-4 py-2 text-sm text-white ${toneStyles[toast.tone]}`}
          >
            {toast.message}
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
