import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";

const NAV_LINKS = [
  { label: "About", href: "#about" },
  { label: "Services", href: "#services" },
  { label: "Gallery", href: "/gallery.html" },
  { label: "Why Us", href: "#why-us" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const solid = scrolled || menuOpen;

  return (
    <header className="fixed inset-x-0 top-4 z-50 flex justify-center">
      <nav
        aria-label="Main"
        className="w-full max-w-7xl px-4 sm:px-6 lg:px-8"
      >
        <div
          className={`mx-auto flex h-12 items-center justify-between gap-4 rounded-2xl bg-white/95 px-4 shadow-sm transition-all duration-300 ${
            solid ? "shadow-lg" : ""
          }`}
        >
            <a href="#home" className="flex items-center gap-3" aria-label="DEVINETEK home">
            <span className="rounded-md bg-white px-1 py-0.5">
              <img src="/assets/logo.png" alt="DEVINETEK logo" className="h-8 w-auto" loading="lazy" width="120" height="32" />
            </span>
          </a>

          {/* Centered links */}
          <div className="hidden md:flex items-center gap-6">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="relative text-sm font-medium text-navy-900 transition-colors hover:text-gold-500"
              >
                {link.label}
                <span className="absolute -bottom-2 left-0 h-0.5 w-0 rounded-full bg-gold-500 transition-all duration-300 group-hover:w-full" />
              </a>
            ))}
          </div>

          {/* Right-side CTA & mobile toggle */}
          <div className="flex items-center gap-3">
            <a
              href="#contact"
              className="hidden rounded-full bg-gold-500 px-4 py-2 text-sm font-semibold text-navy-950 shadow-md md:inline-flex"
            >
              Get Started
            </a>

            <button
              type="button"
              className="rounded-md p-2 text-navy-900 transition hover:bg-navy-50 md:hidden"
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              onClick={() => setMenuOpen((open) => !open)}
            >
              {menuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile menu */}
      <div
        id="mobile-menu"
        className={`overflow-hidden bg-navy-900/95 backdrop-blur transition-[max-height] duration-300 md:hidden ${
          menuOpen ? "max-h-80" : "max-h-0"
        }`}
      >
        <div className="space-y-1 px-4 pb-6 pt-2">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className="block rounded-lg px-3 py-3 text-base font-medium text-white/90 transition hover:bg-white/10 hover:text-gold-300"
            >
              {link.label}
            </a>
          ))}
          <a
            href="#contact"
            onClick={() => setMenuOpen(false)}
            className="mt-3 block rounded-full bg-gold-500 px-5 py-3 text-center text-base font-semibold text-navy-950 transition hover:bg-gold-400"
          >
            Get Started
          </a>
        </div>
      </div>
    </header>
  );
}
