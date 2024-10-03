import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Camera } from '../../types/cameras-types/cameras-types';
import { AxiosError, AxiosInstance } from 'axios';
import { ApiRout } from '../../const';

interface CameraState {
  camera: Camera | null;
  isLoading: boolean;
  error: string | null;
}

const initialState: CameraState = {
  camera: null,
  isLoading: false,
  error: null,
};

export const fetchCameraAction = createAsyncThunk<
  Camera,
  { signal: AbortSignal; id: string },
  { extra: AxiosInstance }
>('product/fetchCamera', async ({ signal, id }, { extra: api }) => {
  try {
    const { data } = await api.get<Camera>(`${ApiRout.Cameras}/${id}`, {
      signal,
    });

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

const cameraSlice = createSlice({
  name: 'camera',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCameraAction.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchCameraAction.fulfilled, (state, action) => {
        state.camera = action.payload;
        state.isLoading = false;
      })
      .addCase(fetchCameraAction.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || 'Ошибка загрузки';
      });
  },
});

export default cameraSlice.reducer;
