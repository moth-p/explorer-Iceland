# Implementation Plan — Static HTML → Next.js

Living checklist for the migration. Tick phases off as they land; each phase is one commit.

**Branch:** `feat/nextjs-migration` · **Rollback anchor:** tag `pre-nextjs` (commit `be56580`)
**Visual baseline:** `git worktree add ../explorer-Iceland-baseline pre-nextjs`, served on `:4000`

## Status

- [x] **Phase 0** — Safety net + repo hygiene
- [x] **Phase 1** — Documentation
- [x] **Phase 2** — Scaffold Next.js + Tailwind v3 parity
- [x] **Phase 3** — Typed product data
- [x] **Phase 4** — Shared shell + cart store + home page
- [x] **Phase 5** — `/about`
- [x] **Phase 6** — `/shop`
- [x] **Phase 7** — `/shop/[id]`
- [x] **Phase 8** — `/login` + GitHub Pages deploy
- [x] **Phase 9** — Delete legacy + fix `fadeInSlow`

> Remaining, and deliberately left to a human: push `feat/nextjs-migration`,
> run the deploy workflow via `workflow_dispatch`, and only once it is green
> flip **Settings → Pages → Source → GitHub Actions**, then merge.

## Why this order

The app must be runnable and reviewable as early as possible, and the **shared shell has to
land before any content page** — otherwise every page port re-invents the navbar and the
migration recreates the duplication it exists to remove.

The legacy `.html` files, `src/` and `dist/` stay in place until Phase 9. They are the visual
baseline *and* the production rollback: until Pages is flipped to GitHub Actions in Phase 8,
the old files on `main` are what is serving live.

---

## Phase 0 — Safety net + repo hygiene ✅

Tag `pre-nextjs`, branch, `.gitignore`, untrack `node_modules` (3,683 files) and `.DS_Store`,
delete the dead `dist/`, create the baseline worktree.

Untracking `node_modules` **must** precede any `npm install`, or every later diff is unreadable.
History rewriting (`git filter-repo`) is out of scope — it breaks existing clones.

**Verified:** tracked files 3,761 → 74.
**Rollback:** `git checkout main`.

## Phase 1 — Documentation ✅

`project-scope.md`, `tech-stack.md`, `CLAUDE.md`, `implementation-plan.md` at the repo root.

Written before the code so they guide the migration rather than describe it afterwards.

## Phase 2 — Scaffold + Tailwind v3 parity

Scaffold into the scratchpad, then copy into the repo root — `create-next-app` aborts when
`package.json` exists and would clobber `tailwind.config.js`.

```bash
npx create-next-app@15 scaffold --ts --app --eslint --no-tailwind \
    --no-src-dir --import-alias "@/*" --use-npm
```

`--no-tailwind` is **essential**: the wizard installs Tailwind v4, a different engine that
will not reproduce the existing output.

- Hand-merge `package.json`: keep `tailwindcss@^3.4.15`, `animate.css`, `flatpickr`,
  `sweetalert2`; add `swiper`, `zustand`, `@fortawesome/fontawesome-free`, `postcss`,
  `autoprefixer`; **drop `flowbite` and `daisyui`**.
- `tailwind.config.js` → `tailwind.config.ts`: un-nest `plugins` to top level as `plugins: []`,
  `.tsx` content globs, env-driven `backgroundImage`, fix the `'serfif'` typo.
- `src/input.css` → `app/globals.css` (`animate.css` `@import` stays line 1; drop the three
  `@font-face` blocks, which `next/font` now generates).
- **Copy, don't move** assets → `public/img`, `public/video`; the 3 used fonts → `app/fonts/`.
- `next.config.mjs`: `output: 'export'`, `trailingSlash: true`, `basePath`, `images.unoptimized`.
- `lib/asset.ts`.

**Verify:** `npm run dev` boots; `npm run build && ls out/`; emitted CSS contains the three
brand colours, the four keyframes and `.no-spinner`, and **no flowbite/daisyUI selectors**.
*1.5–2.5 h, medium risk.*

## Phase 3 — Typed product data

`src/js/products.js` → `data/products.ts` + `lib/products.ts`.

Slugify ids to ASCII (keep `legacyId`), add explicit `category`, rename `brief`→`region` and
`groupSize`→`maxGroupSize`, drop the dead `quantity`, convert `beforeYouGo`/`rules` from HTML
strings to typed arrays, rewrite `./src/img/…` → `/img/…`.

**Verify:** the `^[a-z0-9-]+$` build-time assertion exists and passes — **this must land before
`generateStaticParams` is written in Phase 7**. `npm run typecheck` clean; 12 records present;
spot-check that `’` (U+2019) and `&nbsp;` (U+00A0) survived transcription.
*2–3 h, medium risk.*

## Phase 4 — Shared shell + cart store + home page

The phase that pays for the migration. Root `layout.tsx` chrome (Header, Footer, CartDrawer,
GoTopButton, CartHydration) + the Zustand cart store + `/` (Hero, Marquee, RevealSection,
VideoSection). Removes ~240 lines of duplicated inline script in one move.

**Verify** side by side with `:4000` at **375 / 768 / 1440**: hamburger opens and closes
including outside-click; search opens; cart drawer opens with a seeded `cartData`; go-top
appears past 200px; video autoplays muted and looping; marquee speed matches.
**Console must show zero hydration warnings with a populated cart.**
*5–7 h, **HIGH risk** — everything downstream depends on this.*

