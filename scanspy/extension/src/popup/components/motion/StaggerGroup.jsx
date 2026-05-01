import { motion } from "framer-motion";
import { createReveal, createStaggerContainer, useMotionPreferences, viewportOnce } from "./scrollMotion";

export function StaggerGroup({
  children,
  className,
  amount = 0.2,
  stagger = 0.12,
  delayChildren = 0.04,
}) {
  const { prefersReducedMotion } = useMotionPreferences();

  return (
    <motion.div
      className={className}
      variants={createStaggerContainer(prefersReducedMotion, stagger, delayChildren)}
      initial="hidden"
      whileInView="show"
      viewport={{ ...viewportOnce, amount }}
    >
      {children}
    </motion.div>
  );
}

export function StaggerItem({ children, className, y = 20 }) {
  const { prefersReducedMotion, transition } = useMotionPreferences();

  return (
    <motion.div className={className} variants={createReveal(prefersReducedMotion, y)} transition={transition}>
      {children}
    </motion.div>
  );
}
