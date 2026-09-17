# Tech Stack — Explorer Iceland

> Every dependency, why it is here, and what was rejected.
> For product boundaries see [project-scope.md](./project-scope.md).

## Core

| | Choice | Why |
|---|---|---|
| Build | **Vite 8** | Dev server starts instantly and the production build is a few seconds; no framework runtime to work around for a site with five routes. |
| UI | **React 19** | Also supplies the `<title>`/`<meta>` hoisting that replaced Next's metadata exports. |
| Router | **React Router 7** | Used as a data router (`createBrowserRouter`) rather than `<BrowserRouter>`, because route-level `ErrorBoundary` and `<ScrollRestoration />` only exist there. |
| Language | **TypeScript** | 12 tour records with 17 fields each, and a cart shape that crosses page boundaries via `localStorage`. Both were previously untyped globals. |
| Styling | **Tailwind CSS 4** | CSS-first `@theme` config; there is no `tailwind.config.ts` any more. |
| Components | **shadcn/ui** | Copy-in Radix components, re-themed onto the existing palette. See below. |
| Cart state | **Zustand + `persist`** | See *State* below. |
| Output | **SPA** + `404.html` fallback | Deploys to GitHub Pages as plain files, same as before. |

### The migration off Next.js

This project ran on Next.js 15 (App Router) with `output: 'export'` before moving to Vite. What
that cost, stated plainly: the export emitted 17 fully-populated HTML files, one per route
including all 12 tours, each with its own `<title>` and description. A SPA emits one empty
shell, **every URL except the root now answers HTTP 404** (with the shell, which is how the
fallback works), and metadata only exists once JavaScript has run. Crawlers and link unfurls
see an empty page. If that ever matters, a prerender pass over the 17 known routes
(`vite-react-ssg` or similar) restores it without changing the router.

The five components that were Server Components — `SimpleFooter`, `SiteFooter`, `ProductCard`,
`Marquee`, `MessagePage` — are static JSX from props, so shipping them to the client costs
roughly 3–5 KB gzipped. That was never the reason to keep Next.

### Tailwind v4, and the version floor that matters

The v3 `tailwind.config.ts` became the `@theme` block in `src/index.css`. The token names were
kept **byte-identical**, camelCase and all, so not one `className` in ~2,800 lines of markup
had to change.

