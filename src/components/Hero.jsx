import { useCallback, useEffect, useRef, useState } from "react";
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";

import ParticleNetwork from "./ParticleNetwork";
import slide1 from "../../assets/slide1.jpeg";
import slide2 from "../../assets/slide2.jpeg";
import slide3 from "../../assets/slide3.jpeg";

const EASE = [0.22, 1, 0.36, 1];

const SLIDES = [
  {
    image: slide1,
    alt: "Trainer presenting to a classroom of students",
    kicker: "Industry-Ready Training",
  },
  {
    image: slide2,
    alt: "Young professionals collaborating in a modern office",
    kicker: "Placements That Launch Careers",
  },
  {
    image: slide3,
    alt: "Luxury hospitality resort at sunset",
    kicker: "Software & Hospitality Solutions",
  },
];

const SLIDE_INTERVAL = 6000;

const HEADLINE = [
  { text: "Empowering", gold: false },
  { text: "Skills,", gold: true },
  { text: "Creating", gold: false },
  { text: "Opportunities,", gold: true },
  { text: "Delivering", gold: false },
  { text: "Success", gold: true },
];

/* Layer 1 — ambient aurora: large blurred navy/gold blobs drifting slowly. */
const AURORA_BLOBS = [
  {
    className: "-top-48 -left-44 h-[38rem] w-[38rem] bg-gold-500/12",
    x: [0, 70, -40, 0],
    y: [0, 60, 100, 0],
    scale: [1, 1.14, 0.94, 1],
    duration: 28,
  },
  {
    className: "top-1/4 -right-52 h-[34rem] w-[34rem] bg-navy-500/30",
    x: [0, -60, 30, 0],
    y: [0, 80, -40, 0],
    scale: [1, 0.92, 1.1, 1],
    duration: 24,
  },
  {
    className: "-bottom-56 left-1/4 h-[30rem] w-[30rem] bg-gold-400/8",
    x: [0, 50, -60, 0],
    y: [0, -70, -20, 0],
    scale: [1, 1.08, 0.96, 1],
    duration: 30,
  },
];

function Aurora({ reduceMotion }) {
  return (
    <div className="pointer-events-none absolute inset-0" aria-hidden="true">
      {AURORA_BLOBS.map((blob, i) => (
        <motion.div
          key={i}
          className={`absolute rounded-full blur-3xl ${blob.className}`}
          animate={
            reduceMotion
              ? undefined
              : { x: blob.x, y: blob.y, scale: blob.scale }
          }
          transition={{ duration: blob.duration, repeat: Infinity, ease: "easeInOut" }}
        />
      ))}
    </div>
  );
}

/* Layer 3 — thin gold light beams rising diagonally (logo's ascent motif). */
const BEAMS = [
  { left: "18%", duration: "11s", delay: "0s", opacity: 0.3 },
  { left: "52%", duration: "14s", delay: "3.5s", opacity: 0.22 },
  { left: "81%", duration: "12s", delay: "7s", opacity: 0.28 },
];

function Beams() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
      {BEAMS.map((beam, i) => (
        <span
          key={i}
          className="beam"
          style={{
            left: beam.left,
            "--beam-duration": beam.duration,
            "--beam-delay": beam.delay,
            "--beam-opacity": beam.opacity,
          }}
        />
      ))}
    </div>
  );
}

