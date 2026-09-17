# 技術選型 — Explorer Iceland

> 每個依賴、它為什麼在這裡，以及什麼被否決了。
> 產品邊界見 [project-scope.md](./project-scope.md)。

## 核心

| | 選擇 | 理由 |
|---|---|---|
| Build | **Vite 8** | dev server 秒開，正式 build 只要幾秒；一個只有五條 route 的站，不需要為了框架 runtime 繞路。 |
| UI | **React 19** | 同時提供了 `<title>`／`<meta>` hoisting，取代掉 Next 的 metadata export。 |
| Router | **React Router 7** | 當作 data router 用（`createBrowserRouter`）而不是 `<BrowserRouter>`，因為 route 層級的 `ErrorBoundary` 與 `<ScrollRestoration />` 只存在於前者。 |
| 語言 | **TypeScript** | 12 筆行程、每筆 17 個欄位，加上一個透過 `localStorage` 跨頁面的購物車結構。這兩者以前都是沒有型別的全域變數。 |
| 樣式 | **Tailwind CSS 4** | CSS-first 的 `@theme` 設定；已經沒有 `tailwind.config.ts` 了。 |
| 元件 | **shadcn/ui** | 複製進來的 Radix 元件，重新套上既有配色。見下方。 |
| 購物車狀態 | **Zustand + `persist`** | 見下方 *狀態管理*。 |
| 產出 | **SPA** + `404.html` fallback | 跟以前一樣，以純檔案部署到 GitHub Pages。 |

### 從 Next.js 搬離

這個專案在改用 Vite 之前跑在 Next.js 15（App Router）搭 `output: 'export'` 上。
直說代價：export 會產出 17 個內容完整的 HTML 檔，每條 route 一個、含全部 12 條行程，
各自帶著自己的 `<title>` 與 description。SPA 只產出一個空的 shell，
**除了根路徑以外的每個 URL 現在都回 HTTP 404**（回的是那個 shell，fallback 就是這樣運作的），
而 metadata 要等 JavaScript 跑完才存在。爬蟲與連結預覽看到的是一頁空白。
如果哪天這件事開始重要，對那 17 條已知 route 跑一次 prerender（`vite-react-ssg` 之類）
就能補回來，而且不必動 router。

原本是 Server Component 的那五個元件 — `SimpleFooter`、`SiteFooter`、`ProductCard`、
`Marquee`、`MessagePage` — 都是從 props 算出來的靜態 JSX，送到 client 大約多 3–5 KB（gzip）。
留下 Next 的理由從來不是這個。

### Tailwind v4，以及那個真的會咬人的版本下限

v3 的 `tailwind.config.ts` 變成了 `src/index.css` 裡的 `@theme` 區塊。token 名稱
**逐位元組保留**，camelCase 也照舊，所以約 2,800 行 markup 裡沒有一個 `className` 需要改。

