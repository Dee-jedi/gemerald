import Button from "../components/ui/CustomButton";
import productImage from "../assets/images/product_9.jpg";
import { Link } from "react-router-dom";
import { AnimatedPage, ScrollAnimatedItem } from "../utils/pageAnimations";

const Home = () => {
  return (
    <AnimatedPage className="min-h-screen bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#0f0f0f] via-[#14100e] to-[#1a1411] text-[var(--color-text)] relative overflow-hidden">
      {/* Decorative elements with scroll-triggered animations */}
      <div className="absolute inset-0 overflow-hidden opacity-20">
        <ScrollAnimatedItem amount={0.1}>
          <div className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full bg-[var(--color-soft-amber)] mix-blend-overlay filter blur-3xl" />
        </ScrollAnimatedItem>
        <ScrollAnimatedItem amount={0.1} custom={0.2}>
          <div className="absolute bottom-1/3 right-1/4 w-80 h-80 rounded-full bg-[var(--color-wood)] mix-blend-overlay filter blur-3xl" />
        </ScrollAnimatedItem>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-14 md:py-24 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Text Content */}
          <div className="space-y-6 md:space-y-8">
            <ScrollAnimatedItem
              amount={0.2}
              variants={{
                offscreen: { y: 30, opacity: 0 },
                onscreen: {
                  y: 0,
                  opacity: 1,
                  transition: { delay: 0.1 },
                },
              }}
            >
              <div className="uppercase tracking-[0.2em] text-[var(--color-wood)] font-script">
                Gemerald Essence
              </div>
            </ScrollAnimatedItem>

            <ScrollAnimatedItem
              amount={0.2}
              variants={{
                offscreen: { y: 40, opacity: 0 },
                onscreen: {
                  y: 0,
                  opacity: 1,
                  transition: { delay: 0.2 },
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
              amount={0.3}
              variants={{
                offscreen: { y: 20, opacity: 0 },
                onscreen: {
                  y: 0,
                  opacity: 1,
                  transition: { delay: 0.3 },
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
              amount={0.3}
              variants={{
                offscreen: { y: 30, opacity: 0 },
                onscreen: {
                  y: 0,
                  opacity: 1,
                  transition: { delay: 0.4 },
                },
              }}
            >
              <div className="flex flex-col sm:flex-row gap-4 pt-2">
                <Link to="/products">
                  <Button size="lg" className="px-6">
                    <span className="py-1">Discover Collections</span>
                  </Button>
                </Link>
              </div>
            </ScrollAnimatedItem>
          </div>

          {/* Product Image with enhanced scroll animation */}
          <ScrollAnimatedItem
            amount={0.25}
            className="relative"
            variants={{
              offscreen: { y: 80, opacity: 0, scale: 0.95 },
              onscreen: {
                y: 0,
                opacity: 1,
                scale: 1,
                transition: {
                  type: "spring",
                  stiffness: 60,
                  delay: 0.5,
                },
              },
            }}
          >
            <div className="relative before:absolute before:inset-0 before:bg-[var(--color-wood)] before:mix-blend-overlay before:opacity-5 before:rounded-xl">
              <img
                src={productImage}
                alt="Gemerald Signature Fragrance"
                className="w-full md:max-w-md max-w-[320px] mx-auto object-contain rounded-xl shadow-2xl hover:shadow-[0_20px_50px_rgba(183,_93,_47,_0.3)] transition-all duration-500"
                loading="eager"
              />
            </div>
            <ScrollAnimatedItem amount={0.1} custom={0.1}>
              <div className="absolute -bottom-4 -right-4 w-24 h-24 border-2 border-[var(--color-soft-amber)] opacity-30"></div>
            </ScrollAnimatedItem>
            <ScrollAnimatedItem amount={0.1} custom={0.2}>
              <div className="absolute -top-4 -left-4 w-20 h-20 border border-[var(--color-wood)] opacity-30"></div>
            </ScrollAnimatedItem>
          </ScrollAnimatedItem>
        </div>
      </div>
    </AnimatedPage>
  );
};

export default Home;
