import { createContext, useContext, useEffect, useRef, useState } from 'react';

/** 跟 index.html 在 intersection 發生時加上去的完全一樣的 class。 */
const REVEAL_CLASSES = 'animate__animated animate__fadeInUp animate__fast sm:animate__slow';

const RevealContext = createContext(false);

/**
 * 在區塊捲動進入畫面時，讓它的子元素以淡入向上的方式出現，取代
 * index.html 裡原本的 IntersectionObserver + classList 區塊。
 *
 * 它接收 `children`，所以只有這個 wrapper 和 <Reveal> 是 Client
 * Component -- 實際渲染在裡面的內容仍然是 server-rendered 的。
 *
 * 要注意的是，原本的程式碼會無條件查詢 `.observeTarget2` 並直接解參考，
 * 這在只有一個 target 的區塊上會丟出錯誤。這裡改成每個 target 透過
 * <Reveal> 自行加入，所以只有一個 target 的區塊也沒問題。
 */
export function RevealSection({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLElement>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // 尊重使用者的 reduced-motion 偏好設定，直接立即顯示。
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setShown(true);
      return;
    }

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShown(true);
          io.unobserve(el);
        }
      },
      { threshold: 0.5 },
    );

    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <section ref={ref} className={className}>
      <RevealContext.Provider value={shown}>{children}</RevealContext.Provider>
    </section>
  );
}

/** RevealSection 裡的一個 target：在區塊進入畫面之前都是隱藏的。 */
export function Reveal({
  children,
  className = '',
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const shown = useContext(RevealContext);

  return (
    <div className={`${className} ${shown ? REVEAL_CLASSES : 'opacity-0'}`}>{children}</div>
  );
}
