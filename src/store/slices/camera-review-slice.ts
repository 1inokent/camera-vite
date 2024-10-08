import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { CameraReviews } from '../../types/camera-review-types/camera-review-types';
import { AxiosError, AxiosInstance } from 'axios';
import { ApiRout } from '../../const';

interface CameraReviewState {
  reviews: CameraReviews;
  isLoading: boolean;
  error: string | null;
}

const initialState: CameraReviewState = {
  reviews: [],
  isLoading: false,
  error: null,
};

export const fetchCameraReviewAction = createAsyncThunk<
  CameraReviews,
  { signal: AbortSignal; id: string },
  { extra: AxiosInstance }
>('product/fetchCameraReview', async ({ signal, id }, { extra: api }) => {
  try {
    const { data } = await api.get<CameraReviews>(
      `${ApiRout.Cameras}/${id}${ApiRout.Review}`,
      { signal }
    );

    return data;
  } catch (error) {
    if (error instanceof AxiosError) {
      if (error.name === 'CanceledError') {
        return Promise.reject(new Error('Запрос отменён'));
      }
      throw new Error(error.message);
    }

    throw new Error('Произошла неизвестная ошибка');
  }
});

const cameraReviewSlice = createSlice({
  name: 'cameraReview',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCameraReviewAction.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchCameraReviewAction.fulfilled, (state, action) => {
        state.reviews = action.payload;
        state.isLoading = false;
      })
      .addCase(fetchCameraReviewAction.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || 'Ошибка загрузки';
      });
  },
});

export default cameraReviewSlice.reducer;
