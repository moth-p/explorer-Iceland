import { useEffect } from 'react';
import { useCartStore } from '@/lib/cart-store';

/**
 * 不渲染任何東西。它唯一的工作就是在 mount 之後觸發一次
 * lib/cart-store.ts 裡 `skipHydration: true` 設定好的延遲 rehydration。
 *
 * 在 app/layout.tsx 裡掛載一次。不要把這個移到 render 裡 --
 * 在第一次 render 之前或期間讀取 localStorage，正是這個 component
 * 存在的目的所要避免的 hydration mismatch。
 */
export function CartHydration() {
  useEffect(() => {
    void useCartStore.persist.rehydrate();
  }, []);

  return null;
}
