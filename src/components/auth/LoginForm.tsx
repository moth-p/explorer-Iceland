import { useState } from 'react';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { asset } from '@/lib/asset';

/**
 * 登入表單。這裡沒有 backend，而且 static export 也沒有 Server Actions，
 * 所以這裡只驗證輸入然後就停下來 -- 原本的版本是 POST 到 "#"，
 * 效果只是重新整理頁面而已。
 *
 * 下面有一個 class 名稱（password input 上的
 * `focus:outline-subborder-subPurple`）是從原本的程式碼帶過來的手誤。
 * 它不是一個真正的 utility，什麼都不會產生，跟以前一樣；保留它是為了讓
 * markup 仍然相符。
 *
 * 這個手誤的另外兩個副本原本在手刻的 checkbox 上 -- 一個 25 行、
 * appearance-none 的 input，透過 CSS grid 疊上一個 SVG 打勾符號 --
 * 現在被 Radix 的 Checkbox 取代了。因為它們原本就沒有產生任何 CSS，
 * 移除它們可以證明是像素級一致的。
 */
export function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [remember, setRemember] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  return (
    <div className="mt-10 font-sans sm:mx-auto sm:w-full sm:max-w-[480px]">
      <div className="bg-white px-6 py-12 shadow sm:rounded-lg sm:px-12">
        <form
          className="space-y-6"
          onSubmit={(e) => {
            e.preventDefault();
            setSubmitted(true);
          }}
        >
          <div className="sm:mx-auto sm:w-full sm:max-w-md">
            <h2 className="text-center font-krona text-xl font-bold tracking-tight text-gray-800">
              Log in
            </h2>
          </div>

          <div>
            <label htmlFor="email" className="block text-sm/6 font-medium text-gray-800">
              Email address
            </label>
            <div className="mt-2">
              <input
                type="email"
                name="email"
                id="email"
                autoComplete="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-800 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-subPurple sm:text-sm/6"
              />
            </div>
          </div>

          <div>
            <label htmlFor="password" className="block text-sm/6 font-medium text-gray-800">
              Password
            </label>
            <div className="mt-2">
              <input
                type="password"
                name="password"
                id="password"
                autoComplete="current-password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-800 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-subborder-subPurple sm:text-sm/6"
              />
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Checkbox
                id="remember-me"
                name="remember-me"
                checked={remember}
                onCheckedChange={(checked) => setRemember(checked === true)}
                className="size-4 cursor-pointer rounded border-gray-300 bg-white data-[state=checked]:border-subPurple data-[state=checked]:bg-subPurple data-[state=checked]:text-white"
              />
              <Label htmlFor="remember-me" className="block cursor-pointer text-sm/6 font-normal text-gray-800">
                Remember me
              </Label>
            </div>

            <div className="text-sm/6">
              <a href="#" className="font-semibold text-subPurple hover:opacity-50">
                Forgot password?
              </a>
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="flex w-full justify-center rounded-md bg-subPurple px-3 py-1.5 font-krona text-sm/6 font-semibold text-lightGray shadow-sm hover:bg-mainYellow hover:text-gray-800 active:opacity-50"
            >
              Sign in
            </button>
          </div>
        </form>

        {submitted && (
          <p className="mt-4 text-center font-sans text-sm/6 text-gray-500" role="status">
            Sign-in is not connected to a backend in this demo.
          </p>
        )}

        <div>
          <div className="relative mt-10">
            <div className="absolute inset-0 flex items-center" aria-hidden="true">
              <div className="w-full border-t border-gray-200" />
            </div>
            <div className="relative flex justify-center text-sm/6 font-medium">
              <span className="bg-white px-6 text-gray-800">Or continue with</span>
            </div>
          </div>

          <div className="mt-6 grid grid-cols-2 gap-4">
            <a
              href="#"
              className="flex w-full items-center justify-center gap-3 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-800 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus-visible:ring-transparent"
            >
              <svg className="h-5 w-5" viewBox="0 0 24 24" aria-hidden="true">
                <path
                  d="M12.0003 4.75C13.7703 4.75 15.3553 5.36002 16.6053 6.54998L20.0303 3.125C17.9502 1.19 15.2353 0 12.0003 0C7.31028 0 3.25527 2.69 1.28027 6.60998L5.27028 9.70498C6.21525 6.86002 8.87028 4.75 12.0003 4.75Z"
                  fill="#EA4335"
                />
                <path
                  d="M23.49 12.275C23.49 11.49 23.415 10.73 23.3 10H12V14.51H18.47C18.18 15.99 17.34 17.25 16.08 18.1L19.945 21.1C22.2 19.01 23.49 15.92 23.49 12.275Z"
                  fill="#4285F4"
                />
                <path
                  d="M5.26498 14.2949C5.02498 13.5699 4.88501 12.7999 4.88501 11.9999C4.88501 11.1999 5.01998 10.4299 5.26498 9.7049L1.275 6.60986C0.46 8.22986 0 10.0599 0 11.9999C0 13.9399 0.46 15.7699 1.28 17.3899L5.26498 14.2949Z"
                  fill="#FBBC05"
                />
                <path
                  d="M12.0004 24.0001C15.2404 24.0001 17.9654 22.935 19.9454 21.095L16.0804 18.095C15.0054 18.82 13.6204 19.245 12.0004 19.245C8.8704 19.245 6.21537 17.135 5.2654 14.29L1.27539 17.385C3.25539 21.31 7.3104 24.0001 12.0004 24.0001Z"
                  fill="#34A853"
                />
              </svg>
              <span className="text-sm/6 font-semibold">Google</span>
            </a>

            <a
              href="#"
              className="flex w-full items-center justify-center gap-3 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-800 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus-visible:ring-transparent"
            >
              <img
                src={asset('/img/facebook.png')}
                alt=""
                className="max-h-6 max-w-6 object-cover"
              />
              <span className="text-sm/6 font-semibold">Facebook</span>
            </a>
          </div>
        </div>
      </div>

      <p className="mt-10 text-center text-sm/6 text-gray-500">
        Not a member?&nbsp;&nbsp;
        <a href="#" className="font-semibold text-subPurple hover:opacity-50">
          Sign up
        </a>
      </p>
    </div>
  );
}
