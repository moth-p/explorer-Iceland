import { useLocation } from 'react-router';
import { useEffect, useState } from 'react';
import { chromeVariantFor } from '@/lib/layout-variant';

/**
 * The back-to-top button. Its own client boundary so the scroll listener's state
 * change re-renders this button alone, not the header.
 *
 * The original fired on every scroll event; this coalesces to one check per
 * animation frame. The offset differs between the two chrome variants, exactly
 * as it did in the original markup.
 *
 * It scrolls imperatively rather than via `href="#"`: under a client router an
 * empty-fragment anchor is a navigation, and page-level `scroll-behavior` is
 * scoped to `html` so route changes do not animate.
 */
export function GoTopButton() {
  const [visible, setVisible] = useState(false);
  const variant = chromeVariantFor(useLocation().pathname);

  useEffect(() => {
    let frame = 0;

    const onScroll = () => {
      if (frame) return;
      frame = requestAnimationFrame(() => {
        setVisible(window.scrollY > 200);
        frame = 0;
      });
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => {
      window.removeEventListener('scroll', onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  if (!visible) return null;

  const offset = variant === 'simple' ? 'end-8 bottom-8' : 'end-5 bottom-5';

  return (
    <div className={`fixed ${offset} z-30 md:bottom-20 md:end-20`}>
      <button
        type="button"
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        className="flex h-10 w-10 items-center justify-center rounded-full bg-lightGray text-[12px] text-subPurple hover:bg-mainYellow hover:text-subPurple active:opacity-50"
      >
        top
      </button>
    </div>
  );
}
