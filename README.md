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
- [Tutorial](#tutorial)
- [Getting Started](#getting-started)
- [Environment & Config](#environment--config)
- [Mock Backend (MSW)](#mock-backend-msw)
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

---

## Data Model

```ts
type Task = {
    id: string
    title: string
    done: boolean
    priority: "low" | "medium" | "high"
    createdAt: string // ISO
}
```

---

## RTK Query Endpoints

### src/services/tasks-api.ts (high-level)

* getTasks: GET /tasks → Task[]
* addTask: POST /tasks → Task
* toggleTask: PATCH /tasks/:id/toggle → Task
* deleteTask: DELETE /tasks/:id → { id: string }

### Cache tags

* tagTypes: ["Tasks"]
* getTasks → provides Tasks/LIST (+ per-item tags if desired)
* mutations → invalidate Tasks/LIST or a specific item id

### Nice-to-have

* onQueryStarted → optimistic updates with rollback
* usePrefetch('getTasks') for hover/intent prefetch

---

## Selectors

### Adapter selectors (from tasks-slice.ts)

* selectAllTasks, selectTaskById, selectTaskIds, selectTaskTotal

### UI-ready derived selector

* selectFilteredTasks → applies status, query, sort to adapter list
  (Uses Reselect to prevent unnecessary re-renders.)

### Filter selectors (from filters-slice.ts)

* selectStatus, selectSort, selectQuery

---

## Tutorial

### 📖 This repository is paired with a step-by-step tutorial where we:

1. Introduce Redux Toolkit fundamentals,
2. Build slices with createSlice,
3. Normalize state with createEntityAdapter,
4. Fetch and sync data using RTK Query,
5. Compose selectors with Reselect for filtering and sorting.

> 👉 Read the full tutorial on
> LinkedIn: [RTK Todo App Tutorial](https://www.linkedin.com/pulse/learning-redux-toolkit-through-real-project-naser-papi-dcr0f/)

---

## Getting Started

🏃 Follow these steps to get started:
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

---

## Environment & Config

### Create a local env file (e.g., .env.local):

```console
# API base (used by fetchBaseQuery)
VITE_API_URL=http://localhost:3000

# Enable mock API (used by app init conditionally)
VITE_API_MOCKED=true
```

### For production, set your real API:

```console
# .env.production
VITE_API_URL=https://your.api.example.com
VITE_API_MOCKED=false
```

> If you previously had base URL issues on localhost vs. deployment, keep per-env files (.env.local, .env.production)
> and avoid hardcoding in Vite config.

---

## Mock Backend (MSW)

### This project can run against a Mock Service Worker during development.

* Typical setup pattern
    * src/mocks/browser.ts → worker.start()
    * Import this in your app entry only when import.meta.env.DEV && import.meta.env.VITE_API_MOCKED === 'true'.
* Example:

```ts
// main.tsx
if (import.meta.env.DEV && import.meta.env.VITE_API_MOCKED === 'true') {
    const {worker} = await import('./mocks/browser')
    await worker.start()
}
```

### Why MSW?

* Develop UI without a backend.
* Stable, deterministic responses for demos and tests.

---

## Troubleshooting

* Nothing shows up / list empty
    * Check VITE_API_URL or enable mocks: VITE_API_MOCKED=true.
    * Ensure store.ts mounts reducers correctly:
  ```ts
    reducer: {
        [tasksApi.reducerPath]: tasksApi.reducer,
        filters,
        tasks,
    }
    ```
    * Ensure setupListeners(store.dispatch) is called for refetch on focus/reconnect.
* ID mismatches
    * If your backend returns _id, map it with transformResponse to id.
* Sorting not applied
    * Adapter’s sortComparer handles "date" mode (newest first).
    * For "priority" mode, see selectFilteredTasks for explicit sort.
* Production vs. Local API
    * Put the correct base in .env.production vs .env.local.

---

## Roadmap

* ✅ Clean RTK foundations (slices, store, types)
* ✅ RTK Query integration (fetch, cache, invalidate)
* ✅ Entity Adapter for normalized task lists
* 🔜 Optimistic updates for all mutations
* 🔜 Expanded tests & CI
* 🔜 Accessibility & UX polish

---

## License

📄 **This project is open-sourced under the MIT license.**

---

## Author

📬 **Naser Papi**

