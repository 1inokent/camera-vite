import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { CameraFetchReviews, CameraReviewSubmit } from '../../../types/camera-review-types/camera-review-types';
import { AxiosError, AxiosInstance } from 'axios';
import { ApiRout } from '../../../const';
import { clearError, setError } from '../error-slice/error-slice';

export interface CameraReviewState {
  reviews: CameraFetchReviews;
  isLoading: boolean;
}

const initialState: CameraReviewState = {
  reviews: [],
  isLoading: false,
};

export const fetchCameraReviewAction = createAsyncThunk<
  CameraFetchReviews,
  { signal: AbortSignal; id: string },
  { extra: AxiosInstance; rejectValue: string }
>(
  'camera/fetchCameraReview',
  async ({ signal, id }, { extra: api, dispatch, rejectWithValue }) => {
    dispatch(clearError());
    try {
      const { data } = await api.get<CameraFetchReviews>(
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

export const submitCameraReviewAction = createAsyncThunk<
  void,
  CameraReviewSubmit,
  { extra: AxiosInstance; rejectValue: string }
>(
  'camera/submitCameraReview',
  async (reviewData, { extra: api, dispatch, rejectWithValue }) => {
    dispatch(clearError);
    try {
      await api.post(ApiRout.Review, reviewData);
    } catch (error) {
      if (error instanceof AxiosError) {
        const errorMessage = error.message || 'Не удалось отправить отзыв';
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
