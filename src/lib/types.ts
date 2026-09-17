export type Category = 'hiking' | 'sightseeing' | 'outdoor-sports';

export const CATEGORY_LABELS: Record<Category, string> = {
  hiking: 'Hiking',
  sightseeing: 'Sightseeing',
  'outdoor-sports': 'Outdoor Sports',
};

export const CATEGORY_ORDER: Category[] = ['hiking', 'sightseeing', 'outdoor-sports'];

/**
 * 一行規則。`label` 是加粗的前導文字，原本的 markup 是寫成
 * `<b>Maximum Group Size:</b>&nbsp;&nbsp;`。用結構化的方式建模 --
 * 而不是保留 HTML 字串再用 dangerouslySetInnerHTML -- 讓內容能被
 * 型別檢查，也能個別套用樣式。
 */
export interface RuleItem {
  label?: string;
  text: string;
}

export interface Product {
  /** ASCII slug；[id] 路由的區段。必須符合 /^[a-z0-9-]+$/。 */
  id: string;
  /** 原本的 id，其中五個行程帶有變音符號。 */
  legacyId: string;
  /** 明確指定 -- 沒辦法從 id 推導出來。 */
  category: Category;
  title: string;
  /** 每人的價格，歐元。 */
  price: number;
  /** 地區標籤，例如 'South'。在舊資料裡是 `brief`。 */
  region: string;
  briefLong: string;
  aboutTheTour: string;
  /** 沒有 prefix 的公開路徑，例如 '/img/product-img-1.png'。要渲染時用 asset() 包起來。 */
  img: string;
  imgBig: string;
  duration: string;
  time: string;
  startTime: string;
  location: string;
  meetingTime: string;
  /** 參加人數的上限，不是數量。以前叫做 `groupSize`。 */
  maxGroupSize: number;
  beforeYouGo: string[];
  rules: RuleItem[];
}

/** cart 裡一筆已預訂的項目。 */
export interface CartItem {
  /** 穩定的識別碼。舊版程式碼用陣列索引當 key，導致連續移除兩個項目
   *  時會刪掉錯的那一列。 */
  lineId: string;
  productId: string;
  title: string;
  /** 沒有 prefix 的公開路徑 -- 讓儲存下來的 cart 在不同部署之間仍然可攜。 */
  img: string;
  /** 'YYYY-MM-DD'。 */
  date: string;
  groupSize: number;
  /** 每人的價格。 */
  unitPrice: number;
  /** unitPrice * groupSize。 */
  price: number;
}

export interface CartTotals {
  subtotal: number;
  tax: number;
  orderTotal: number;
}
