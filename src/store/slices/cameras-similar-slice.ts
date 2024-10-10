import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Cameras } from '../../types/cameras-types/cameras-types';
import { AxiosError, AxiosInstance } from 'axios';
import { ApiRout } from '../../const';

interface CamerasSimilarState {
  camerasSimilar: Cameras;
  isLoading: boolean;
  error: string | null;
}

const initialState: CamerasSimilarState = {
  camerasSimilar: [],
  isLoading: false,
  error: null,
};

export const fetchCamerasSimilarAction = createAsyncThunk<
  Cameras,
  { signal: AbortSignal; id: string },
  { extra: AxiosInstance }
>('product/fetchCamerasSimilar', async ({ signal, id }, { extra: api }) => {
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
        return Promise.reject(new Error('Запрос отменён'));
      }
      throw new Error(error.message);
    }

    throw new Error('Произошла неизвестная ошибка');
  }
});

const camerasSimilarSlice = createSlice({
  name: 'camerasSimilar',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCamerasSimilarAction.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchCamerasSimilarAction.fulfilled, (state, action) => {
        state.camerasSimilar = action.payload;
        state.isLoading = false;
      })
      .addCase(fetchCamerasSimilarAction.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || 'Ошибка загрузки';
      });
  },
});

export default camerasSimilarSlice.reducer;
