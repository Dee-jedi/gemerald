import { RefreshCw, WifiOff } from "lucide-react";

// Friendly fallback shown when data fails to load (usually a network issue).
const LoadError = ({ message = "Something went wrong.", onRetry }) => (
  <div className="flex flex-col items-center gap-4 px-6 py-12 text-center">
    <div className="flex h-14 w-14 items-center justify-center rounded-full bg-white/5">
      <WifiOff className="h-6 w-6 text-[var(--color-wood)]" />
    </div>
    <div>
      <h3 className="font-serif text-xl text-[var(--color-text)]">{message}</h3>
      <p className="mt-1 text-sm text-white/50">
        Check your connection and try again.
      </p>
    </div>
    {onRetry && (
      <button
        onClick={onRetry}
        className="inline-flex items-center gap-2 rounded-full border border-[var(--color-wood)]/40 px-5 py-2 text-sm text-[var(--color-wood)] hover:bg-[rgba(222,184,135,0.1)] transition-colors cursor-pointer"
      >
        <RefreshCw className="h-4 w-4" />
        Try again
      </button>
    )}
  </div>
);

export default LoadError;
