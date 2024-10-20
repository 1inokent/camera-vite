import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Cameras } from '../../../types/cameras-types/cameras-types';
import { AxiosError, AxiosInstance } from 'axios';
import { ApiRout } from '../../../const';
import { clearError, setError } from '../error-slice/error-slice';

export interface CamerasSimilarState {
  camerasSimilar: Cameras;
  isLoading: boolean;
}

const initialState: CamerasSimilarState = {
  camerasSimilar: [],
  isLoading: false,
};

export const fetchCamerasSimilarAction = createAsyncThunk<
  Cameras,
  { signal: AbortSignal; id: string },
  { extra: AxiosInstance; rejectValue: string }
>(
  'product/fetchCamerasSimilar',
  async ({ signal, id }, { extra: api, dispatch, rejectWithValue }) => {
    dispatch(clearError());
    try {
      const { data } = await api.get<Cameras>(
        `${ApiRout.Cameras}/${id}${ApiRout.Similar}`,
        {
          signal,
        }
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

const camerasSimilarSlice = createSlice({
  name: 'camerasSimilar',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCamerasSimilarAction.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchCamerasSimilarAction.fulfilled, (state, action) => {
        state.camerasSimilar = action.payload;
        state.isLoading = false;
      })
      .addCase(fetchCamerasSimilarAction.rejected, (state) => {
        state.isLoading = false;
      });
  },
});

export default camerasSimilarSlice.reducer;
