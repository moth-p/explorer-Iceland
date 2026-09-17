import { useLocation } from 'react-router';
import { pageChromeClassesFor } from '@/lib/layout-variant';

/**
 * 套用原本 <body> class list 裡會隨頁面而變的那一半 -- 進場動畫和
 * 基礎字體。個別路由的對應表請見 lib/layout-variant.ts。
 *
 * 這放在一個 wrapper 上而不是放在 <body> 上，這樣 root layout
 * 才能保持是一個 Server Component。
 */
export function PageChrome({ children }: { children: React.ReactNode }) {
  return <div className={pageChromeClassesFor(useLocation().pathname)}>{children}</div>;
}
