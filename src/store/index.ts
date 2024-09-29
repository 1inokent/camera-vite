import { configureStore } from '@reduxjs/toolkit';
import { createAPI } from '../service/api';
import camerasSlice from './slices/cameras-slice';
import cameraSlice from './slices/camera-slice';
import errorSlice from './slices/error-slice';

const api = createAPI();

const store = configureStore({
  reducer: {
    error: errorSlice,
    cameras: camerasSlice,
    camera: cameraSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: {
        extraArgument: api,
      },
    }),
});

export { store };
