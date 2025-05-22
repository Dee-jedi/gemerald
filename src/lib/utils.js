// src/lib/utils.js

/**
 * Combine class names, filtering out falsy values.
 * Usage: cn('base', isActive && 'active', someCondition && 'extra-class')
 */
export function cn(...classes) {
  return classes.filter(Boolean).join(" ");
}
