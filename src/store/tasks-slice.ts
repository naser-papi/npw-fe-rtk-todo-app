import { type Task, tasksApi } from '@/services/tasks-api';
import type { RootState } from '@/store/store';

import { createEntityAdapter, createSelector, createSlice } from '@reduxjs/toolkit';

const tasksAdapter = createEntityAdapter<Task>({
  sortComparer: (a, b) => b.createdAt - a.createdAt,
});

const initialState = tasksAdapter.getInitialState();

const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addMatcher(tasksApi.endpoints.getTasks.matchFulfilled, (state, { payload }) => {
      tasksAdapter.setAll(state, payload);
    });
  },
});

export default tasksSlice.reducer;

// Base selectors
const adapterSelectors = tasksAdapter.getSelectors<RootState>(s => s.tasks);

// Filters
const selectStatus = (s: RootState) => s.filters.status;
const selectQuery = (s: RootState) => s.filters.query;
const selectSort = (s: RootState) => s.filters.sort;

export const selectFilteredTasks = createSelector(
  [adapterSelectors.selectAll, selectStatus, selectQuery, selectSort],
  (tasks, status, q, sort) => {
    let out = tasks;
    if (status !== 'all') out = out.filter(t => (status === 'done' ? t.done : !t.done));
    if (q) out = out.filter(t => t.title.toLowerCase().includes(q.toLowerCase()));
    if (sort === 'priority') {
      const weight = { high: 3, medium: 2, low: 1 } as const;
      out = [...out].sort((a, b) => weight[b.priority] - weight[a.priority]);
    }
    return out;
  }
);
