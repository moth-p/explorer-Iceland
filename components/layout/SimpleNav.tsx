'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { asset } from '@/lib/asset';

const LINKS = [
  { label: 'Concept', href: '/' },
  { label: 'About', href: '/about' },
  { label: 'Shop', href: '/shop' },
] as const;

const DESKTOP_BASE =
  'inline-flex items-center px-3 py-2 text-sm hover:bg-lightGray hover:text-subPurple active:bg-opacity-50 hover:rounded-md active:text-mainYellow';
const MOBILE_BASE =
  'block border-l-4 hover:border-mainYellow hover:bg-gray-50 py-2 pl-3 pr-4 font-medium hover:text-subPurple active:opacity-60';

/**
 * The lighter navigation used by / and /about: three links, no Booking flyout,
 * no search / cart / account icons, and a plain mobile menu.
 *
 * The link for the current page is rendered inert and greyed, which the original
 * did with a hardcoded `pointer-events-none text-gray-400` per file.
 */
export function SimpleNav() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const navRef = useRef<HTMLElement>(null);

  const isCurrent = (href: string) =>
    href === '/' ? pathname === '/' : pathname.startsWith(href);

  useEffect(() => {
    if (!menuOpen) return;

    const onPointerDown = (e: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(e.target as Node)) setMenuOpen(false);
    };
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setMenuOpen(false);
    };

    document.addEventListener('mousedown', onPointerDown);
    document.addEventListener('keydown', onKeyDown);
    return () => {
      document.removeEventListener('mousedown', onPointerDown);
      document.removeEventListener('keydown', onKeyDown);
    };
  }, [menuOpen]);

  useEffect(() => setMenuOpen(false), [pathname]);

  return (
    <nav ref={navRef} className="fixed left-0 right-0 top-0 z-20 bg-white/50 shadow">
      <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
        <div className="relative flex h-16 justify-between">
          <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
            <button
              type="button"
              onClick={() => setMenuOpen((o) => !o)}
              className="text-gray-40 relative inline-flex items-center justify-center rounded-md p-2 hover:bg-lightGray hover:text-subPurple active:opacity-60"
              aria-controls="mobile-menu"
              aria-expanded={menuOpen}
              aria-label="Open main menu"
            >
              <svg
                className="block size-7"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                />
              </svg>
            </button>
          </div>

          <div className="flex flex-1 items-center justify-center gap-6 sm:justify-start">
            <div className="flex shrink-0 items-center">
              <Link href="/">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img className="h-7 w-auto" src={asset('/img/logo.png')} alt="Company Logo" />
              </Link>
            </div>

            <div className="hidden sm:ml-6 sm:flex sm:space-x-3">
              {LINKS.map(({ label, href }) => (
                <div key={href} className="nav-btn flex items-center justify-center">
                  <Link
                    href={href}
                    aria-current={isCurrent(href) ? 'page' : undefined}
                    className={
                      isCurrent(href)
                        ? `pointer-events-none text-gray-400 ${DESKTOP_BASE}`
                        : `text-gray-800 ${DESKTOP_BASE}`
                    }
                  >
                    {label}
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {menuOpen && (
        <div className="sm:hidden" id="mobile-menu">
          <div className="space-y-1 px-5 pb-8 pt-2">
            {LINKS.map(({ label, href }) => (
              <Link
                key={href}
                href={href}
                aria-current={isCurrent(href) ? 'page' : undefined}
                className={
                  isCurrent(href)
                    ? `pointer-events-none text-gray-400 ${MOBILE_BASE}`
                    : `text-gray-800 ${MOBILE_BASE}`
                }
              >
                {label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}
