import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Cameras } from '../../types/cameras-types/cameras-types';
import { AxiosError, AxiosInstance } from 'axios';
import { ApiRout } from '../../const';
import { clearError, setError } from './error-slice';

interface CamerasState {
  cameras: Cameras;
  isLoading: boolean;
}

const initialState: CamerasState = {
  cameras: [],
  isLoading: false,
};

export const fetchCamerasAction = createAsyncThunk<
  Cameras,
  { signal: AbortSignal },
  { extra: AxiosInstance; rejectValue: string }
>(
  'cameras/fetchCameras',
  async ({ signal }, { extra: api, dispatch, rejectWithValue }) => {
    dispatch(clearError());
    try {
      const { data } = await api.get<Cameras>(ApiRout.Cameras, { signal });

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

const camerasSlice = createSlice({
  name: 'cameras',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCamerasAction.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchCamerasAction.fulfilled, (state, action) => {
        state.cameras = action.payload;
        state.isLoading = false;
      })
      .addCase(fetchCamerasAction.rejected, (state) => {
        state.isLoading = false;
      });
  },
});

export default camerasSlice.reducer;
