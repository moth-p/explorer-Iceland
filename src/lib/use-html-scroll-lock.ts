import { useEffect } from 'react';

/**
 * Freezes the page behind a modal while `locked` is true, by locking <html>.
 *
 * This is deliberately narrower than it looks. Radix (via react-remove-scroll)
 * already locks <body> and compensates for the scrollbar width, and it blocks
 * wheel and touch scrolling on everything outside the modal. What it does not
 * do is set overflow on <html> -- and the root layout gives <body> `h-screen`,
 * so the document element is the actual scroll container here. Without this,
 * pressing Space or arrow-down with the cart open still scrolls the page.
 *
 * It must NOT also lock <body> or add padding: doing both would apply the
 * scrollbar-width compensation twice and shift the page by ~15px on Windows and
 * Linux, where scrollbars take up space. On macOS overlay scrollbars that width
 * is 0, so the bug would be invisible in development and ship anyway.
 */
export function useHtmlScrollLock(locked: boolean) {
  useEffect(() => {
    if (!locked) return;

    const html = document.documentElement;
    const previous = html.style.overflow;
    html.style.overflow = 'hidden';

    return () => {
      html.style.overflow = previous;
    };
  }, [locked]);
}
