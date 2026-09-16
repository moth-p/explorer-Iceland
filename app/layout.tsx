import type { Metadata } from 'next';
import { CartHydration } from '@/components/cart/CartHydration';
import { ChromeExtras } from '@/components/layout/ChromeExtras';
import { Header } from '@/components/layout/Header';
import { PageFade } from '@/components/layout/PageFade';
import { kronaOne, libreBodoni, libreBodoniBoldItalic } from './fonts';
import './globals.css';

export const metadata: Metadata = {
  title: {
    default: 'Explorer | Iceland Tour Booking',
    template: '%s | Explorer',
  },
  description:
    'Small-group outdoor adventures in Iceland: hiking, sightseeing and outdoor sports tours with local guides.',
};

/**
 * The single source of the site chrome.
 *
 * Header, cart drawer and back-to-top were previously pasted into four separate
 * HTML files along with ~240 lines of identical inline script. The footer is
 * NOT here, because / and /about use a different one from the shop pages --
 * pages render SimpleFooter or SiteFooter themselves.
 */
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${kronaOne.variable} ${libreBodoni.variable} ${libreBodoniBoldItalic.variable}`}
    >
      <body className="border-box relative w-screen bg-lightGray font-krona">
        <PageFade>
          <Header />
          {children}
          <ChromeExtras />
        </PageFade>
        <CartHydration />
      </body>
    </html>
  );
}
