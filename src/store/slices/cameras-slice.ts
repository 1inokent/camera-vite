import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Cameras } from '../../types/cameras-types/cameras-types';
import { AxiosError, AxiosInstance } from 'axios';
import { ApiRout } from '../../const';

interface CamerasState {
  cameras: Cameras;
  isLoading: boolean;
  error: string | null;
}

const initialState: CamerasState = {
  cameras: [],
  isLoading: false,
  error: null,
};

export const fetchCamerasAction = createAsyncThunk<
  Cameras,
  { signal: AbortSignal },
  { extra: AxiosInstance }
>('cameras/fetchCameras', async ({ signal }, { extra: api }) => {
  try {
    const { data } = await api.get<Cameras>(ApiRout.Cameras, { signal });

    return data;
  } catch (error: unknown) {
    if (error instanceof AxiosError) {
      if (error.name === 'CanceledError') {
        return Promise.reject(new Error('Запрос отменён'));
      }
      throw new Error(error.message);
    }

    throw new Error('Произошла неизвестная ошибка');
  }
});

const camerasSlice = createSlice({
  name: 'cameras',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCamerasAction.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchCamerasAction.fulfilled, (state, action) => {
        state.cameras = action.payload;
        state.isLoading = false;
      })
      .addCase(fetchCamerasAction.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || 'Ошибка загрузки';
      });
  },
});

export default camerasSlice.reducer;
