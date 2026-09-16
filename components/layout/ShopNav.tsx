'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { CartBadge } from '@/components/cart/CartBadge';
import { asset } from '@/lib/asset';
import { useCartStore } from '@/lib/cart-store';
import { BOOKING_MENU, NAV_LINKS } from '@/lib/navigation';
import { BrandSocialLinks, SocialLinks } from './SocialLinks';

const NAV_ITEM_CLASS =
  'inline-flex item-center px-3 py-2 text-sm text-gray-800 hover:bg-lightGray hover:text-subPurple active:bg-opacity-50 hover:rounded-md active:text-mainYellow';
const HAM_ITEM_CLASS =
  'block border-l-4 hover:border-mainYellow hover:bg-gray-50 py-2 ps-3 pe-4 text-gray-800 font-medium hover:text-subPurple active:opacity-60';

/**
 * The full navigation used by /shop, /shop/[id] and /login: logo, links,
 * Booking flyout, mobile hamburger with its accordion, search box, cart trigger
 * and account link.
 *
 * This replaces the `<template id="navBar">` + cloneNode trick and roughly 240
 * lines of identical inline <script> that were pasted into shop.html,
 * product-detail.html and login.html.
 *
 * Dismiss-on-outside-click is a single document listener with a ref containment
 * check, rather than the original's stopPropagation() scattered across six
 * elements.
 */
