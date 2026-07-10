import Reveal from "./Reveal";

/**
 * Consistent section header: gold eyebrow, display title, optional lead
 * paragraph. `dark` flips colours for navy sections.
 */
export default function SectionHeading({ eyebrow, title, lead, dark = false, align = "center" }) {
  const alignment = align === "left" ? "text-left" : "text-center mx-auto";

  return (
    <Reveal className={`max-w-2xl ${alignment}`}>
      <p className="text-sm font-semibold uppercase tracking-[0.22em] text-gold-500">
        {eyebrow}
      </p>
      <h2
        className={`mt-3 font-display text-3xl font-bold leading-tight sm:text-4xl ${
          dark ? "text-white" : "text-navy-900"
        }`}
      >
        {title}
      </h2>
      <div
        className={`mt-4 h-1 w-16 rounded-full bg-gold-500 ${
          align === "left" ? "" : "mx-auto"
        }`}
        aria-hidden="true"
      />
      {lead && (
        <p className={`mt-5 text-lg leading-relaxed ${dark ? "text-navy-100" : "text-slate-600"}`}>
          {lead}
        </p>
      )}
    </Reveal>
  );
}
