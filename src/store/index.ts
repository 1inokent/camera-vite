import { configureStore } from '@reduxjs/toolkit';
import { createAPI } from '../service/api';

import camerasSlice from './slices/cameras-slice/cameras-slice';
import cameraSlice from './slices/camera-slice/camera-slice';
import errorSlice from './slices/error-slice/error-slice';
import cameraReviewSlice from './slices/camera-review-slice/camera-review-slice';
import camerasSimilarSlice from './slices/camera-similar-slice/cameras-similar-slice';
import camerasPromoSlice from './slices/camera-promo-slice/cameras-promo-slice';
import basketSlice from './slices/basket-slice/basket-slice';

const api = createAPI();

const store = configureStore({
  reducer: {
    error: errorSlice,
    cameras: camerasSlice,
    camera: cameraSlice,
    cameraReview: cameraReviewSlice,
    camerasSimilar: camerasSimilarSlice,
    camerasPromo: camerasPromoSlice,
    basket: basketSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: {
        extraArgument: api,
      },
    }),
});

export { store };
