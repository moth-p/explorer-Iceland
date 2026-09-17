import { Outlet, ScrollRestoration } from 'react-router';
import { CartHydration } from '@/components/cart/CartHydration';
import { ChromeExtras } from '@/components/layout/ChromeExtras';
import { Header } from '@/components/layout/Header';
import { PageChrome } from '@/components/layout/PageChrome';

/**
 * The single source of the site chrome.
 *
 * Header, cart drawer and back-to-top were previously pasted into four separate
 * HTML files along with ~240 lines of identical inline script. The footer is
 * NOT here, because / and /about use a different one from the shop pages --
 * pages render SimpleFooter or SiteFooter themselves.
 *
 * <html> and <body> live in index.html now, and the font families come from
 * @font-face in index.css rather than next/font's generated classes.
 */
export function RootLayout() {
  return (
    <>
      <PageChrome>
        <Header />
        <Outlet />
        <ChromeExtras />
      </PageChrome>
      <CartHydration />
      <ScrollRestoration />
    </>
  );
}
