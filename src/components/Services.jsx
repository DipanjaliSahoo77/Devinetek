import { motion, useReducedMotion } from "framer-motion";
import { GraduationCap, Briefcase, Code2, ConciergeBell, ArrowRight } from "lucide-react";
import SectionHeading from "./SectionHeading";
import { StaggerContainer, StaggerItem } from "./Reveal";

const SERVICES = [
  {
    icon: GraduationCap,
    number: "01",
    title: "Training",
    image: "/assets/img/svc-training.jpg",
    imageAlt: "Instructor leading a hands-on training session",
    description:
      "Industry-aligned programmes in technology and professional skills, taught by practitioners through hands-on, project-based learning.",
  },
  {
    icon: Briefcase,
    number: "02",
    title: "Placement",
    image: "/assets/img/svc-placement.jpg",
    imageAlt: "Confident professional ready for a new role",
    description:
      "A dedicated placement cell that prepares you for interviews and connects you directly with our network of 50+ hiring partners.",
  },
  {
    icon: Code2,
    number: "03",
    title: "Software",
    image: "/assets/img/svc-software.jpg",
    imageAlt: "Developer writing code on a laptop",
    description:
      "Custom software development and IT services — web, mobile, and business applications built to help organisations grow.",
  },
  {
    icon: ConciergeBell,
    number: "04",
    title: "Hospitality Solution",
    image: "/assets/img/svc-hospitality.jpg",
    imageAlt: "Elegant restaurant table setting",
    description:
      "Trained hospitality professionals and end-to-end staffing solutions for hotels, restaurants, and service businesses.",
  },
];

export default function Services() {
  const reduceMotion = useReducedMotion();

  return (
    <section id="services" className="relative scroll-mt-20 bg-navy-50 py-24 sm:py-28 overflow-hidden">
      {/* Decorative background blobs (visible) */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div
          className="absolute -top-24 -left-12 h-[32rem] w-[32rem] rounded-full bg-gold-400/40 blur-2xl float-1"
          style={{ mixBlendMode: "soft-light" }}
        />
        <div
          className="absolute -bottom-24 -right-8 h-[30rem] w-[30rem] rounded-full bg-navy-800/20 blur-2xl float-2"
          style={{ mixBlendMode: "multiply" }}
        />
        <div
          className="absolute inset-0 bg-[linear-gradient(120deg,rgba(255,255,255,0.03),transparent 30%,rgba(0,0,0,0.02))]"
          aria-hidden="true"
        />
      </div>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
        <SectionHeading
          eyebrow="What we do"
          title="Four pillars, one promise"
          lead="Every service we offer points in the same direction: real skills, real opportunities, and lasting success."
        />

        <StaggerContainer className="mt-16 grid gap-8 sm:grid-cols-2 xl:grid-cols-4">
          {SERVICES.map((service) => (
            <StaggerItem key={service.title} className="h-full">
              <motion.article
                whileHover={reduceMotion ? undefined : { y: -6 }}
                transition={{ type: "spring", stiffness: 300, damping: 22 }}
                className="group flex h-full flex-col overflow-hidden rounded-3xl border border-transparent bg-white shadow-md shadow-navy-900/5 transition-[box-shadow,border-color] duration-300 hover:border-gold-400/60 hover:shadow-xl hover:shadow-gold-500/15"
              >
                {/* Image header */}
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={service.image}
                    alt={service.imageAlt}
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div
                    className="absolute inset-0 bg-gradient-to-t from-navy-950/70 via-navy-950/10 to-transparent"
                    aria-hidden="true"
                  />
                  {/* Ghost number watermark */}
                  <span
                    className="absolute right-4 top-3 font-display text-5xl font-bold text-white/25"
                    aria-hidden="true"
                  >
                    {/* {service.number} */}
                  </span>
                </div>

                <div className="relative flex flex-1 flex-col p-6 pt-10">
                  {/* Icon chip straddling the image edge */}
                  <span className="absolute -top-7 left-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-navy-900 text-gold-400 shadow-lg shadow-navy-950/30 transition-colors duration-300 group-hover:bg-gold-500 group-hover:text-navy-950">
                    <service.icon className="h-6 w-6" aria-hidden="true" />
                  </span>
                  <h3 className="font-display text-xl font-semibold text-navy-900">
                    {service.title}
                  </h3>
                  <p className="mt-3 flex-1 text-sm leading-relaxed text-slate-600">
                    {service.description}
                  </p>
                  <a
                    href="#contact"
                    className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-navy-900 transition-colors group-hover:text-gold-600"
                  >
                    Learn more
                    <ArrowRight
                      className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
                      aria-hidden="true"
                    />
                  </a>
                </div>
              </motion.article>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}
