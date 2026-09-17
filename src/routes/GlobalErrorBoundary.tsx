import { useEffect } from 'react';
import { useRouteError } from 'react-router';

/**
 * 最後一道防線的 boundary：捕捉 RootLayout 本身丟出的錯誤，
 * RouteErrorBoundary 碰不到這些，因為它是渲染在那個 layout 裡面的。
 *
 * 它不能依賴 header、footer 或 cart 已經被掛載，所以刻意寫得很單純。
 * （在 Next 底下這曾經是 global-error.tsx，還必須自己提供
 * <html>/<body>；現在這些是 index.html 負責的。）
 */
export function GlobalErrorBoundary() {
  const error = useRouteError();

  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <main className="flex min-h-screen w-screen flex-col items-center justify-center px-6 text-center font-sans">
      <h1 className="text-2xl font-semibold text-gray-800">Something went wrong</h1>
      <p className="mt-4 max-w-md text-pretty text-gray-500">
        Explorer failed to load. Reloading usually fixes it.
      </p>
      <button
        type="button"
        onClick={() => window.location.reload()}
        className="mt-8 rounded-md bg-subPurple px-6 py-2 text-sm font-medium text-white shadow-sm hover:bg-mainYellow hover:text-gray-800 active:opacity-50"
      >
        Try again
      </button>
    </main>
  );
}
