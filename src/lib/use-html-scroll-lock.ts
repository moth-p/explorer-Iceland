import { useEffect } from 'react';

/**
 * 在 `locked` 為 true 的期間，透過鎖定 <html> 來凍結 modal 背後的頁面。
 *
 * 這個 hook 刻意做得比看起來更窄。Radix（透過 react-remove-scroll）
 * 已經會鎖定 <body> 並補償 scrollbar 的寬度，也會擋掉 modal 以外所有
 * 元素的滾輪和觸控捲動。它不會做的是設定 <html> 的 overflow --
 * 而 root layout 給了 <body> `h-screen`，所以這裡真正的 scroll
 * container 其實是 document element。沒有這個 hook 的話，在 cart
 * 打開時按下 Space 或方向鍵向下仍然會捲動頁面。
 *
 * 它「絕對不能」同時鎖定 <body> 或加上 padding：兩邊都做的話會把
 * scrollbar 寬度補償套用兩次，在會佔用空間的 Windows 和 Linux
 * scrollbar 上，會讓頁面偏移約 15px。macOS 的 overlay scrollbar
 * 寬度是 0，所以這個 bug 在開發時會看不出來，卻還是會被送出去。
 */
export function useHtmlScrollLock(locked: boolean) {
  useEffect(() => {
    if (!locked) return;

    const html = document.documentElement;
    const previous = html.style.overflow;
    html.style.overflow = 'hidden';

    return () => {
      html.style.overflow = previous;
    };
  }, [locked]);
}
