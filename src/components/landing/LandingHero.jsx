import { useRef } from "react";
import Button from "../ui/CustomButton";
import productImage from "../../assets/images/product_9.jpg";
import { useNavigate } from "react-router-dom";
import { AnimatedPage, ScrollAnimatedItem } from "../../utils/pageAnimations";

export const LandingHero = ({ onExplore }) => {
  const heroRef = useRef(null);
  const navigate = useNavigate();

  const handleExploreClick = (e) => {
    e.preventDefault();

    // Scroll effect if onExplore is provided
    if (onExplore && heroRef.current) {
      window.scrollTo({
        top: heroRef.current.offsetHeight,
        behavior: "smooth",
      });
      setTimeout(() => onExplore(), 1000);
    }

    // Always navigate to products
    navigate("/products");
  };

  return (
    <AnimatedPage
      ref={heroRef}
      className="min-h-screen text-[var(--color-text)] relative overflow-hidden"
      style={{
        background: `
          radial-gradient(
            ellipse at top,
            var(--tw-gradient-from),
            var(--tw-gradient-via),
            var(--tw-gradient-to)
          ) fixed
        `,
        backgroundSize: "100% 100%",
        "--tw-gradient-from": "#0f0f0f",
        "--tw-gradient-via": "#14100e",
        "--tw-gradient-to": "#1a1411",
      }}
    >
      {/* Stable decorative elements */}
      <div className="absolute inset-0 overflow-hidden opacity-20">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full bg-[var(--color-soft-amber)] mix-blend-overlay filter blur-3xl" />
        <div className="absolute bottom-1/3 right-1/4 w-80 h-80 rounded-full bg-[var(--color-wood)] mix-blend-overlay filter blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-6 pt-12 md:py-24 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 sm:gap-16 items-center">
          {/* Text Content */}
          <div className="space-y-3 md:space-y-8">
            <ScrollAnimatedItem
              amount={0.1}
              variants={{
                offscreen: { y: 40, opacity: 0 },
                onscreen: {
                  y: 0,
                  opacity: 1,
                  transition: {
                    type: "spring",
                    stiffness: 100,
                    damping: 15,
                    delay: 0.1,
                  },
                },
              }}
            >
              <div className="uppercase tracking-[0.2em] text-[var(--color-wood)] font-script">
                <p>Gemerald Essence</p>
              </div>
            </ScrollAnimatedItem>

            <ScrollAnimatedItem
              amount={0.1}
              variants={{
                offscreen: { y: 60, opacity: 0 },
                onscreen: {
                  y: 0,
                  opacity: 1,
                  transition: {
                    type: "spring",
                    stiffness: 90,
                    damping: 15,
                    delay: 0.2,
                  },
                },
              }}
            >
              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-light leading-tight">
                <span className="block font-italic text-[var(--color-text)]">
                  The Art of
                </span>
                <span className="block font-serif font-medium md:mt-2">
                  Scented Luxury
                </span>
              </h1>
            </ScrollAnimatedItem>

            <ScrollAnimatedItem
              amount={0.2}
              variants={{
                offscreen: { y: 40, opacity: 0 },
                onscreen: {
                  y: 0,
                  opacity: 1,
                  transition: {
                    type: "spring",
                    stiffness: 80,
                    damping: 15,
                    delay: 0.3,
                  },
                },
              }}
            >
              <p className="text-lg text-gray-300 max-w-lg leading-relaxed">
                Immerse yourself in the exquisite world of Gemerald, where each
                fragrance tells a story of craftsmanship and timeless elegance.
                Our perfumes and candles are meticulously crafted to transform
                your everyday into an extraordinary sensory experience.
              </p>
            </ScrollAnimatedItem>

            <ScrollAnimatedItem
              amount={0.2}
              variants={{
                offscreen: { y: 50, opacity: 0 },
                onscreen: {
                  y: 0,
                  opacity: 1,
                  transition: {
                    type: "spring",
                    stiffness: 70,
                    damping: 15,
                    delay: 0.4,
                  },
                },
              }}
            >
              <div className="flex flex-col sm:flex-row gap-4 pt-2">
                {/* Use inline-block to maintain button width while fixing navigation */}
                <div className="inline-block">
                  <Button
                    size="lg"
                    className="px-6"
                    onClick={handleExploreClick}
                  >
                    <span className="md:py-1 py-[1px]">
                      Discover Collections
                    </span>
                  </Button>
                </div>
              </div>
            </ScrollAnimatedItem>
          </div>

          {/* Product Image */}
          <ScrollAnimatedItem
            amount={0.15}
            variants={{
              offscreen: { y: 100, opacity: 0, scale: 0.96 },
              onscreen: {
                y: 0,
                opacity: 1,
                scale: 1,
                transition: {
                  type: "spring",
                  stiffness: 60,
                  damping: 15,
                  delay: 0.5,
                },
              },
            }}
          >
            <div className="relative">
              <div className="relative before:absolute before:inset-0 before:bg-[var(--color-wood)] before:mix-blend-overlay before:opacity-5 before:rounded-xl">
                <img
                  src={productImage}
                  alt="Gemerald Signature Fragrance"
                  className="w-full max-w-[280px] md:max-w-md h-auto max-h-[50vh] md:max-h-none mx-auto object-cover md:object-contain rounded-xl shadow-2xl hover:shadow-[0_20px_50px_rgba(183,_93,_47,_0.3)] transition-all duration-500"
                  loading="eager"
                  style={{ aspectRatio: "3/4" }}
                />
              </div>
              <div className="absolute -bottom-4 -right-4 md:w-24 md:h-24 w-16 h-16 border-2 border-[var(--color-soft-amber)] opacity-30"></div>
              <div className="absolute -top-4 -left-4 w-14 h-14 md:w-20 md:h-20 border border-[var(--color-wood)] opacity-30"></div>
            </div>
          </ScrollAnimatedItem>
        </div>
      </div>
    </AnimatedPage>
  );
};
