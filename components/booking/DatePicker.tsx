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

interface Props {
  /** 'YYYY-MM-DD' strings that are already booked and must not be selectable. */
  disabledDates: string[];
  onChange: (dateStr: string) => void;
  /** Lets the parent clear the field after a successful add-to-cart. */
  registerInstance?: (fp: Instance | null) => void;
}

/**
 * Flatpickr wrapper.
 *
 * Flatpickr owns this DOM, React does not. With `altInput: true` it hides the
 * real input and inserts a sibling element React knows nothing about -- so if
 * React ever re-renders through that position you get a removeChild crash or a
 * duplicated field. The rules that keep that from happening:
 *
 *   - initialise in useEffect(..., []) exactly once, never on prop change
 *   - push updates imperatively via instance.set(), never by re-rendering
 *   - always destroy() on cleanup
 *   - mount unconditionally; never behind a toggling boolean
 *
 * `react-flatpickr` is deliberately not used: the booking form needs imperative
 * .set('disable') and .clear(), and its React 19 types are unreliable. A native
 * <input type="date"> cannot render the required "F j, Y" display format.
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
      altInput: true,
      altFormat: 'F j, Y',
      dateFormat: 'Y-m-d',
      onChange: (_dates, dateStr) => onChangeRef.current(dateStr),
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
  useEffect(() => {
    fpRef.current?.set('disable', disabledDates);
  }, [disabledDates]);

  return (
    <input
      ref={inputRef}
      required
      id="datePicker"
      type="text"
      placeholder="Select a date"
      className="me-8 mb-5 h-8 w-44 rounded-md border border-gray-300 p-2 font-sans focus:outline-none focus:ring-2 focus:ring-subPurple md:mb-0"
    />
  );
}
