const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH ?? '';

/**
 * Prefix a root-absolute public/ path with the deploy basePath.
 *
 * Next applies basePath automatically to next/link, next/image, /_next/* and
 * next/font output -- but NOT to a plain <img>/<video> src, a favicon link, or
 * fetch(). Use this for those.
 *
 *   asset('/img/logo.png')  ->  '/explorer-Iceland/img/logo.png' in production
 *                           ->  '/img/logo.png' in dev
 *
 * Keep stored data (product records, cart entries) on the BARE path and call
 * asset() at render time, so persisted values stay portable across deployments.
 */
export const asset = (path: string) => `${BASE_PATH}${path}`;
