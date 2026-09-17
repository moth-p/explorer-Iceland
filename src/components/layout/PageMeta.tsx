const DEFAULT_TITLE = 'Explorer | Iceland Tour Booking';
const DEFAULT_DESCRIPTION =
  'Small-group outdoor adventures in Iceland: hiking, sightseeing and outdoor sports tours with local guides.';

/**
 * The replacement for Next's `export const metadata`.
 *
 * React 19 hoists <title> and <meta> into <head> from wherever they render and
 * removes them on unmount -- but it does NOT deduplicate, and document.title is
 * the FIRST title element in the document. So: render exactly one PageMeta per
 * route, none in RootLayout, and keep index.html free of a <title>.
 *
 * `title` is the page segment only; the '%s | Explorer' template that used to
 * live in the root layout's metadata export lives here.
 */
export function PageMeta({ title, description }: { title?: string; description?: string }) {
  return (
    <>
      <title>{title ? `${title} | Explorer` : DEFAULT_TITLE}</title>
      <meta name="description" content={description ?? DEFAULT_DESCRIPTION} />
    </>
  );
}
