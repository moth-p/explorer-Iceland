import { useEffect } from 'react';
import { useRouteError } from 'react-router';

/**
 * Last-resort boundary: catches errors thrown by RootLayout itself, which
 * RouteErrorBoundary cannot reach because it renders inside that layout.
 *
 * It cannot rely on the header, footer or cart being mounted, and is
 * deliberately plain for that reason. (Under Next this was global-error.tsx and
 * had to supply its own <html>/<body>; index.html owns those now.)
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
