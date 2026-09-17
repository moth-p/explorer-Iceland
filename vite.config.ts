import { fileURLToPath, URL } from 'node:url';
import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

/**
 * GitHub Pages serves this as a project site under /explorer-Iceland/, so the
 * production bundle needs that prefix on every asset URL. It comes from an env
 * var rather than a literal so `npm run dev` and `npm run build` stay
 * prefix-free and only `npm run build:pages` produces the deployable output.
 *
 * KEEP THE TRAILING SLASH. Vite exposes this verbatim as
 * import.meta.env.BASE_URL, and both lib/asset.ts and the router's basename
 * are written against a value that ends in '/'.
 *
 * No VITE_ prefix is needed: that only governs what reaches client code, and
 * this file runs in Node.
 */
const base = process.env.BASE_PATH ?? '/';

export default defineConfig({
  base,
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: { '@': fileURLToPath(new URL('./src', import.meta.url)) },
  },
  // 3000 rather than Vite's default 5173, so the URL in CLAUDE.md still holds.
  server: { port: 3000 },
});
