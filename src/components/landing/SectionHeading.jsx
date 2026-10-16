import { ScrollAnimatedItem } from "../../utils/pageAnimations";

// Small gold label above a serif title, matching the hero.
const SectionHeading = ({ eyebrow, title, align = "center", className = "" }) => (
  <ScrollAnimatedItem
    amount={0.2}
    className={`${align === "center" ? "text-center" : ""} ${className}`}
  >
    {eyebrow && (
      <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-[var(--color-wood)]">
        {eyebrow}
      </p>
    )}
    <h2 className="mt-3 font-serif text-3xl leading-tight md:text-5xl">
      {title}
    </h2>
  </ScrollAnimatedItem>
);

export default SectionHeading;
