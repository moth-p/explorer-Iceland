import { useMemo, useState } from 'react';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { formatBookingDate, fromISODate, getMinBookingDate, toISODate } from '@/lib/dates';

interface Props {
  /** The selected date as 'YYYY-MM-DD', or '' for none. Owned by the parent. */
  value: string;
  /** 'YYYY-MM-DD' strings that are already booked and must not be selectable. */
  disabledDates: string[];
  onChange: (dateStr: string) => void;
}

/**
 * The booking date field: a Popover holding a react-day-picker Calendar.
 *
 * This is fully controlled by the parent's date string and holds no selection
 * state of its own. That is what lets AddToCartForm clear the field after a
 * successful add with the setDate('') it already calls, instead of reaching
 * into this component through an imperative handle.
 *
 * It replaces a Flatpickr wrapper, and with it a pile of constraints that no
 * longer exist: Flatpickr owned the input's DOM, so `altInput` had to stay off
 * (it rewrote the input to type="hidden" and inserted a sibling React did not
 * know about, leaving two visible date fields), the instance had to be created
 * exactly once, updated imperatively via .set(), destroyed on cleanup, and
 * never mounted conditionally.
 *
 * What has NOT changed, and still matters: the date is serialised with the
 * local-time helpers in lib/dates.ts and never toISOString(). onSelect hands
 * back a Date at local midnight, and in UTC+8 toISOString() on that yields the
 * previous day -- i.e. it books the wrong date.
 */
export function DatePicker({ value, disabledDates, onChange }: Props) {
  const [open, setOpen] = useState(false);

  const minDate = useMemo(() => getMinBookingDate(), []);
  const selected = value ? fromISODate(value) : undefined;

  const disabled = useMemo(
    () => [{ before: minDate }, ...disabledDates.map(fromISODate)],
    [minDate, disabledDates],
  );

  const handleSelect = (day: Date | undefined) => {
    // The undefined branch is not optional: react-day-picker clears the
    // selection when the user clicks the already-selected day.
    onChange(day ? toISODate(day) : '');
    if (day) setOpen(false);
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <button
          type="button"
          id="datePicker"
          className={`me-8 mb-5 inline-flex h-8 w-44 cursor-pointer items-center rounded-md border border-gray-300 p-2 text-left font-sans focus:outline-none focus:ring-2 focus:ring-subPurple md:mb-0 ${
            value ? '' : 'text-gray-400'
          }`}
        >
          {value ? formatBookingDate(fromISODate(value)) : 'Select a date'}
        </button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <Calendar
          mode="single"
          selected={selected}
          onSelect={handleSelect}
          disabled={disabled}
          // The earliest month the user can page back to, mirroring the
          // minDate behaviour Flatpickr had.
          startMonth={new Date(minDate.getFullYear(), minDate.getMonth())}
          defaultMonth={selected ?? minDate}
          /*
           * The usual objection to autoFocus is focus moving without the user
           * asking for it. Here the user has just opened the popover, and
           * without this a keyboard user lands on the popover container and has
           * to tab into the day grid.
           */
          // eslint-disable-next-line jsx-a11y/no-autofocus
          autoFocus
        />
      </PopoverContent>
    </Popover>
  );
}
