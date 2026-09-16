import type { Metadata } from 'next';
import Link from 'next/link';
import { SimpleFooter } from '@/components/layout/SimpleFooter';
import { asset } from '@/lib/asset';

export const metadata: Metadata = {
  title: 'About',
  description:
    'A team of local Icelandic guides specialising in ecological interpretation, hiking safety, geography, climate and local culture.',
};

export default function AboutPage() {
  return (
    <>
      {/*
        about.html wrapped its (fixed) nav in <header class="w-screen mb-20 lg:mb-0">,
        so the header contributed nothing but bottom margin. The nav now lives in
        the root layout, so that spacing is reproduced here.
      */}
      <div className="mb-20 w-screen lg:mb-0" />

      <main className="w-full lg:max-h-[1080px]">
        <div className="relative">
          <div className="mx-auto max-w-7xl lg:grid lg:grid-cols-12 lg:gap-x-8 lg:px-8">
            <div className="px-6 pb-8 pt-10 lg:col-span-7 lg:px-0 lg:pb-48 lg:pt-32 xl:col-span-6">
              <div className="mx-auto max-w-lg lg:mx-0">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img className="h-10" src={asset('/img/shop-logo.png')} alt="Explorer" />

                <div className="mt-8 sm:flex">
                  <div className="relative rounded-full px-3 py-1 font-sans text-sm/6 text-gray-500 ring-1 ring-gray-900/10 hover:ring-gray-900/20">
                    Provide Outdoor Tours in Iceland.&nbsp;&nbsp;&nbsp;
                    <Link
                      href="/shop"
                      className="whitespace-nowrap font-semibold text-subPurple"
                    >
                      <span className="absolute inset-0" aria-hidden="true" />
                      See Tours&nbsp;<span aria-hidden="true">&rarr;</span>
                    </Link>
                  </div>
                </div>

                <h1
                  id="aboutTitle"
                  className="mt-5 text-pretty text-3xl font-semibold tracking-tight text-gray-800 sm:mt-10 sm:text-5xl"
                >
                  Small groups, local guides
                </h1>

                <p className="mb-16 mt-8 text-pretty font-sans text-lg font-medium text-gray-500 sm:text-xl/8">
                  We are a team of passionate local guides who love outdoor adventures. With
                  expertise in ecological interpretation, hiking safety, geography, climate, flora
                  and fauna, and local culture, we are dedicated to providing you with a
                  professional and immersive travel experience.
                </p>

                <p className="mb-3 mt-8 text-pretty font-krona text-xl font-medium text-gray-800">
                  Contact us:
                </p>
                <p className="mb-2 font-sans text-gray-800">
                  <span className="text-subPurple">
                    <i className="fa-solid fa-envelope" />
                  </span>
                  &nbsp;&nbsp;Mail:&nbsp;explorer_iceland@abc.com
                </p>
                <p className="font-sans text-gray-800">
                  <span className="text-subPurple">
                    <i className="fa-solid fa-phone" />
                  </span>
                  &nbsp;&nbsp;Phone:&nbsp;(+354)&nbsp;123-456-789
                </p>

                <br />
                <br />
                <hr />
              </div>
            </div>

            <div className="relative px-6 md:px-32 lg:-me-8 lg:col-span-5 lg:mt-[64px] lg:max-h-[800px] xl:absolute xl:inset-0 xl:left-1/2 xl:me-0">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                className="aspect-[3/2] h-full w-full bg-gray-50 object-cover lg:absolute lg:inset-0 lg:aspect-auto"
                src={asset('/img/about-banner.jpg')}
                alt="Icelandic landscape"
              />
            </div>
          </div>
        </div>
      </main>

      <SimpleFooter current="/about" />
    </>
  );
}
