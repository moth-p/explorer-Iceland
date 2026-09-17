# CLAUDE.md

Claude Code 在這個 repo 工作時的指引。

## 一律使用 UTF-8 繁體中文

在這個專案裡，Claude Code session 的**所有輸出都用繁體中文**（zh-TW、台灣用語、UTF-8 無 BOM）：

- **對話回覆** — 說明、計畫、摘要、結論。
- **文件** — 本目錄下的 `*.md`。
- **程式註解** — `//`、`/** */`、JSX 的 `{/* */}`、CSS 的 `/* */`、YAML 的 `#`、HTML 的 `<!-- -->`。

**保留英文、不要翻譯的部分：**

- 程式碼本身：識別字、型別、檔名、路徑、CLI 指令、npm script、CSS class、設定鍵、URL。
- **使用者看得到的介面文字**：`data/products.ts` 的行程內容、按鈕與表單標籤、`<PageMeta>` 的 title／description、alert 訊息。這是一個英文網站，翻了就不是翻譯而是改產品。
- 技術術語：hook、render、reference、fallback、build、basename、variant、selector、store、snapshot…… 夾在中文句子裡直接用英文，比硬翻好讀，也才 grep 得到官方文件。
- `eslint-disable`、`@ts-expect-error`、`@vite-ignore` 這類 pragma 註解的指令部分 — 那是給機器讀的，不是散文。
- commit message：沿用現有的英文 conventional commits 格式，與既有紀錄一致。

排版：中英文之間空一個半形空格，標點用全形（，。、；：「」）。

## 函式庫文件一律走 Context7

**只要工作碰到函式庫、框架、SDK、API 或 CLI 工具，就用 Context7 MCP server 取最新文件** —
Vite、React、React Router、Tailwind、shadcn/ui、Zustand、Swiper、react-day-picker、Sonner，
以及這裡用到的 GitHub Actions。涵蓋 API 語法、設定、版本遷移、函式庫層級的除錯與安裝步驟。

**就算你確定自己已經知道答案也要用。** 訓練資料落後於實際 release，而這個專案站在 Tailwind v4
（CSS-first 設定、沒有 tailwind.config.ts）、React Router v7 與 react-day-picker v10 上 —
這幾個的 API 都是近期才改過的。函式庫文件優先用 Context7，不要用 web search。

做法：
1. `resolve-library-id`，帶函式庫名稱與真正要問的問題 — 除非已經知道確切的 `/org/project` id。
2. `query-docs`，帶那個 id 與**完整問題**，不是關鍵字。一次一個概念。
3. 答案太薄的話，同一個呼叫加上 `researchMode: true` 再試一次。

**不要**用 Context7 來：重構這個 codebase、debug 我們自己的商業邏輯、code review，或一般程式概念。

## 指令

```bash
npm run dev          # 開發伺服器，http://localhost:3000
npm run build        # 建置到 dist/（不加 base 前綴 — 給本機預覽用）
npm run build:pages  # 正式建置，base=/explorer-Iceland/
npm run lint
npm run typecheck    # tsc -b
```

兩個 build script 都會跑 `postbuild` hook，把 `dist/index.html` 複製成 `dist/404.html`。
那份複本**就是** SPA fallback：GitHub Pages 遇到不認得的路徑會回 404.html，shell 開機，
React Router 再解出 route。少了它，每個 deep link 都是死路。

用 GitHub Pages 實際提供服務的方式預覽正式建置：

```bash
npm run build:pages
rm -rf /tmp/pagesroot && mkdir -p /tmp/pagesroot/explorer-Iceland
cp -R dist/. /tmp/pagesroot/explorer-Iceland/
npx serve /tmp/pagesroot -l 5000     # → http://localhost:5000/explorer-Iceland/
```

動部署之前一定先跑這個。DevTools 的 Network 篩 4xx — 應該要是零。

**這個檢查不要用 `serve --single` 或 `vite preview`。** 兩者都會套上自己的 history fallback，
剛好蓋掉要驗的東西：`dist/404.html` 不存在或內容不對。`serve` 也只會在自己的 root 找
`404.html`，所以這個 recipe 驗得到帶 base 前綴的 asset URL，但驗不到 fallback；CI 另外用
`cmp dist/index.html dist/404.html` 確認。

