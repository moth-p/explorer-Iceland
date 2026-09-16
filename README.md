# Explorer 冰島旅遊行程預定網站

![Next.js](https://img.shields.io/badge/Next.js-15-000000.svg)
![React](https://img.shields.io/badge/React-19-61dafb.svg)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178c6.svg)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3.4-38bdf8.svg)

### 專案簡介
**Explorer** 是一個冰島旅遊行程預定網站，主打小團體行動制的戶外探索活動。網站以 Next.js 15（App Router）、React 19、TypeScript 與 Tailwind CSS（v3.4）開發，購物車資料會儲存在使用者的 `localStorage` 中，支援 RWD 響應式設計，適用於桌機、平板與手機等裝置。

本專案原為多頁靜態 HTML，已重構為 Next.js。重構範圍與步驟請見 [implementation-plan.md](./implementation-plan.md)。

 **網站預覽**：  
👉 [https://moth-p.github.io/explorer-Iceland/](https://moth-p.github.io/explorer-Iceland/)

---

## 使用技術

| 分類         | 技術名稱                                  |
| ------------ | ----------------------------------------- |
| 框架         | Next.js 15（App Router）/ React 19        |
| 前端語言     | TypeScript                                |
| 樣式框架     | Tailwind CSS v3.4                         |
| 狀態管理     | Zustand（persist）                        |
| 資料儲存     | localStorage                              |
| 響應式設計   | Desktop / Tablet / Mobile                 |
| 部署方式     | GitHub Pages（靜態匯出 + GitHub Actions） |

### 開發指令

```bash
npm install
npm run dev          # 開發伺服器
npm run build        # 靜態匯出到 out/
npm run build:pages  # 正式版（含 basePath）
npm run lint
npm run typecheck
```

### 文件

- [project-scope.md](./project-scope.md) — 產品範圍與商業規則
- [tech-stack.md](./tech-stack.md) — 技術選型與理由
- [implementation-plan.md](./implementation-plan.md) — 重構階段
- [CLAUDE.md](./CLAUDE.md) — 開發約定

---

# Explorer - Iceland Tour Booking Website

![Next.js](https://img.shields.io/badge/Next.js-15-000000.svg)
![React](https://img.shields.io/badge/React-19-61dafb.svg)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178c6.svg)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3.4-38bdf8.svg)

### Project Overview
**Explorer** is an Iceland tour booking website that features small-group outdoor adventures. Built with Next.js 15 (App Router), React 19, TypeScript and Tailwind CSS (v3.4), it includes a shopping cart that stores data in `localStorage` and supports responsive web design for desktop, tablet, and mobile devices.

Originally a multi-page static HTML site, now refactored to Next.js — see [implementation-plan.md](./implementation-plan.md) for the scope and phases.

**Live Demo**:  
👉 [https://moth-p.github.io/explorer-Iceland/](https://moth-p.github.io/explorer-Iceland/)

---

## Tech Stack

| Category      | Technologies                              |
| ------------- | ----------------------------------------- |
| Framework     | Next.js 15 (App Router) / React 19        |
| Language      | TypeScript                                |
| Styling       | Tailwind CSS v3.4                         |
| State         | Zustand (persist)                         |
| Data Storage  | localStorage                              |
| Responsive UI | Desktop / Tablet / Mobile                 |
| Deployment    | GitHub Pages (static export + Actions)    |

### Commands

```bash
npm install
npm run dev          # dev server
npm run build        # static export to out/
npm run build:pages  # production build with basePath
npm run lint
npm run typecheck
```

### Docs

- [project-scope.md](./project-scope.md) — what the product does, and its business rules
- [tech-stack.md](./tech-stack.md) — every dependency and why
- [implementation-plan.md](./implementation-plan.md) — refactor phases
- [CLAUDE.md](./CLAUDE.md) — working conventions

