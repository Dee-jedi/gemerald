import { Link } from "react-router-dom";
import { HiArrowSmLeft, HiHome } from "react-icons/hi";

const NotFound = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[var(--color-bg)] text-[var(--color-text)] p-6 text-center">
      {/* Subtle background texture */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI2MDAiIGhlaWdodD0iNjAwIiBvcGFjaXR5PSIwLjAyIj48cGF0dGVybiBpZD0icGF0dGVybiIgd2lkdGg9IjEwIiBoZWlnaHQ9IjEwIiBwYXR0ZXJuVW5pdHM9InVzZXJTcGFjZU9uVXNlIiBwYXR0ZXJuVHJhbnNmb3JtPSJyb3RhdGUoNDUpIj48cmVjdCB3aWR0aD0iMSIgaGVpZ2h0PSIxIiBmaWxsPSJ3aGl0ZSIvPjwvcGF0dGVybj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI3BhdHRlcm4pIi8+PC9zdmc+')] opacity-5 pointer-events-none"></div>

      {/* Main content */}
      <div className="relative z-10 max-w-2xl">
        {/* 404 number - toned down */}
        <h1 className="text-[8rem] md:text-[12rem] font-serif font-bold text-[var(--color-wood)]/50 leading-none mb-2">
          404
        </h1>

        {/* Title - softer */}
        <h2 className="text-2xl md:text-3xl font-serif mb-4 text-[var(--color-text)]/90">
          Scent Trail Gone Cold
        </h2>

        {/* Description - muted */}
        <p className="text-base md:text-lg text-[var(--color-text)]/70 mb-8 max-w-lg mx-auto font-light">
          The fragrance you're seeking has evaporated into the ether. Perhaps
          our collection can help you discover something new.
        </p>

        {/* Action buttons - more subtle */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            to="/"
            className="flex items-center justify-center gap-2 px-5 py-2.5 bg-transparent border border-[var(--color-wood)]/30 hover:border-[var(--color-wood)]/70 text-[var(--color-wood)]/80 hover:text-[var(--color-wood)] rounded-lg transition-all duration-500"
          >
            <HiHome className="w-4 h-4" />
            Return Home
          </Link>
          <Link
            to="/products"
            className="flex items-center justify-center gap-2 px-5 py-2.5 bg-[var(--color-wood)]/10 hover:bg-[var(--color-wood)]/20 border border-transparent text-[var(--color-wood)]/80 hover:text-[var(--color-wood)] rounded-lg transition-all duration-500"
          >
            <HiArrowSmLeft className="w-4 h-4" />
            Explore Collections
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
