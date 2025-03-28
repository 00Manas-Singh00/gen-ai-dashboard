import { configureStore } from '@reduxjs/toolkit';
import queryReducer from '../features/query/querySlice';

const store = configureStore({
  reducer: {
    query: queryReducer,
  },
});

export default store;