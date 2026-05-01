import { useReducedMotion } from "framer-motion";

export const viewportOnce = { once: true, amount: 0.22 };

export function useMotionPreferences() {
  const prefersReducedMotion = useReducedMotion();
  return {
    prefersReducedMotion,
    transition: prefersReducedMotion ? { duration: 0 } : { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  };
}

export function createReveal(prefersReducedMotion, y = 28) {
  if (prefersReducedMotion) {
    return {
      hidden: { opacity: 1, y: 0, scale: 1 },
      show: { opacity: 1, y: 0, scale: 1 },
    };
  }

  return {
    hidden: { opacity: 0, y, scale: 0.98 },
    show: { opacity: 1, y: 0, scale: 1 },
  };
}

export function createStaggerContainer(prefersReducedMotion, stagger = 0.12, delayChildren = 0.05) {
  return {
    hidden: {},
    show: {
      transition: prefersReducedMotion
        ? { staggerChildren: 0, delayChildren: 0 }
        : { staggerChildren: stagger, delayChildren },
    },
  };
}
