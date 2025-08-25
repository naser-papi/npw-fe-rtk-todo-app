import { type PayloadAction, createSlice } from '@reduxjs/toolkit';

export type Status = 'all' | 'active' | 'done';
export type Sort = 'date' | 'priority';

type State = { status: Status; sort: Sort; query: string };
const initialState: State = { status: 'all', sort: 'date', query: '' };

const filtersSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    setStatus: (s, a: PayloadAction<Status>) => {
      s.status = a.payload;
    },
    setSort: (s, a: PayloadAction<Sort>) => {
      s.sort = a.payload;
    },
    setQuery: (s, a: PayloadAction<string>) => {
      s.query = a.payload;
    },
  },
});

export const { setStatus, setSort, setQuery } = filtersSlice.actions;
export default filtersSlice.reducer;
