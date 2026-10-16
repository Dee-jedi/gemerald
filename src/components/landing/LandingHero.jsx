import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import heroImage from "../../assets/images/product_9.jpg";

const CATEGORIES = [
  { label: "Candles", value: "candle" },
  { label: "Diffusers", value: "diffuser" },
  { label: "Gift Sets", value: "gift set" },
  { label: "Perfumes", value: "perfume" },
];

const fadeUp = (delay) => ({
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1], delay },
});

export const LandingHero = () => {
  const sectionRef = useRef(null);
  const [hasScrolled, setHasScrolled] = useState(false);

  // Fade the scroll cue out once the visitor starts scrolling.
  useEffect(() => {
    const onScroll = () => setHasScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollPastHero = () => {
    const bottom = sectionRef.current?.getBoundingClientRect().bottom ?? 0;
    window.scrollTo({ top: window.scrollY + bottom, behavior: "smooth" });
  };

  return (
    // On mobile the hero is exactly one screen and slides up under the
    // transparent header (4.5rem). The photo is a soft, darkened backdrop and
    // the copy sits in the vertical centre of the screen on top of it.
    <section
      ref={sectionRef}
      className="relative -mt-[4.5rem] flex h-[100svh] min-h-[36rem] flex-col justify-center overflow-hidden bg-[var(--color-bg)] text-[var(--color-text)] md:mt-0 md:block md:h-auto md:min-h-0"
    >
      {/* Mobile: full-bleed blurred photo behind the copy */}
      <div className="absolute inset-0 md:hidden" aria-hidden="true">
        <motion.img
          src={heroImage}
          alt=""
          fetchPriority="high"
          initial={{ scale: 1.15 }}
          animate={{ scale: 1.05 }}
          transition={{ duration: 1.6, ease: "easeOut" }}
          // Slight blur turns the photo into atmosphere; the scale hides the
          // soft edges blur leaves at the borders.
          className="absolute inset-0 h-full w-full object-cover object-[50%_70%] blur-[2px]"
        />
        <div className="absolute inset-0 bg-black/35" />
        {/* Fade into the page at the bottom; darker at the top for the header */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-transparent via-30% to-[var(--color-bg)]" />
      </div>

      <div className="relative mx-auto grid w-full max-w-7xl items-end gap-12 px-6 md:grid-cols-[1.1fr_1fr] md:items-center md:py-20 lg:py-24">
        {/* Copy */}
        {/* pt offsets the header so the copy centres in the visible area */}
        <div className="flex flex-col items-center pt-[4.5rem] text-center md:items-start md:pt-0 md:text-left">
          <motion.p
            {...fadeUp(0.1)}
            className="text-[11px] font-semibold uppercase tracking-[0.3em] text-[var(--color-wood)]"
          >
            Candles · Diffusers · Perfumes
          </motion.p>

          <motion.h1
            {...fadeUp(0.2)}
            className="mt-3 font-serif text-[2.5rem] leading-[1.05] tracking-tight sm:text-6xl lg:text-7xl"
          >
            Scented luxury,
            <br />
            <span className="text-[var(--color-wood)]">made to linger.</span>
          </motion.h1>

          <motion.p
            {...fadeUp(0.3)}
            className="mx-auto mt-4 max-w-xs text-[15px] leading-relaxed sm:max-w-md md:mx-0 text-white/70 md:text-lg"
          >
            Handcrafted candles, diffusers and perfumes for every mood and every
            room.
          </motion.p>

          <motion.div {...fadeUp(0.4)} className="mt-7">
            <Link
              to="/products"
              className="group inline-flex items-center gap-3 rounded-full bg-[var(--color-wood)] py-3.5 pl-7 pr-5 text-sm font-semibold text-[#1a1411] shadow-lg shadow-black/40 transition-colors hover:bg-[#e8c9a0]"
            >
              Shop the collection
              <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#1a1411]/10 transition-transform group-hover:translate-x-0.5">
                <ArrowRight className="h-4 w-4" />
              </span>
            </Link>
          </motion.div>

          <motion.nav
            {...fadeUp(0.5)}
            aria-label="Shop by category"
            className="-mx-6 mt-6 w-[calc(100%+3rem)] overflow-x-auto no-scrollbar px-6 md:mx-0 md:w-auto md:px-0"
          >
            {/* w-max + mx-auto centres the row, yet still scrolls from the
                left edge when it's wider than the screen */}
            <div className="mx-auto flex w-max gap-1.5 md:mx-0 md:flex-wrap md:gap-2">
            {CATEGORIES.map((cat) => (
              <Link
                key={cat.value}
                to={`/products?category=${encodeURIComponent(cat.value)}`}
                className="shrink-0 whitespace-nowrap rounded-full border border-white/15 bg-white/[0.03] px-3 py-2 text-xs md:px-4 font-medium text-white/80 transition-colors hover:border-[var(--color-wood)]/50 hover:text-[var(--color-wood)]"
              >
                {cat.label}
              </Link>
            ))}
            </div>
          </motion.nav>
        </div>

        {/* Desktop: photo panel */}
        <motion.div
          initial={{ opacity: 0, scale: 0.97 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
          className="relative hidden md:block"
        >
          <div className="absolute -inset-10 rounded-full bg-[var(--color-soft-amber)]/10 blur-3xl" />
          <div className="relative ml-auto aspect-[4/5] max-h-[78vh] overflow-hidden rounded-[2rem] border border-white/[0.06] shadow-2xl shadow-black/60">
            <img
              src={heroImage}
              alt="Gemerald sculpted candle styled with fragrance"
              fetchPriority="high"
              className="h-full w-full object-cover object-[50%_60%]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
          </div>
        </motion.div>
      </div>

      <ScrollCue onClick={scrollPastHero} hidden={hasScrolled} />
    </section>
  );
};

// Mouse-outline scroll hint at the bottom of the mobile hero.
const ScrollCue = ({ onClick, hidden }) => {
  const reduceMotion = useReducedMotion();

  return (
    <motion.button
      type="button"
      onClick={onClick}
      aria-label="Scroll to see more"
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: hidden ? 0 : 1, y: 0 }}
      transition={{ duration: 0.6, delay: hidden ? 0 : 1.1 }}
      className={`absolute bottom-[calc(1.75rem+env(safe-area-inset-bottom))] left-1/2 flex -translate-x-1/2 flex-col items-center gap-2 cursor-pointer md:hidden [-webkit-tap-highlight-color:transparent] ${
        hidden ? "pointer-events-none" : ""
      }`}
    >
      <span className="relative flex h-9 w-[22px] justify-center rounded-full border border-white/30">
        <motion.span
          className="mt-1.5 h-1.5 w-1 rounded-full bg-[var(--color-wood)]"
          animate={reduceMotion ? undefined : { y: [0, 12, 12], opacity: [1, 0, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut", times: [0, 0.7, 1] }}
        />
      </span>
      {/* pl matches the tracking's trailing space so the word centres */}
      <span className="pl-[0.3em] text-[10px] font-medium uppercase tracking-[0.3em] text-white/45">
        Scroll
      </span>
    </motion.button>
  );
};
