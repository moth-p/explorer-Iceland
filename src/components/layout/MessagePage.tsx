import { Link } from 'react-router';

/**
 * 404 和錯誤畫面共用的外殼，這樣它們看起來像這個網站的一部分，而不是
 * framework 的預設畫面。Server Component。
 */
export function MessagePage({
  code,
  title,
  children,
  action,
}: {
  code: string;
  title: string;
  children: React.ReactNode;
  action?: React.ReactNode;
}) {
  return (
    <main className="flex min-h-screen w-screen flex-col items-center justify-center px-6 py-32 text-center">
      <p className="font-krona text-6xl text-subPurple sm:text-8xl">{code}</p>

      <h1 className="mt-8 font-krona text-2xl text-gray-800 sm:text-3xl">{title}</h1>

      <div className="mt-6 max-w-lg text-pretty font-sans text-gray-500">{children}</div>

      <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
        {action}
        <Link
          to="/shop"
          className="rounded-md border border-transparent bg-subPurple px-6 py-2 font-sans text-sm font-medium text-white shadow-sm hover:bg-mainYellow hover:text-gray-800 active:opacity-50"
        >
          Browse tours
        </Link>
        <Link
          to="/"
          className="rounded-md px-6 py-2 font-sans text-sm font-medium text-subPurple ring-1 ring-inset ring-gray-300 hover:bg-white active:opacity-50"
        >
          Back home
        </Link>
      </div>
    </main>
  );
}
