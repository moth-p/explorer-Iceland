# Tech Stack — Explorer Iceland

> Every dependency, why it is here, and what was rejected.
> For product boundaries see [project-scope.md](./project-scope.md).

## Core

| | Choice | Why |
|---|---|---|
| Framework | **Next.js 15, App Router** | Shared chrome becomes one root layout instead of four copies; file-based routing; prerenders every page at build time. |
| UI | **React 19** | Server Components by default — the footer, product cards and detail sections ship zero JS. |
| Language | **TypeScript** | 12 tour records with 17 fields each, and a cart shape that crosses page boundaries via `localStorage`. Both were previously untyped globals. |
| Styling | **Tailwind CSS 3.4** | Already the project's design language. Deliberately **not** v4 — see below. |
| Cart state | **Zustand + `persist`** | See *State* below. |
| Output | **Static export** (`output: 'export'`) | Deploys to GitHub Pages as plain files, same as before. |

### Why Tailwind v3, not v4

`create-next-app` installs Tailwind **v4**, which is a different engine with a CSS-first
`@theme` config. The existing `tailwind.config.js` — three brand colours, three font families,
14 background images, four keyframes — is the design system, and porting it to v4 risks subtle
visual drift across 2,800 lines of ported markup. v3.4 is pinned so the compiled output stays
comparable to the pre-migration stylesheet. Upgrading to v4 is a reasonable follow-up, on its
own branch, with its own visual pass.

## Design tokens

Defined in `tailwind.config.ts`, unchanged from the original.

```
mainYellow  #D4FB71      accent, hover states
subPurple   #8CABFB      buttons, links
lightGray   #F5F5F5      surfaces, nav background on open
```

Fonts (keys deliberately preserved, so no `className` in the ported markup had to change):

```
font-krona                   KronaOne-Regular      headings
font-libreBodoni_Regular     LibreBodoni-Regular   display serif
font-libreBodoni_boldItalic  LibreBodoni-BoldItalic
```

Only these three of the seven `.ttf` files in the original repo were ever referenced;
`BebasNeue-Regular` and `Stardom-Regular` had zero usages and were dropped.

Keyframes: `marquee` (32s linear infinite), `fadeIn`, `fadeInSlow`, `rotateStar`.

### Fonts are loaded with `next/font/local`

The three `.ttf` files live in `app/fonts/` — **not** `public/` — because `next/font/local`
resolves them through the bundler. Next self-hosts them with hashed filenames, emits
`font-display: swap`, and adds preload hints. Each is exposed as a CSS variable
(`--font-krona`, …) that the Tailwind `fontFamily` keys point at, which is what allows the
token names to stay identical.

## State

**Zustand with the `persist` middleware**, keyed `cartData` (the original key).

Chosen over React Context + `useReducer` because persistence *is* the hard part here:
`persist` handles serialization, schema versioning and migration in one place, and selector
subscriptions mean the cart badge re-renders on count changes without re-rendering the drawer.
Context would have required hand-rolled read/write effects plus a mounted-flag in every consumer.

**`skipHydration: true` is load-bearing.** `persist` normally rehydrates from `localStorage`
during module initialisation, *before* React's first client render. The prerendered HTML would
say "0 items" while the first client render says "3 items" — React 18 treats that as a
hydration mismatch and throws away the server HTML for the whole subtree. Because the header
sits in the root layout, that would degrade every page. Instead, rehydration is deferred to an
effect in a `<CartHydration />` component mounted once in the layout.

The corollary rule: **never read `localStorage` at module scope or in a render body, and never
branch on `typeof window` during render.** A `typeof window` check is true on the client's
first render and false during prerender — that *is* the mismatch, not a fix for it.

## Libraries

| Library | Use | Why this, not the alternative |
|---|---|---|
| **Swiper 11** | `/shop` banner carousel | `swiper/react` is the first-party React binding. Previously a CDN `<script>` with a global; now bundled and version-pinned. |
| **Flatpickr** | booking date picker | Driven directly through a `ref`, **not** `react-flatpickr`: the booking form needs imperative `.set('disable', …)` and `.clear()`, which the wrapper exposes awkwardly, and its React 19 types are unreliable. Native `<input type="date">` was rejected — it cannot render the `F j, Y` display format the design requires. |
| **SweetAlert2** | validation + success modals | Kept plain. `sweetalert2-react-content` exists to render JSX *inside* a modal; all three call sites use plain-string titles. **Imported lazily inside the click handler** so ~40 KB stays out of the initial bundle. Shared config lives in `lib/alerts.ts` instead of being pasted three times. |
| **Font Awesome Free** | ~49 icons across the site | Self-hosted CSS, `@import`ed in `globals.css`. `@fortawesome/react-fontawesome` was rejected: it would mean rewriting every `<i class="fa-…">` and registering each icon individually, for zero visual change. Self-hosting removes the CDN round-trip and pins the version. |
| **animate.css** | drawer fade, scroll reveal | Genuinely used (`animate__fadeIn`, `animate__fadeInUp`). Its `@import` must be the **first line** of `globals.css` — CSS requires `@import` before any other rule. |

