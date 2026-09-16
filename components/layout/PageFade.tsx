'use client';

import { usePathname } from 'next/navigation';
import { chromeVariantFor } from '@/lib/layout-variant';

/**
 * The page-load fade, which the two chrome variants did differently:
 *   / and /about      <body class="animate-fadeIn">           (Tailwind, 2s)
 *   shop-family pages <body class="animate__animated animate__fadeIn animate__fast">
 *
 * Applied to a wrapper rather than <body> so the root layout can stay a Server
 * Component. Both animations are opacity-only -- no transform -- so the fixed
 * navigation inside is unaffected.
 */
export function PageFade({ children }: { children: React.ReactNode }) {
  const fade =
    chromeVariantFor(usePathname()) === 'simple'
      ? 'animate-fadeIn'
      : 'animate__animated animate__fadeIn animate__fast';

  return <div className={fade}>{children}</div>;
}
