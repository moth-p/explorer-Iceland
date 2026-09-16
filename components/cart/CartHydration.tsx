'use client';

import { useEffect } from 'react';
import { useCartStore } from '@/lib/cart-store';

/**
 * Renders nothing. Its only job is to trigger the deferred rehydration that
 * `skipHydration: true` set up in lib/cart-store.ts, once, after mount.
 *
 * Mounted once in app/layout.tsx. Do not move this into render -- reading
 * localStorage before or during the first render is exactly the hydration
 * mismatch this exists to avoid.
 */
export function CartHydration() {
  useEffect(() => {
    void useCartStore.persist.rehydrate();
  }, []);

  return null;
}
