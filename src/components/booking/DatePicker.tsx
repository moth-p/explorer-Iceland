import { useMemo, useState } from 'react';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { formatBookingDate, fromISODate, getMinBookingDate, toISODate } from '@/lib/dates';

interface Props {
  /** 選定的日期，格式為 'YYYY-MM-DD'，未選則為 ''。由 parent 持有。 */
  value: string;
  /** 已經被預訂、不能被選取的 'YYYY-MM-DD' 字串。 */
  disabledDates: string[];
  onChange: (dateStr: string) => void;
}

/**
 * 訂購日期欄位：一個裝著 react-day-picker Calendar 的 Popover。
 *
 * 這個 component 完全由 parent 的日期字串控制，自己不持有任何選取
 * state。這也是為什麼 AddToCartForm 能在成功新增之後，用它原本就會
 * 呼叫的 setDate('') 來清空這個欄位，而不用透過 imperative handle
 * 伸進這個 component 裡操作。
 *
 * 它取代了一個 Flatpickr wrapper，也一併去掉了一堆不再存在的限制：
 * Flatpickr 掌控 input 的 DOM，所以 `altInput` 必須關閉（它會把 input
 * 改寫成 type="hidden"，並插入一個 React 不知道的 sibling，留下兩個
 * 可見的日期欄位），這個 instance 必須恰好被建立一次、透過 .set()
 * 以 imperative 的方式更新、在 cleanup 時銷毀，而且絕對不能有條件地掛載。
 *
 * 沒有改變、而且仍然重要的地方：日期是用 lib/dates.ts 裡的 local-time
 * helper 做序列化的，絕對不用 toISOString()。onSelect 回傳的是一個
 * 在本地時間午夜的 Date，在 UTC+8 對它呼叫 toISOString() 會得到前一天
 * -- 也就是會訂到錯的日期。
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
    // undefined 這個分支不是可有可無的：當使用者點擊已經選取的那一天時，
    // react-day-picker 會清空選取狀態。
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
          // 使用者能往回翻到的最早一個月，跟 Flatpickr 原本的
          // minDate 行為一致。
          startMonth={new Date(minDate.getFullYear(), minDate.getMonth())}
          defaultMonth={selected ?? minDate}
          /*
           * 一般反對 autoFocus 的理由是焦點在使用者沒有要求的情況下自己移動。
           * 但這裡是使用者剛打開這個 popover，如果沒有這個設定，用鍵盤操作的
           * 使用者會停在 popover 的容器上，還得再 tab 進日期格子裡。
           */
          // eslint-disable-next-line jsx-a11y/no-autofocus
          autoFocus
        />
      </PopoverContent>
    </Popover>
  );
}
