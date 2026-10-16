import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Gift } from "lucide-react";
import { getAllProducts } from "../../services/products";
import { formatPrice, parsePrice } from "../../lib/utils";
import { ScrollAnimatedItem } from "../../utils/pageAnimations";

// Spotlights one gift set: a featured one if there is one, otherwise the
// most premium. Hidden if there are no gift sets.
const pickGiftSet = (products) => {
  const giftSets = products.filter((p) => p.category === "Gift Set");
  return (
    giftSets.find((p) => p.featured) ??
    [...giftSets].sort((a, b) => parsePrice(b.price) - parsePrice(a.price))[0]
  );
};

const GiftSpotlight = () => {
  const [product, setProduct] = useState(undefined);

  useEffect(() => {
    let cancelled = false;
    getAllProducts()
      .then((products) => !cancelled && setProduct(pickGiftSet(products) ?? null))
      .catch(() => !cancelled && setProduct(null));
    return () => {
      cancelled = true;
    };
  }, []);

  if (product === null) return null;

  return (
    <section className="py-6 md:py-12">
      <div className="mx-auto max-w-7xl px-6">
        <ScrollAnimatedItem amount={0.15}>
          <div className="relative overflow-hidden rounded-[2rem] border border-white/[0.06] bg-[#16110e]">
            <div className="absolute -left-20 -top-20 h-72 w-72 rounded-full bg-[var(--color-soft-amber)]/15 blur-3xl" />

            <div className="relative grid md:grid-cols-2">
              {/* Photo */}
              <div className="relative aspect-[4/3] md:order-2 md:aspect-auto md:min-h-[28rem]">
                {product ? (
                  <img
                    src={product.image}
                    alt={product.name}
                    loading="lazy"
                    className="absolute inset-0 h-full w-full object-cover"
                  />
                ) : (
                  <div className="absolute inset-0 animate-pulse bg-white/5" />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-[#16110e] via-transparent to-transparent md:bg-gradient-to-r" />
              </div>

              {/* Copy */}
              <div className="relative flex flex-col justify-center px-6 pb-8 pt-2 md:p-14">
                <p className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.3em] text-[var(--color-wood)]">
                  <Gift className="h-3.5 w-3.5" />
                  Gifting
                </p>
                <h2 className="mt-3 font-serif text-3xl leading-tight md:text-5xl">
                  The perfect gift,
                  <br />
                  ready to give.
                </h2>
                <p className="mt-4 max-w-md text-[15px] leading-relaxed text-white/65 md:text-base">
                  Candle and diffuser sets, beautifully presented for birthdays,
                  anniversaries and just-because moments.
                </p>

                <div className="mt-7 flex flex-col gap-4 sm:flex-row sm:items-center">
                  <Link
                    to="/products?category=gift%20set"
                    className="group inline-flex w-fit items-center gap-3 rounded-full bg-[var(--color-wood)] py-3 pl-6 pr-4 text-sm font-semibold text-[#1a1411] transition-colors hover:bg-[#e8c9a0]"
                  >
                    Shop gift sets
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                  </Link>
                  {product && (
                    <Link
                      to={`/products/${product.id}`}
                      className="text-sm text-white/60 underline-offset-4 hover:text-[var(--color-wood)] hover:underline"
                    >
                      {product.name} · {formatPrice(product.price)}
                    </Link>
                  )}
                </div>
              </div>
            </div>
          </div>
        </ScrollAnimatedItem>
      </div>
    </section>
  );
};

export default GiftSpotlight;
