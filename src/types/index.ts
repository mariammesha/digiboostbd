/**
 * Shared TypeScript types for DigiBoost BD.
 * Add domain types here (e.g. User, Product, Order).
 */

export type ApiResponse<T> = {
  data: T | null;
  error: string | null;
  success: boolean;
};
