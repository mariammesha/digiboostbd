/**
 * Utility functions for DigiBoost BD.
 * Add shared helpers here (e.g. formatCurrency, cn, fetcher).
 */

export function cn(...classes: (string | undefined | false | null)[]): string {
  return classes.filter(Boolean).join(' ');
}
