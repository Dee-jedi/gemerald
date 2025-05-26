import { useRef } from "react";
import { AnimatedPage, ScrollAnimatedItem } from "../utils/pageAnimations";
import ownerPhoto from "../assets/images/cover_photo.jpg";
import craftsmanshipPhoto from "../assets/images/product_9.jpg";
import { HiSparkles, HiGlobeAlt, HiHeart } from "react-icons/hi";

const AboutPage = () => {
  const missionRef = useRef(null);

  const scrollToMission = () => {
    missionRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <AnimatedPage className="bg-[var(--color-bg)] text-[var(--color-text)]">
      {/* Hero Section */}
      <section className="relative sm:pt-24 pt-10 pb-16 md:pt-32 md:pb-24 overflow-hidden">
        {/* Signature border */}
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[var(--color-soft-amber)] to-transparent opacity-10"></div>

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <ScrollAnimatedItem amount={0.1}>
                <span className="font-script text-3xl text-[var(--color-soft-amber)]">
                  Our Story
                </span>
              </ScrollAnimatedItem>

              <ScrollAnimatedItem amount={0.1} delay={0.1}>
                <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl">
                  Crafting Scents <br className="hidden md:block" />
                  <span className="text-[var(--color-wood)]">With Soul</span>
                </h1>
              </ScrollAnimatedItem>

              <ScrollAnimatedItem amount={0.2} delay={0.2}>
                <p className="text-lg text-[var(--color-text)]/80 max-w-lg leading-relaxed">
                  Gemerald was born from a passion for transforming moments into
                  memories through the power of scent. Each creation is a
                  testament to our dedication to craftsmanship and sensory
                  storytelling.
                </p>
              </ScrollAnimatedItem>
            </div>

            <ScrollAnimatedItem amount={0.1} delay={0.4}>
              <div className="relative group">
                <div className="relative before:absolute before:inset-0 before:bg-[var(--color-wood)] before:mix-blend-overlay before:opacity-5 before:rounded-2xl overflow-hidden">
                  <img
                    src={ownerPhoto}
                    alt="Gemerald Founder"
                    className="w-full sm:h-auto h-[300px] max-h-[70vh] object-cover rounded-2xl shadow-xl group-hover:shadow-[0_20px_50px_rgba(183,_93,_47,_0.2)] transition-all duration-500"
                    style={{ aspectRatio: "3/4" }}
                  />
                </div>
                <div className="absolute -bottom-4 -right-4 w-20 h-20 border-2 border-[var(--color-soft-amber)] opacity-30"></div>
                <div className="absolute -top-4 -left-4 w-16 h-16 border border-[var(--color-wood)] opacity-30"></div>
              </div>
            </ScrollAnimatedItem>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section
        ref={missionRef}
        className="pb-10 md:py-24 relative bg-[color-mix(in_srgb,var(--color-bg),black_10%)]"
      >
        <div className="max-w-4xl mx-auto px-6 text-center">
          <ScrollAnimatedItem amount={0.1}>
            <span className="font-script text-3xl text-[var(--color-soft-amber)]">
              Our Philosophy
            </span>
          </ScrollAnimatedItem>

          <ScrollAnimatedItem amount={0.1} delay={0.1}>
            <h2 className="font-serif text-3xl md:text-4xl mt-4 mb-8">
              Three Pillars of Excellence
            </h2>
          </ScrollAnimatedItem>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mt-12 w-full px-4">
            {[
              {
                icon: <HiSparkles className="w-10 h-10 mx-auto" />,
                title: "Artistry",
                desc: "Every scent is composed like a symphony, with top, middle, and base notes carefully balanced for unforgettable harmony.",
              },
              {
                icon: <HiGlobeAlt className="w-10 h-10 mx-auto" />,
                title: "Sustainability",
                desc: "We source ingredients responsibly, ensuring our luxury never comes at the expense of people or planet.",
              },
              {
                icon: <HiHeart className="w-10 h-10 mx-auto" />,
                title: "Emotion",
                desc: "Fragrances designed to evoke memories, create connections, and elevate everyday moments.",
              },
            ].map((item, index) => (
              <ScrollAnimatedItem
                key={index}
                amount={0.2}
                delay={0.2 + index * 0.1}
              >
                <div className="bg-[color-mix(in_srgb,var(--color-bg),transparent_10%)] border border-[var(--color-border)] p-8 rounded-xl h-full transition-all hover:border-[var(--color-soft-amber)]/30 hover:shadow-[0_10px_30px_rgba(183,93,47,0.05)] flex flex-col">
                  <div className="text-[var(--color-wood)] mb-6">
                    {item.icon}
                  </div>
                  <h3 className="font-serif text-2xl mb-4">{item.title}</h3>
                  <p className="text-[var(--color-text)]/80 md:text-lg leading-relaxed flex-grow">
                    {item.desc}
                  </p>
                </div>
              </ScrollAnimatedItem>
            ))}
          </div>
        </div>
      </section>

      {/* Signature Section */}
      <section className=" md:py-24 py-4 relative">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <ScrollAnimatedItem amount={0.1}>
              <div className="relative group">
                <div className="relative before:absolute before:inset-0 before:bg-[var(--color-wood)] before:mix-blend-overlay before:opacity-5 before:rounded-2xl overflow-hidden">
                  <img
                    src={craftsmanshipPhoto}
                    alt="Gemerald Craftsmanship"
                    className="w-full sm:h-auto h-[300px] max-h-[70vh] object-cover rounded-2xl shadow-xl group-hover:shadow-[0_20px_50px_rgba(183,_93,_47,_0.2)] transition-all duration-500"
                  />
                </div>
                <div className="absolute -bottom-4 -left-4 w-20 h-20 border-2 border-[var(--color-soft-amber)] opacity-30"></div>
              </div>
            </ScrollAnimatedItem>

            <div className="space-y-6 mt-4">
              <ScrollAnimatedItem amount={0.1}>
                <span className="font-script text-3xl text-[var(--color-soft-amber)] ">
                  The Gemerald Touch:
                </span>
              </ScrollAnimatedItem>

              <ScrollAnimatedItem amount={0.1} delay={0.1}>
                <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl">
                  Where Passion Meets Precision
                </h2>
              </ScrollAnimatedItem>

              <ScrollAnimatedItem amount={0.2} delay={0.2}>
                <p className="text-lg text-[var(--color-text)]/80 leading-relaxed">
                  Every Gemerald product bears the invisible signature of our
                  master perfumers. From the first sketch to the final quality
                  check, we infuse each step with obsessive attention to detail
                  and an unwavering commitment to excellence.
                </p>
              </ScrollAnimatedItem>
            </div>
          </div>
        </div>
      </section>
    </AnimatedPage>
  );
};

export default AboutPage;