## 架構

```
index.html    shell；掛著 <body> 的 class 與字型 preload
src/
  main.tsx    entry
  router.tsx  route table — createBrowserRouter，basename 取自 BASE_URL
  index.css   Tailwind v4 theme、背景 @utility 規則、@font-face
  routes/     RootLayout、每個 route 一個元件，以及兩個 error boundary
  components/ layout/ cart/ product/ shop/ booking/ home/ auth/ ui/
  lib/        products.ts（accessor）、cart-store.ts、dates.ts、alerts.ts、asset.ts
  data/       products.ts — 12 筆行程資料
public/       img/ video/ fonts/ icon.png .nojekyll
```

Route：`/`、`/about`、`/shop`、`/shop/:id`、`/login`、`*`。

`components/ui/` 由 `shadcn add` 產生，當成 vendored 看待。在那裡改動沒問題（那就是 shadcn 的
模式），但要記下來，因為下一次對同一個元件跑 `shadcn add` 就會把檔案蓋掉。

這個結構的重點是：navbar、hamburger menu、cart drawer、back-to-top 按鈕與 footer
各**只存在一份**。搬遷前的站把它們貼在四個 HTML 檔裡，每個還各帶 ~80 行重複的 inline script。
不要再做每頁一份的複本。

## 規則

**絕對不要在 module scope 或 render body 裡讀 `localStorage`。** cart store 是用
`skipHydration: true` 建立的，由 `components/cart/CartHydration.tsx` 的 effect 負責 rehydrate。
那個元件是承重結構：少了它，購物車根本不會 rehydrate。在 render 期間讀 storage 也會讓第一次
paint 依賴它。

**行程 id 必須符合 `^[a-z0-9-]+$`。** 每個 id 都是一段 URL。`lib/products.ts` 裡有 build-time
assertion 把關 — 一旦觸發，把 id slugify，原值留成 `legacyId`。注意它現在是在瀏覽器第一次
import 時 throw，而不是讓 build 失敗，所以你一跑 `npm run dev` 就會看到。

**category 是每筆行程上的獨立欄位。** 不要試圖從 id 解析：原本每個 id 都以 `hiking-` 開頭，
連 sightseeing 與 outdoor-sports 的行程也是。

**Tailwind v4 在 CSS 裡設定，沒有 `tailwind.config.ts`。** theme 放在 `src/index.css` 的
`@theme` 區塊。不要隨便加 plugin — plugin 會注入 base style，可能讓整個設計位移。Flowbite 與
daisyUI 正是因此被移除，也正是為什麼 `shadcn init` 在這裡絕對不能跑：它會附加一段
`@layer base` 去重設 `body` 的樣式。見 [tech-stack.md](./tech-stack.md)。

**theme key 是 camelCase，這需要 `tailwindcss >= 4.1.18`。** 4.0.0 到 4.1.17 會默默丟掉含大寫
字母的 theme key，`--color-mainYellow` 什麼都產不出來，網站會在沒有任何 build error 的情況下
裸奔。CI 會 grep 建置後的 CSS 找 `bg-mainYellow` 來擋這種 regression。

**背景圖是 `@utility` 規則，不是 theme key。** Tailwind v4 沒有 `--background-image-*`
namespace。它們必須維持 `@utility` 而不是普通 class，因為 `ShopBanner` 用了 `md:bg-swiper-1`，
而 variant 只能組合到真正的 utility 上。

**Asset 路徑。** Vite 會把 `base` 套到它解析得到的每樣東西 — module import、hashed asset，
以及 CSS 裡的 `url()`。它看不到純 `<img>`／`<video>` 的 src，所以那些要走 `lib/asset.ts` 的
`asset()`。那個 helper 會去掉路徑開頭的斜線，因為 `BASE_URL` 結尾一定有一個：直接串接會得到
`//img/x.png`，那是 protocol-relative URL，會解析成 `http://img/x.png`，所有圖片都壞掉。
React Router 的 `<Link>` 自己會套 basename — 絕對不要把 `to` 包進 `asset()`。產品資料存的是裸的
`/img/…`，這樣購物車項目才可攜。

