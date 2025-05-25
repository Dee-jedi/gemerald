import { useState, useEffect } from "react";
import { Quote, Star, ChevronLeft, ChevronRight } from "lucide-react";

const testimonials = [
  {
    id: 1,
    quote:
      "The Midnight Rose perfume is intoxicating. I've never received so many compliments.",
    author: "Adetola.",
    role: "Fashion Editor",
    rating: 5,
    product: "Midnight Rose Perfume",
  },
  {
    id: 2,
    quote:
      "Our entire apartment smells like a Tuscan villa. The Vanilla Oak candle is divine.",
    author: "Kolawole T.",
    role: "Interior Designer",
    rating: 5,
    product: "Vanilla Oak Candle",
  },
  {
    id: 3,
    quote:
      "The gift set elevated my anniversary. My wife said it was the most thoughtful present.",
    author: "Dee Etinwa.",
    role: "Art Curator",
    rating: 4,
    product: "Signature Gift Set",
  },
];

const Testimonials = () => {
  const [current, setCurrent] = useState(0);

  const next = () =>
    setCurrent((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1));
  const prev = () =>
    setCurrent((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));

  useEffect(() => {
    const interval = setInterval(next, 8000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="py-14 md:py-24 relative overflow-hidden">
      {/* New border styling */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[var(--color-soft-amber)] to-transparent opacity-10"></div>

      {/* Decorative elements */}
      <div className="absolute inset-0 opacity-5 pointer-events-none">
        <div className="absolute top-20 left-10 w-32 h-32 rounded-full bg-[var(--color-soft-amber)] blur-xl"></div>
        <div className="absolute bottom-10 right-10 w-40 h-40 rounded-full bg-[var(--color-wood)] blur-xl"></div>
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center sm:mb-6 ">
          <span className="font-script text-3xl text-[var(--color-soft-amber)]">
            Testimonials
          </span>
          <h2 className="font-serif text-3xl md:text-4xl mt-2 text-[var(--color-text)]">
            Voices of Elegance
          </h2>
        </div>

        <div className="relative h-[400px] md:h-[350px]">
          {/* Testimonial Cards */}
          {testimonials.map((testimonial, index) => (
            <div
              key={testimonial.id}
              className={`absolute inset-0 transition-opacity duration-500 flex items-center ${
                index === current
                  ? "opacity-100"
                  : "opacity-0 pointer-events-none"
              }`}
            >
              <div className="bg-[color-mix(in_srgb,var(--color-card),transparent_20%)] backdrop-blur-sm border border-[var(--color-border)] p-8 md:p-10 rounded-xl max-w-4xl mx-auto w-full shadow-lg">
                <Quote className="w-8 h-8 text-[var(--color-soft-amber)] opacity-30 mb-4" />

                <p className="font-italic text-lg md:text-xl leading-relaxed text-[var(--color-text)] mb-6">
                  "{testimonial.quote}"
                </p>

                <div className="flex items-center justify-between">
                  {/* Left side - desktop: name + role | mobile: stacked name + stars */}
                  <div className="flex flex-col md:flex-row md:items-center md:gap-4">
                    <p className="font-serif text-[var(--color-soft-amber)]">
                      {testimonial.author}
                    </p>

                    {/* Role (hidden on mobile) */}
                    <p className="hidden md:block text-sm text-[var(--color-text)] opacity-70">
                      {testimonial.role}
                    </p>

                    {/* Stars (mobile only) */}
                    <div className="flex md:hidden items-center gap-1 mt-1">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-3 h-3 ${
                            i < testimonial.rating
                              ? "text-[var(--color-wood)] fill-[var(--color-wood)]"
                              : "text-[var(--color-border)]"
                          }`}
                        />
                      ))}
                    </div>
                  </div>

                  {/* Right side - stars (desktop) + product name (both) */}
                  <div className="flex items-center gap-2">
                    {/* Stars (desktop only) */}
                    <div className="hidden md:flex">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-4 h-4 ${
                            i < testimonial.rating
                              ? "text-[var(--color-wood)] fill-[var(--color-wood)]"
                              : "text-[var(--color-border)]"
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-xs text-[var(--color-wood)]">
                      {testimonial.product}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}

          {/* Navigation Arrows */}
          <button
            onClick={prev}
            className="absolute left-0 top-1/2 -translate-y-1/2 p-2 rounded-full bg-[color-mix(in_srgb,var(--color-card),black_40%)] border border-[var(--color-border)] hover:bg-[var(--color-soft-amber)] hover:text-[var(--color-bg)] transition-colors z-20"
            aria-label="Previous testimonial"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          <button
            onClick={next}
            className="absolute right-0 top-1/2 -translate-y-1/2 p-2 rounded-full bg-[color-mix(in_srgb,var(--color-card),black_40%)] border border-[var(--color-border)] hover:bg-[var(--color-soft-amber)] hover:text-[var(--color-bg)] transition-colors z-20"
            aria-label="Next testimonial"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          {/* Indicators */}
          <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrent(index)}
                className={`w-2 h-2 rounded-full transition-all ${
                  index === current
                    ? "bg-[var(--color-soft-amber)] w-6"
                    : "bg-[var(--color-border)]"
                }`}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
