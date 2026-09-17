export type Category = 'hiking' | 'sightseeing' | 'outdoor-sports';

export const CATEGORY_LABELS: Record<Category, string> = {
  hiking: 'Hiking',
  sightseeing: 'Sightseeing',
  'outdoor-sports': 'Outdoor Sports',
};

export const CATEGORY_ORDER: Category[] = ['hiking', 'sightseeing', 'outdoor-sports'];

/**
 * One rule line. `label` is the bolded lead-in that the original markup wrote as
 * `<b>Maximum Group Size:</b>&nbsp;&nbsp;`. Modelling it structurally -- rather
 * than keeping the HTML string and using dangerouslySetInnerHTML -- keeps the
 * content type-checked and individually styleable.
 */
export interface RuleItem {
  label?: string;
  text: string;
}

export interface Product {
  /** ASCII slug; the [id] route segment. Must match /^[a-z0-9-]+$/. */
  id: string;
  /** The original id, which for five tours carried diacritics. */
  legacyId: string;
  /** Explicit -- not derivable from the id. */
  category: Category;
  title: string;
  /** Per person, EUR. */
  price: number;
  /** Region label, e.g. 'South'. Was `brief` in the legacy data. */
  region: string;
  briefLong: string;
  aboutTheTour: string;
  /** Bare public path, e.g. '/img/product-img-1.png'. Wrap in asset() to render. */
  img: string;
  imgBig: string;
  duration: string;
  time: string;
  startTime: string;
  location: string;
  meetingTime: string;
  /** A cap on participants, not a quantity. Was `groupSize`. */
  maxGroupSize: number;
  beforeYouGo: string[];
  rules: RuleItem[];
}

/** One booked line in the cart. */
export interface CartItem {
  /** Stable identity. The legacy code keyed by array index, which meant removing
   *  two items in a row deleted the wrong row. */
  lineId: string;
  productId: string;
  title: string;
  /** Bare public path -- keeps persisted carts portable across deployments. */
  img: string;
  /** 'YYYY-MM-DD'. */
  date: string;
  groupSize: number;
  /** Per person. */
  unitPrice: number;
  /** unitPrice * groupSize. */
  price: number;
}

export interface CartTotals {
  subtotal: number;
  tax: number;
  orderTotal: number;
}
