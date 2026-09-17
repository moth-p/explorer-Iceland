import { fileURLToPath, URL } from 'node:url';
import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

/**
 * GitHub Pages 會把這個當作 /explorer-Iceland/ 底下的 project site 提供，所以
 * production bundle 的每一個 asset URL 都需要這個 prefix。這是從環境變數而不是
 * 字面值來的，這樣 `npm run dev` 和 `npm run build` 才能保持不帶 prefix，只有
 * `npm run build:pages` 才會產出可部署的輸出。
 *
 * 保留結尾的斜線。Vite 會原封不動地把這個值暴露成
 * import.meta.env.BASE_URL，而 lib/asset.ts 和 router 的 basename
 * 都是依照一個以 '/' 結尾的值來寫的。
 *
 * 不需要 VITE_ prefix：那只會決定哪些東西能傳到 client 端的程式碼，而這個檔案是在
 * Node 裡執行的。
 */
const base = process.env.BASE_PATH ?? '/';

export default defineConfig({
  base,
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: { '@': fileURLToPath(new URL('./src', import.meta.url)) },
  },
  // 用 3000 而不是 Vite 預設的 5173，這樣 CLAUDE.md 裡的網址才還會是對的。
  server: { port: 3000 },
});
