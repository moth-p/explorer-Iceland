/// <reference types="vite/client" />

/**
 * Swiper 的樣式表是以真正的檔案形式提供的，但沒有為這個 subpath 宣告型別，
 * 所以沒有這個宣告的話，`noUncheckedSideEffectImports` 會拒絕這個 import。
 */
declare module 'swiper/css';
