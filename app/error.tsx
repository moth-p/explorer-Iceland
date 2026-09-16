'use client';

import { useEffect } from 'react';
import { MessagePage } from '@/components/layout/MessagePage';

/**
 * Route-level error boundary. Catches render and effect errors in any page
 * below the root layout, while keeping the header, footer and cart chrome
 * around it intact.
 */
export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // No error-reporting backend on a static export; the console is the sink.
    console.error(error);
  }, [error]);

  return (
    <MessagePage
      code="Oops"
      title="Something went wrong"
      action={
        <button
          type="button"
          onClick={reset}
          className="rounded-md border border-transparent bg-subPurple px-6 py-2 font-sans text-sm font-medium text-white shadow-sm hover:bg-mainYellow hover:text-gray-800 active:opacity-50"
        >
          Try again
        </button>
      }
    >
      This page hit an unexpected error. Trying again often clears it &mdash; your cart is
      stored in this browser and is not affected.
      {error.digest && (
        <span className="mt-4 block font-mono text-xs text-gray-400">
          Reference: {error.digest}
        </span>
      )}
    </MessagePage>
  );
}
