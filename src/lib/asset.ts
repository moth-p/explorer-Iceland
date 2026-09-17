/**
 * Prefix a root-absolute public/ path with the deploy base.
 *
 * import.meta.env.BASE_URL is Vite's `base` verbatim: '/' in dev and
 * '/explorer-Iceland/' in the Pages build. It ALWAYS ends with '/', and stored
 * paths always START with '/'. Concatenating the two naively yields
 * '//img/x.png' -- a protocol-relative URL, which the browser resolves as
 * http://img/x.png, so every image and the video on the site fail to load.
 * Hence the leading-slash strip; do not "simplify" it away.
 *
 *   asset('/img/logo.png')  ->  '/explorer-Iceland/img/logo.png' in production
 *                           ->  '/img/logo.png' in dev
 *
 * Vite applies `base` on its own to anything it resolves -- module imports,
 * hashed assets, url() inside CSS -- so this is only for paths the bundler
 * never sees: a plain <img>/<video> src and friends. React Router's <Link>
 * applies the router basename itself, so never wrap a `to` in this.
 *
 * Keep stored data (product records, cart entries) on the BARE path and call
 * asset() at render time, so persisted values stay portable across deployments.
 */
export const asset = (path: string) => `${import.meta.env.BASE_URL}${path.replace(/^\//, '')}`;
