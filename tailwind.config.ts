import type { Config } from 'tailwindcss';

/**
 * basePath does not rewrite url() inside CSS, and these values are NOT relative
 * to the page -- Next emits the stylesheet to /_next/static/css/<hash>.css, so
 * the original `url('./img/banner.png')` would resolve to
 * /_next/static/css/img/banner.png and 404 with no build error.
 * Root-absolute + the deploy prefix is the fix. See tech-stack.md.
 */
const bp = process.env.NEXT_PUBLIC_BASE_PATH || '';

export default {
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './lib/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        mainYellow: '#D4FB71',
        subPurple: '#8CABFB',
        lightGray: '#F5F5F5',
      },
      fontFamily: {
        // Keys are deliberately unchanged from the pre-migration config so that
        // no className in the ported markup had to be touched. The values now
        // point at the CSS variables next/font/local generates.
        libreBodoni_boldItalic: ['var(--font-libre-bodoni-bi)', 'serif'],
        libreBodoni_Regular: ['var(--font-libre-bodoni)', 'serif'],
        krona: ['var(--font-krona)', 'sans-serif'],
      },
      backgroundImage: {
        banner: `url('${bp}/img/banner.png')`,
        'main-1-bg': `url('${bp}/img/main-1-bg.png')`,
        'main-2-bg': `url('${bp}/img/main-2-bg.png')`,
        'main-3-bg': `url('${bp}/img/main-3-bg.png')`,
        'main-5': `url('${bp}/img/main-5.png')`,
        'main-6': `url('${bp}/img/main-6.png')`,
        'main-7-bg': `url('${bp}/img/main-7-bg.png')`,
        'main-7-btn': `url('${bp}/img/main-7-button.png')`,
        'swiper-1': `url('${bp}/img/swiper-1.png')`,
        'swiper-2': `url('${bp}/img/swiper-2.png')`,
        'swiper-3': `url('${bp}/img/swiper-3.png')`,
        'swiper-1-sm': `url('${bp}/img/swiper-1-sm.png')`,
        'swiper-2-sm': `url('${bp}/img/swiper-2-sm.png')`,
        'swiper-3-sm': `url('${bp}/img/swiper-3-sm.png')`,
      },
      animation: {
        marquee: 'marquee 32s linear infinite',
        fadeIn: 'fadeIn 2s ease-in-out forwards',
        fadeInSlow: 'fadeInSlow 3s ease-in-out forwards',
        rotateStar: 'rotateStar 2.5s ease-out forwards',
      },
      keyframes: {
        marquee: {
          from: { transform: 'translateX(0)' },
          to: { transform: 'translateX(-50%)' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        fadeInSlow: {
          '0%': { opacity: '0', transform: 'translateY(-50px)' },
          '100%': { opacity: '1', transform: 'translateY(0px)' },
        },
        rotateStar: {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        },
      },
    },
  },
  // Top level, not nested inside theme.extend as it was before. Intentionally
  // empty: Flowbite was never actually loaded and nothing uses it, so adding it
  // now would inject new base styles and break visual parity.
  plugins: [],
} satisfies Config;
