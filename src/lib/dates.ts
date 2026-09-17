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
