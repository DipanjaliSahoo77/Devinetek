import { Mail, MapPin, Phone, Facebook, Instagram, Linkedin, Twitter } from "lucide-react";

const QUICK_LINKS = [
  { label: "About", href: "#about" },
  { label: "Services", href: "#services" },
  { label: "Why Us", href: "#why-us" },
  { label: "Testimonials", href: "#testimonials" },
  { label: "Contact", href: "#contact" },
];

const SERVICE_LINKS = ["Training", "Placement", "Software", "Hospitality Solution"];

const SOCIALS = [
  { icon: Facebook, label: "Facebook", href: "#" },
  { icon: Instagram, label: "Instagram", href: "#" },
  { icon: Linkedin, label: "LinkedIn", href: "#" },
  { icon: Twitter, label: "Twitter", href: "#" },
];

export default function Footer() {
  return (
    <footer className="bg-navy-950 text-navy-100">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div>
            <a href="#home" className="inline-block rounded-lg bg-white px-3 py-2" aria-label="DEVINETEK home">
              <img src="/assets/logo.png" alt="DEVINETEK logo" className="h-12 w-auto" loading="lazy" width="180" height="48" />
            </a>
            <p className="mt-5 max-w-xs text-sm leading-relaxed text-navy-200">
              Empowering Skills, Creating Opportunities, Delivering Success. Training Today,
              Placement Tomorrow, Success Forever.
            </p>
            <div className="mt-6 flex gap-3">
              {SOCIALS.map(({ icon: Icon, label, href }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-gold-500 hover:text-navy-950"
                >
                  <Icon className="h-4 w-4" aria-hidden="true" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick links */}
          <nav aria-label="Footer quick links">
            <h3 className="font-display text-sm font-semibold uppercase tracking-wider text-gold-400">
              Quick Links
            </h3>
            <ul className="mt-5 space-y-3 text-sm">
              {QUICK_LINKS.map((link) => (
                <li key={link.href}>
                  <a href={link.href} className="transition hover:text-gold-300">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* Services */}
          <div>
            <h3 className="font-display text-sm font-semibold uppercase tracking-wider text-gold-400">
              Our Services
            </h3>
            <ul className="mt-5 space-y-3 text-sm">
              {SERVICE_LINKS.map((service) => (
                <li key={service}>
                  <a href="#services" className="transition hover:text-gold-300">
                    {service}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-display text-sm font-semibold uppercase tracking-wider text-gold-400">
              Contact
            </h3>
            <ul className="mt-5 space-y-4 text-sm">
              <li className="flex items-start gap-3">
                <Phone className="mt-0.5 h-4 w-4 shrink-0 text-gold-400" aria-hidden="true" />
                <a href="tel:+918249863356" className="transition hover:text-gold-300">
                  +91 82498 63356
                </a>
              </li>
              <li className="flex items-start gap-3">
                <Mail className="mt-0.5 h-4 w-4 shrink-0 text-gold-400" aria-hidden="true" />
                <a href="mailto:devinetek.tp@gmail.com" className="transition hover:text-gold-300">
                  devinetek.tp@gmail.com
                </a>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-gold-400" aria-hidden="true" />
                <span>OHUB, Infocity Square, Patia, Bhubaneswar, Odisha 751024</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-8 text-sm text-navy-300 sm:flex-row">
          <p>© {new Date().getFullYear()} DEVINETEK. All rights reserved.</p>
          <p>
            Training · Placement · Software · <span className="whitespace-nowrap">Hospitality Solution</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
