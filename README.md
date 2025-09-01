# RTK Todo App

A modern **Todo application** showcasing **Redux Toolkit (RTK)** fundamentals, **RTK Query** for data fetching, and *
*Entity Adapter** for normalized state—implemented with **React** and **TypeScript**.

> ✍️ A concise, step-by-step tutorial for this repo is available on LinkedIn:
> **[Read the full tutorial](YOUR-LINKEDIN-ARTICLE-URL)**

---

## Table of Contents

- [Goals](#goals)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Architecture Overview](#architecture-overview)
- [Folder Structure](#folder-structure)
- [Data Model](#data-model)
- [RTK Query Endpoints](#rtk-query-endpoints)
- [Selectors](#selectors)
- [Getting Started](#getting-started)
- [Environment & Config](#environment--config)
- [Mock Backend (MSW)](#mock-backend-msw)
- [Scripts](#scripts)
- [Troubleshooting](#troubleshooting)
- [Roadmap](#roadmap)
- [License](#license)
- [Author](#author)

---

## Goals

- Teach **RTK foundations** with clean, production-friendly patterns.
- Demonstrate **server-state** (RTK Query) vs **UI-state** (slices) separation.
- Show **normalized lists** with `createEntityAdapter` and **memoized selectors**.
- Keep the codebase **small**, **readable**, and **TypeScript-first**.

---

## Features

- ✅ **Redux Toolkit Slices** for local UI state (filters, sort, search).
- ✅ **RTK Query** for fetching, caching, invalidation, prefetch, and optimistic UX.
- ✅ **Entity Adapter** for O(1) lookups, stable sorting, and ergonomic selectors.
- ✅ **Memoized Selectors** (Reselect) for filtered/sorted task views.
- ✅ **TypeScript** throughout (typed store, endpoints, selectors, hooks).
- ✅ **Mock Service Worker (MSW)** for local API simulation.

---

## Tech Stack

- **React** (with hooks)
- **Redux Toolkit** (`@reduxjs/toolkit`)
- **RTK Query** (via `createApi`)
- **TypeScript**
- **Vite** (dev/build tooling)
- **MSW** (optional mock backend)

---

## Architecture Overview

**State layers**

- **Server State** → managed by **RTK Query** under `tasksApi.reducerPath`.
  Caching, refetching, invalidation, optimistic updates.
- **UI State** → managed by RTK **slices** (e.g., `filters-slice.ts`).
  Status/filter/sort/search that shouldn’t live on the server.
- **UI-Optimized Data** → **Entity Adapter** slice (`tasks-slice.ts`) mirrors server list into normalized shape for fast
  queries and derived views.

**Data flow**

1. Components call hooks like `useGetTasksQuery()`.
2. RTK Query fetches/caches; matchers in `tasks-slice.ts` **sync** adapter state.
3. Components render **adapter selectors** (filtered/sorted lists).

---

## Folder Structure

```bash
src/
├─ components/              # UI components
├─ lib/
│  └─ redux.ts              # Typed hooks: useAppDispatch/useAppSelector
├─ services/
│  └─ tasks-api.ts          # RTK Query API: endpoints + hooks
├─ store/
│  ├─ filters-slice.ts      # Local UI state (status/sort/query)
│  ├─ tasks-slice.ts        # Entity adapter + matchers + selectors
│  └─ store.ts              # configureStore + middleware + listeners
└─ mocks/ (optional)        # MSW handlers, browser worker, etc.
```

## 🛠️ Tech Stack

* React (with hooks)
* Redux Toolkit
* RTK Query
* TypeScript

## 📖 Tutorial

### This repository is paired with a step-by-step tutorial where we:

1. Introduce Redux Toolkit fundamentals,
2. Build slices with createSlice,
3. Normalize state with createEntityAdapter,
4. Fetch and sync data using RTK Query,
5. Compose selectors with Reselect for filtering and sorting.

> 👉 Read the full tutorial on LinkedIn: [RTK Todo App Tutorial](https://www.linkedin.com/in/naser-papi/)

## 🏃 Getting Started

1. **Clone the repo**

```console
git clone https://github.com/naser-papi/npw-fe-rtk-todo-app.git
cd npw-fe-rtk-todo-app
```

2. **Install dependencies**

```console
pnpm install
```

3. **Run the app**

```console
pnpm dev
```

> The app will be available at http://localhost:5173 (default Vite port).

## 🧩 Key Learnings

* How RTK slices simplify reducer + action boilerplate.
* How Immer enables immutable state with mutable-looking syntax.
* How RTK Query eliminates most async logic code.
* How entity adapters provide efficient list handling and selectors.
* How to combine local UI state (filters) with server data (tasks).

## 📬 Author

**Naser Papi**

## 📄 License

**This project is open-sourced under the MIT license.**