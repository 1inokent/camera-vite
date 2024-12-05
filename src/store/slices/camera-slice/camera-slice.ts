import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Camera } from '../../../types/cameras-types/cameras-types';
import { AxiosError, AxiosInstance } from 'axios';
import { ApiRout } from '../../../const';
import { clearError, setError } from '../error-slice/error-slice';

export interface CameraState {
  camera: Camera | null;
  isLoading: boolean;
}

const initialState: CameraState = {
  camera: null,
  isLoading: false,
};

export const fetchCameraAction = createAsyncThunk<
  Camera,
  { signal: AbortSignal; id: string },
  { extra: AxiosInstance; rejectValue: string }
>(
  'product/fetchCamera',
  async ({ signal, id }, { extra: api, dispatch, rejectWithValue }) => {
    dispatch(clearError());
    try {
      const { data } = await api.get<Camera>(`${ApiRout.Cameras}/${id}`, {
        signal,
      });

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

const cameraSlice = createSlice({
  name: 'camera',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCameraAction.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchCameraAction.fulfilled, (state, action) => {
        state.camera = action.payload;
        state.isLoading = false;
      })
      .addCase(fetchCameraAction.rejected, (state) => {
        state.isLoading = false;
      });
  },
});

export default cameraSlice.reducer;
