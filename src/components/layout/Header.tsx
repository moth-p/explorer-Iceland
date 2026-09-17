import { useLocation } from 'react-router';
import { chromeVariantFor } from '@/lib/layout-variant';
import { ShopNav } from './ShopNav';
import { SimpleNav } from './SimpleNav';

/**
 * 依照路由挑選對應的導覽列，保留 migration 前那個網站原有的三種不同設計。
 * 見 lib/layout-variant.ts。
 */
export function Header() {
  const variant = chromeVariantFor(useLocation().pathname);
  return variant === 'simple' ? <SimpleNav /> : <ShopNav variant={variant} />;
}
