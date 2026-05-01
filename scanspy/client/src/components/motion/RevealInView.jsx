import { motion } from "framer-motion";
import { createReveal, useMotionPreferences, viewportOnce } from "./scrollMotion";

export default function RevealInView({
  children,
  className,
  as = "div",
  y = 28,
  amount = 0.22,
  delay = 0,
}) {
  const { prefersReducedMotion, transition } = useMotionPreferences();
  const Component = motion[as] || motion.div;

  return (
    <Component
      className={className}
      variants={createReveal(prefersReducedMotion, y)}
      initial="hidden"
      whileInView="show"
      viewport={{ ...viewportOnce, amount }}
      transition={{ ...transition, delay }}
    >
      {children}
    </Component>
  );
}
