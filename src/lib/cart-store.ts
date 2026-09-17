import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import type { CartItem, CartTotals } from './types';

/** 套用在小計上。跟 migration 前 src/js/cart.js 裡的 `taxRate` 一致。 */
export const TAX_RATE = 0.03;

export interface CartState {
  items: CartItem[];
  isOpen: boolean;
  addItem: (input: Omit<CartItem, 'lineId' | 'price'>) => void;
  removeItem: (lineId: string) => void;
  clear: () => void;
  openCart: () => void;
  closeCart: () => void;
}

export const useCartStore = create<CartState>()(
  persist(
    (set) => ({
      items: [],
      isOpen: false,

      addItem: (input) =>
        set((s) => ({
          items: [
            ...s.items,
            {
              ...input,
              lineId:
                typeof crypto !== 'undefined' && 'randomUUID' in crypto
                  ? crypto.randomUUID()
                  : `${Date.now()}-${Math.random().toString(36).slice(2)}`,
              price: input.unitPrice * input.groupSize,
            },
          ],
        })),

      // 用 lineId 當 key，不是用陣列索引。舊版的 removeCartItem(index)
      // 在 render 當下 closure 住那個 index，所以連續移除兩列時會
      // 刪掉錯的那一列。
      removeItem: (lineId) =>
        set((s) => ({ items: s.items.filter((i) => i.lineId !== lineId) })),

      clear: () => set({ items: [] }),
      openCart: () => set({ isOpen: true }),
      closeCart: () => set({ isOpen: false }),
    }),
    {
      // 跟 migration 前的網站用的是同一個 localStorage key。
      name: 'cartData',
      version: 1,
      /**
       * 這個設定有實際作用。沒有它的話，`persist` 會在 module
       * 初始化期間就同步地 rehydrate -- 也就是在 React 第一次 client
       * render 之前。prerender 出來的 HTML 會顯示「0 items」，
       * 而第一次 client render 卻顯示「3」，React 會把這個視為
       * hydration mismatch，並且會捨棄整個 subtree 的 server HTML
       * 來因應。因為 header 是放在 root layout 裡的，這會導致每個
       * 頁面都閃一下。
       *
       * Rehydration 改成是從 <CartHydration /> 裡的一個 effect 觸發的。
       */
      skipHydration: true,
      storage: createJSONStorage(() => localStorage),
      // `isOpen` 是 UI 的 state；絕對不能從之前的造訪紀錄裡還原。
      partialize: (s) => ({ items: s.items }),
      migrate: (persisted, version) => {
        // v0 是一個 {title, img, price, date, groupSize} 的單純陣列，圖片路徑
        // 指向 './src/img/...'，現在已經解析不出來了，而且每一列也沒有
        // 穩定的 id。與其渲染出壞掉的縮圖，不如直接從空的開始。
        if (version === 0 || Array.isArray(persisted)) return { items: [] };
        return persisted as { items: CartItem[] };
      },
    },
  ),
);

export const selectCount = (s: CartState) => s.items.length;

export function computeTotals(items: CartItem[]): CartTotals {
  const subtotal = items.reduce((sum, i) => sum + i.price, 0);
  const tax = subtotal * TAX_RATE;
  return { subtotal, tax, orderTotal: subtotal + tax };
}

/**
 * 某個行程已經被訂走的日期，這樣 picker 才能把它們設為不可選。
 *
 * 舊版頁面把這個放在一個頁面內的 `disabledDates` 陣列裡，每次重新整理
 * 都會重置，導致已經被訂走的日期可以再被選一次。從 cart 推導出這個值，
 * 正是原本的版本想做卻沒做到的事。
 *
 * 在呼叫端「必須」用 useShallow 包起來：
 *   useCartStore(useShallow(selectBookedDates(id)))
 * 它每次呼叫都會回傳一個新的陣列，而 Zustand v5 是用 Object.is
 * 比較的，所以沒包起來的呼叫會永遠重新 render。
 */
export const selectBookedDates = (productId: string) => (s: CartState) =>
  s.items.filter((i) => i.productId === productId).map((i) => i.date);
