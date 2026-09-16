# Project Scope — Explorer Iceland

> What this product is, who it serves, and where its boundaries are.
> For technology choices see [tech-stack.md](./tech-stack.md); for the migration
> checklist see [implementation-plan.md](./implementation-plan.md).

## Purpose

**Explorer** is a tour-booking website for small-group outdoor adventures in Iceland.
It presents 12 guided tours across three categories, lets a visitor pick a departure date
and a group size, and collects the selection into a cart with a running total.

It is a **portfolio / front-end project**. There is no backend: everything runs in the
browser, and the cart lives in `localStorage`. It should be judged as a faithful, responsive,
accessible storefront — not as a transacting e-commerce system.

**Audience:** English-speaking travellers browsing Iceland tours on phone, tablet or desktop.
Site content is English throughout; only the README is bilingual (中文 / English).

## Pages

| Route | Purpose |
|---|---|
| `/` | Landing page. Hero, three scroll-revealed scenery sections (Vestrahorn, Klausturhólar, Vík), a looping "Iceland" marquee, two feature blocks ("We Provide" / "You Can Find"), and a video section with a *Start a Journey* call to action. |
| `/about` | Company positioning, tagline, and contact details (email, phone) over a full-width banner. |
| `/shop` | Tour catalogue. Auto-playing banner carousel, a responsive grid of all 12 tours (2 / 3 / 4 columns), three category cards, and a pagination strip. |
| `/shop/[id]` | Tour detail. Gallery, price, rating, description, and the booking form (date + group size → add to cart). Expandable *About the Tour* / *Before You Go* / *Rules* sections. |
| `/login` | Cart review and checkout summary, plus a sign-in form. |

Every page shares the same chrome: fixed navbar, mobile hamburger menu, search box,
cart drawer, back-to-top button, and footer.

## Booking flow

```
/shop  →  /shop/[id]  →  pick date + group size  →  Add to cart
                                                      ↓
                                          cart drawer (any page)
                                                      ↓
                                                   /login
```

## Business rules

These are enforced in the UI and were extracted from the original implementation.
They are the behaviour to preserve.

| Rule | Value | Origin |
|---|---|---|
| Tax rate | **3%** applied to the subtotal | `src/js/cart.js` `updateTotal()` |
| Earliest bookable date | **today + 14 days** | `product-detail.html` `getStartDay()` |
| Date display format | `F j, Y` (e.g. *January 3, 2026*) over a `Y-m-d` value | Flatpickr `altFormat` |
| Group size | required, `> 0`, and **≤ the tour's `maxGroupSize`** | add-to-cart validation |
| Line price | `unitPrice × groupSize` | add-to-cart handler |
| One booking per tour per date | a date already in the cart is disabled in the picker | `disabledDates` |
| Currency | EUR (€), display only | product data |

Validation failures and success both surface as SweetAlert2 modals.

## The 12 tours

| # | Tour | Category | Region | € | Max group |
|---|---|---|---|---|---|
| 1 | Laugavegur Trail | Hiking | South | 100 | 12 |
| 2 | Hornstrandir Nature Reserve | Hiking | West | 20 | 8 |
| 3 | Skaftafell Glacier Hikes | Hiking | South | 18 | 12 |
| 4 | Ásbyrgi Canyon Hike | Hiking | North | 18 | 10 |
| 5 | Jökulsárlón Glacier Lagoon Boat Tour | Sightseeing | South | 28 | 10 |
| 6 | Mývatn Geothermal Tour | Sightseeing | North | 18 | 12 |
| 7 | Snæfellsnes Coastal Ecology Walk | Sightseeing | West | 15 | 12 |
| 8 | Golden Circle Tour | Sightseeing | Southwest | 18 | 15 |
| 9 | Dalvík Snowboarding | Outdoor Sports | North | 18 | 10 |
| 10 | Westfjords Kayaking | Outdoor Sports | North | 12 | 12 |
| 11 | Eldhestar Horseback Riding | Outdoor Sports | West | 20 | 10 |
| 12 | Vestmannaeyjar Puffins Viewing | Outdoor Sports | South | 8 | 12 |

**Category is stored explicitly on each tour.** It cannot be derived from the id: every
original id was prefixed `hiking-`, including the sightseeing and outdoor-sports tours.
The grouping above comes from the shop flyout menu, which is the authoritative source.

Each tour also carries: a short region label, a long description, an *About the Tour*
narrative, duration, daily activity hours, start time, meeting point, how early to arrive,
a *Before You Go* checklist, and a list of rules.

## Out of scope

Deliberately **not** built, and not planned:

- **No backend, database or API.** Tour data is a typed constant compiled into the site.
- **No real authentication.** The `/login` form validates its inputs and stops there; there
  are no accounts, sessions or password storage.
- **No payments or checkout completion.** The cart totals up and goes no further.
- **No server-side inventory.** Group-size caps and booked dates are enforced per browser
  from cart contents only; two visitors cannot conflict because nothing is shared.
- **No internationalisation.** English only. The site is not wired for locale switching.
- **No search backend.** The navbar search box is present in the design but does not query.
- **No analytics, cookies or tracking.**

## Known limitations

- **Cart is per-browser and per-device.** `localStorage` under the site's origin; clearing
  site data empties the cart. Nothing syncs.
- **Carts saved by the pre-migration site are discarded on first visit.** The old format was
  a bare array with image paths pointing at `./src/img/…`, which no longer resolve. Rather
  than render broken thumbnails, a stored cart in the legacy shape is cleared and the visitor
  starts empty. This is a one-time event.
- **Pagination is decorative.** The strip on `/shop` renders page numbers, but all 12 tours
  are shown at once and the links do not navigate. Preserved from the original design.
- **Category and flyout links are not yet wired.** The three category cards and the flyout
  sub-items render but do not filter. The data now supports it (`getProductsByCategory`);
  the routing does not yet.
- **The flyout omits one tour.** *Vestmannaeyjar Puffins Viewing* is missing from the Outdoor
  Sports column, which lists only three of its four tours. Faithful to the original.
- **Ratings are static.** The five-star display on the detail page is decorative markup.
