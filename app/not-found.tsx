import type { Metadata } from 'next';
import { MessagePage } from '@/components/layout/MessagePage';

export const metadata: Metadata = {
  title: 'Page not found',
};

/**
 * Rendered for unknown URLs, and for any /shop/[id] that is not one of the 12
 * tours (dynamicParams = false). Under output: 'export' this is what becomes
 * out/404.html, which GitHub Pages serves for missing paths.
 */
export default function NotFound() {
  return (
    <MessagePage code="404" title="We couldn&rsquo;t find that page">
      The page you are looking for may have moved, or the tour link may be out of date.
    </MessagePage>
  );
}
