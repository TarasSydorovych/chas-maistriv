import { createSlice } from '@reduxjs/toolkit';

const filtersSlice = createSlice({
  name: 'filters',
  initialState: [],
  reducers: {
    addFilter(state, action) {
      state.push(action.payload);
    },
    removeFilter(state, action) {
      return state.filter((filter) => filter.field !== action.payload.field || filter.value !== action.payload.value);
    },
    clearFilters(state) {
      return [];
    },
  },
});

export const { addFilter, removeFilter, clearFilters } = filtersSlice.actions;

export default filtersSlice.reducer;