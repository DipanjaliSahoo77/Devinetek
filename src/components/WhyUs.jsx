import { BadgeCheck, TrendingUp } from "lucide-react";
import Reveal, { StaggerContainer, StaggerItem } from "./Reveal";
import SectionHeading from "./SectionHeading";
import whyChoose from "../../assets/why_choose.jpeg";

const HIGHLIGHTS = [
  {
    number: "01",
    title: "Expert Mentors",
    description:
      "Learn from industry practitioners who bring real projects, real war stories, and real hiring insight into every session.",
  },
  {
    number: "02",
    title: "Placement-First Approach",
    description:
      "Every programme is designed backwards from the job: the skills, portfolio, and interview preparation employers actually look for.",
  },
  {
    number: "03",
    title: "Trusted Industry Network",
    description:
      "Our 50+ hiring partners across technology and hospitality give our students a direct line to genuine opportunities.",
  },
  {
    number: "04",
    title: "End-to-End Support",
    description:
      "From your first enquiry to your first promotion — counselling, training, placement, and career guidance under one roof.",
  },
];

export default function WhyUs() {
  return (
    <section
      id="why-us"
      className="relative scroll-mt-20 overflow-hidden bg-gradient-to-br from-navy-950 via-navy-900 to-navy-800 py-24 sm:py-28"
    >
      {/* ambient gold glow */}
      <div
        className="pointer-events-none absolute -left-32 top-0 h-96 w-96 rounded-full bg-gold-500/10 blur-3xl"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gold-500/60 to-transparent"
        aria-hidden="true"
      />

      <div className="relative mx-auto grid max-w-7xl items-center gap-16 px-4 sm:px-6 lg:grid-cols-2 lg:gap-20 lg:px-8">
        {/* Content */}
        <div>
          <SectionHeading
            dark
            align="left"
            eyebrow="Why choose us"
            title="The DEVINETEK difference"
            lead="Plenty of places teach. We take responsibility for what comes after."
          />

          <StaggerContainer className="mt-12 space-y-8">
            {HIGHLIGHTS.map((item) => (
              <StaggerItem key={item.number} y={32}>
                <div className="group flex gap-6">
                  <span
                    className="font-display text-4xl font-bold text-gold-500/40 transition-colors duration-300 group-hover:text-gold-400"
                    aria-hidden="true"
                  >
                    {item.number}
                  </span>
                  <div className="border-l border-white/15 pl-6 transition-colors duration-300 group-hover:border-gold-500/60">
                    <h3 className="font-display text-lg font-semibold text-white">
                      {item.title}
                    </h3>
                    <p className="mt-2 leading-relaxed text-navy-100">{item.description}</p>
                  </div>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>

        {/* Visual */}
        <Reveal delay={0.15} className="relative mx-auto w-full max-w-xl lg:mx-0">
          <div className="dot-grid absolute -right-8 -top-8 h-40 w-40 rounded-2xl" aria-hidden="true" />
          <img
            src={whyChoose}
            alt="DEVINETEK students working together on laptops"
            loading="lazy"
            className="relative w-full rounded-3xl object-cover shadow-2xl shadow-navy-950/50 ring-1 ring-white/10"
          />

          {/* Floating proof cards */}
          <div className="absolute -bottom-8 -left-2 flex items-center gap-4 rounded-2xl bg-white px-6 py-4 shadow-xl shadow-navy-950/40 sm:-left-8">
            <span className="flex h-11 w-11 items-center justify-center rounded-full bg-gold-500/15 text-gold-600">
              <BadgeCheck className="h-6 w-6" aria-hidden="true" />
            </span>
            <div>
              <p className="font-display font-bold text-navy-900">95% success rate</p>
              <p className="text-sm text-slate-500">across our programmes</p>
            </div>
          </div>
          <div className="absolute -top-6 right-4 flex items-center gap-3 rounded-2xl bg-navy-900/90 px-5 py-3.5 shadow-lg shadow-navy-950/40 ring-1 ring-gold-500/30 backdrop-blur">
            <TrendingUp className="h-5 w-5 text-gold-400" aria-hidden="true" />
            <p className="text-sm font-semibold text-white">Careers rising since 2015</p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
