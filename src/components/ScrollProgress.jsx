import { motion, useScroll, useSpring } from "framer-motion";

/**
 * Thin gold progress bar fixed to the very top of the page,
 * filling left-to-right as the user scrolls.
 */
export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 140,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <motion.div
      aria-hidden="true"
      className="fixed inset-x-0 top-0 z-[60] h-[3px] origin-left bg-gradient-to-r from-gold-600 via-gold-500 to-gold-300"
      style={{ scaleX }}
    />
  );
}
