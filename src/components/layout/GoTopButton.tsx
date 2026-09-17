import { useLocation } from 'react-router';
import { useEffect, useState } from 'react';
import { chromeVariantFor } from '@/lib/layout-variant';

/**
 * 回到頂部的按鈕。有自己的 client boundary，這樣 scroll listener 的
 * state 變化只會重新 render 這個按鈕，不會動到 header。
 *
 * 原本的版本在每一次 scroll 事件都會觸發；這裡合併成每個 animation
 * frame 檢查一次。offset 在兩種 chrome variant 之間不一樣，跟原本
 * markup 的行為完全一致。
 *
 * 這裡是用 imperative 的方式捲動，而不是透過 `href="#"`：在 client
 * router 底下，一個空 fragment 的錨點會被當成一次導覽，而且
 * page 層級的 `scroll-behavior` 是限定在 `html` 上的，所以路由切換
 * 不會有動畫。
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
