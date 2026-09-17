import { MessagePage } from '@/components/layout/MessagePage';
import { PageMeta } from '@/components/layout/PageMeta';

/**
 * Rendered for unknown URLs, and by ProductDetail for any /shop/:id that is not
 * one of the 12 tours -- which is what Next's `dynamicParams = false` did.
 *
 * On GitHub Pages the server still answers those URLs with a real HTTP 404; the
 * deploy copies index.html to 404.html so the SPA boots and routes to this.
 */
export function NotFound() {
  return (
    <>
      <PageMeta title="Page not found" />
      <MessagePage code="404" title="We couldn&rsquo;t find that page">
        The page you are looking for may have moved, or the tour link may be out of date.
      </MessagePage>
    </>
  );
}
