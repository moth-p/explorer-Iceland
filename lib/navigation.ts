import type { Category } from './types';

/**
 * The Booking menu, shared by the desktop flyout, the mobile hamburger
 * accordion and the footer -- three places that previously held three
 * hand-maintained copies of the same list.
 *
 * `items` are display labels only. They do not yet map to tours or filter the
 * shop; the original markup rendered them as dead links and that behaviour is
 * preserved. `lib/products.ts` already exposes getProductsByCategory() for when
 * these get wired up.
 */
export interface BookingGroup {
  category: Category;
  label: string;
  /** The footer writes the third group's heading in the singular. Preserved. */
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
    // The original lists only three here; Vestmannaeyjar Puffins Viewing is
    // missing from the menu even though it is an outdoor-sports tour.
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
  // 'Booking' is not a link -- it opens the flyout / accordion.
  { label: 'FAQ', href: '/shop' },
];
