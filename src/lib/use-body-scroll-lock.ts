'use client';

import { useEffect } from 'react';

/**
 * Freezes the page behind a modal while `locked` is true.
 *
 * Without this, scrolling inside the cart drawer scrolls the page underneath it
 * once the drawer reaches its own top or bottom (scroll chaining), and the page
 * keeps its scrollbar and stays scrollable around the overlay.
 *
 * The lock is applied to <html> as well as <body>: the root layout gives <body>
 * `h-screen`, so overflow propagates to the document element and locking only
 * <body> would do nothing.
 *
 * Any width taken back from a removed scrollbar is replaced with padding so the
 * page does not visibly jump. On macOS overlay scrollbars that width is 0, so
 * this is usually a no-op.
 */
export function useBodyScrollLock(locked: boolean) {
  useEffect(() => {
    if (!locked) return;

    const html = document.documentElement;
    const { body } = document;

    const prev = {
      htmlOverflow: html.style.overflow,
      bodyOverflow: body.style.overflow,
      bodyPaddingRight: body.style.paddingRight,
    };

    const scrollbarWidth = window.innerWidth - html.clientWidth;

    html.style.overflow = 'hidden';
    body.style.overflow = 'hidden';
    if (scrollbarWidth > 0) {
      const current = parseFloat(window.getComputedStyle(body).paddingRight) || 0;
      body.style.paddingRight = `${current + scrollbarWidth}px`;
    }

    return () => {
      html.style.overflow = prev.htmlOverflow;
      body.style.overflow = prev.bodyOverflow;
      body.style.paddingRight = prev.bodyPaddingRight;
    };
  }, [locked]);
}
