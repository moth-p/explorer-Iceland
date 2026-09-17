/**
 * Booking date helpers.
 *
 * These live in lib/ rather than beside the picker because they are business
 * rules (the 14-day lead time) and a correctness constraint (local-time
 * serialisation), not presentation -- and keeping them out of the component
 * file lets that file fast-refresh cleanly.
 */

/** Earliest bookable date: today + 14 days. Matches getStartDay() in the original. */
export function getMinBookingDate(): Date {
  const d = new Date();
  d.setDate(d.getDate() + 14);
  // Normalised to local midnight so day-level comparisons in the calendar's
  // matchers are deterministic regardless of when in the day the page loaded.
  d.setHours(0, 0, 0, 0);
  return d;
}

const pad = (n: number) => String(n).padStart(2, '0');

/**
 * Local-time YYYY-MM-DD. Deliberately not toISOString(), which converts to UTC
 * and would shift the date by a day for anyone behind or ahead of it -- in
 * UTC+8 an early-morning selection would book the previous day.
 */
export function toISODate(d: Date): string {
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
}

/** Parse 'YYYY-MM-DD' at local midnight, for the same reason. */
export function fromISODate(s: string): Date {
  const [y, m, d] = s.split('-').map(Number);
  return new Date(y, m - 1, d);
}

/**
 * The display format the design calls for: "January 3, 2026". This was
 * flatpickr's 'F j, Y'. Intl does it with no dependency and no bundle cost.
 */
export function formatBookingDate(d: Date): string {
  return new Intl.DateTimeFormat('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  }).format(d);
}
