'use client';

import { usePathname } from 'next/navigation';
import { chromeVariantFor } from '@/lib/layout-variant';
import { ShopNav } from './ShopNav';
import { SimpleNav } from './SimpleNav';

/**
 * Picks the navigation that matches the route, preserving the two distinct
 * designs the pre-migration site had. See lib/layout-variant.ts.
 */
export function Header() {
  return chromeVariantFor(usePathname()) === 'simple' ? <SimpleNav /> : <ShopNav />;
}
