import { useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";
import { GraduationCap, Briefcase, Handshake, Award } from "lucide-react";
import { StaggerContainer, StaggerItem } from "./Reveal";

const STATS = [
  { icon: GraduationCap, value: 500, suffix: "+", label: "Students Trained" },
  { icon: Briefcase, value: 200, suffix: "+", label: "Placements" },
  { icon: Handshake, value: 50, suffix: "+", label: "Hiring Partners" },
  { icon: Award, value: 10, suffix: "+", label: "Years of Excellence" },
];

function useCountUp(target, active, duration = 1800) {
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!active) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setValue(target);
      return;
    }
    let frame;
    const start = performance.now();
    const tick = (now) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(Math.round(target * eased));
      if (progress < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [active, target, duration]);

  return value;
}

function StatItem({ icon: Icon, value, suffix, label, active }) {
  const count = useCountUp(value, active);

  return (
    <div className="group flex flex-col items-center gap-2 px-3 py-4 text-center sm:py-4">
      <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-navy-900 text-gold-400 shadow-sm shadow-navy-900/10 transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:scale-102">
        <Icon className="h-5 w-5" aria-hidden="true" />
      </span>
      <p className="font-display text-2xl font-bold text-navy-900 sm:text-3xl">
        {count}
        <span className="text-gold-500">{suffix}</span>
      </p>
      <p className="text-xs font-medium uppercase tracking-wider text-slate-500">{label}</p>
    </div>
  );
}

/**
 * Floating stats card that overlaps the bottom of the hero slider.
 * Counters start when the strip scrolls into view; items cascade in.
 */
export default function Stats() {
  const sectionRef = useRef(null);
  const inView = useInView(sectionRef, { once: true, amount: 0.3 });

  return (
    <section id="stats" ref={sectionRef} className="relative z-20 -mt-12 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl">
        <StaggerContainer className="grid grid-cols-2 divide-navy-100 rounded-xl border border-navy-100 bg-white shadow-lg shadow-navy-950/10 max-lg:divide-y lg:grid-cols-4 lg:divide-x">
          {STATS.map((stat) => (
            <StaggerItem key={stat.label} y={28}>
              <StatItem {...stat} active={inView} />
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}
