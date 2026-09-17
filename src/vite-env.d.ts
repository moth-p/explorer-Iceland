/// <reference types="vite/client" />

/**
 * Swiper ships its stylesheets as real files but declares no types for the
 * subpath, so `noUncheckedSideEffectImports` rejects the import without this.
 */
declare module 'swiper/css';
