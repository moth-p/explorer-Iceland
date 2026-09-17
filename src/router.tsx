import { createBrowserRouter } from 'react-router';
import { About } from './routes/About';
import { GlobalErrorBoundary } from './routes/GlobalErrorBoundary';
import { Home } from './routes/Home';
import { Login } from './routes/Login';
import { NotFound } from './routes/NotFound';
import { ProductDetail } from './routes/ProductDetail';
import { RootLayout } from './routes/RootLayout';
import { RouteErrorBoundary } from './routes/RouteErrorBoundary';
import { Shop } from './routes/Shop';

/**
 * 用 data router 而不是 <BrowserRouter>，是因為宣告式的 router 少了兩樣東西：
 * route 層級的 ErrorBoundary（用來取代 Next 的 error.tsx / global-error.tsx）
 * 以及 <ScrollRestoration />。
 *
 * basename 是有實際作用的，不是裝飾用的。lib/layout-variant.ts 是靠比對
 * pathname 跟 '/'、'/login'、'/shop/' 來決定一個頁面要用哪種 nav、footer
 * 和 body 字體。如果沒有設定 basename，部署後的 pathname 全都會以
 * /explorer-Iceland 開頭，每個比對都會落到 shop 這個 variant，
 * 首頁就會悄悄地套用錯誤的 chrome -- 這個 bug 只會在 production build
 * 裡出現。設定了 basename 之後，useLocation().pathname 拿到的就已經是
 * 去掉 prefix 的值，layout-variant.ts 完全不需要改。
 *
 * BASE_URL 是以 '/' 結尾的，會原封不動地傳進去：React Router 的
 * stripBasename 會處理結尾的斜線，而在 dev 環境下 '/' 本來就是個 no-op。
 */
export const router = createBrowserRouter(
  [
    {
      path: '/',
      Component: RootLayout,
      // 用來捕捉 RootLayout 本身丟出來的錯誤，下面那個 boundary 碰不到這些。
      // 它不能假設 header、footer 或 cart 一定存在。
      ErrorBoundary: GlobalErrorBoundary,
      children: [
        {
          // 一個沒有路徑的 layout route，唯一的工作就是擁有這個 boundary，
          // 這樣頁面的錯誤才會渲染在網站的 chrome 裡面，就像以前的
          // app/error.tsx 一樣。
          ErrorBoundary: RouteErrorBoundary,
          children: [
            { index: true, Component: Home },
            { path: 'about', Component: About },
            { path: 'shop', Component: Shop },
            { path: 'shop/:id', Component: ProductDetail },
            { path: 'login', Component: Login },
            { path: '*', Component: NotFound },
          ],
        },
      ],
    },
  ],
  { basename: import.meta.env.BASE_URL },
);
