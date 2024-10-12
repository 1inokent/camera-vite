import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { CameraReviews } from '../../types/camera-review-types/camera-review-types';
import { AxiosError, AxiosInstance } from 'axios';
import { ApiRout } from '../../const';
import { clearError, setError } from './error-slice';

interface CameraReviewState {
  reviews: CameraReviews;
  isLoading: boolean;
}

const initialState: CameraReviewState = {
  reviews: [],
  isLoading: false,
};

export const fetchCameraReviewAction = createAsyncThunk<
  CameraReviews,
  { signal: AbortSignal; id: string },
  { extra: AxiosInstance; rejectValue: string }
>(
  'product/fetchCameraReview',
  async ({ signal, id }, { extra: api, dispatch, rejectWithValue }) => {
    dispatch(clearError());
    try {
      const { data } = await api.get<CameraReviews>(
        `${ApiRout.Cameras}/${id}${ApiRout.Review}`,
        { signal }
      );

      return data;
    } catch (error) {
      if (error instanceof AxiosError) {
        if (error.name === 'CanceledError') {
          return rejectWithValue('Запрос был отменён');
        }
        const errorMessage = error.message || 'Произошла неизвестная ошибка';
        dispatch(setError(errorMessage));
        return rejectWithValue(errorMessage);
      }
      return rejectWithValue('Произошла неизвестная ошибка');
    }
  }
);

const cameraReviewSlice = createSlice({
  name: 'cameraReview',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCameraReviewAction.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchCameraReviewAction.fulfilled, (state, action) => {
        state.reviews = action.payload;
        state.isLoading = false;
      })
      .addCase(fetchCameraReviewAction.rejected, (state) => {
        state.isLoading = false;
      });
  },
});

export default cameraReviewSlice.reducer;
