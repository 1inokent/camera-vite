import { configureStore } from '@reduxjs/toolkit';
import { createAPI } from '../service/api';
import camerasSlice from './slices/cameras-slice';

const api = createAPI();

const store = configureStore({
  reducer: {
    cameras: camerasSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: {
        extraArgument: api,
      },
    }),
});

export { store };
