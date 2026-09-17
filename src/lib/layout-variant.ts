/**
 * migration 前的網站有兩種不同的 chrome 設計，還有三種不同的 <body>
 * 處理方式。移植後的頁面必須把兩者都保留下來。
 *
 * 導覽列 / footer 的 variant：
 *   'simple'  index.html、about.html -- 只有 Concept/About/Shop，
 *             沒有 Booking flyout，沒有搜尋/cart/account 圖示，
 *             一個單純的手機版選單，置中的 footer，回到頂部按鈕在
 *             end-8/bottom-8。
 *   'shop'    shop.html -- Concept/About/Booking/FAQ，有 Booking
 *             flyout 和手風琴式手機版選單、搜尋框、cart 觸發器、
 *             account 連結、三欄式 footer，回到頂部按鈕在
 *             end-5/bottom-5。
 *   'detail'  product-detail.html、login.html -- 跟 'shop' 類似，
 *             但桌面版導覽列是 Concept/About/Shop/FAQ，沒有 Booking
 *             flyout，而且漢堡選單的 footer 用比較窄的 logo、
 *             比較寬的間距和 Font Awesome 的品牌圖示。
 *
 * 要注意這些設定並不是完全對齊的：about.html 用的是 simple 的導覽列，
 * 但用的是 shop 的頁面淡入效果，而且兩個表單較多的頁面設定了不同的
 * 基礎字體。
 */
export type ChromeVariant = 'simple' | 'shop' | 'detail';

const SIMPLE_ROUTES = new Set(['/', '/about']);

/** 去掉 trailingSlash: true 產生的結尾斜線。 */
function normalize(pathname: string): string {
  return pathname.length > 1 && pathname.endsWith('/') ? pathname.slice(0, -1) : pathname;
}

export function chromeVariantFor(pathname: string): ChromeVariant {
  const path = normalize(pathname);
  if (SIMPLE_ROUTES.has(path)) return 'simple';
  // product-detail.html 和 login.html 共用第三種導覽列：
  // Concept/About/Shop/FAQ，沒有 Booking flyout，圖示位置微調到
  // top-4，而且有不同的漢堡選單 footer（更窄的 logo、更寬的間距、
  // 包含 YouTube 在內的 Font Awesome 品牌圖示）。
  if (path === '/login' || path.startsWith('/shop/')) return 'detail';
  return 'shop';
}

/** 對於帶有 cart、搜尋和 account 控制項的 variant 回傳 true。 */
export function hasShopChrome(v: ChromeVariant): boolean {
  return v !== 'simple';
}

/**
 * 原本 <body> class list 裡會隨路由而變的那一半：頁面載入時的淡入效果
 * 和基礎字體。套用在一個 wrapper 上，這樣 root layout 才能保持是一個
 * Server Component；兩種淡入效果都只作用在 opacity 上，所以裡面固定
 * 的 nav 不會受影響。
 *
 *   /                      animate-fadeIn                       font-krona
 *   /about, /shop          animate__animated animate__fadeIn …  font-krona
 *   /shop/[id], /login     （沒有淡入效果）                     font-sans scroll-smooth
 */
export function pageChromeClassesFor(pathname: string): string {
  const path = normalize(pathname);

  // 這兩個表單較多的頁面設定了不同的基礎字體，也沒有進場動畫。
  if (path === '/login' || path.startsWith('/shop/')) {
    return 'font-sans scroll-smooth';
  }
  if (path === '/') {
    return 'animate-fadeIn font-krona';
  }
  return 'animate__animated animate__fadeIn animate__fast font-krona';
}

/**
 * 搜尋 / cart / account 圖示的垂直偏移量。
 *
 * 只有 product-detail.html 用了 top-4；shop.html 和 login.html
 * 都用 top-3。這看起來比較像是一個失誤而不是刻意的決定，但這裡還是
 * 原封不動地重現它，這樣移植過程本身就不會引入任何視覺上的變化。
 */
export function navIconTopFor(pathname: string): string {
  return normalize(pathname).startsWith('/shop/') ? 'top-4' : 'top-3';
}
