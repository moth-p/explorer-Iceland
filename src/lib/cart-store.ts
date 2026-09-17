import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import type { CartItem, CartTotals } from './types';

/** Applied to the subtotal. Matches the pre-migration `taxRate` in src/js/cart.js. */
export const TAX_RATE = 0.03;

export interface CartState {
  items: CartItem[];
  isOpen: boolean;
  addItem: (input: Omit<CartItem, 'lineId' | 'price'>) => void;
  removeItem: (lineId: string) => void;
  clear: () => void;
  openCart: () => void;
  closeCart: () => void;
}

export const useCartStore = create<CartState>()(
  persist(
    (set) => ({
      items: [],
      isOpen: false,

      addItem: (input) =>
        set((s) => ({
          items: [
            ...s.items,
            {
              ...input,
              lineId:
                typeof crypto !== 'undefined' && 'randomUUID' in crypto
                  ? crypto.randomUUID()
                  : `${Date.now()}-${Math.random().toString(36).slice(2)}`,
              price: input.unitPrice * input.groupSize,
            },
          ],
        })),

      // Keyed by lineId, not array index. The legacy removeCartItem(index)
      // closed over the index at render time, so removing two rows in
      // succession deleted the wrong one.
      removeItem: (lineId) =>
        set((s) => ({ items: s.items.filter((i) => i.lineId !== lineId) })),

      clear: () => set({ items: [] }),
      openCart: () => set({ isOpen: true }),
      closeCart: () => set({ isOpen: false }),
    }),
    {
      // Same localStorage key the pre-migration site used.
      name: 'cartData',
      version: 1,
      /**
       * Load-bearing. Without it, `persist` rehydrates synchronously during
       * module initialisation -- before React's first client render. The
       * prerendered HTML would say "0 items" while the first client render says
       * "3", which React treats as a hydration mismatch and responds to by
       * discarding the server HTML for the whole subtree. Since the header lives
       * in the root layout, that would flash on every page.
       *
       * Rehydration is instead triggered from an effect in <CartHydration />.
       */
      skipHydration: true,
      storage: createJSONStorage(() => localStorage),
      // `isOpen` is UI state; it must never be restored from a previous visit.
      partialize: (s) => ({ items: s.items }),
      migrate: (persisted, version) => {
        // v0 was a bare array of {title, img, price, date, groupSize} with image
        // paths pointing at './src/img/...', which no longer resolve, and no
        // stable per-line id. Rather than render broken thumbnails, start empty.
        if (version === 0 || Array.isArray(persisted)) return { items: [] };
        return persisted as { items: CartItem[] };
      },
    },
  ),
);

export const selectCount = (s: CartState) => s.items.length;

export function computeTotals(items: CartItem[]): CartTotals {
  const subtotal = items.reduce((sum, i) => sum + i.price, 0);
  const tax = subtotal * TAX_RATE;
  return { subtotal, tax, orderTotal: subtotal + tax };
}

/**
 * Dates already booked for a tour, so the picker can disable them.
 *
 * The legacy page kept this in a page-local `disabledDates` array that reset on
 * every reload, which let an already-booked date be selected again. Deriving it
 * from the cart is what the original was reaching for.
 *
 * MUST be wrapped in useShallow at the call site:
 *   useCartStore(useShallow(selectBookedDates(id)))
 * It returns a new array each call, and Zustand v5 compares with Object.is, so
 * an unwrapped call re-renders forever.
 */
export const selectBookedDates = (productId: string) => (s: CartState) =>
  s.items.filter((i) => i.productId === productId).map((i) => i.date);
