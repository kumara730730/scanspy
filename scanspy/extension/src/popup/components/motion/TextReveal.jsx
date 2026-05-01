import { motion } from "framer-motion";
import { useMotionPreferences } from "./scrollMotion";

export default function TextReveal({ text, className, as = "h2", amount = 0.5, delay = 0 }) {
  const { prefersReducedMotion } = useMotionPreferences();
  const Component = motion[as] || motion.h2;
  const words = text.split(" ");

  return (
    <Component
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount }}
      variants={{
        hidden: {},
        show: {
          transition: prefersReducedMotion
            ? { staggerChildren: 0, delayChildren: 0 }
            : { staggerChildren: 0.045, delayChildren: delay },
        },
      }}
    >
      {words.map((word, index) => (
        <span key={`${word}-${index}`} className="mr-[0.27em] inline-block overflow-hidden">
          <motion.span
            className="inline-block"
            variants={
              prefersReducedMotion
                ? { hidden: { opacity: 1, y: 0 }, show: { opacity: 1, y: 0 } }
                : { hidden: { opacity: 0, y: 36 }, show: { opacity: 1, y: 0 } }
            }
            transition={{ duration: prefersReducedMotion ? 0 : 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            {word}
          </motion.span>
        </span>
      ))}
    </Component>
  );
}
