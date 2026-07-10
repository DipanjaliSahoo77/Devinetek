import { CheckCircle2, Users } from "lucide-react";
import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";
import about1 from "../../assets/about1.jpeg";
import about2 from "../../assets/about2.jpeg";

const COMMITMENTS = [
  "Industry-aligned, hands-on training programmes",
  "Dedicated placement cell with 50+ hiring partners",
  "Software and hospitality solutions for growing businesses",
];

export default function About() {
  return (
    <section id="about" className="scroll-mt-20 overflow-hidden bg-white py-24 sm:py-28">
      <div className="mx-auto grid max-w-7xl items-center gap-20 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
        {/* Photo collage */}
        <Reveal className="relative mx-auto w-full max-w-xl lg:mx-0">
          {/* gold dot pattern peeking out behind */}
          <div className="dot-grid absolute -left-8 -top-8 h-40 w-40 rounded-2xl" aria-hidden="true" />
          <div className="dot-grid absolute -bottom-8 -right-4 h-36 w-36 rounded-2xl" aria-hidden="true" />

          <img
            src={about1}
            alt="Students collaborating during a DEVINETEK training session"
            className="relative w-[86%] rounded-3xl object-cover shadow-2xl shadow-navy-900/25"
          />

          {/* Overlapping secondary photo */}
          <img
            src={about2}
            alt="DEVINETEK team celebrating a successful placement"
            className="absolute -bottom-12 right-0 hidden w-[46%] rounded-3xl border-8 border-white object-cover shadow-xl shadow-navy-900/25 sm:block"
          />

          {/* Floating experience badge */}
          <div className="absolute -bottom-8 left-4 flex items-center gap-4 rounded-2xl bg-navy-900 px-6 py-5 shadow-xl shadow-navy-900/30 sm:left-8">
            <p className="font-display text-4xl font-bold text-gold-400">10+</p>
            <p className="text-sm font-medium leading-snug text-navy-100">
              Years of
              <br />
              Excellence
            </p>
          </div>
        </Reveal>

        {/* Story */}
        <div className="mt-10 lg:mt-0">
          <SectionHeading
            align="left"
            eyebrow="About Devinetek"
            title="An institution built to change careers"
            lead="DEVINETEK was founded on a simple conviction: talent is everywhere, but opportunity is not. We exist to close that gap."
          />
          <Reveal delay={0.1}>
            <p className="mt-6 leading-relaxed">
              For over a decade we have guided students and professionals from their first
              day of training to their first day on the job — and beyond. Our programmes
              combine rigorous, industry-aligned curriculum with mentorship from
              practitioners who have built real products and run real teams.
            </p>
          </Reveal>
          <Reveal delay={0.18}>
            <ul className="mt-8 space-y-3">
              {COMMITMENTS.map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-gold-500" aria-hidden="true" />
                  <span className="font-medium text-navy-900">{item}</span>
                </li>
              ))}
            </ul>
          </Reveal>
          <Reveal delay={0.26}>
            <div className="mt-10 flex flex-wrap items-center gap-6">
              <a
                href="#services"
                className="rounded-full bg-navy-900 px-8 py-4 text-base font-semibold text-white shadow-lg shadow-navy-900/25 transition hover:-translate-y-0.5 hover:bg-navy-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-navy-400"
              >
                Explore Our Services
              </a>
              <div className="flex items-center gap-3">
                <span className="flex h-12 w-12 items-center justify-center rounded-full bg-gold-500/15 text-gold-600 ring-1 ring-gold-500/30">
                  <Users className="h-5 w-5" aria-hidden="true" />
                </span>
                <div>
                  <p className="font-display font-semibold text-navy-900">500+ alumni</p>
                  <p className="text-sm text-slate-500">growing careers worldwide</p>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
