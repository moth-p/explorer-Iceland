'use client';

import { usePathname } from 'next/navigation';
import { CartDrawer } from '@/components/cart/CartDrawer';
import { chromeVariantFor } from '@/lib/layout-variant';
import { GoTopButton } from './GoTopButton';

/**
 * The floating chrome: back-to-top on every page, and the cart drawer only on
 * the routes whose navigation can actually open it (/ and /about have no cart
 * icon, matching the original).
 */
export function ChromeExtras() {
  const variant = chromeVariantFor(usePathname());

  return (
    <>
      <GoTopButton />
      {variant === 'shop' && <CartDrawer />}
    </>
  );
}
