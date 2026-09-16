import { products } from '@/data/products';
import type { Category, Product } from './types';

/**
 * Tour ids become directory names under output: 'export'. A non-ASCII id works
 * in `next dev` and on macOS, then 404s on GitHub Pages, because macOS
 * normalises filenames to NFD while browsers request the NFC form and Linux
 * hosts serve bytes literally. Fail the build instead of shipping that.
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

/** Resolve a pre-migration id (e.g. 'hiking-4-Ásbyrgi-Canyon-Hike'). */
export const getProductByLegacyId = (legacyId: string): Product | undefined =>
  products.find((p) => p.legacyId === legacyId);
