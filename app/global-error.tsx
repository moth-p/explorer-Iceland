'use client';

import { useEffect } from 'react';
import './globals.css';

/**
 * Last-resort boundary: catches errors thrown by the root layout itself, which
 * app/error.tsx cannot reach because it renders inside that layout.
 *
 * It replaces the whole document, so it must supply its own <html> and <body>
 * and cannot rely on the header, footer or fonts being mounted. Deliberately
 * plain for that reason.
 */
export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <html lang="en">
      <body className="bg-lightGray">
        <main className="flex min-h-screen w-screen flex-col items-center justify-center px-6 text-center font-sans">
          <h1 className="text-2xl font-semibold text-gray-800">Something went wrong</h1>
          <p className="mt-4 max-w-md text-pretty text-gray-500">
            Explorer failed to load. Reloading usually fixes it.
          </p>
          {error.digest && (
            <p className="mt-4 font-mono text-xs text-gray-400">Reference: {error.digest}</p>
          )}
          <button
            type="button"
            onClick={reset}
            className="mt-8 rounded-md bg-subPurple px-6 py-2 text-sm font-medium text-white shadow-sm hover:bg-mainYellow hover:text-gray-800 active:opacity-50"
          >
            Try again
          </button>
        </main>
      </body>
    </html>
  );
}