這需要 **`tailwindcss >= 4.1.18`**。4.0.0 到 4.1.17 會默默丟掉含大寫字母的 theme key，
`--color-mainYellow` 產不出任何 utility，網站會在*完全沒有 build error* 的情況下失去品牌色
（[tailwindlabs/tailwindcss#18114](https://github.com/tailwindlabs/tailwindcss/issues/18114)）。
CI 會 grep 建置後的 CSS 找 `bg-mainYellow`，讓降版無法悄悄上線。

14 個 `backgroundImage` 項目搬不進 `@theme`：v4 沒有 `--background-image-*` namespace。
它們改成 `@utility` 規則 — 而且必須維持這個形式，因為 `ShopBanner` 用了 `md:bg-swiper-1`，
而 variant 只能組合到真正的 utility 上。

## Design token

定義在 `src/index.css` 的 `@theme` 區塊，與原始設定一致。

```
mainYellow  #D4FB71      accent、hover 狀態
subPurple   #8CABFB      按鈕、連結
lightGray   #F5F5F5      面板、展開時的 nav 背景
```

字型（key 刻意沿用，所以移植過來的 markup 裡沒有一個 `className` 需要改）：

```
font-krona                   KronaOne-Regular      標題
font-libreBodoni_Regular     LibreBodoni-Regular   展示用襯線
font-libreBodoni_boldItalic  LibreBodoni-BoldItalic
```

原 repo 的七個 `.ttf` 裡，只有這三個真的被引用過；
`BebasNeue-Regular` 與 `Stardom-Regular` 零使用，已移除。

Keyframes：`marquee`（32s linear infinite）、`fadeIn`、`fadeInSlow`、`rotateStar`。

### 字型是 `public/fonts/` 上的 `@font-face`

`next/font/local` 同時給了 hash 過的檔名*與* preload hint。用靜態 `index.html` 只能二選一，
因為你沒辦法把一個 hash 過的檔名寫進 `<link rel="preload">`。而在 GitHub Pages 上 —
它對所有東西一律回 `Cache-Control: max-age=600` — hash 幾乎買不到什麼，preload 卻很關鍵：
hero 的文字標是 150px 的 `font-libreBodoni_boldItalic`，也是 LCP 元素。

所以三個 `.ttf` 以穩定檔名放在 `public/fonts/`，搭配手寫的 `@font-face` 區塊，
以及 `index.html` 裡的三個 preload link。那些 link 上的 `crossorigin` 就算同源也是必要的，
否則瀏覽器會把每個檔案抓兩次。

bold-italic 那個字面雖然叫這個名字，仍然以 `weight: 400; style: normal` 註冊成自己的 family —
跟之前完全一樣 — 這樣瀏覽器就不會自行合成字重或斜體。

把這三個檔案（339 KB）轉成 woff2 可以少 50–65%，值得另外做。

### shadcn 的 token 對映到這三個顏色上

shadcn 元件是寫在 `--primary`、`--accent`、`--border` 這類變數上的，所以 `src/index.css`
把它們對映到既有的配色，而不是直接用 shadcn 的中性預設值。markup 仍然直接用
`bg-subPurple`／`text-mainYellow`；那些變數是給產生出來的元件用的。

要對的是 **`--accent`**。shadcn 用它當 hover 的*面*色 — ghost 按鈕、選單項目、日曆日期
hover — 而這個站的 hover 面色是 `lightGray` 配 `subPurple` 文字。`mainYellow` 是*填色*按鈕的
hover，那是 `--secondary`。這樣對映之後，一顆原廠的 `<Button variant="ghost" size="icon">`
render 出來就是 nav 既有的 `hover:bg-lightGray hover:text-subPurple`，一個 override 都不用。
兩者對調的話，nav 裡每顆 ghost 按鈕都會變成螢光綠。

**這個站沒有 dark mode，而這需要刻意寫一行。** `src/index.css` 宣告了
`@custom-variant dark (&:is(.dark *))`，而且從不把 `.dark` 放到 `<html>` 上。
Tailwind v4 預設的 `dark:` variant 是 `@media (prefers-color-scheme: dark)`，
而 shadcn 的元件裡滿是 `dark:bg-input/30` 之類的東西 — 少了這個重新定義，
它們會對每個作業系統設成深色模式的訪客生效，並解析到這個專案從未定義的變數。
有了它，那些 utility 仍然會編譯，但永遠不會被觸發。絕對不要刪掉那一行，
也絕對不要加上 `class="dark"`。

## 狀態管理

**Zustand 搭 `persist` middleware**，key 是 `cartData`（沿用原本的 key）。

之所以選它而不是 React Context + `useReducer`，是因為這裡真正難的部分就是持久化：
`persist` 把序列化、schema 版本與 migration 集中在一個地方處理，而 selector 訂閱代表
購物車數量變動時只有 cart badge 重新 render，不會連 drawer 一起 render。
用 Context 的話，每個 consumer 都得自己手刻讀寫 effect 再加一個 mounted flag。

**`skipHydration: true` 是承重結構**，而 `<CartHydration />` 才是讓購物車能運作的關鍵 —
少了它的 effect，store 永遠不會 rehydrate，購物車永遠是空的。它當初是為了避開 Next 底下的
server／client hydration mismatch 而引入的；在 SPA 上理由變窄了，但機制沒變，
行為也跟以前一樣（rehydrate 之前會有一個 frame 的空購物車）。

由此推出的規則依然成立：**絕對不要在 module scope 或 render body 裡讀 `localStorage`。**

## 函式庫

| 函式庫 | 用途 | 為什麼是它，而不是替代方案 |
|---|---|---|
| **Swiper 11** | `/shop` 的 banner carousel | `swiper/react` 是官方的 React binding。以前是 CDN `<script>` 加一個全域變數；現在打包進來並鎖版本。 |
| **shadcn/ui** | Dialog、Popover、Calendar、Checkbox、Button、Label、Sonner | 把 Radix 的行為（focus trap、Escape、點外面關閉、ARIA）當成自有原始碼而不是依賴，並重新套上既有配色。`shadcn init` 在這裡**絕對**不跑 — 見 *已移除*。 |
| **react-day-picker 10** | 訂購日期 picker | 隨 shadcn 的 Calendar 一起進來。取代 Flatpickr — 後者接管自己 input 的 DOM，需要關掉 `altInput`、只能初始化一次、要用命令式的 `.set()`，還得明確 `destroy()`。受控的 React 元件這些都不需要。原生 `<input type="date">` 仍然被否決：它沒辦法 render 設計要求的 `F j, Y` 格式。 |
| **Sonner** | 驗證與成功通知 | 取代 SweetAlert2。打包進來約 11 KB，對比原本按需抓取的約 40 KB；而且它是同步的，直接消掉了舊 `fireAlert()` wrapper 當初存在的那一整類 bug。 |
| **lucide-react** | shadcn 的圖示集 | 只在 `components/ui` 裡使用；網站自己的圖示仍然是 Font Awesome。 |
| **Font Awesome Free** | 全站約 49 個圖示 | 自架 CSS，在 `globals.css` 裡 `@import`。`@fortawesome/react-fontawesome` 被否決：那代表要重寫每一個 `<i class="fa-…">` 並逐一註冊圖示，換來零視覺變化。自架省掉 CDN 來回，也鎖住版本。 |
| **animate.css** | drawer 淡入、捲動揭示 | 真的有在用（`animate__fadeIn`、`animate__fadeInUp`）。它的 `@import` 必須是 `globals.css` 的**第一行** — CSS 規定 `@import` 要排在其他規則之前。 |

### 已移除

| 移除項目 | 理由 |
|---|---|
| **Flowbite** | 其實從來沒被載入過 — `plugins` 陣列被巢狀寫*在* `theme.extend` 裡面，所以 plugin 被默默忽略了。而且沒有任何一頁用到它：`data-modal`、`data-drawer`、`data-dropdown` 出現次數都是零。drawer、dropdown 與 flyout 全是手刻的。把巢狀「修好」反而會*注入*新的 base style，破壞視覺一致性。 |
| **daisyUI** | 掛在 `devDependencies` 裡，但從來沒有在任何地方註冊成 plugin，也沒有任何一頁出現 daisyUI 的 class。純粹是負擔。 |
| **`shadcn init`** | 它不是依賴，但風險一樣：它會附加一段 `@layer base`，設定 `body { background: var(--background) }` 外加一個全域 border reset，會蓋掉 `bg-lightGray` 並把整站樣式改掉。`components.json` 改成手寫。`shadcn add` 是安全的，那才是我們用的。 |
| **next-themes** | 由產生出來的 `sonner.tsx` 帶進來，只為了回答一個答案永遠固定的問題 — 這個站只有一種 theme。wrapper 已經精簡掉。 |
| **CDN `<script>` 標籤** | Swiper、Flatpickr、SweetAlert2 與 Font Awesome 全都從 jsDelivr／cdnjs 載入，即使其中三個早就是 npm 依賴。現在一律打包：沒有第三方來回、沒有版本漂移、離線也能跑。 |
| **`dist/output.css`** | 過期的 build artifact。五個頁面連的都是 `./src/output.css`；`dist/` 從來沒被提供過。 |

## 建置與部署

```bash
npm run dev          # vite，http://localhost:3000
npm run build        # 建置到 dist/，不加 base 前綴（本機預覽）
npm run build:pages  # 以 base=/explorer-Iceland/ 建置（正式）
npm run lint
npm run typecheck    # tsc -b
```

透過 GitHub Actions（`.github/workflows/deploy.yml`）部署到 **GitHub Pages** 的
`https://moth-p.github.io/explorer-Iceland/`：`npm ci` → typecheck → lint →
`npm run build:pages` → 一個驗證步驟 → `upload-pages-artifact` → `deploy-pages`。

### SPA fallback

由 client 端路由的 SPA 放在靜態主機上，沒有伺服器能把 `/shop/hiking-1-…` 對回 shell。
`postbuild` hook 把 `dist/index.html` 複製成 `dist/404.html`；Pages 對任何不認得的路徑都回那個
檔案，shell 開機，React Router 再從 URL 解出 route。回應狀態碼真的是 404 —
頁面不管怎樣都會正確 render，但上面那個 SEO 取捨之所以長這樣，原因就在這裡。

`public/.nojekyll` 保留著，儘管 `deploy-pages@v4` 並不會跑 Jekyll。

### base — 會咬人的那一段

Pages 是以*專案*站台的形式把這個站放在 `/explorer-Iceland/` 底下，所以 Vite 的 `base` 是必要的。
它來自 `BASE_PATH`，在 npm script 裡 inline 設定，而且**保留結尾的斜線** —
`import.meta.env.BASE_URL` 就是那個值本身，而 `lib/asset.ts` 與 router 的 `basename`
都是照著「結尾有 `/`」這個前提寫的。

Vite 會把 `base` 套到它解析得到的每樣東西：module import、hashed asset、`index.html` 裡的標籤，
以及 CSS 裡的 `url()` — 包括那 14 張背景圖，它們在 Next 底下必須手動字串插值，
因為 `basePath` 碰不到它們。那段插值已經消失了。

Vite 看不到的是純 `<img>`／`<video>` 的 `src`。那些走 `lib/asset.ts`：

```ts
export const asset = (path: string) => `${import.meta.env.BASE_URL}${path.replace(/^\//, '')}`;
```

去掉開頭斜線那一行是整個專案最脆弱的一行。`BASE_URL` 結尾有 `/`，而儲存的路徑開頭也有一個，
所以天真的 template literal 會產出 `//img/x.png` — 一個 protocol-relative URL，
瀏覽器會把它解析成 `http://img/x.png`，害死每一張圖片與 hero 影片。
產品資料刻意存裸的 `/img/…` 形式，好讓持久化的購物車項目保持可攜。

這裡有兩種失效模式在正式環境是無聲的、在本機又看不到，所以 CI 直接對建置產物下斷言：
少了某個 `public/` 檔案時，它的 `url()` 會維持沒有前綴而且不報 build error；
Tailwind 降到 4.1.18 以下則會讓品牌色消失。見 `deploy.yml` 裡的驗證步驟。

React Router 的 `<Link>` 自己會套 router 的 `basename` — 絕對不要把 `to` 包進 `asset()`。

### basename 是承重結構

`lib/layout-variant.ts` 靠比對 `pathname` 與 `/`、`/login`、`/shop/` 來決定一頁拿到哪一套 nav、
footer 與 body 字型。沒有 `basename` 的話，部署後每一個 pathname 都以 `/explorer-Iceland` 開頭，
三個判斷全部落空、落到 shop 那一套，首頁就會默默 render 出錯誤的 chrome —
一個只在正式建置才會出現的 bug。設定好之後，`useLocation().pathname` 拿到的是已經去掉前綴的值，
`layout-variant.ts` 在整個搬遷過程中一行都不用改。

## 路由

行程詳情頁是 `/shop/:id`。原本的 `?id=` query parameter 被拿掉了，讓每條行程有自己可分享的 URL。
12 條行程是一個封閉集合，所以碰到不認得的 id 時，`ProductDetail` 就地 render 404 —
這正是 Next 的 `dynamicParams = false` 做的事，也保住了站台 chrome，
跟框架的 not-found 頁面表現一致。

**行程 id 是 ASCII slug**，這是正確性要求，不是風格偏好。
原本有五個 id 帶變音符號（`Ásbyrgi`、`Jökulsárlón`、`Mývatn`、`Snæfellsnes`、`Dalvík`）。
每個 id 都是一段 URL，而 percent-encoding 加上 Unicode 正規化（macOS 正規化成 NFD，
瀏覽器送出的是 NFC）讓那五個在不同主機上都不可靠。`data/products.ts` 用 `legacyId` 保留原值，
`lib/products.ts` 裡有一個 assertion 強制 `^[a-z0-9-]+$` —
它現在是在瀏覽器第一次 import 時 throw，而不是讓 build 失敗，所以你一跑 `npm run dev` 就會看到。

## 專案結構

```
index.html    shell：<body> 的 class、favicon、三個字型 preload，沒有 <title>
src/
  main.tsx    entry
  router.tsx  route table
  index.css   Tailwind v4 theme、shadcn token、背景 @utility 規則、@font-face
  routes/     RootLayout、每個 route 一個元件，以及兩個 error boundary
  components/ 依領域分：layout/ cart/ product/ shop/ booking/ home/ auth/ + ui/
  lib/        products accessor、cart store、dates、alerts、asset()
  data/       products.ts — 12 筆行程資料
public/       img/ video/ fonts/ icon.png .nojekyll
```

原始碼在 Vite 搬遷時移到了 `src/` 底下。所有 import 本來就都走 `@/*` alias，
所以把它從 repo root 指向 `src/` 之後，約 60 個 import specifier 全部逐位元組不變 —
整個搬動就是一次 `git mv` 加兩行設定。

`components/ui/` 由 `shadcn add` 產生：那是我們擁有、也可以修改的 vendored 程式碼，
但下一次對同一個元件跑 `shadcn add` 就會被覆蓋。目前有兩處這樣的修改 —
`dialog.tsx` 移除了 zoom 動畫，`sonner.tsx` 拿掉了 next-themes。
