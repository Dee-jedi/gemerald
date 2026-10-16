// src/lib/utils.js

/**
 * Combine class names, filtering out falsy values.
 * Usage: cn('base', isActive && 'active', someCondition && 'extra-class')
 */
export function cn(...classes) {
  return classes.filter(Boolean).join(" ");
}

/**
 * Parse a price stored as a number or a formatted string ("45,000") into a number.
 */
export function parsePrice(price) {
  return typeof price === "string" ? Number(price.replace(/,/g, "")) : price;
}

/**
 * Format a price for display, e.g. 45000 or "45,000" -> "₦45,000".
 */
export function formatPrice(price) {
  return `₦${(parsePrice(price) || 0).toLocaleString("en-NG")}`;
}
