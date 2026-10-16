import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import ownerPhoto from "../../assets/images/cover_photo.jpg";
import { ScrollAnimatedItem } from "../../utils/pageAnimations";

const BrandStory = () => (
  <section className="py-14 md:py-24">
    <div className="mx-auto grid max-w-7xl items-center gap-10 px-6 md:grid-cols-2 md:gap-16">
      <ScrollAnimatedItem amount={0.15}>
        <div className="relative mx-auto max-w-sm md:max-w-none">
          <div className="absolute -inset-6 rounded-full bg-[var(--color-wood)]/10 blur-3xl" />
          <img
            src={ownerPhoto}
            alt="The face behind Gemerald"
            loading="lazy"
            className="relative aspect-[4/5] w-full rounded-[2rem] object-cover shadow-2xl shadow-black/50 md:max-h-[34rem]"
          />
        </div>
      </ScrollAnimatedItem>

      <ScrollAnimatedItem amount={0.2}>
        <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-[var(--color-wood)]">
          Our story
        </p>
        <h2 className="mt-3 font-serif text-3xl leading-tight md:text-5xl">
          Crafting scents
          <br />
          <span className="text-[var(--color-wood)]">with soul.</span>
        </h2>
        <p className="mt-5 max-w-md leading-relaxed text-white/65">
          Gemerald was born from a passion for turning moments into memories
          through scent. Every candle, diffuser and perfume is chosen and made
          with care, so your space feels like you.
        </p>
        <Link
          to="/about"
          className="group mt-7 inline-flex items-center gap-2 text-sm font-medium text-[var(--color-wood)] hover:text-[#e8c9a0]"
        >
          Read our story
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
        </Link>
      </ScrollAnimatedItem>
    </div>
  </section>
);

export default BrandStory;
