/**
 * The pre-migration site had two distinct chrome designs, and three distinct
 * <body> treatments. The ported pages must keep both.
 *
 * Navigation / footer variant:
 *   'simple'  index.html, about.html -- Concept/About/Shop only, no Booking
 *             flyout, no search/cart/account icons, a plain mobile menu, the
 *             centred footer, and the go-top button at end-8/bottom-8.
 *   'shop'    shop.html -- Concept/About/Booking/FAQ with the Booking flyout
 *             and an accordion mobile menu, search box, cart trigger, account
 *             link, three-column footer, go-top at end-5/bottom-5.
 *   'detail'  product-detail.html, login.html -- as 'shop' but the desktop nav
 *             is Concept/About/Shop/FAQ with NO Booking flyout, and the
 *             hamburger footer uses a narrower logo, a wider gap and Font
 *             Awesome brand icons.
 *
 * Note these do not line up: about.html uses the simple nav but the shop
 * page-fade, and the two form-heavy pages set a different base font.
 */
export type ChromeVariant = 'simple' | 'shop' | 'detail';

const SIMPLE_ROUTES = new Set(['/', '/about']);

/** Strip the trailing slash that trailingSlash: true produces. */
function normalize(pathname: string): string {
  return pathname.length > 1 && pathname.endsWith('/') ? pathname.slice(0, -1) : pathname;
}

export function chromeVariantFor(pathname: string): ChromeVariant {
  const path = normalize(pathname);
  if (SIMPLE_ROUTES.has(path)) return 'simple';
  // product-detail.html and login.html shared a third nav: Concept/About/Shop/FAQ
  // with no Booking flyout, icons nudged to top-4, and a different hamburger
  // footer (narrower logo, wider gap, Font Awesome brand icons incl. YouTube).
  if (path === '/login' || path.startsWith('/shop/')) return 'detail';
  return 'shop';
}

/** True for the variants that carry the cart, search and account controls. */
export function hasShopChrome(v: ChromeVariant): boolean {
  return v !== 'simple';
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

/**
 * Vertical offset of the search / cart / account icons.
 *
 * Only product-detail.html used top-4; shop.html and login.html both used
 * top-3. It reads like a slip rather than a decision, but it is reproduced
 * exactly so the port introduces no visual change of its own.
 */
export function navIconTopFor(pathname: string): string {
  return normalize(pathname).startsWith('/shop/') ? 'top-4' : 'top-3';
}
