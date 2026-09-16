'use client';

import { usePathname } from 'next/navigation';
import { chromeVariantFor } from '@/lib/layout-variant';
import { ShopNav } from './ShopNav';
import { SimpleNav } from './SimpleNav';

/**
 * Picks the navigation that matches the route, preserving the three distinct
 * designs the pre-migration site had. See lib/layout-variant.ts.
 */
export function Header() {
  const variant = chromeVariantFor(usePathname());
  return variant === 'simple' ? <SimpleNav /> : <ShopNav variant={variant} />;
}
