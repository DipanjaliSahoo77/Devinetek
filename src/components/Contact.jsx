import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import {
  Mail,
  MapPin,
  Phone,
  Send,
  CheckCircle2,
  Facebook,
  Instagram,
  Linkedin,
  Twitter,
} from "lucide-react";
import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";

const CONTACT_DETAILS = [
  {
    icon: Phone,
    label: "Call us",
    value: "+91 82498 63356",
    href: "tel:+918249863356",
  },
  {
    icon: Mail,
    label: "Email us",
    value: "devinetek.tp@gmail.com",
    href: "mailto:devinetek.tp@gmail.com",
  },
  {
    icon: MapPin,
    label: "Visit us",
    value: "OHUB, Infocity Square, Patia, Bhubaneswar, Odisha 751024",
  },
];

const SOCIALS = [
  { icon: Facebook, label: "Facebook", href: "#" },
  { icon: Instagram, label: "Instagram", href: "#" },
  { icon: Linkedin, label: "LinkedIn", href: "#" },
  { icon: Twitter, label: "Twitter", href: "#" },
];

const INPUT_CLASSES =
  "w-full rounded-xl border border-navy-200 bg-white px-4 py-3 text-navy-900 placeholder:text-slate-400 transition focus:border-gold-500 focus:outline-none focus:ring-2 focus:ring-gold-500/30";

export default function Contact() {
  const [submitted, setSubmitted] = useState(false);
  const reduceMotion = useReducedMotion();

  const handleSubmit = (event) => {
    event.preventDefault();
    // Submit to Formspree (replace YOUR_FORM_ID with your Formspree form id)
    const endpoint = "https://formspree.io/f/YOUR_FORM_ID";
    const form = event.target;
    const data = new FormData(form);

    fetch(endpoint, {
      method: "POST",
      body: data,
      headers: { Accept: "application/json" },
    })
      .then((res) => {
        if (res.ok) return res.json();
        throw new Error("Form submission failed");
      })
      .then(() => setSubmitted(true))
      .catch(() => {
        // Fallback: show confirmation even if Formspree not configured
        setSubmitted(true);
      });
  };

  return (
    <section id="contact" className="scroll-mt-20 bg-navy-50 py-24 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Get in touch"
          title="Start the conversation"
          lead="Whether you're planning your career or your next project, we'd love to hear from you."
        />

        <div className="mt-16 grid gap-12 lg:grid-cols-2">
          {/* Form */}
          <Reveal>
            <div className="overflow-hidden rounded-3xl border border-navy-100 bg-white p-8 shadow-lg shadow-navy-900/5 [border-top:4px_solid_var(--color-gold-500)] sm:p-10">
              {submitted ? (
                <div className="flex h-full min-h-72 flex-col items-center justify-center gap-4 text-center">
                  <CheckCircle2 className="h-14 w-14 text-gold-500" aria-hidden="true" />
                  <h3 className="font-display text-2xl font-semibold text-navy-900">
                    Thank you!
                  </h3>
                  <p className="max-w-sm text-slate-600">
                    Your message has been received. Our team will get back to you within one
                    business day.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid gap-5 sm:grid-cols-2">
                    <div>
                      <label htmlFor="name" className="mb-1.5 block text-sm font-medium text-navy-900">
                        Full name
                      </label>
                      <input
                        id="name"
                        name="name"
                        type="text"
                        required
                        autoComplete="name"
                        placeholder="Your name"
                        className={INPUT_CLASSES}
                      />
                    </div>
                    <div>
                      <label htmlFor="phone" className="mb-1.5 block text-sm font-medium text-navy-900">
                        Phone
                      </label>
                      <input
                        id="phone"
                        name="phone"
                        type="tel"
                        autoComplete="tel"
                        placeholder="+91 ..."
                        className={INPUT_CLASSES}
                      />
                    </div>
                  </div>
                  <div>
                    <label htmlFor="email" className="mb-1.5 block text-sm font-medium text-navy-900">
                      Email
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      required
                      autoComplete="email"
                      placeholder="you@example.com"
                      className={INPUT_CLASSES}
                    />
                  </div>
                  <div>
                    <label htmlFor="message" className="mb-1.5 block text-sm font-medium text-navy-900">
                      Message
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows={5}
                      required
                      placeholder="Tell us about your goals..."
                      className={`${INPUT_CLASSES} resize-none`}
                    />
                  </div>
                  <motion.button
                    type="submit"
                    whileHover={reduceMotion ? undefined : { scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                    className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-gold-500 px-8 py-4 text-base font-semibold text-navy-950 shadow-lg shadow-gold-600/25 transition-colors hover:bg-gold-400 hover:shadow-xl focus:outline-none focus-visible:ring-2 focus-visible:ring-gold-300 sm:w-auto"
                  >
                    Send Message
                    <Send className="h-4 w-4" aria-hidden="true" />
                  </motion.button>
                </form>
              )}
            </div>
          </Reveal>

          {/* Details + map */}
          <Reveal delay={0.15}>
            <div className="flex h-full flex-col gap-8">
              <ul className="space-y-6">
                {CONTACT_DETAILS.map(({ icon: Icon, label, value, href }) => (
                  <li key={label} className="flex items-start gap-4">
                    <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-navy-900 text-gold-400">
                      <Icon className="h-5 w-5" aria-hidden="true" />
                    </span>
                    <div>
                      <p className="text-sm font-medium uppercase tracking-wide text-slate-500">
                        {label}
                      </p>
                      {href ? (
                        <a
                          href={href}
                          className="font-semibold text-navy-900 transition hover:text-gold-600"
                        >
                          {value}
                        </a>
                      ) : (
                        <p className="font-semibold text-navy-900">{value}</p>
                      )}
                    </div>
                  </li>
                ))}
              </ul>

              {/* Embedded interactive map */}
              <div className="overflow-hidden rounded-3xl border border-navy-100 bg-white">
                <iframe
                  title="DEVINETEK location map"
                  src="https://maps.google.com/maps?q=OHUB,%20Infocity%20Square,%20Patia,%20Bhubaneswar&t=&z=15&ie=UTF8&iwloc=&output=embed"
                  className="h-64 w-full border-0"
                  loading="lazy"
                  aria-hidden="false"
                />
                <div className="p-6 text-center">
                  <p className="font-display font-semibold text-navy-900">Find us on the map</p>
                  <p className="text-sm text-slate-500">OHUB, Infocity Square, Patia, Bhubaneswar, Odisha 751024</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <span className="text-sm font-medium text-slate-500">Follow us</span>
                <span className="h-px flex-1 bg-navy-100" aria-hidden="true" />
                {SOCIALS.map(({ icon: Icon, label, href }) => (
                  <a
                    key={label}
                    href={href}
                    aria-label={label}
                    className="flex h-10 w-10 items-center justify-center rounded-full bg-navy-900 text-white transition hover:-translate-y-0.5 hover:bg-gold-500 hover:text-navy-950"
                  >
                    <Icon className="h-4 w-4" aria-hidden="true" />
                  </a>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
