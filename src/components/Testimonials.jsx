import { useCallback, useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Star, Quote, ChevronLeft, ChevronRight } from "lucide-react";
import SectionHeading from "./SectionHeading";
import Reveal from "./Reveal";

const TESTIMONIALS = [
  {
    name: "asfaque ahmed",
    role: "Google reviewer · a year ago",
    avatar: "/assets/img/avatar-4.svg",
    quote:
      "DevineTek is a great platform for job seekers. They keep you busy in your career growth like skill development and personality development classes. Thanks to their overall support in developing ones career.",
  },
  {
    name: "Alankit senapati",
    role: "Google reviewer · a year ago",
    avatar: "/assets/img/avatar-5.svg",
    quote:
      "Got placed in an IT company after completing 2 months of training in Html in devinetek. It is a good tech Institute. If you want to Join a good institute like devinetek, this is recommended.",
  },
  {
    name: "Dibya darshan Chakra",
    role: "Google reviewer · 3 years ago",
    avatar: "/assets/img/avatar-6.svg",
    quote:
      "It was a great Experience for me to learn in Devine Tek. The services is excellent and the most important things is Divine Tek don't take money for placement. The Training and placement is free of cost. So I like Divine Tek and thank you Devine Tek to making my carrier.",
  },
];

const AUTOPLAY_INTERVAL = 7000;

function Stars() {
  return (
    <div className="flex justify-center gap-1" role="img" aria-label="5 out of 5 stars">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star key={i} className="h-5 w-5 fill-gold-500 text-gold-500" aria-hidden="true" />
      ))}
    </div>
  );
}

export default function Testimonials() {
  const [current, setCurrent] = useState(0);
  const reduceMotion = useReducedMotion();

  const goTo = useCallback((index) => {
    setCurrent((index + TESTIMONIALS.length) % TESTIMONIALS.length);
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((c) => (c + 1) % TESTIMONIALS.length);
    }, AUTOPLAY_INTERVAL);
    return () => clearInterval(timer);
  }, [current]);

  const t = TESTIMONIALS[current];

  return (
    <section id="testimonials" className="scroll-mt-20 bg-white py-24 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Success stories"
          title="Careers we're proud of"
          lead="Hear it from the students and partners who trusted us with their next step."
        />

        <Reveal className="relative mx-auto mt-16 max-w-3xl">
          {/* Oversized decorative quote */}
          <Quote
            className="absolute -top-10 left-1/2 h-20 w-20 -translate-x-1/2 text-gold-500/15"
            aria-hidden="true"
          />

          <div className="relative min-h-80 rounded-3xl border border-navy-100 bg-navy-50/60 px-6 py-12 shadow-lg shadow-navy-900/5 sm:px-16">
            <AnimatePresence mode="wait">
              <motion.figure
                key={current}
                initial={reduceMotion ? false : { opacity: 0, x: 40 }}
                animate={{ opacity: 1, x: 0 }}
                exit={reduceMotion ? undefined : { opacity: 0, x: -40 }}
                transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                className="text-center"
              >
                <Stars />
                <blockquote className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-navy-800 sm:text-xl">
                  “{t.quote}”
                </blockquote>
                <figcaption className="mt-8 flex flex-col items-center gap-3">
                  <img
                    src={t.avatar}
                    alt={`Portrait of ${t.name}`}
                    className="h-16 w-16 rounded-full object-cover ring-4 ring-gold-500/40"
                  />
                  <div>
                    <p className="font-display font-semibold text-navy-900">{t.name}</p>
                    <p className="text-sm text-slate-500">{t.role}</p>
                  </div>
                </figcaption>
              </motion.figure>
            </AnimatePresence>
          </div>

          {/* Controls */}
          <div className="mt-8 flex items-center justify-center gap-6">
            <button
              type="button"
              onClick={() => goTo(current - 1)}
              aria-label="Previous testimonial"
              className="flex h-11 w-11 items-center justify-center rounded-full border border-navy-200 text-navy-700 transition hover:border-gold-500 hover:bg-gold-500 hover:text-navy-950"
            >
              <ChevronLeft className="h-5 w-5" aria-hidden="true" />
            </button>
            <div className="flex items-center gap-2.5" role="tablist" aria-label="Testimonials">
              {TESTIMONIALS.map((item, i) => (
                <button
                  key={item.name}
                  type="button"
                  role="tab"
                  aria-selected={i === current}
                  aria-label={`Show testimonial from ${item.name}`}
                  onClick={() => goTo(i)}
                  className={`h-2 rounded-full transition-all duration-500 ${
                    i === current ? "w-8 bg-gold-500" : "w-2 bg-navy-200 hover:bg-navy-300"
                  }`}
                />
              ))}
            </div>
            <button
              type="button"
              onClick={() => goTo(current + 1)}
              aria-label="Next testimonial"
              className="flex h-11 w-11 items-center justify-center rounded-full border border-navy-200 text-navy-700 transition hover:border-gold-500 hover:bg-gold-500 hover:text-navy-950"
            >
              <ChevronRight className="h-5 w-5" aria-hidden="true" />
            </button>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
