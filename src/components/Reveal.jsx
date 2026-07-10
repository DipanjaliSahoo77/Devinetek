import { motion, useReducedMotion } from "framer-motion";

const EASE = [0.22, 1, 0.36, 1];

/**
 * Scroll-reveal wrapper: fades and slides children up as they enter the
 * viewport. Respects prefers-reduced-motion.
 */
export default function Reveal({ children, delay = 0, y = 40, className = "" }) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      className={className}
      initial={reduceMotion ? false : { opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-72px" }}
      transition={{ duration: 0.65, delay, ease: EASE }}
    >
      {children}
    </motion.div>
  );
}

/**
 * Parent for cascading reveals: children wrapped in <StaggerItem> animate
 * in sequence (~0.1s apart) once the container enters the viewport.
 */
export function StaggerContainer({ children, className = "", stagger = 0.1, delay = 0 }) {
  const variants = {
    hidden: {},
    visible: { transition: { staggerChildren: stagger, delayChildren: delay } },
  };

  return (
    <motion.div
      className={className}
      variants={variants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-72px" }}
    >
      {children}
    </motion.div>
  );
}

export function StaggerItem({ children, className = "", y = 40 }) {
  const reduceMotion = useReducedMotion();
  const variants = {
    hidden: reduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE } },
  };

  return (
    <motion.div className={className} variants={variants}>
      {children}
    </motion.div>
  );
}
