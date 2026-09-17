import { useLocation } from 'react-router';
import { CartDrawer } from '@/components/cart/CartDrawer';
import { chromeVariantFor, hasShopChrome } from '@/lib/layout-variant';
import { GoTopButton } from './GoTopButton';

/**
 * The floating chrome: back-to-top on every page, and the cart drawer only on
 * the routes whose navigation can actually open it (/ and /about have no cart
 * icon, matching the original).
 */
export function ChromeExtras() {
  const variant = chromeVariantFor(useLocation().pathname);

  return (
    <>
      <GoTopButton />
      {hasShopChrome(variant) && <CartDrawer />}
    </>
  );
}