## Phase 5 — `/about`

205 lines whose inline JS is purely the shared nav/goTop code. Should be nearly all markup.

**If this phase is hard, Phase 4 was wrong — go back and fix the shell.**
*~1 h, low risk.*

## Phase 6 — `/shop`

ProductGrid + ProductCard + Pagination + the Swiper banner from npm. Cards link `/shop/${p.id}`.

**Verify:** banner autoplays, loops, and click-to-advance still works; 12 cards with correct
images and prices; grid is 2/3/4 columns at the three breakpoints.
*3–4 h, medium risk.*

## Phase 7 — `/shop/[id]`

`generateStaticParams`, `dynamicParams = false`, `generateMetadata`. The 317-line inline script
becomes `ProductGallery` / `ProductInfo` / `ProductAccordion` (Server) plus `AddToCartForm` and
`DatePicker` (client islands).

**Verify:** all 12 slugs render; date picker matches the original config (min = today + 14,
`F j, Y` display, disabled dates); all three SweetAlert2 paths fire with identical copy and
styling; `npm run build` emits **12 ASCII-named directories** under `out/shop/`.
*5–7 h, **HIGHEST risk** — 317 imperative lines, three libraries, and the diacritics trap.*

## Phase 8 — `/login` + GitHub Pages deploy

`login.html` → cart review + checkout summary + `LoginForm`, reusing Phases 4 and 6.

Then `public/.nojekyll` and `.github/workflows/deploy.yml`: trigger on push to `main` +
`workflow_dispatch`; `permissions: {contents: read, pages: write, id-token: write}`;
`concurrency: {group: pages, cancel-in-progress: false}`; checkout → setup-node 22
(`cache: npm`) → `npm ci` → `npm run build:pages` → `upload-pages-artifact` (`path: ./out`) →
`deploy-pages`.

**Rehearse basePath locally before touching GitHub settings** — see the preview recipe in
[CLAUDE.md](./CLAUDE.md). Walk all five routes with Network filtered to 4xx; confirm
`banner.png`, the swiper backgrounds, the three `.ttf`, `main-video.mp4` and the favicon all
resolve under the prefix. Only once a `workflow_dispatch` run is green, flip
**Settings → Pages → Source → GitHub Actions**.

**Rollback:** set Pages back to *Deploy from a branch: main / root*. The old `.html` files are
still present, so production restores in seconds.
*4–6 h, medium-high risk.*

## Phase 9 — Delete legacy + fix `fadeInSlow`

Two separate commits:

1. `git rm` the five `.html` files and `src/`; update the bilingual `README.md` (both the 中文
   and English tech tables); `git worktree remove ../explorer-Iceland-baseline`.
2. **Separately:** point `animation.fadeInSlow` at the `fadeInSlow` keyframe. It currently
   references `fadeInTitle`, which does not exist, so `animate-fadeInSlow` does nothing today.
   Fixing it is a real visual change, so it lands alone and stays attributable.

**Verify:** `npm run typecheck && npm run lint && npm run build:pages`;
`git ls-files | grep -E '\.html$|^src/'` returns nothing. Re-run the Pages preview walkthrough,
merge, confirm the live deploy.
*~1 h, low risk.*

---

## Risks

1. **Non-ASCII ids 404 only in production.** Five ids carried diacritics. Works in `next dev`
   and on macOS; breaks on GitHub Pages. → Slugify in Phase 3 with the regex assertion, before
   Phase 7 consumes the ids.
2. **Cart hydration mismatch discards server HTML on every page** — the header is in the root
   layout. → `skipHydration` + `CartHydration`; never touch `localStorage` at module scope or
   in render.
3. **Flatpickr's `altInput` fights React for the DOM** — it hides the real input and inserts a
   sibling React doesn't know about, causing `removeChild` crashes or a duplicated field.
   → Isolate in a leaf component; init once; update via `.set()`; always `destroy()`.
4. **Tailwind `content` globs keep matching the legacy `.html`** during the migration, so the
   site looks fine and then collapses when Phase 9 deletes them. → Switch globs to `.tsx` in
   Phase 2, and do a full visual pass after Phase 9.
5. **Duplicated `id` attributes.** `<template>` cloning repeated `id="cartTitle"`,
   `id="productImg"` etc. per row (60 ids in `product-detail.html`, 41 in `shop.html`). A naive
   JSX port yields 12 elements sharing one id. → Convert selector-ids to props/`className`;
   keep only genuine anchors and CSS targets (`#detailsTitle` is styled by id; `#datePicker` is
   referenced by Flatpickr).

## Definition of done

1. All five routes render identically to `pre-nextjs` at 375 / 768 / 1440.
2. Cart round-trips across pages and reloads; legacy v0 carts are cleared cleanly, not left broken.
3. `npm run typecheck`, `npm run lint`, `npm run build:pages` pass clean; zero hydration warnings.
4. `out/` contains `.nojekyll`, `404.html`, and 12 ASCII-named `shop/<slug>/index.html`.
5. Live site serves with **zero 4xx** across all five routes.
6. No `.html`, `src/` or `dist/` in the tree; `git ls-files | wc -l` well under 150.
7. Every duplicated navbar / footer / cart-drawer block exists exactly once.
8. The four root documents describe what was actually built.

**Estimate: ~24–32 h total.** Riskiest: Phase 7, then Phase 4, then Phase 8.
