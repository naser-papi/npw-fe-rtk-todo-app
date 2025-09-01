import { tasksApi } from '@/services/tasks-api';
import filters from '@/store/filters-slice';
import tasks from '@/store/tasks-slice';


import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';


export const store = configureStore({
  reducer: {
    [tasksApi.reducerPath]: tasksApi.reducer,
    filters,
    tasks,
  },
  middleware: getDefault => getDefault().concat(tasksApi.middleware),
});

//That enables auto-refetch when the user regains focus or reconnects to the internet.
// (Uses the Observer pattern behind the scenes.)
setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
