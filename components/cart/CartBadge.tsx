'use client';

import { selectCount, useCartStore } from '@/lib/cart-store';

/**
 * The red count bubble on the cart icon (`#cartAlert` / `#cartAlertNum`).
 *
 * Its own client boundary and its own selector, so a cart count change
 * re-renders this bubble and nothing else in the header.
 */
export function CartBadge() {
  const count = useCartStore(selectCount);

  if (count === 0) return null;

  return (
    <div className="absolute left-6 top-0">
      <div className="flex h-5 w-5 items-center justify-center rounded-full bg-red-500 p-2 font-sans text-[12px] text-lightGray">
        {count}
      </div>
    </div>
  );
}
