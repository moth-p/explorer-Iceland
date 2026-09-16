/**
 * The pre-migration site had two distinct chrome designs, and the ported pages
 * must keep them:
 *
 *   'simple'  index.html, about.html -- Concept/About/Shop only, no Booking
 *             flyout, no search/cart/user icons, a plain mobile menu, the
 *             centred footer, and the go-top button at end-8/bottom-8.
 *
 *   'shop'    shop.html, product-detail.html, login.html -- adds the Booking
 *             flyout, search box, cart drawer trigger and account link, the
 *             accordion mobile menu, the three-column footer, and the go-top
 *             button at end-5/bottom-5.
 */
export type ChromeVariant = 'simple' | 'shop';

const SIMPLE_ROUTES = new Set(['/', '/about']);

export function chromeVariantFor(pathname: string): ChromeVariant {
  // Tolerate the trailing slashes that trailingSlash: true produces.
  const normalized =
    pathname.length > 1 && pathname.endsWith('/') ? pathname.slice(0, -1) : pathname;
  return SIMPLE_ROUTES.has(normalized) ? 'simple' : 'shop';
}
