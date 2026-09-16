import path from 'node:path';
import { fileURLToPath } from 'node:url';
import type { NextConfig } from 'next';

/**
 * GitHub Pages serves this as a project site under /explorer-Iceland/, so a
 * basePath is required in production. It is wired from an env var rather than
 * hardcoded so `npm run dev` and `npm run build` stay prefix-free, and only
 * `npm run build:pages` produces the deployable export.
 *
 * The same variable feeds tailwind.config.ts, because basePath does NOT rewrite
 * url() inside CSS. See tech-stack.md.
 */
const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '';

const nextConfig: NextConfig = {
  output: 'export',
  // Emits out/about/index.html rather than out/about.html, which plain static
  // hosts resolve reliably.
  trailingSlash: true,
  basePath,
  // There is an unrelated package-lock.json in the user's home directory, so
  // Next would otherwise infer $HOME as the workspace root and trace files from
  // there. Pin it to this project.
  outputFileTracingRoot: path.dirname(fileURLToPath(import.meta.url)),
  // Hides the floating Next.js dev badge in the bottom-left corner. Compile and
  // runtime errors are still reported.
  devIndicators: false,
  images: {
    // Required by output: 'export' — there is no server to run the optimizer.
    // next/image still gives us width/height (no layout shift) and lazy loading.
    unoptimized: true,
  },
};

export default nextConfig;
