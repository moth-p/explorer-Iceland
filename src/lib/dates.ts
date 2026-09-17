/**
 * 訂購日期相關的 helper。
 *
 * 這些放在 lib/ 而不是放在 picker 旁邊，是因為它們是商業規則
 * （14 天的前置時間）和正確性的限制（local-time 序列化），不是展示邏輯
 * -- 把它們留在 component 檔案外面，也讓那個檔案能乾淨地 fast-refresh。
 */

/** 最早可訂的日期：今天 + 14 天。跟原本的 getStartDay() 一致。 */
export function getMinBookingDate(): Date {
  const d = new Date();
  d.setDate(d.getDate() + 14);
  // 正規化成本地時間的午夜，這樣不管頁面是在一天中的什麼時候載入，
  // 日曆 matcher 裡的日期層級比較都是確定的。
  d.setHours(0, 0, 0, 0);
  return d;
}

const pad = (n: number) => String(n).padStart(2, '0');

/**
 * 本地時間的 YYYY-MM-DD。刻意不用 toISOString()，因為它會轉換成 UTC，
 * 對時區在它前面或後面的人來說，日期會被偏移一天 -- 在 UTC+8，
 * 一大早選的日期會訂到前一天。
 */
export function toISODate(d: Date): string {
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
}

/** 基於同樣的理由，把 'YYYY-MM-DD' 解析成本地時間的午夜。 */
export function fromISODate(s: string): Date {
  const [y, m, d] = s.split('-').map(Number);
  return new Date(y, m - 1, d);
}

/**
 * 設計稿要求的顯示格式：「January 3, 2026」。這原本是 flatpickr 的
 * 'F j, Y'。用 Intl 就能做到，不需要額外的依賴，也不會增加 bundle 大小。
 */
export function formatBookingDate(d: Date): string {
  return new Intl.DateTimeFormat('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  }).format(d);
}
