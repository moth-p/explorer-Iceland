'use client';

import { useState } from 'react';
import { asset } from '@/lib/asset';

/**
 * The sign-in form. There is no backend and static export has no Server
 * Actions, so this validates its inputs and stops -- the original posted to "#",
 * which just reloaded the page.
 *
 * Two class names below (`focus:outline-subborder-subPurple`) are typos carried
 * over from the original. They are not real utilities and emit nothing, exactly
 * as today; they are kept so the rendered markup matches.
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
            <div className="flex gap-3">
              <div className="flex h-6 shrink-0 items-center">
                <div className="group grid size-4 grid-cols-1">
                  <input
                    id="remember-me"
                    name="remember-me"
                    type="checkbox"
                    checked={remember}
                    onChange={(e) => setRemember(e.target.checked)}
                    className="col-start-1 row-start-1 cursor-pointer appearance-none rounded border border-gray-300 bg-white checked:border-subPurple checked:bg-subPurple indeterminate:border-subPurple indeterminate:bg-subPurple focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-subborder-subPurple disabled:border-gray-300 disabled:bg-gray-100 disabled:checked:bg-gray-100 forced-colors:appearance-auto"
                  />
                  <svg
                    className="pointer-events-none col-start-1 row-start-1 size-3.5 self-center justify-self-center stroke-white group-has-[:disabled]:stroke-gray-950/25"
                    viewBox="0 0 14 14"
                    fill="none"
                  >
                    <path
                      className="opacity-0 group-has-[:checked]:opacity-100"
                      d="M3 8L6 11L11 3.5"
                      strokeWidth={2}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      className="opacity-0 group-has-[:indeterminate]:opacity-100"
                      d="M3 7H11"
                      strokeWidth={2}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
              </div>
              <label htmlFor="remember-me" className="block text-sm/6 text-gray-800">
                Remember me
              </label>
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
              {/* eslint-disable-next-line @next/next/no-img-element */}
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
