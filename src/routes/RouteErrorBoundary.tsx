import { useEffect } from 'react';
import { useNavigate, useRouteError } from 'react-router';
import { MessagePage } from '@/components/layout/MessagePage';

/**
 * 路由層級的錯誤 boundary。捕捉任何頁面裡 render 和 effect 的錯誤，
 * 同時讓周圍的 header、footer 和 cart chrome 保持完整。
 *
 * React Router 的 boundary 沒有 `reset()`，也沒有 error digest：
 * 這是一個靜態的 bundle，沒有 server 能對任何東西產生 fingerprint。
 * navigate(0) 是一次真正的重新整理，這也是在 static export 上
 * 「Try again」實際上做的事。
 */
export function RouteErrorBoundary() {
  const error = useRouteError();
  const navigate = useNavigate();

  useEffect(() => {
    // 靜態網站沒有錯誤回報的 backend；console 就是唯一的接收端。
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
