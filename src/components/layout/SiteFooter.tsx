import { asset } from '@/lib/asset';
import { BOOKING_MENU } from '@/lib/navigation';
import { SocialLinks } from './SocialLinks';

/**
 * Server Component -- no interactivity, so it ships no JavaScript.
 * Used by /shop, /shop/[id] and /login. The simpler centred footer on / and
 * /about is SimpleFooter. Previously both were pasted into each HTML file.
 */
export function SiteFooter() {
  return (
    <footer>
      <div className="mx-auto max-w-7xl px-6 pb-8 pt-16 sm:pt-24 lg:px-8 lg:pt-32">
        <div className="xl:grid xl:grid-cols-12 xl:gap-8">
          <div className="mb-12 flex flex-col items-center space-y-8 xl:col-span-4 xl:mb-0 xl:items-start">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img className="h-9" src={asset('/img/shop-logo.png')} alt="Company name" />
            <p className="font-krona text-balance text-center text-sm/6 text-gray-600 xl:text-left">
              &quot;Small groups, local guides—step into Iceland&apos;s grandeur and hidden
              wonders to uncover stories only nature can tell.&quot;
            </p>
            <SocialLinks />
          </div>

          <div className="grid sm:col-span-8 sm:grid-cols-3 xl:gap-5">
            {BOOKING_MENU.map((group, i) => (
              <div
                key={group.category}
                className={`col-span-1 flex flex-col items-center text-center ${
                  i > 0 ? 'mt-8 sm:mt-0' : ''
                }`}
              >
                <a href="#" className="font-krona text-xl font-semibold text-subPurple">
                  {group.footerLabel ?? group.label}
                </a>
                <ul role="list" className="mt-4 space-y-2 font-mono">
                  {group.items.map((item) => (
                    <li key={item}>
                      <a href="#" className="text-sm/6 text-gray-600 hover:text-subPurple">
                        {item}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-16 border-t border-gray-900/10 pt-8 sm:mt-20 lg:mt-24">
          <p className="font-sans text-sm/6 text-gray-600">
            &copy; 2024 Explorer, Inc. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
