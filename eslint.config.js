import js from '@eslint/js';
import jsxA11y from 'eslint-plugin-jsx-a11y';
import react from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import globals from 'globals';
import tseslint from 'typescript-eslint';

/**
 * 取代 eslint-config-next。
 *
 * react 和 jsx-a11y 這兩個 plugin 之所以在這裡，是因為 next/core-web-vitals
 * 把它們綁在一起，拿掉它們會是真正的損失：這個 codebase 大量用到
 * aria-current、role="list"、sr-only 標題和 aria-hidden 的裝飾性 icon，
 * 而且好幾個 component 會 map 陣列，這時候只有 react/jsx-key 會抓出缺少的 key。
 * 拿掉 @next/next/* 不會失去任何有價值的東西 -- 那些規則全都是 framework-specific 的。
 */
export default tseslint.config(
  { ignores: ['dist/**', 'node_modules/**'] },
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      js.configs.recommended,
      tseslint.configs.recommended,
      react.configs.flat.recommended,
      react.configs.flat['jsx-runtime'],
      jsxA11y.flatConfigs.recommended,
      // v7 把 eslintrc 形狀的 config 保留在頂層；flat 版本則放在 .flat 底下，
      // 如果在這裡用頂層的名稱，會出現 'plugins must be an object' 的錯誤。
      reactHooks.configs.flat.recommended,
      reactRefresh.configs.vite,
    ],
    languageOptions: {
      ecmaVersion: 2022,
      globals: globals.browser,
    },
    settings: { react: { version: 'detect' } },
    rules: {
      /*
       * 這條規則會在 footer、social links 和裝飾性分頁條裡大約 30 個
       * `<a href="#">` 佔位符上觸發。這些連結是刻意不接線的 --
       * project-scope.md 把它列為這個 demo 已知的限制 -- 所以這條規則
       * 反映的是產品面的缺口，不是程式碼的缺陷，而且把它們改成 button
       * 會動到四個 component 的 markup 和樣式。
       *
       * 等這些連結有了真正的目的地之後，再把這條規則打開。
       */
      'jsx-a11y/anchor-is-valid': 'off',

      /*
       * 在 `list-style: none` 的清單上加 role="list" 並不是多餘的：Safari 會在
       * marker 被移除時捨棄隱含的清單語意，這也是這段從 Tailwind UI markup
       * 移植過來的程式碼會明確設定它的原因。
       */
      'jsx-a11y/no-redundant-roles': 'off',

      /*
       * 這是 React Compiler 的規則，是 eslint-plugin-react-hooks v7 才有的新規則，
       * 比 eslint-config-next 跑過的任何規則都嚴格。這裡涉及的三個地方都是
       * effect 在跟 React 之外的東西同步 -- 一個是 IntersectionObserver 的
       * callback，另一個是在 router 的 pathname 改變時關閉 nav 選單 --
       * 這正是 effect 該做的事。
       */
      'react-hooks/set-state-in-effect': 'off',

      /*
       * PropTypes 只是在 runtime 近似地檢查 TypeScript 在 build time 早就檢查過的東西，
       * 而且這條規則看不到透過 generic 或 spread 定型的 prop -- 所以在 .tsx
       * codebase 上它只會回報 false positive。
       */
      'react/prop-types': 'off',
    },
  },
  {
    /*
     * components/ui 是由 `shadcn add` 產生的，而且每次更新 component 都會重新
     * 產生，所以這是 vendored 的程式碼，不是我們自己的。這些檔案每一個都會把
     * cva variants 跟 component 放在一起 export，而這條規則禁止這樣做 --
     * 把它們拆開的話，下一次 `shadcn add` 又會把改動蓋掉。
     */
    files: ['src/components/ui/**'],
    rules: { 'react-refresh/only-export-components': 'off' },
  },
);