/* Primary CTA with a magnetic pull toward the cursor. */
function MagneticCta({ href, children, className }) {
  const reduceMotion = useReducedMotion();
  const ref = useRef(null);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const x = useSpring(mx, { stiffness: 180, damping: 16, mass: 0.4 });
  const y = useSpring(my, { stiffness: 180, damping: 16, mass: 0.4 });

  const onMouseMove = (e) => {
    if (reduceMotion || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    mx.set((e.clientX - rect.left - rect.width / 2) * 0.28);
    my.set((e.clientY - rect.top - rect.height / 2) * 0.42);
  };

  const onMouseLeave = () => {
    mx.set(0);
    my.set(0);
  };

  return (
    <motion.a
      ref={ref}
      href={href}
      className={className}
      style={{ x, y }}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      whileHover={reduceMotion ? undefined : { scale: 1.03 }}
      whileTap={{ scale: 0.97 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
    >
      {children}
    </motion.a>
  );
}

export default function Hero() {
  const [current, setCurrent] = useState(0);
  const reduceMotion = useReducedMotion();

  const goTo = useCallback((index) => {
    setCurrent((index + SLIDES.length) % SLIDES.length);
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((c) => (c + 1) % SLIDES.length);
    }, SLIDE_INTERVAL);
    return () => clearInterval(timer);
  }, []);

  /* Parallax: background layers translate slower than the page scroll. */
  const { scrollY } = useScroll();
  const slidesY = useTransform(scrollY, [0, 900], [0, 150]);
  const auroraY = useTransform(scrollY, [0, 900], [0, 90]);

  const headlineContainer = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.09, delayChildren: 0.2 } },
  };
  const headlineWord = {
    hidden: reduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 28 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: EASE } },
  };

  const fadeUp = (delay) => ({
    initial: reduceMotion ? false : { opacity: 0, y: 28 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.7, delay, ease: EASE },
  });

  return (
    <section
      id="home"
      className="relative flex min-h-screen items-center overflow-hidden bg-navy-950"
    >
      {/* Sliding photos, oversized vertically so parallax never exposes edges */}
      <motion.div
        className="absolute inset-x-0 -top-[9%] -bottom-[9%]"
        style={reduceMotion ? undefined : { y: slidesY }}
        aria-hidden="true"
      >
        {SLIDES.map((slide, i) => (
          <div
            key={slide.image}
            className={`absolute inset-0 overflow-hidden transition-opacity duration-[1400ms] ease-in-out ${
              i === current ? "opacity-100" : "opacity-0"
            }`}
          >
            <img
              src={slide.image}
              alt={i === current ? slide.alt : ""}
              className={`h-full w-full object-cover ${i === current ? "ken-burns" : ""}`}
            />
          </div>
        ))}
      </motion.div>

      {/* Navy brand overlay to keep text readable */}
      <div
        className="absolute inset-0 bg-gradient-to-b from-navy-950/85 via-navy-900/70 to-navy-950/90"
        aria-hidden="true"
      />
      <div
        className="absolute inset-0 bg-gradient-to-r from-navy-950/60 via-transparent to-navy-950/60"
        aria-hidden="true"
      />

      {/* Layer 1: aurora glow (own, slower parallax for depth) */}
      <motion.div
        className="absolute inset-0"
        style={reduceMotion ? undefined : { y: auroraY }}
        aria-hidden="true"
      >
        <Aurora reduceMotion={reduceMotion} />
      </motion.div>

      {/* Layer 2: particle network */}
      <ParticleNetwork className="pointer-events-none absolute inset-0 h-full w-full" />

      {/* Layer 3: rising gold beams */}
      <Beams />

      {/* Centered content */}
      <div className="relative z-20 mx-auto w-full max-w-7xl px-4 pb-44 pt-36 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          {/* Rotating kicker tied to the active slide */}
          <div className="flex h-9 items-center justify-center">
            <AnimatePresence mode="wait">
              <motion.p
                key={SLIDES[current].kicker}
                initial={reduceMotion ? false : { opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={reduceMotion ? undefined : { opacity: 0, y: -12 }}
                transition={{ duration: 0.45 }}
                className="inline-flex items-center gap-3 text-sm font-semibold uppercase tracking-[0.28em] text-gold-400"
              >
                <span className="h-px w-8 bg-gold-500" aria-hidden="true" />
                {SLIDES[current].kicker}
                <span className="h-px w-8 bg-gold-500" aria-hidden="true" />
              </motion.p>
            </AnimatePresence>
          </div>

          {/* Headline: words cascade in on load */}
          <motion.h1
            variants={headlineContainer}
            initial="hidden"
            animate="visible"
            className="mt-6 font-display text-4xl font-bold leading-tight text-white drop-shadow-lg sm:text-5xl lg:text-[3.6rem]"
          >
            {HEADLINE.map((word, i) => (
              <motion.span
                key={i}
                variants={headlineWord}
                className={`inline-block ${word.gold ? "text-gold-400" : ""} ${
                  i < HEADLINE.length - 1 ? "mr-[0.28em]" : ""
                }`}
              >
                {word.text}
              </motion.span>
            ))}
          </motion.h1>

          <motion.p
            {...fadeUp(0.95)}
            className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-navy-100 sm:text-xl"
          >
            Training Today, Placement Tomorrow, Success Forever.
          </motion.p>

          <motion.div
            {...fadeUp(1.15)}
            className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row"
          >
            <MagneticCta
              href="#contact"
              className="w-full rounded-full bg-gold-500 px-8 py-4 text-center text-base font-semibold text-navy-950 shadow-lg shadow-navy-950/40 transition-colors hover:bg-gold-400 focus:outline-none focus-visible:ring-2 focus-visible:ring-gold-300 sm:w-auto"
            >
              Get Started
            </MagneticCta>
            <motion.a
              href="#services"
              whileHover={reduceMotion ? undefined : { scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className="w-full rounded-full border border-white/40 bg-white/5 px-8 py-4 text-center text-base font-semibold text-white backdrop-blur-sm transition-colors hover:border-gold-400 hover:text-gold-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/50 sm:w-auto"
            >
              Our Services
            </motion.a>
          </motion.div>
        </div>
      </div>

      {/* Slider controls removed per request (arrows and dots) */}
    </section>
  );
}
