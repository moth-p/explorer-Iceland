import localFont from 'next/font/local';

/**
 * The three fonts the site actually uses. (BebasNeue and Stardom shipped in the
 * original repo but had zero references anywhere, so they were dropped.)
 *
 * These live in app/fonts/ rather than public/ because next/font/local resolves
 * them through the bundler: it self-hosts them under /_next/static/media with
 * hashed filenames, applies the basePath automatically, and emits preload hints.
 *
 * Each is exposed as a CSS variable that tailwind.config.ts points its
 * fontFamily keys at -- which is what let the token names stay identical to the
 * pre-migration config, so no className in the ported markup had to change.
 */

export const kronaOne = localFont({
  src: './fonts/KronaOne-Regular.ttf',
  variable: '--font-krona',
  weight: '400',
  style: 'normal',
  display: 'swap',
});

export const libreBodoni = localFont({
  src: './fonts/LibreBodoni-Regular.ttf',
  variable: '--font-libre-bodoni',
  weight: '400',
  style: 'normal',
  display: 'swap',
});

export const libreBodoniBoldItalic = localFont({
  src: './fonts/LibreBodoni-BoldItalic.ttf',
  variable: '--font-libre-bodoni-bi',
  // Matches the original @font-face exactly: weight 400 / style normal, despite
  // the family name. Changing either would alter how the browser synthesises it.
  weight: '400',
  style: 'normal',
  display: 'swap',
});
