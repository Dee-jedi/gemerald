import { Link } from "react-router-dom";
import { ShoppingBag, Sparkles } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";
import { ScrollAnimatedItem } from "../../utils/pageAnimations";
import SectionHeading from "./SectionHeading";

const STEPS = [
  {
    icon: ShoppingBag,
    title: "Pick your favourites",
    text: "Browse the collection and add what you love to your cart.",
  },
  {
    icon: Sparkles,
    title: "Choose your scent",
    text: "Most pieces come in several scents. Pick the one that suits your space.",
  },
  {
    icon: FaWhatsapp,
    title: "Order on WhatsApp",
    text: "Check out and your order opens in WhatsApp, where we confirm the details with you.",
  },
];

const HowToOrder = () => (
  <section className="py-14 md:py-24">
    <div className="mx-auto max-w-7xl px-6">
      <SectionHeading eyebrow="Simple ordering" title="How to order" />

      <div className="relative mt-10 grid gap-4 md:mt-14 md:grid-cols-3 md:gap-6">
        {STEPS.map(({ icon: Icon, title, text }, index) => (
          <ScrollAnimatedItem
            key={title}
            amount={0.2}
            variants={{
              offscreen: { y: 30, opacity: 0 },
              onscreen: {
                y: 0,
                opacity: 1,
                transition: { delay: index * 0.1 },
              },
            }}
          >
            <div className="relative flex h-full gap-4 rounded-2xl border border-white/[0.06] bg-[var(--color-card)] p-5 md:flex-col md:gap-6 md:p-7">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[rgba(222,184,135,0.1)] text-[var(--color-wood)]">
                <Icon className="h-5 w-5" />
              </div>
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-white/35">
                  Step {index + 1}
                </p>
                <h3 className="mt-1 font-serif text-xl">{title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-white/60">
                  {text}
                </p>
              </div>
            </div>
          </ScrollAnimatedItem>
        ))}
      </div>

      <div className="mt-8 text-center">
        <Link
          to="/products"
          className="inline-flex items-center gap-2 rounded-full border border-[var(--color-wood)]/40 px-6 py-3 text-sm font-medium text-[var(--color-wood)] transition-colors hover:bg-[rgba(222,184,135,0.1)]"
        >
          Start shopping
        </Link>
      </div>
    </div>
  </section>
);

export default HowToOrder;
