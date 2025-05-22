// src/pages/Home.jsx
import Button from "../components/ui/CustomButton";
import productImage from "../assets/images/product_9.jpg";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <main className="min-h-screen bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#0f0f0f] via-[#14100e] to-[#1a1411] text-[var(--color-text)] relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute inset-0 overflow-hidden opacity-20">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full bg-[var(--color-soft-amber)] mix-blend-overlay filter blur-3xl"></div>
        <div className="absolute bottom-1/3 right-1/4 w-80 h-80 rounded-full bg-[var(--color-wood)] mix-blend-overlay filter blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-24 md:py-32 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Text Content */}
          <div className="space-y-6 md:space-y-8">
            <div className="uppercase tracking-[0.2em] text-[var(--color-wood)] font-medium">
              Gemerald Essence
            </div>
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-light leading-tight">
              <span className="block font-serif italic text-[var(--color-text)]">
                The Art of
              </span>
              <span className="block font-medium md:mt-2 mt-1">
                Scented Luxury
              </span>
            </h1>
            <p className="text-lg text-gray-300 max-w-lg leading-relaxed">
              Immerse yourself in the exquisite world of Gemerald, where each
              fragrance tells a story of craftsmanship and timeless elegance.
              Our perfumes and candles are meticulously crafted to transform
              your everyday into an extraordinary sensory experience.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 pt-2">
              <Link to="/products">
                <Button size="lg" className="group px-6">
                  <span className="group-hover:translate-x-1 transition-transform duration-300">
                    Discover Collections
                  </span>
                </Button>
              </Link>
              <Link to="/about">
                <Button variant="outline" size="lg" className="px-6">
                  Our Craftsmanship
                </Button>
              </Link>
            </div>
          </div>

          {/* Product Image */}
          <div className="relative">
            <div className="relative before:absolute before:inset-0 before:bg-[var(--color-wood)] before:mix-blend-overlay before:opacity-5 before:rounded-xl">
              <img
                src={productImage}
                alt="Gemerald Signature Fragrance"
                className="w-full md:max-w-md max-w-[320px] mx-auto object-contain rounded-xl shadow-2xl hover:shadow-[0_20px_50px_rgba(183,_93,_47,_0.3)] transition-all duration-500"
                loading="eager"
              />
            </div>
            <div className="absolute -bottom-4 -right-4 w-24 h-24 border-2 border-[var(--color-soft-amber)] opacity-30"></div>
            <div className="absolute -top-4 -left-4 w-20 h-20 border border-[var(--color-wood)] opacity-30"></div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Home;
