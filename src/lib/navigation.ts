import type { Category } from './types';

/**
 * Booking 選單，由桌面版 flyout、手機版漢堡選單的手風琴以及 footer
 * 共用 -- 這三個地方以前各自維護著同一份清單的三個副本。
 *
 * `items` 只是顯示用的標籤。它們目前還沒有對應到任何行程，也不會過濾
 * shop；原本的 markup 把它們渲染成沒有作用的連結，這裡保留這個行為。
 * 等以後要接上功能時，`lib/products.ts` 已經有提供
 * getProductsByCategory() 可以用。
 */
export interface BookingGroup {
  category: Category;
  label: string;
  /** footer 把第三組的標題寫成單數形式。這裡保留這個行為。 */
  footerLabel?: string;
  items: string[];
}

export const BOOKING_MENU: BookingGroup[] = [
  {
    category: 'hiking',
    label: 'Hiking',
    items: ['Laugavegur', 'Hornstrandir', 'Skaftafell', 'Ásbyrgi Canyon'],
  },
  {
    category: 'sightseeing',
    label: 'Sightseeing',
    items: ['Boat Tour', 'Nature Reserve Tour', 'Ecotourism', 'Culture Tour'],
  },
  {
    category: 'outdoor-sports',
    label: 'Outdoor Sports',
    footerLabel: 'Outdoor Sport',
    // 原本的版本這裡只列出三項；Vestmannaeyjar Puffins Viewing 雖然是
    // outdoor-sports 的行程，卻沒有出現在選單裡。
    items: ['Skiing and Snowboarding', 'Kayaking', 'Horseback Riding'],
  },
];

export interface NavLink {
  label: string;
  href: string;
}

export const NAV_LINKS: NavLink[] = [
  { label: 'Concept', href: '/' },
  { label: 'About', href: '/about' },
  // 'Booking' 不是一個連結 -- 它是用來打開 flyout / accordion 的。
  { label: 'FAQ', href: '/shop' },
];
