import { selectCount, useCartStore } from '@/lib/cart-store';

/**
 * cart 圖示上的紅色數字泡泡（`#cartAlert` / `#cartAlertNum`）。
 *
 * 有自己的 client boundary 和自己的 selector，所以 cart 數量改變時
 * 只會重新 render 這個泡泡，不會動到 header 裡的其他東西。
 */
export function CartBadge() {
  const count = useCartStore(selectCount);

  if (count === 0) return null;

  return (
    <div className="absolute left-6 top-0">
      <div className="flex h-5 w-5 items-center justify-center rounded-full bg-red-500 p-2 font-sans text-[12px] text-lightGray">
        {count}
      </div>
    </div>
  );
}
