import { Outlet, ScrollRestoration } from 'react-router';
import { CartHydration } from '@/components/cart/CartHydration';
import { ChromeExtras } from '@/components/layout/ChromeExtras';
import { Header } from '@/components/layout/Header';
import { PageChrome } from '@/components/layout/PageChrome';
import { Toaster } from '@/components/ui/sonner';

/**
 * 網站 chrome 的唯一來源。
 *
 * Header、cart drawer 和回到頂部按鈕以前是被貼進四個各自獨立的 HTML
 * 檔案裡，還附帶大約 240 行完全相同的 inline script。footer「不」
 * 放在這裡，因為 / 和 /about 用的跟 shop 系列頁面不一樣 -- 各個頁面
 * 會自己 render SimpleFooter 或 SiteFooter。
 *
 * <html> 和 <body> 現在放在 index.html 裡，字體來自 index.css 裡的
 * @font-face，而不是 next/font 產生出來的 class。
 */
export function RootLayout() {
  return (
    <>
      <PageChrome>
        <Header />
        <Outlet />
        <ChromeExtras />
      </PageChrome>
      <CartHydration />
      {/*
        掛載在這裡，而不是掛在 ChromeExtras 裡，因為 ChromeExtras
        只會在有 shop chrome 的路由上 render。凡是能觸發 alert 的地方，
        toaster 就必須存在。
      */}
      <Toaster />
      <ScrollRestoration />
    </>
  );
}
