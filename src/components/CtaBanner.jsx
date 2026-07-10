import React, { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Reveal from "./Reveal";

export default function CtaBanner() {
  const reduceMotion = useReducedMotion();

  // try loading user-provided bg_img.jpg, fall back to cta-bg.jpg if missing
  const [bgSrc, setBgSrc] = useState('/assets/img/bg_img.jpg')

  useEffect(() => {
    const img = new Image()
    img.src = '/assets/img/bg_img.jpg'
    img.onload = () => setBgSrc('/assets/img/bg_img.jpg')
    img.onerror = () => setBgSrc('/assets/img/cta-bg.jpg')
  }, [])

  return (
    <section className="relative overflow-hidden py-24 sm:py-28">
      {/* Background photo with navy brand overlay */}
      <img
        src={bgSrc}
        alt=""
        aria-hidden="true"
        className="absolute inset-0 h-full w-full object-cover"
      />
      <div
        className="absolute inset-0 bg-gradient-to-r from-navy-950/95 via-navy-900/85 to-navy-900/70"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gold-500/70 to-transparent"
        aria-hidden="true"
      />

      <Reveal className="relative">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-10 px-4 text-center sm:px-6 lg:flex-row lg:text-left lg:px-8">
          <div className="max-w-2xl">
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-gold-400">
              Your future starts here
            </p>
            <h2 className="mt-4 font-display text-3xl font-bold leading-tight text-white sm:text-4xl lg:text-[2.75rem]">
              Ready to build your <span className="text-gold-400">career</span>?
            </h2>
            <p className="mt-4 text-lg text-navy-100">
              Talk to our counsellors today and take the first step toward the future you
              deserve.
            </p>
          </div>
          <motion.a
            href="#contact"
            whileHover={reduceMotion ? undefined : { scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className="inline-flex shrink-0 items-center gap-2 rounded-full bg-gold-500 px-9 py-4.5 text-base font-semibold text-navy-950 shadow-lg shadow-navy-950/40 transition-colors hover:bg-gold-400 hover:shadow-xl focus:outline-none focus-visible:ring-2 focus-visible:ring-gold-300"
          >
            Get Started Today
            <ArrowRight className="h-5 w-5" aria-hidden="true" />
          </motion.a>
        </div>
      </Reveal>
    </section>
  );
}
