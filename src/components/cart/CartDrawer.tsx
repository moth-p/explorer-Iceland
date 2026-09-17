import { Link } from 'react-router';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from '@/components/ui/dialog';
import { asset } from '@/lib/asset';
import { computeTotals, useCartStore } from '@/lib/cart-store';
import { useHtmlScrollLock } from '@/lib/use-html-scroll-lock';
import type { CartItem } from '@/lib/types';

/**
 * The cart modal. Replaces `<template id="cartTemplate">` and the
 * querySelector/cloneNode rendering in src/js/cart.js.
 *
 * The template approach gave every cloned row the same ids (`cartTitle`,
 * `cartImg`, `cartPrice`, ...), which is invalid HTML once there is more than
 * one row. Those are props now.
 *
 * Built on shadcn's Dialog rather than Sheet: despite the name this has always
 * been a centred modal that fades in, not an edge-anchored panel that slides,
 * and Sheet would have been a redesign. Radix brings the outside-click and
 * Escape handling, the focus trap and the ARIA wiring that were hand-written
 * here before.
 */
export function CartDrawer() {
  const items = useCartStore((s) => s.items);
  const isOpen = useCartStore((s) => s.isOpen);
  const closeCart = useCartStore((s) => s.closeCart);

  // Radix locks <body>, but the root layout gives <body> h-screen, so <html> is
  // the real scroll container. See lib/use-body-scroll-lock.ts.
  useHtmlScrollLock(isOpen);

  const totals = computeTotals(items);

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && closeCart()}>
      {/*
        showCloseButton={false} because this panel has its own styled X. The
        sizing classes reproduce the original: full-bleed below sm, a centred
        max-w-3xl card above it.
      */}
      <DialogContent
        showCloseButton={false}
        aria-label="Shopping cart"
        className="inset-0 flex h-full max-h-full w-screen max-w-none translate-x-0 translate-y-0 flex-col gap-0 overflow-y-auto overscroll-contain rounded-none border-0 bg-white p-0 pt-6 pb-8 sm:inset-auto sm:top-1/2 sm:left-1/2 sm:h-auto sm:max-h-[90vh] sm:w-full sm:max-w-3xl sm:-translate-x-1/2 sm:-translate-y-1/2 sm:rounded-lg sm:pb-6 lg:py-8"
      >
        <div className="flex w-full flex-col">
              <div className="flex items-center justify-between px-4 sm:px-6 lg:px-8">
                <DialogTitle className="text-lg font-medium text-gray-800">
                  Shopping Cart
                </DialogTitle>
                <DialogDescription className="sr-only">
                  The tours you have added, with the order total.
                </DialogDescription>
                <button
                  type="button"
                  onClick={closeCart}
                  className="text-gray-400 hover:text-gray-500"
                  aria-label="Close cart"
                >
                  <svg
                    className="size-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              {items.length === 0 ? (
                <div className="flex h-64 w-full items-center justify-center text-wrap break-words text-2xl text-gray-400">
                  <p className="flex h-full items-center justify-center">Cart is empty.</p>
                </div>
              ) : (
                <>
                  <section>
                    <ul>
                      {items.map((item) => (
                        <CartRow key={item.lineId} item={item} />
                      ))}
                    </ul>
                  </section>

                  <section
                    aria-labelledby="summary-heading"
                    className="mt-auto sm:px-6 lg:px-8"
                  >
                    <div className="bg-gray-50 p-6 sm:rounded-lg sm:p-8">
                      <h2 id="summary-heading" className="sr-only">
                        Order summary
                      </h2>

                      <div className="flow-root">
                        <dl className="-my-4 divide-y divide-gray-200 text-sm">
                          <div className="flex items-center justify-between py-4">
                            <dt className="text-gray-400">Subtotal</dt>
                            <dd className="font-medium text-gray-400">
                              €&nbsp;{totals.subtotal.toFixed(2)}
                            </dd>
                          </div>
                          <div className="flex items-center justify-between py-4">
                            <dt className="text-gray-400">
                              Tax&nbsp;&nbsp;&nbsp;
                              <span className="cursor-pointer text-[16px] text-subPurple hover:opacity-50">
                                <i className="fa-solid fa-circle-question" />
                              </span>
                            </dt>
                            <dd className="font-medium text-gray-400">
                              €&nbsp;{totals.tax.toFixed(2)}
                            </dd>
                          </div>
                          <div className="flex items-center justify-between py-4">
                            <dt className="text-base font-medium text-gray-800">Order total</dt>
                            <dd className="text-base font-medium text-gray-800">
                              €&nbsp;{totals.orderTotal.toFixed(2)}
                            </dd>
                          </div>
                        </dl>
                      </div>
                    </div>
                    <div className="mt-8 flex justify-end px-4 sm:px-6 lg:px-8">
                      <Link
                        to="/login"
                        onClick={closeCart}
                        className="rounded-md border border-transparent bg-subPurple px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-mainYellow hover:text-gray-800 active:opacity-50"
                      >
                        Continue to Payment
                      </Link>
                    </div>
                  </section>
                </>
              )}
        </div>
      </DialogContent>
    </Dialog>
  );
}

function CartRow({ item }: { item: CartItem }) {
  const removeItem = useCartStore((s) => s.removeItem);

  return (
    <div className="divide-y divide-gray-200 px-4 sm:px-6 lg:px-8">
      <li className="flex py-8 text-sm sm:items-center">
        <img
          src={asset(item.img)}
          alt={item.title}
          className="size-32 flex-none rounded-lg border border-gray-200"
        />
        <div className="grid w-full grid-rows-12 ps-8 md:grid-cols-12">
          <div className="row-span-7 md:col-span-10">
            <h3 className="text-md text-gray-800">
              <Link to={`/shop/${item.productId}`}>{item.title}</Link>
            </h3>
            <p className="mb-3 mt-1 font-sans text-[14px] text-gray-400 sm:mb-0">
              Date:&nbsp;{item.date}
              <br />
              Group Size:&nbsp;{item.groupSize}
            </p>
          </div>
          <div className="row-span-5 md:col-span-2">
            <p className="text-md text-gray-800 sm:w-1/3 sm:flex-none sm:text-right">
              €&nbsp;{item.price}
            </p>
            <button
              type="button"
              onClick={() => removeItem(item.lineId)}
              aria-label={`Remove ${item.title} from cart`}
              className="-mx-2 mt-1 rounded px-2 py-1 text-sm font-medium text-subPurple underline-offset-2 hover:underline hover:opacity-70 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-subPurple active:opacity-50 sm:mt-2"
            >
              Remove
            </button>
          </div>
        </div>
      </li>
      <hr />
      <br />
    </div>
  );
}
