import { useLocation } from 'react-router';
import { pageChromeClassesFor } from '@/lib/layout-variant';

/**
 * Applies the half of the original <body> class list that varied by page --
 * the entry animation and the base font. See lib/layout-variant.ts for the
 * per-route table.
 *
 * This lives on a wrapper rather than <body> so the root layout can remain a
 * Server Component.
 */
export function PageChrome({ children }: { children: React.ReactNode }) {
  return <div className={pageChromeClassesFor(useLocation().pathname)}>{children}</div>;
}
