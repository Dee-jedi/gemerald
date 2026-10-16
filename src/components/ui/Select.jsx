import { useEffect, useId, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Check, ChevronDown } from "lucide-react";

const triggerStyles = {
  // Compact rounded pill, e.g. the sort control on the Products page.
  pill: (open) =>
    `rounded-full py-2 pl-3.5 pr-3 text-sm ${
      open
        ? "border-[var(--color-wood)]/40 bg-[rgba(222,184,135,0.08)] text-[var(--color-text)]"
        : "border-white/10 bg-white/[0.03] text-[var(--color-text)]/80 hover:border-white/20 hover:text-[var(--color-text)]"
    }`,
  // Full-width form field, matching the admin form inputs.
  field: (open) =>
    `w-full rounded-xl px-4 py-3 text-[var(--color-text)] bg-[color-mix(in_srgb,var(--color-card),black_38%)] ${
      open
        ? "border-transparent ring-1 ring-[var(--color-wood)]"
        : "border-white/10 hover:border-white/20"
    }`,
};

// Custom listbox dropdown: click or keyboard (arrows, Home/End, Enter, Escape).
// `options` is a list of { value, label }.
const Select = ({
  options,
  value,
  onChange,
  label,
  variant = "field",
  icon = null,
  menuHeading = null,
  align = "left",
}) => {
  const [open, setOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const rootRef = useRef(null);
  const buttonRef = useRef(null);
  const optionRefs = useRef([]);
  const listId = useId();

  const selected = options.find((o) => o.value === value) ?? options[0];

  useEffect(() => {
    if (!open) return;
    const onPointerDown = (e) => {
      if (!rootRef.current?.contains(e.target)) setOpen(false);
    };
    document.addEventListener("pointerdown", onPointerDown);
    return () => document.removeEventListener("pointerdown", onPointerDown);
  }, [open]);

  useEffect(() => {
    if (open) optionRefs.current[activeIndex]?.focus();
  }, [open, activeIndex]);

  const openMenu = () => {
    setActiveIndex(Math.max(0, options.indexOf(selected)));
    setOpen(true);
  };

  const close = () => {
    setOpen(false);
    buttonRef.current?.focus();
  };

  const choose = (option) => {
    onChange(option.value);
    close();
  };

  const onListKeyDown = (e) => {
    const keys = {
      ArrowDown: () => setActiveIndex((i) => (i + 1) % options.length),
      ArrowUp: () =>
        setActiveIndex((i) => (i - 1 + options.length) % options.length),
      Home: () => setActiveIndex(0),
      End: () => setActiveIndex(options.length - 1),
      Escape: close,
    };
    if (keys[e.key]) {
      e.preventDefault();
      keys[e.key]();
    } else if (e.key === "Tab") {
      setOpen(false);
    }
  };

  return (
    <div ref={rootRef} className={`relative ${variant === "field" ? "w-full" : ""}`}>
      <button
        ref={buttonRef}
        type="button"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={listId}
        aria-label={label ? `${label}: ${selected.label}` : undefined}
        onClick={() => (open ? setOpen(false) : openMenu())}
        onKeyDown={(e) => {
          if (e.key === "ArrowDown" || e.key === "ArrowUp") {
            e.preventDefault();
            openMenu();
          }
        }}
        className={`flex items-center gap-2 border text-left transition-colors cursor-pointer focus:outline-none focus-visible:ring-1 focus-visible:ring-[var(--color-wood)] ${triggerStyles[variant](open)}`}
      >
        {icon}
        <span className={`whitespace-nowrap ${variant === "field" ? "flex-1 truncate" : ""}`}>
          {selected.label}
        </span>
        <ChevronDown
          className={`h-4 w-4 shrink-0 transition-transform duration-200 ${
            open ? "rotate-180 text-[var(--color-wood)]" : "text-white/40"
          }`}
        />
      </button>

      <AnimatePresence>
        {open && (
          <motion.ul
            id={listId}
            role="listbox"
            aria-label={label}
            onKeyDown={onListKeyDown}
            initial={{ opacity: 0, y: -6, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -6, scale: 0.97 }}
            transition={{ duration: 0.14, ease: "easeOut" }}
            style={{ transformOrigin: align === "right" ? "top right" : "top left" }}
            className={`absolute top-[calc(100%+0.5rem)] z-30 overflow-hidden rounded-2xl border border-white/10 bg-[#171717]/95 p-1.5 shadow-2xl shadow-black/60 backdrop-blur-xl ${
              align === "right" ? "right-0" : "left-0"
            } ${variant === "field" ? "w-full" : "w-56"}`}
          >
            {menuHeading && (
              <li
                role="presentation"
                className="px-3 pb-1.5 pt-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-white/35"
              >
                {menuHeading}
              </li>
            )}
            {options.map((option, index) => {
              const isSelected = option.value === selected.value;
              return (
                <li
                  key={option.value}
                  ref={(el) => (optionRefs.current[index] = el)}
                  role="option"
                  aria-selected={isSelected}
                  tabIndex={index === activeIndex ? 0 : -1}
                  onClick={() => choose(option)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      choose(option);
                    }
                  }}
                  onMouseEnter={() => setActiveIndex(index)}
                  className={`flex cursor-pointer items-center justify-between gap-3 rounded-xl px-3 py-2.5 text-sm outline-none transition-colors ${
                    isSelected
                      ? "text-[var(--color-wood)]"
                      : "text-[var(--color-text)]/80"
                  } ${index === activeIndex ? "bg-white/[0.06]" : ""}`}
                >
                  {option.label}
                  {isSelected && <Check className="h-4 w-4 shrink-0" />}
                </li>
              );
            })}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Select;