### Removed

| Removed | Why |
|---|---|
| **Flowbite** | Never actually loaded — the `plugins` array was nested *inside* `theme.extend`, so the plugin was silently ignored. And no page used it: zero occurrences of `data-modal`, `data-drawer` or `data-dropdown`. The drawer, dropdown and flyout are all hand-rolled. "Fixing" the nesting would have *injected* new base styles and broken visual parity. |
| **daisyUI** | In `devDependencies` but never registered as a plugin anywhere, and no daisyUI classes in any page. Dead weight. |
| **CDN `<script>` tags** | Swiper, Flatpickr, SweetAlert2 and Font Awesome all loaded from jsDelivr / cdnjs despite three already being npm dependencies. Now bundled: no third-party round-trips, no version drift, works offline. |
| **`dist/output.css`** | A stale build artifact. All five pages linked `./src/output.css`; `dist/` was never served. |

## Build and deploy

```bash
npm run dev          # next dev
npm run build        # static export to out/, no basePath (local preview)
npm run build:pages  # static export with basePath=/explorer-Iceland (production)
npm run lint
npm run typecheck    # tsc --noEmit
```

Deployed to **GitHub Pages** at `https://moth-p.github.io/explorer-Iceland/` via GitHub Actions
(`.github/workflows/deploy.yml`): `npm ci` → `npm run build:pages` → `upload-pages-artifact` →
`deploy-pages`.

### basePath — the part that bites

Pages serves this as a *project* site under `/explorer-Iceland/`, so `basePath` is required.

`basePath` **does** rewrite: `next/link` hrefs, `next/image` `src` (even with `unoptimized`),
all `/_next/*` chunk URLs, and `next/font` output.

`basePath` **does not** rewrite: plain `<img>`/`<video>` `src`, `<link rel="icon">`, `fetch()`,
or `url()` inside CSS. Those go through `lib/asset.ts`:

```ts
export const asset = (p: string) => `${process.env.NEXT_PUBLIC_BASE_PATH ?? ''}${p}`;
```

The 14 Tailwind `backgroundImage` entries are the subtlest case. The original values were
`url('./img/banner.png')`, relative to the emitted stylesheet. Next emits CSS to
`/_next/static/css/<hash>.css`, so those would resolve to `/_next/static/css/img/banner.png`
— **404, with no build error**. They are now built from the same env var:

```ts
const bp = process.env.NEXT_PUBLIC_BASE_PATH || '';
backgroundImage: { banner: `url('${bp}/img/banner.png')`, /* … */ }
```

`NEXT_PUBLIC_BASE_PATH` is set **inline in the npm script**, not in `.env`, so the Tailwind
PostCSS pass sees it.

Two further deployment notes:
- **`assetPrefix` is not set.** With `basePath` and no CDN, Next already serves assets from
  `basePath + /_next`. Adding `assetPrefix` on top produces double-prefixed 404s under
  `output: 'export'`.
- **`trailingSlash: true`**, so the export emits `out/about/index.html` rather than
  `out/about.html` — which is what plain static hosts resolve reliably.
- **`public/.nojekyll`** prevents Jekyll from stripping the `_next/` directory.

## Routing

Tour detail pages are `/shop/[id]`, prerendered through `generateStaticParams()` with
`dynamicParams = false`. The original `?id=` query parameter was dropped: under static export,
`useSearchParams()` forces a client-only render, so the exported HTML would be an empty shell —
no title, no price, a blank flash on load, and no per-tour SEO.

**Tour ids are ASCII slugs**, and this is a correctness requirement, not a style preference.
Five original ids carried diacritics (`Ásbyrgi`, `Jökulsárlón`, `Mývatn`, `Snæfellsnes`,
`Dalvík`). Under static export each id becomes a real directory name; macOS normalises
filenames to NFD while browsers request the NFC form, and Linux/GitHub Pages serve bytes
literally. Those five pages would work in `next dev` and on a Mac, then 404 in production.
`data/products.ts` carries the original as `legacyId`, and a build-time assertion enforces
`^[a-z0-9-]+$`.

## Project layout

```
app/          routes, root layout, globals.css, fonts
components/   by domain: layout/ cart/ product/ shop/ booking/ home/ auth/
lib/          products accessors, cart store, alerts, asset()
data/         products.ts — the 12 tour records
public/       img/ video/ .nojekyll
```

There is no `src/` directory: the pre-migration site used that name, and reusing it during the
port would have been confusing.