**日期轉換用 `lib/dates.ts` 的 local-time helper，不要用 `toISOString()`。**
`onSelect` 交回來的是本地午夜的 `Date`；在 UTC+8 對它呼叫 `toISOString()` 會得到前一天，
也就是訂錯日期。

**`onSelect` 回傳的是 `Date | undefined`。** 使用者點已選取的那一天時，react-day-picker 會清掉
選取。`undefined` 那個分支必須清掉 parent 的 state，不能忽略。picker 是完全受控的，自己不持有
選取狀態。

**會建立新陣列或新物件的 Zustand selector 必須用 `useShallow` 包起來。** v5 用 `Object.is`
比較，所以每次 render 都給出新 reference 會讓 `useSyncExternalStore` 空轉 —
「The result of getSnapshot should be cached to avoid an infinite loop」。
目前需要的是 `selectBookedDates`。

**Alert helper 是同步的，回傳 void。** 沒有東西可以 await。（它們以前會在網路上 lazy load
SweetAlert2，所以必須 fire-and-forget，以免 chunk 載入失敗讓不合法的訂單跳過驗證的 `return`。
Sonner 是打包進去的，這個性質現在是結構上的 — 保持原樣。）

**用 Radix 做的 modal 仍然要呼叫 `useHtmlScrollLock`**（`lib/use-html-scroll-lock.ts`）。
Radix 鎖的是 `<body>` 並補償 scrollbar 寬度，但不管 `<html>` — 而 shell 給了 `<body>`
`h-screen`，所以真正的 scroll container 是 document element。少了它，按 Space 或方向鍵下仍然會
捲動 modal 後面的頁面。這個 hook **不可以**同時去動 `<body>` 或加 padding：兩邊都做會把
scrollbar 補償算兩次，在 Windows 與 Linux 上讓頁面位移約 15px，而在 macOS 的 overlay scrollbar
上完全看不出來。搭配 overlay 自己的 scroller 加上 `overscroll-contain`，擋掉 scroll chaining。

**這個站沒有 dark mode。** 絕對不要在 `<html>` 加 `class="dark"`，也絕對不要刪掉
`src/index.css` 裡的 `@custom-variant dark` 那一行。Tailwind v4 預設的 `dark:` variant 是
`@media (prefers-color-scheme: dark)`，而 shadcn 的元件裡滿是 `dark:` utility — 少了那行，
每個作業系統設成深色模式的訪客都會觸發它們，解析到這個專案從未定義的值。

**不要再引入重複的 `id` 屬性。** 舊的 `<template>` cloning 做法會讓 `id="cartTitle"`、
`id="productImg"` 等等每一列重複一次。用 props 與 `className`。只有在 `id` 真的是錨點或
CSS target 時才保留。

## 慣例

- 路徑別名 `@/*` → `src/`。它在 **`tsconfig.app.json`**（給 compiler）與 **`tsconfig.json`**
  （因為 shadcn CLI 是從 root config 解析的；少了它 `shadcn add` 會寫進一個名為 `./@/` 的目錄）
  兩邊都要宣告。
- 元件檔名用 `PascalCase.tsx`，具名匯出。
- 商業規則（3% 稅、`today + 14` 最小日期、團體人數上限）屬於 `lib/`，不要寫在元件裡。
- 每個 route 的 `<title>`／`<meta>` 來自 `<PageMeta>`，用 React 19 的原生 hoisting。React
  **不會**去重：每個 route 只 render 一個，`RootLayout` 裡一個都不要，並且 `index.html` 裡不能
  有 `<title>`，否則它會永遠贏過每一個 route。
- 內容字串有些地方用了 `’`（U+2019）與 `&nbsp;`（U+00A0） — 編輯 `data/products.ts` 時要逐字
  保留，讓編輯器把它們正規化會讓文字明顯位移。

## 相關文件

- [project-scope.md](./project-scope.md) — 產品做什麼，以及刻意不做什麼
- [tech-stack.md](./tech-stack.md) — 每個依賴與它存在的理由
