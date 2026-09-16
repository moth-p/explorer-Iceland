/**
 * The pre-migration site had two distinct chrome designs, and three distinct
 * <body> treatments. The ported pages must keep both.
 *
 * Navigation / footer variant:
 *   'simple'  index.html, about.html -- Concept/About/Shop only, no Booking
 *             flyout, no search/cart/account icons, a plain mobile menu, the
 *             centred footer, and the go-top button at end-8/bottom-8.
 *   'shop'    shop.html, product-detail.html, login.html -- adds the Booking
 *             flyout, search box, cart drawer trigger and account link, the
 *             accordion mobile menu, the three-column footer, and the go-top
 *             button at end-5/bottom-5.
 *
 * Note these do not line up: about.html uses the simple nav but the shop
 * page-fade, and the two form-heavy pages set a different base font.
 */
export type ChromeVariant = 'simple' | 'shop';

const SIMPLE_ROUTES = new Set(['/', '/about']);

/** Strip the trailing slash that trailingSlash: true produces. */
function normalize(pathname: string): string {
  return pathname.length > 1 && pathname.endsWith('/') ? pathname.slice(0, -1) : pathname;
}

export function chromeVariantFor(pathname: string): ChromeVariant {
  return SIMPLE_ROUTES.has(normalize(pathname)) ? 'simple' : 'shop';
}

/**
 * The per-route half of the original <body> class list: the page-load fade and
 * the base font. Applied to a wrapper so the root layout stays a Server
 * Component; both fades are opacity-only, so the fixed nav inside is unaffected.
 *
 *   /                      animate-fadeIn                       font-krona
 *   /about, /shop          animate__animated animate__fadeIn …  font-krona
 *   /shop/[id], /login     (no fade)                            font-sans scroll-smooth
 */
export function pageChromeClassesFor(pathname: string): string {
  const path = normalize(pathname);

  // The two form-heavy pages set a different base font and no entry animation.
  if (path === '/login' || path.startsWith('/shop/')) {
    return 'font-sans scroll-smooth';
  }
  if (path === '/') {
    return 'animate-fadeIn font-krona';
  }
  return 'animate__animated animate__fadeIn animate__fast font-krona';
}