That requires **`tailwindcss >= 4.1.18`**. Releases 4.0.0 through 4.1.17 silently dropped theme
keys containing uppercase letters, so `--color-mainYellow` would generate no utility and the
site would render with no brand colours *and no build error*
([tailwindlabs/tailwindcss#18114](https://github.com/tailwindlabs/tailwindcss/issues/18114)).
CI greps the built CSS for `bg-mainYellow` so a downgrade cannot ship quietly.

The 14 `backgroundImage` entries could not move into `@theme`: v4 has no
`--background-image-*` namespace. They are `@utility` rules instead — which they must stay,
because `ShopBanner` uses `md:bg-swiper-1` and variants only compose onto real utilities.

## Design tokens

Defined in the `@theme` block of `src/index.css`, unchanged from the original.

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

### Fonts are `@font-face` over `public/fonts/`

`next/font/local` gave hashed filenames *and* preload hints. With a static `index.html` you can
only have one of the two, because you cannot write a hashed filename into a
`<link rel="preload">`. On GitHub Pages — which serves everything with a fixed
`Cache-Control: max-age=600` — the hash buys almost nothing, while the preload matters: the
hero wordmark is `font-libreBodoni_boldItalic` at 150px and is the LCP element.

So the three `.ttf` files sit in `public/fonts/` under stable names, with hand-written
`@font-face` blocks and three preload links in `index.html`. `crossorigin` on those links is
mandatory even same-origin, or the browser fetches each file twice.

The bold-italic face is registered as its own family at `weight: 400; style: normal` despite
its name — exactly as before — so the browser synthesises nothing.

Converting the three files (339 KB) to woff2 would cut 50–65% and is worth doing separately.

### shadcn tokens are mapped onto these three colours

shadcn components are written against `--primary`, `--accent`, `--border` and friends, so
`src/index.css` maps those onto the existing palette rather than shipping shadcn's neutral
defaults. Markup keeps using `bg-subPurple` / `text-mainYellow` directly; the variables exist
for the generated components.

The one to get right is **`--accent`**. shadcn uses it for hover *surfaces* — ghost buttons,
menu items, calendar day hover — and this site's hover surface is `lightGray` with `subPurple`
text. `mainYellow` is the hover for *filled* buttons, which is `--secondary`. Mapped that way,
a stock `<Button variant="ghost" size="icon">` renders the nav's existing
`hover:bg-lightGray hover:text-subPurple` with no overrides. Swap the two and every ghost
button in the nav turns lime green.

**There is no dark mode, and that takes one deliberate line.** `src/index.css` declares
`@custom-variant dark (&:is(.dark *))` and never puts `.dark` on `<html>`. Tailwind v4's
default `dark:` variant is `@media (prefers-color-scheme: dark)`, and shadcn's components are
full of `dark:bg-input/30` and similar — without that redefinition they would activate for
every visitor whose OS is in dark mode and resolve against variables this project never
defines. With it, they compile but are permanently inert. Never delete that line, and never
add `class="dark"`.

## State

**Zustand with the `persist` middleware**, keyed `cartData` (the original key).

Chosen over React Context + `useReducer` because persistence *is* the hard part here:
`persist` handles serialization, schema versioning and migration in one place, and selector
subscriptions mean the cart badge re-renders on count changes without re-rendering the drawer.
Context would have required hand-rolled read/write effects plus a mounted-flag in every consumer.

**`skipHydration: true` is load-bearing**, and `<CartHydration />` is the thing that makes the
cart work at all — without its effect, the store is never rehydrated and the cart is always
empty. It was originally introduced to avoid a server/client hydration mismatch under Next; on
a SPA the justification is narrower but the mechanism is unchanged, and the behaviour (one
frame of empty cart before rehydration) is the same as it always was.

The corollary rule stands: **never read `localStorage` at module scope or in a render body.**

## Libraries

| Library | Use | Why this, not the alternative |
|---|---|---|
| **Swiper 11** | `/shop` banner carousel | `swiper/react` is the first-party React binding. Previously a CDN `<script>` with a global; now bundled and version-pinned. |
| **shadcn/ui** | Dialog, Popover, Calendar, Checkbox, Button, Label, Sonner | Radix behaviour (focus trap, Escape, outside-click, ARIA) as owned source rather than a dependency, re-themed onto the existing palette. `shadcn init` is **never** run here — see *Removed*. |
| **react-day-picker 10** | booking date picker | Arrives with shadcn's Calendar. Replaced Flatpickr, which owned its input's DOM and needed `altInput` off, single-shot initialisation, imperative `.set()` and explicit `destroy()`. A controlled React component needs none of that. Native `<input type="date">` is still rejected — it cannot render the `F j, Y` format the design requires. |
| **Sonner** | validation + success notifications | Replaced SweetAlert2. ~11 KB bundled against ~40 KB fetched on demand, and being synchronous it removes the whole class of bug the old `fireAlert()` wrapper existed to prevent. |
| **lucide-react** | shadcn's icon set | Only used inside `components/ui`; the site's own icons are still Font Awesome. |
| **Font Awesome Free** | ~49 icons across the site | Self-hosted CSS, `@import`ed in `globals.css`. `@fortawesome/react-fontawesome` was rejected: it would mean rewriting every `<i class="fa-…">` and registering each icon individually, for zero visual change. Self-hosting removes the CDN round-trip and pins the version. |
| **animate.css** | drawer fade, scroll reveal | Genuinely used (`animate__fadeIn`, `animate__fadeInUp`). Its `@import` must be the **first line** of `globals.css` — CSS requires `@import` before any other rule. |

### Removed

| Removed | Why |
|---|---|
| **Flowbite** | Never actually loaded — the `plugins` array was nested *inside* `theme.extend`, so the plugin was silently ignored. And no page used it: zero occurrences of `data-modal`, `data-drawer` or `data-dropdown`. The drawer, dropdown and flyout are all hand-rolled. "Fixing" the nesting would have *injected* new base styles and broken visual parity. |
| **daisyUI** | In `devDependencies` but never registered as a plugin anywhere, and no daisyUI classes in any page. Dead weight. |
| **`shadcn init`** | Not a dependency but the same hazard: it appends an `@layer base` block setting `body { background: var(--background) }` plus a global border reset, which would override `bg-lightGray` and restyle the site. `components.json` is hand-written instead. `shadcn add` is safe and is what we use. |
| **next-themes** | Pulled in by the generated `sonner.tsx` to answer a question with one constant answer — this site has a single theme. The wrapper was trimmed. |
| **CDN `<script>` tags** | Swiper, Flatpickr, SweetAlert2 and Font Awesome all loaded from jsDelivr / cdnjs despite three already being npm dependencies. Now bundled: no third-party round-trips, no version drift, works offline. |
| **`dist/output.css`** | A stale build artifact. All five pages linked `./src/output.css`; `dist/` was never served. |

## Build and deploy

```bash
npm run dev          # vite, http://localhost:3000
npm run build        # build to dist/, no base prefix (local preview)
npm run build:pages  # build with base=/explorer-Iceland/ (production)
npm run lint
npm run typecheck    # tsc -b
```

Deployed to **GitHub Pages** at `https://moth-p.github.io/explorer-Iceland/` via GitHub Actions
(`.github/workflows/deploy.yml`): `npm ci` → typecheck → lint → `npm run build:pages` → a
verification step → `upload-pages-artifact` → `deploy-pages`.

### The SPA fallback

A client-routed SPA on a static host has no server to map `/shop/hiking-1-…` back to the shell.
The `postbuild` hook copies `dist/index.html` to `dist/404.html`; Pages answers any unknown
path with that file, the shell boots, and React Router resolves the route from the URL. The
response status really is 404 — the page renders correctly regardless, but it is the reason
the SEO tradeoff above is what it is.

`public/.nojekyll` is kept, though `deploy-pages@v4` does not run Jekyll.

### base — the part that bites

Pages serves this as a *project* site under `/explorer-Iceland/`, so Vite's `base` is required.
It comes from `BASE_PATH`, set inline in the npm script, and **keeps its trailing slash** —
`import.meta.env.BASE_URL` is that value verbatim, and both `lib/asset.ts` and the router's
`basename` are written against a value ending in `/`.

Vite applies `base` to everything it resolves: module imports, hashed assets, the tags in
`index.html`, and `url()` inside CSS — including the 14 background images, which under Next had
to be interpolated by hand because `basePath` could not reach them. That interpolation is gone.

What Vite cannot see is a plain `<img>`/`<video>` `src`. Those go through `lib/asset.ts`:

```ts
export const asset = (path: string) => `${import.meta.env.BASE_URL}${path.replace(/^\//, '')}`;
```

The leading-slash strip is the single most breakable line in the project. `BASE_URL` ends with
`/` and stored paths begin with one, so a naive template literal produces `//img/x.png` — a
protocol-relative URL that the browser resolves as `http://img/x.png`, killing every image and
the hero video. Product data deliberately stores the bare `/img/…` form so persisted cart
entries stay portable.

Two failure modes here are silent in production and invisible locally, so CI asserts against
the built output: a missing `public/` file leaves its `url()` unprefixed with no build error,
and a Tailwind downgrade below 4.1.18 strips the brand colours. See the verification step in
`deploy.yml`.

React Router's `<Link>` applies the router `basename` itself — never wrap a `to` in `asset()`.

### basename is load-bearing

`lib/layout-variant.ts` decides which nav, footer and body font a page gets by matching
`pathname` against `/`, `/login` and `/shop/`. Without `basename`, every deployed pathname
starts with `/explorer-Iceland`, all three checks fall through to the shop variant, and the
home page silently renders the wrong chrome — a bug that appears only in the production build.
With it set, `useLocation().pathname` arrives pre-stripped and `layout-variant.ts` needed no
changes at all during the migration.

## Routing

Tour detail pages are `/shop/:id`. The original `?id=` query parameter was dropped so each tour
has its own shareable URL. The 12 tours are a closed set, so `ProductDetail` renders the 404 in
place for an unknown id — which is what Next's `dynamicParams = false` did, and it keeps the
site chrome exactly as the framework's not-found page did.

**Tour ids are ASCII slugs**, and this is a correctness requirement, not a style preference.
Five original ids carried diacritics (`Ásbyrgi`, `Jökulsárlón`, `Mývatn`, `Snæfellsnes`,
`Dalvík`). Each id is a URL segment, and percent-encoding plus Unicode normalisation (macOS normalises to
NFD, browsers request NFC) made those five unreliable across hosts. `data/products.ts` carries
the original as `legacyId`, and an assertion in `lib/products.ts` enforces `^[a-z0-9-]+$` —
which now throws in the browser on first import rather than failing the build, so it surfaces
as soon as you run `npm run dev`.

## Project layout

```
index.html    the shell: <body> classes, favicon, three font preloads, no <title>
src/
  main.tsx    entry
  router.tsx  the route table
  index.css   Tailwind v4 theme, shadcn tokens, background @utility rules, @font-face
  routes/     RootLayout + one component per route + both error boundaries
  components/ by domain: layout/ cart/ product/ shop/ booking/ home/ auth/ + ui/
  lib/        products accessors, cart store, dates, alerts, asset()
  data/       products.ts — the 12 tour records
public/       img/ video/ fonts/ icon.png .nojekyll
```

Sources moved under `src/` during the Vite migration. Every import already went through the
`@/*` alias, so repointing it from the repo root to `src/` left all ~60 import specifiers
byte-identical — the move was a `git mv` and two config lines.

`components/ui/` is generated by `shadcn add`: vendored code that we own and may edit, but
which the next `shadcn add` of the same component will overwrite. Two such edits exist today —
`dialog.tsx` has its zoom animation removed, and `sonner.tsx` has next-themes taken out.
