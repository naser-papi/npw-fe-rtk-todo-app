import filters from '@/features/filters/filters-slice';
import tasks from '@/features/tasks/tasks-slice';
import { tasksApi } from '@/services/tasks-api';

import { configureStore } from '@reduxjs/toolkit';

export const store = configureStore({
  reducer: {
    [tasksApi.reducerPath]: tasksApi.reducer,
    filters,
    tasks,
  },
  middleware: getDefault => getDefault().concat(tasksApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
