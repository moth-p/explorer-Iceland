# Explorer 冰島旅遊行程預定網站

![Vite](https://img.shields.io/badge/Vite-8-646cff.svg)
![React](https://img.shields.io/badge/React-19-61dafb.svg)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178c6.svg)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-4-38bdf8.svg)

### 專案簡介
**Explorer** 是一個冰島旅遊行程預定網站，主打小團體行動制的戶外探索活動。網站以 Vite、React 19、TypeScript、Tailwind CSS v4、shadcn/ui 與 React Router 開發，購物車資料會儲存在使用者的 `localStorage` 中，支援 RWD 響應式設計，適用於桌機、平板與手機等裝置。

本專案原為多頁靜態 HTML，先重構為 Next.js，現已改為 Vite 單頁應用（SPA）。

 **網站預覽**：  
👉 [https://moth-p.github.io/explorer-Iceland/](https://moth-p.github.io/explorer-Iceland/)

---

## 使用技術

| 分類         | 技術名稱                                  |
| ------------ | ----------------------------------------- |
| 框架         | React 19 / Vite 8                         |
| 前端語言     | TypeScript                                |
| 樣式框架     | Tailwind CSS v4 + shadcn/ui               |
| 路由         | React Router v7                           |
| 狀態管理     | Zustand（persist）                        |
| 資料儲存     | localStorage                              |
| 響應式設計   | Desktop / Tablet / Mobile                 |
| 部署方式     | GitHub Pages（SPA + 404.html fallback）   |

### 開發指令

```bash
npm install
npm run dev          # 開發伺服器
npm run build        # 建置到 dist/
npm run build:pages  # 正式版（含 /explorer-Iceland/ base）
npm run lint
npm run typecheck
```

### 文件

- [project-scope.md](./project-scope.md) — 產品範圍與商業規則
- [tech-stack.md](./tech-stack.md) — 技術選型與理由
- [CLAUDE.md](./CLAUDE.md) — 開發約定

---

# Explorer - Iceland Tour Booking Website

![Vite](https://img.shields.io/badge/Vite-8-646cff.svg)
![React](https://img.shields.io/badge/React-19-61dafb.svg)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178c6.svg)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-4-38bdf8.svg)

### Project Overview
**Explorer** is an Iceland tour booking website that features small-group outdoor adventures. Built with Vite, React 19, TypeScript, Tailwind CSS v4, shadcn/ui and React Router, it includes a shopping cart that stores data in `localStorage` and supports responsive web design for desktop, tablet, and mobile devices.

Originally a multi-page static HTML site, then refactored to Next.js, and now a Vite single-page app.

**Live Demo**:  
👉 [https://moth-p.github.io/explorer-Iceland/](https://moth-p.github.io/explorer-Iceland/)

---

## Tech Stack

| Category      | Technologies                              |
| ------------- | ----------------------------------------- |
| Framework     | React 19 / Vite 8                         |
| Language      | TypeScript                                |
| Styling       | Tailwind CSS v4 + shadcn/ui               |
| Routing       | React Router v7                           |
| State         | Zustand (persist)                         |
| Data Storage  | localStorage                              |
| Responsive UI | Desktop / Tablet / Mobile                 |
| Deployment    | GitHub Pages (SPA + 404.html fallback)    |

### Commands

```bash
npm install
npm run dev          # dev server
npm run build        # build to dist/
npm run build:pages  # production build with the /explorer-Iceland/ base
npm run lint
npm run typecheck
```

### Docs

- [project-scope.md](./project-scope.md) — what the product does, and its business rules
- [tech-stack.md](./tech-stack.md) — every dependency and why
- [CLAUDE.md](./CLAUDE.md) — working conventions

