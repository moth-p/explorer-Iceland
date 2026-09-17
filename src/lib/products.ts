import { products } from '@/data/products';
import type { Category, Product } from './types';

/**
 * 在 output: 'export' 底下，行程的 id 會變成目錄名稱。一個非 ASCII
 * 的 id 在 `next dev` 和 macOS 上可以正常運作，但部署到 GitHub Pages
 * 之後會 404，因為 macOS 會把檔名正規化成 NFD，而瀏覽器要求的是
 * NFC 形式，Linux 主機則是原封不動地依照 bytes 提供檔案。與其這樣
 * 出貨，不如讓 build 直接失敗。
 */
const SLUG = /^[a-z0-9-]+$/;
for (const p of products) {
  if (!SLUG.test(p.id)) {
    throw new Error(
      `Product id "${p.id}" must match ${SLUG} -- non-ASCII ids break static export. ` +
        `Slugify it and keep the original as legacyId.`,
    );
  }
}
if (new Set(products.map((p) => p.id)).size !== products.length) {
  throw new Error('Duplicate product id');
}

export const getAllProducts = (): Product[] => products;

export const getProductById = (id: string): Product | undefined =>
  products.find((p) => p.id === id);

export const getProductsByCategory = (category: Category): Product[] =>
  products.filter((p) => p.category === category);

/** 解析 migration 前的 id（例如 'hiking-4-Ásbyrgi-Canyon-Hike'）。 */
export const getProductByLegacyId = (legacyId: string): Product | undefined =>
  products.find((p) => p.legacyId === legacyId);
