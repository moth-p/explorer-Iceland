import { useEffect } from 'react';
import { useNavigate, useRouteError } from 'react-router';
import { MessagePage } from '@/components/layout/MessagePage';

/**
 * Route-level error boundary. Catches render and effect errors in any page,
 * while keeping the header, footer and cart chrome around it intact.
 *
 * There is no `reset()` on a React Router boundary, and no error digest: this
 * is a static bundle with no server to fingerprint anything. navigate(0) is a
 * real reload, which is what "Try again" amounted to on the static export too.
 */
export function RouteErrorBoundary() {
  const error = useRouteError();
  const navigate = useNavigate();

  useEffect(() => {
    // No error-reporting backend on a static site; the console is the sink.
    console.error(error);
  }, [error]);

  return (
    <MessagePage
      code="Oops"
      title="Something went wrong"
      action={
        <button
          type="button"
          onClick={() => navigate(0)}
          className="rounded-md border border-transparent bg-subPurple px-6 py-2 font-sans text-sm font-medium text-white shadow-sm hover:bg-mainYellow hover:text-gray-800 active:opacity-50"
        >
          Try again
        </button>
      }
    >
      This page hit an unexpected error. Trying again often clears it &mdash; your cart is
      stored in this browser and is not affected.
    </MessagePage>
  );
}
