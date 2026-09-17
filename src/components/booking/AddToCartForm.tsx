import { useState } from 'react';
import { useShallow } from 'zustand/react/shallow';
import { DatePicker } from '@/components/booking/DatePicker';
import { successAlert, warningAlert } from '@/lib/alerts';
import { selectBookedDates, useCartStore } from '@/lib/cart-store';
import type { Product } from '@/lib/types';

/**
 * Date, group size, validation and add-to-cart -- the only interactive part of
 * the tour detail page.
 */
export function AddToCartForm({ product }: { product: Product }) {
  const addItem = useCartStore((s) => s.addItem);
  // useShallow is required, not optional: selectBookedDates builds a new array
  // on every call, and Zustand v5 compares selector output with Object.is. A
  // fresh reference each render makes useSyncExternalStore re-render forever --
  // "The result of getSnapshot should be cached to avoid an infinite loop".
  const bookedDates = useCartStore(useShallow(selectBookedDates(product.id)));

  const [date, setDate] = useState('');
  const [groupSize, setGroupSize] = useState('');

  /**
   * Synchronous, and nothing here may be awaited. The alert helpers fire a
   * toast and return; an alert must never be able to defer or skip one of the
   * early returns below and let an invalid booking through.
   */
  const handleAdd = () => {
    const size = Number(groupSize);

    if (!date || !groupSize || size <= 0) {
      warningAlert('The Date and Group Size must be filled out.');
      return;
    }

    if (size > product.maxGroupSize) {
      warningAlert(`The tour is limited to ${product.maxGroupSize} participants.`);
      return;
    }

    addItem({
      productId: product.id,
      title: product.title,
      img: product.img,
      date,
      groupSize: size,
      unitPrice: product.price,
    });

    // The newly booked date becomes unselectable via selectBookedDates, which
    // reads from the cart -- so unlike the original it survives a reload.
    // Clearing `date` clears the picker too; it is fully controlled.
    setDate('');
    setGroupSize('');

    successAlert('Add to cart successfully!');
  };

  return (
    <section aria-labelledby="options-heading">
      <div>
        <div className="relative sm:flex sm:justify-start">
          <p className="text-md font-sans">
            Date:&nbsp;&nbsp;
            <DatePicker value={date} disabledDates={bookedDates} onChange={setDate} />
          </p>
          <p className="text-md font-sans">
            Group Size:&nbsp;&nbsp;
            <input
              required
              id="groupSizeInput"
              type="number"
              min={1}
              max={product.maxGroupSize}
              placeholder="2"
              value={groupSize}
              onChange={(e) => setGroupSize(e.target.value)}
              className="h-8 w-20 rounded-md border p-2 font-sans focus:outline-none focus:ring-2 focus:ring-subPurple"
            />
            &nbsp;&nbsp;people
          </p>
        </div>

        <div className="mt-4">
          <a href="#" className="group inline-flex text-sm text-gray-500 hover:text-gray-700">
            <span className="font-sans">What should prepare before the tour?</span>
            <svg
              className="ml-2 size-5 shrink-0 text-gray-400 group-hover:text-gray-500"
              viewBox="0 0 20 20"
              fill="currentColor"
              aria-hidden="true"
            >
              <path
                fillRule="evenodd"
                d="M18 10a8 8 0 1 1-16 0 8 8 0 0 1 16 0ZM8.94 6.94a.75.75 0 1 1-1.061-1.061 3 3 0 1 1 2.871 5.026v.345a.75.75 0 0 1-1.5 0v-.5c0-.72.57-1.172 1.081-1.287A1.5 1.5 0 1 0 8.94 6.94ZM10 15a1 1 0 1 0 0-2 1 1 0 0 0 0 2Z"
                clipRule="evenodd"
              />
            </svg>
          </a>
        </div>

        <div className="mt-10">
          <button
            type="button"
            onClick={handleAdd}
            className="flex w-full items-center justify-center rounded-md border border-transparent bg-subPurple px-8 py-3 text-base font-medium text-white hover:bg-mainYellow hover:text-gray-800 focus:outline-none focus:ring-2 focus:ring-subPurple focus:ring-offset-2 focus:ring-offset-gray-50 active:opacity-50"
          >
            Add to cart
          </button>
        </div>

        <div className="mt-6 text-center">
          <a href="#" className="group inline-flex text-base font-medium">
            <svg
              className="mr-2 size-6 shrink-0 text-gray-400 group-hover:text-gray-500"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 12.75 11.25 15 15 9.75m-3-7.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285Z"
              />
            </svg>
            <span className="font-sans text-gray-400 hover:text-gray-600">Insurance Included</span>
          </a>
        </div>
      </div>
    </section>
  );
}
