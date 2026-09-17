'use client';

import { Autoplay } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import type { Swiper as SwiperClass } from 'swiper/types';
import { useRef } from 'react';
import 'swiper/css';

/**
 * The shop hero carousel. Previously a CDN <script> plus a global `new Swiper()`
 * in src/js/shopBanner.js; now the npm package's React binding, so the version
 * is pinned and bundled.
 *
 * Config matches the original exactly: one slide, 1000ms transition, 2800ms
 * autoplay that stops on interaction, looping, and click-to-advance which
 * restarts autoplay.
 */
const SLIDES = [
  {
    bg: 'bg-swiper-1-sm md:bg-swiper-1',
    title: 'Kirkjufell',
    subtitle: 'Hiking',
    wide: 'Known as the "photographer’s paradise".',
    narrow: ['Known as the', '"photographer’s paradise".'],
  },
  {
    bg: 'bg-swiper-2-sm md:bg-swiper-2',
    title: 'Gullfoss',
    subtitle: 'Falls',
    wide: 'known as the Golden Falls, the breathtaking waterfalls.',
    narrow: ['known as the Golden Falls,', 'the breathtaking waterfalls.'],
  },
  {
    bg: 'bg-swiper-3-sm md:bg-swiper-3',
    title: 'Námafjall',
    subtitle: 'Geotherm',
    wide: 'Be characterized by sulfuric fumaroles and mud pools.',
    narrow: ['Be characterized by the', 'sulfuric fumaroles and mud pools.'],
  },
];

export function ShopBanner() {
  const swiperRef = useRef<SwiperClass | null>(null);

  return (
    <Swiper
      onSwiper={(s) => {
        swiperRef.current = s;
      }}
      onClick={() => {
        swiperRef.current?.slideNext();
        // The original restarted autoplay on click, since disableOnInteraction
        // had just stopped it.
        swiperRef.current?.autoplay.start();
      }}
      modules={[Autoplay]}
      slidesPerView={1}
      spaceBetween={0}
      speed={1000}
      autoplay={{ delay: 2800, disableOnInteraction: true }}
      loop
      className="item-center mt-[80px] flex h-[300px] w-screen justify-center md:h-[450px] lg:h-[600px]"
    >
      {SLIDES.map((slide) => (
        <SwiperSlide
          key={slide.title}
          className={`grid-row-12 grid h-full w-full ${slide.bg} bg-cover bg-no-repeat p-8 md:p-14 lg:p-20`}
        >
          <h2 className="relative row-span-6 mb-3 text-3xl text-mainYellow md:mb-5 md:text-5xl lg:mb-8 lg:text-7xl">
            {slide.title}
          </h2>
          <h2 className="row-span-6 mb-8 text-3xl text-mainYellow md:mb-44 md:text-5xl lg:mb-52 lg:text-7xl">
            {slide.subtitle}
          </h2>
          <p className="invisible text-lightGray md:visible md:text-lg lg:text-2xl">{slide.wide}</p>
          <p className="visible mb-2 text-sm text-lightGray sm:invisible">{slide.narrow[0]}</p>
          <p className="visible text-sm text-lightGray sm:invisible">{slide.narrow[1]}</p>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
