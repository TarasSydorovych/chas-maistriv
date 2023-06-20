import { configureStore } from '@reduxjs/toolkit';
import productsReducer from './productsSlice';
import filtersReducer from './filtersSlice';
import manuScript from './manufacturesSlice';
import manuscriptFilter from './filtersSliceMan'
const store = configureStore({
  reducer: {
    products: productsReducer,
    filters: filtersReducer,
    manuscript: manuScript,
    manuscriptFilter: manuscriptFilter,
  },
});

export default store;