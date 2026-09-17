import { useLocation } from 'react-router';
import { CartDrawer } from '@/components/cart/CartDrawer';
import { chromeVariantFor, hasShopChrome } from '@/lib/layout-variant';
import { GoTopButton } from './GoTopButton';

/**
 * 浮動的 chrome：每個頁面都有回到頂部的按鈕，而 cart drawer 只出現在
 * 導覽列真的能打開它的路由上（/ 和 /about 沒有 cart 圖示，跟原本一致）。
 */
export function ChromeExtras() {
  const variant = chromeVariantFor(useLocation().pathname);

  return (
    <>
      <GoTopButton />
      {hasShopChrome(variant) && <CartDrawer />}
    </>
  );
}
