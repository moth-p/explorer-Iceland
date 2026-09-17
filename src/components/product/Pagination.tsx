/**
 * The page-number strip below the shop grid.
 *
 * Preserved from the original as presentation only: every <a> there was written
 * without an href, all 12 tours render on one page, and nothing navigates.
 * Wiring it up means real /shop/page/[n] segments (query params cannot be
 * prerendered under output: 'export'), which is deliberately out of scope here.
 */
const LINK_BASE =
  'relative cursor-pointer active:opacity-50 items-center px-4 py-2 text-sm font-semibold ring-1 ring-inset ring-gray-300 hover:bg-white focus:z-20 focus:outline-offset-0 text-gray-800';

export function Pagination() {
  return (
    <div className="mb-12 flex justify-center">
      <nav className="isolate inline-flex -space-x-px rounded-md shadow-sm" aria-label="Pagination">
        <a className="relative inline-flex cursor-pointer items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-white focus:z-20 focus:outline-offset-0 active:opacity-50">
          <span className="sr-only">Previous</span>
          <svg className="size-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
            <path
              fillRule="evenodd"
              d="M11.78 5.22a.75.75 0 0 1 0 1.06L8.06 10l3.72 3.72a.75.75 0 1 1-1.06 1.06l-4.25-4.25a.75.75 0 0 1 0-1.06l4.25-4.25a.75.75 0 0 1 1.06 0Z"
              clipRule="evenodd"
            />
          </svg>
        </a>

        <a
          aria-current="page"
          className="relative z-10 inline-flex cursor-pointer items-center bg-subPurple px-4 py-2 text-sm font-semibold text-white focus:z-20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 active:opacity-50"
        >
          1
        </a>
        <a className={`inline-flex ${LINK_BASE}`}>2</a>
        <a className={`hidden md:inline-flex ${LINK_BASE}`}>3</a>
        <span className="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-700 ring-1 ring-inset ring-gray-300 focus:outline-offset-0">
          ...
        </span>
        <a className={`hidden md:inline-flex ${LINK_BASE}`}>8</a>
        <a className={`inline-flex ${LINK_BASE}`}>9</a>
        <a className={`inline-flex ${LINK_BASE}`}>10</a>

        <a className="relative inline-flex cursor-pointer items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-white focus:z-20 focus:outline-offset-0 active:opacity-50">
          <span className="sr-only">Next</span>
          <svg className="size-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
            <path
              fillRule="evenodd"
              d="M8.22 5.22a.75.75 0 0 1 1.06 0l4.25 4.25a.75.75 0 0 1 0 1.06l-4.25 4.25a.75.75 0 0 1-1.06-1.06L11.94 10 8.22 6.28a.75.75 0 0 1 0-1.06Z"
              clipRule="evenodd"
            />
          </svg>
        </a>
      </nav>
    </div>
  );
}
