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
 * A data router rather than <BrowserRouter>, for two things the declarative
 * router does not have: route-level ErrorBoundary (which replaces Next's
 * error.tsx / global-error.tsx) and <ScrollRestoration />.
 *
 * basename is load-bearing, not cosmetic. lib/layout-variant.ts decides which
 * nav, footer and body font a page gets by matching pathname against '/',
 * '/login' and '/shop/'. Without a basename the deployed pathnames all start
 * with /explorer-Iceland, every match falls through to the shop variant, and
 * the home page silently renders the wrong chrome -- a bug that only appears in
 * the production build. With it set, useLocation().pathname arrives already
 * stripped and layout-variant.ts needs no changes at all.
 *
 * BASE_URL ends in '/' and is passed through untouched: React Router's
 * stripBasename handles a trailing slash, and '/' in dev is a no-op.
 */
export const router = createBrowserRouter(
  [
    {
      path: '/',
      Component: RootLayout,
      // Catches errors thrown by RootLayout itself, which the boundary below
      // cannot reach. It must not assume the header, footer or cart exist.
      ErrorBoundary: GlobalErrorBoundary,
      children: [
        {
          // A pathless layout route whose only job is to own this boundary, so
          // a page error renders inside the site chrome, as app/error.tsx did.
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
