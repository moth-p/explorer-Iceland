'use client';

import flatpickr from 'flatpickr';
import type { Instance } from 'flatpickr/dist/types/instance';
import { useEffect, useRef } from 'react';
import 'flatpickr/dist/flatpickr.min.css';

/** Earliest bookable date: today + 14 days. Matches getStartDay() in the original. */
export function getMinBookingDate(): Date {
  const d = new Date();
  d.setDate(d.getDate() + 14);
  return d;
}

const pad = (n: number) => String(n).padStart(2, '0');

/**
 * Local-time YYYY-MM-DD. Deliberately not toISOString(), which converts to UTC
 * and would shift the date by a day for anyone behind or ahead of it.
 */
export function toISODate(d: Date): string {
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
}

/** Parse 'YYYY-MM-DD' at local midnight, for the same reason. */
function fromISODate(s: string): Date {
  const [y, m, d] = s.split('-').map(Number);
  return new Date(y, m - 1, d);
}

interface Props {
  /** 'YYYY-MM-DD' strings that are already booked and must not be selectable. */
  disabledDates: string[];
  onChange: (dateStr: string) => void;
  /** Lets the parent clear the field after a successful add-to-cart. */
  registerInstance?: (fp: Instance | null) => void;
}

/**
 * Flatpickr wrapper. Flatpickr owns this input's DOM; React does not.
 *
 * `altInput` is deliberately NOT used, even though it is the obvious way to show
 * "January 3, 2026" while keeping a Y-m-d value. It is incompatible with React
 * here: flatpickr.js:2431 rewrites the input's `type` to "hidden" and :2433
 * inserts a second, visible input as a sibling that React knows nothing about.
 * Because this component re-renders whenever a date is picked, React restores
 * `type="text"` from its own props on the next render -- un-hiding the original
 * and leaving TWO visible date fields.
 *
 * Instead flatpickr formats the input directly and we derive the Y-m-d value in
 * onChange. One input, owned by one system, same display format as before.
 *
 * The remaining rules still apply: initialise once in useEffect(..., []), push
 * updates imperatively via .set(), always destroy() on cleanup, and never mount
 * conditionally.
 */
export default function DatePicker({ disabledDates, onChange, registerInstance }: Props) {
  const inputRef = useRef<HTMLInputElement>(null);
  const fpRef = useRef<Instance | null>(null);
  // Keep the latest onChange without making the init effect depend on it.
  const onChangeRef = useRef(onChange);
  onChangeRef.current = onChange;

  useEffect(() => {
    if (!inputRef.current) return;

    const fp = flatpickr(inputRef.current, {
      minDate: getMinBookingDate(),
      // The display format the design calls for. Previously this was altFormat.
      dateFormat: 'F j, Y',
      onChange: (dates) => {
        onChangeRef.current(dates[0] ? toISODate(dates[0]) : '');
      },
    }) as Instance;

    fpRef.current = fp;
    registerInstance?.(fp);

    return () => {
      registerInstance?.(null);
      fp.destroy();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Disabled dates change as the cart changes; push them in imperatively.
  // Date objects, not strings: flatpickr parses `disable` strings with
  // dateFormat, which is now 'F j, Y' rather than 'Y-m-d'.
  useEffect(() => {
    fpRef.current?.set('disable', disabledDates.map(fromISODate));
  }, [disabledDates]);

  return (
    <input
      ref={inputRef}
      required
      // flatpickr sets this itself when allowInput is false; declaring it here
      // keeps React's props and the DOM in agreement.
      readOnly
      id="datePicker"
      type="text"
      placeholder="Select a date"
      className="me-8 mb-5 h-8 w-44 cursor-pointer rounded-md border border-gray-300 p-2 font-sans focus:outline-none focus:ring-2 focus:ring-subPurple md:mb-0"
    />
  );
}
