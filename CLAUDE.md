# CLAUDE.md

Guidance for Claude Code when working in this repository.

## Always use Context7 for library documentation

**Use the Context7 MCP server to fetch current documentation whenever the task touches a
library, framework, SDK, API or CLI tool** — Next.js, React, Tailwind, Zustand, Swiper,
Flatpickr, SweetAlert2, the GitHub Actions used here. This covers API syntax, configuration,
version migration, library-specific debugging, and setup instructions.

**Use it even when you are confident you already know the answer.** Training data lags behind
releases, and this project sits on Next.js 15 / React 19, where App Router APIs have changed
recently (`params` is now a Promise; `useSearchParams` requires a Suspense boundary under
static export). Prefer Context7 over web search for library docs.

How:
1. `resolve-library-id` with the library name and the actual question — unless an exact
   `/org/project` id is already known (Next.js is `/vercel/next.js`).
2. `query-docs` with that id and the **full question**, not a keyword. One concept per call.
3. If the answer is thin, retry the same call with `researchMode: true`.

Do **not** use Context7 for: refactoring this codebase, debugging our own business logic,
code review, or general programming concepts.

## Commands

```bash
npm run dev          # dev server, http://localhost:3000
npm run build        # static export to out/ (no basePath — for local preview)
npm run build:pages  # production export with basePath=/explorer-Iceland
npm run lint
npm run typecheck    # tsc --noEmit
```

Preview the production build exactly as GitHub Pages serves it:

```bash
npm run build:pages
mkdir -p /tmp/pagesroot/explorer-Iceland && cp -R out/. /tmp/pagesroot/explorer-Iceland/
npx serve /tmp/pagesroot -l 5000     # → http://localhost:5000/explorer-Iceland/
```

Always check this before touching deployment. Filter DevTools Network to 4xx — expect zero.

**Do not run a build while `npm run dev` is running.** Both write to `.next`, and the
production build overwrites the dev server's chunks, after which dev throws
`Cannot find module './331.js'` and every route 500s. If that happens: stop dev,
`rm -rf .next`, restart.

If the browser reports `Loading chunk ... failed`, the tab is usually pointing at a dev
server that has since restarted (often on a different port). Hard-reload it.

## Architecture

```
app/          routes + root layout + globals.css + fonts
  layout.tsx  the ONLY place the header/footer/cart drawer are rendered
components/   layout/ cart/ product/ shop/ booking/ home/ auth/
lib/          products.ts (accessors), cart-store.ts, alerts.ts, asset.ts
data/         products.ts — the 12 tour records
public/       img/ video/ .nojekyll
```

Routes: `/`, `/about`, `/shop`, `/shop/[id]`, `/login`.

The point of this structure is that the navbar, hamburger menu, cart drawer,
back-to-top button and footer exist **exactly once**. The pre-migration site had them pasted
into four HTML files with ~80 lines of duplicated inline script each. Do not reintroduce
per-page copies.

## Rules

**Server Components by default.** Add `'use client'` only at an interaction boundary — and
only on the boundary itself. Anything a client component imports is already in the client
bundle; adding the directive to those files too is noise.

**Never read `localStorage` at module scope or inside a render body.** Never branch on
`typeof window !== 'undefined'` during render — it is true on the client's first render and
false during prerender, which is exactly the hydration mismatch it appears to prevent. Cart
rehydration is deferred to an effect in `components/cart/CartHydration.tsx`; leave that
mechanism alone.

**Tour ids must match `^[a-z0-9-]+$`.** Under static export each id becomes a directory name.
Non-ASCII ids work in `next dev` and on macOS, then 404 on GitHub Pages. A build-time
assertion enforces this — if it fires, slugify the id and keep the original as `legacyId`.

**Category is an explicit field on each tour.** Do not try to parse it from the id: every
original id was prefixed `hiking-`, including the sightseeing and outdoor-sports tours.

**Tailwind: extend `tailwind.config.ts`; do not add plugins casually.** A plugin injects base
styles and can shift the whole design. Flowbite and daisyUI were removed for exactly this
reason — see [tech-stack.md](./tech-stack.md).

**Asset paths.** `basePath` rewrites `next/link`, `next/image`, `/_next/*` and `next/font`
output. It does **not** rewrite plain `<img>`/`<video>`, favicons, or `url()` in CSS — those
go through `asset()` from `lib/asset.ts`, and Tailwind `backgroundImage` entries are built
from `process.env.NEXT_PUBLIC_BASE_PATH`. Product data stores bare `/img/…` so cart entries
stay portable.

**Flatpickr owns its DOM, and `altInput` must stay off.** With `altInput: true` it rewrites
the input's `type` to `hidden` and inserts a second visible input as a sibling React knows
nothing about; React then restores `type="text"` on its next render and you get two date
fields. The picker formats the single React-owned input directly (`dateFormat: 'F j, Y'`) and
`AddToCartForm` derives the `YYYY-MM-DD` value in `onChange`. Keep it isolated in its own leaf
component, initialise in `useEffect(…, [])` exactly once, push updates via `.set()` rather
than props-driven re-render, always `destroy()` on cleanup, and never mount it conditionally.
Pass `disable` Date objects, not strings — flatpickr parses disable strings with `dateFormat`.

**Convert dates with the local-time helpers in `DatePicker.tsx`, never `toISOString()`.**
In UTC+8 an early-morning selection serialises to the previous day, i.e. it books the wrong date.

**Zustand selectors that build a new array or object must be wrapped in `useShallow`.**
v5 compares with `Object.is`, so a fresh reference each render makes `useSyncExternalStore`
loop — "The result of getSnapshot should be cached to avoid an infinite loop".
`selectBookedDates` is the one that needs it today.

**Alerts are fired, not awaited.** `fireAlert` loads SweetAlert2 over the network and never
rejects. Do not `await` it inside a validation guard: an alert that fails to load must not be
able to skip a `return` and let an invalid booking through.

**Any full-screen overlay must call `useBodyScrollLock`** (`lib/use-body-scroll-lock.ts`).
It locks `<html>` as well as `<body>` — the root layout gives `<body>` `h-screen`, so overflow
propagates to the document element and locking only `<body>` does nothing. Pair it with
`overscroll-contain` on the overlay's own scroller to stop scroll chaining.

**Don't reintroduce duplicate `id` attributes.** The old `<template>`-cloning approach repeated
`id="cartTitle"`, `id="productImg"` etc. once per row. Use props and `className`. Keep an `id`
only where it is a real anchor or CSS target.

## Conventions

- Path alias `@/*` → repo root.
- `PascalCase.tsx` for components, named exports.
- Business rules (3% tax, `today + 14` minimum date, group-size caps) belong in `lib/`, not
  inline in a component.
- Content strings use `’` (U+2019) and `&nbsp;` (U+00A0) in places — preserve them verbatim
  when editing `data/products.ts`; letting an editor normalise them visibly shifts text.

## Related docs

- [project-scope.md](./project-scope.md) — what the product does and what it deliberately doesn't
- [tech-stack.md](./tech-stack.md) — every dependency and why