export function ShopNav({ variant }: { variant: 'shop' | 'detail' }) {
  const showBooking = variant === 'shop';
  // product-detail.html and login.html sat their icons one step lower.
  const iconTop = variant === 'shop' ? 'top-3' : 'top-4';
  const pathname = usePathname();
  const openCart = useCartStore((s) => s.openCart);

  const [hamOpen, setHamOpen] = useState(false);
  const [accordionOpen, setAccordionOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [flyoutOpen, setFlyoutOpen] = useState(false);
  // The original swapped the nav background the first time the hamburger was
  // tapped and never swapped it back. Preserved.
  const [navOpaque, setNavOpaque] = useState(false);

  const navRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!hamOpen && !searchOpen) return;

    const onPointerDown = (e: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(e.target as Node)) {
        setHamOpen(false);
        setSearchOpen(false);
      }
    };
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setHamOpen(false);
        setSearchOpen(false);
      }
    };

    document.addEventListener('mousedown', onPointerDown);
    document.addEventListener('keydown', onKeyDown);
    return () => {
      document.removeEventListener('mousedown', onPointerDown);
      document.removeEventListener('keydown', onKeyDown);
    };
  }, [hamOpen, searchOpen]);

  // Close everything on navigation.
  useEffect(() => {
    setHamOpen(false);
    setSearchOpen(false);
    setFlyoutOpen(false);
  }, [pathname]);

  const toggleHam = () => {
    setNavOpaque(true);
    setHamOpen((open) => {
      if (!open) setAccordionOpen(false);
      return !open;
    });
  };

  return (
    <nav>
      <section
        ref={navRef}
        className={`fixed left-0 right-0 top-0 z-20 shadow ${
          navOpaque ? 'bg-lightGray' : 'bg-white/50'
        }`}
      >
        <div className="mx-auto max-w-6xl sm:px-6 lg:px-20">
          <div className="relative flex h-16 justify-between">
            {/* hamburger button */}
            <div className="item-center absolute left-0 top-3 flex sm:hidden">
              <button
                type="button"
                onClick={toggleHam}
                className="item-center text-gray-40 relative inline-flex justify-center rounded-md p-2 hover:bg-lightGray hover:text-subPurple active:opacity-60"
                aria-controls="hamMenu"
                aria-expanded={hamOpen}
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

            {/* logo + desktop links */}
            <div className="flex flex-1 items-center justify-center gap-6 sm:justify-start">
              <div className="item-center flex shrink-0">
                <Link href="/">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img className="h-7 w-auto" src={asset('/img/logo.png')} alt="Company Logo" />
                </Link>
              </div>

              <div className="hidden sm:ml-6 sm:flex sm:space-x-3">
                <div className="nav-btn item-center flex justify-center">
                  <Link href="/" className={NAV_ITEM_CLASS}>
                    {NAV_LINKS[0].label}
                  </Link>
                </div>
                <div className="nav-btn item-center flex justify-center">
                  <Link href="/about" className={NAV_ITEM_CLASS}>
                    {NAV_LINKS[1].label}
                  </Link>
                </div>
                {showBooking ? (
                  <div
                    className="item-center flex cursor-pointer justify-center"
                    onMouseOver={() => setFlyoutOpen(true)}
                  >
                    <p className="px-3 py-2 text-sm text-gray-800 hover:rounded-md hover:bg-lightGray hover:text-subPurple">
                      Booking&nbsp;
                      <i className="fa-solid fa-angle-down" />
                    </p>
                  </div>
                ) : (
                  <div className="nav-btn item-center flex justify-center">
                    <Link href="/shop" className={NAV_ITEM_CLASS}>
                      Shop
                    </Link>
                  </div>
                )}
                <div className="nav-btn item-center flex justify-center">
                  <Link href={NAV_LINKS[2].href} className={NAV_ITEM_CLASS}>
                    {NAV_LINKS[2].label}
                  </Link>
                </div>
              </div>
            </div>

            {/* search icon */}
            <p className={`absolute right-[80px] ${iconTop} cursor-pointer md:right-[100px]`}>
              <button
                type="button"
                onClick={() => setSearchOpen(true)}
                className="h-10 w-10 rounded-full text-gray-800 hover:bg-lightGray hover:text-subPurple active:opacity-60"
                aria-label="Search"
              >
                <i className="fa-solid fa-magnifying-glass" />
              </button>
            </p>

            {/* cart icon */}
            <div className={`absolute right-[40px] ${iconTop} md:right-[50px]`}>
              <button
                type="button"
                onClick={openCart}
                className="h-10 w-10 rounded-full text-gray-800 hover:bg-lightGray hover:text-subPurple active:opacity-60"
                aria-label="Open cart"
              >
                <i className="fa-solid fa-cart-shopping" />
                <CartBadge />
              </button>
            </div>

            {/* user icon */}
            <Link href="/login" className={`absolute right-0 ${iconTop}`}>
              <button
                type="button"
                className="h-10 w-10 rounded-full text-gray-800 hover:bg-lightGray hover:text-subPurple active:opacity-60"
                aria-label="Account"
              >
                <i className="fa-solid fa-user" />
              </button>
            </Link>

            {searchOpen && (
              <div
                className="fixed inset-0 bg-gray-500/25 transition-opacity"
                aria-hidden="true"
              />
            )}

            {searchOpen && (
              <div className="absolute right-8 top-24 z-10 max-w-72 divide-gray-100 overflow-hidden rounded-xl bg-lightGray font-mono shadow-md">
                <div className="grid grid-cols-1">
                  <input
                    type="text"
                    autoFocus
                    className="col-start-1 row-start-1 h-10 w-full pl-11 pr-4 text-base text-gray-800 outline-none placeholder:text-gray-400"
                    placeholder="Search..."
                    role="combobox"
                    aria-expanded="false"
                    aria-controls="options"
                  />
                  <svg
                    className="pointer-events-none col-start-1 row-start-1 ml-4 size-5 self-center text-gray-400"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      fillRule="evenodd"
                      d="M9 3.5a5.5 5.5 0 1 0 0 11 5.5 5.5 0 0 0 0-11ZM2 9a7 7 0 1 1 12.452 4.391l3.328 3.329a.75.75 0 1 1-1.06 1.06l-3.329-3.328A7 7 0 0 1 2 9Z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
              </div>
            )}
          </div>

          {/* mobile hamburger panel */}
          {hamOpen && (
            <div className="w-screen sm:hidden" id="hamMenu">
              <div className="h-screen w-screen space-y-1 overflow-y-auto bg-lightGray p-5 pb-5">
                <Link href="/" className={HAM_ITEM_CLASS}>
                  Concept
                </Link>
                <Link href="/about" className={HAM_ITEM_CLASS}>
                  About
                </Link>
                {showBooking ? (
                  <p
                    className={`cursor-pointer ${HAM_ITEM_CLASS}`}
                    onClick={() => setAccordionOpen((o) => !o)}
                  >
                    Booking&nbsp;&nbsp;
                    <span>
                      <i className={`fa-solid ${accordionOpen ? 'fa-minus' : 'fa-plus'}`} />
                    </span>
                  </p>
                ) : (
                  <Link href="/shop" className={HAM_ITEM_CLASS}>
                    Shop
                  </Link>
                )}

                {showBooking && accordionOpen && (
                  <div className="animate__animated animate__fadeIn animate__fast py-2 ps-8">
                    {BOOKING_MENU.map((group) => (
                      <div key={group.category}>
                        <h4 className="mb-3 text-subPurple">
                          <a href="#" className="group">
                            {group.label}
                          </a>
                        </h4>
                        <ul className="font-mono text-[14px] text-gray-600">
                          {group.items.map((item, i) => (
                            <li
                              key={item}
                              className={`hover:text-subPurple ${
                                i === group.items.length - 1 ? 'mb-6' : 'mb-2'
                              }`}
                            >
                              <a href="#">{item}</a>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                )}

                <Link href="/shop" className={HAM_ITEM_CLASS}>
                  FAQ
                </Link>
                <br />
                <br />
                <hr />

                <div className="flex h-80 w-full flex-col items-center gap-5 pt-8">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={asset('/img/shop-logo.png')}
                    className={showBooking ? 'w-[150px]' : 'w-[120px]'}
                    alt=""
                  />
                  <p className="mb-5 text-sm text-gray-400">Explore &copy;</p>
                  {showBooking ? (
                    <SocialLinks className="flex justify-center gap-6 text-2xl text-gray-400" />
                  ) : (
                    <BrandSocialLinks />
                  )}
                </div>
              </div>
            </div>
          )}

          {/* desktop Booking flyout */}
          {showBooking && flyoutOpen && (
            <div
              className="animate__animated animate__fadeIn animate__faster absolute inset-x-0 top-0 -z-10 bg-lightGray pt-14 shadow-lg ring-1 ring-gray-900/5"
              onMouseOver={() => setFlyoutOpen(true)}
              onMouseOut={() => setFlyoutOpen(false)}
            >
              <div className="grid grid-cols-3 items-start justify-center py-16 md:px-8 xl:px-80">
                {BOOKING_MENU.map((group) => (
                  <div key={group.category} className="col-span-1">
                    <div>
                      <h4 className="mb-3 font-semibold text-gray-800">
                        <a href="#" className="group text-sm">
                          {group.label}&nbsp;&nbsp;&nbsp;
                          <span className="group-hover:ms-[5px]">
                            <i className="fa-solid fa-chevron-right" />
                          </span>
                        </a>
                      </h4>
                      <ul className="font-mono text-[14px] text-gray-600">
                        {group.items.map((item) => (
                          <li key={item} className="mb-1 hover:text-subPurple">
                            <a href="#">{item}</a>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>
    </nav>
  );
}
