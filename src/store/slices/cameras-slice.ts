import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Cameras } from '../../types/cameras-types/cameras-types';
import { AxiosInstance } from 'axios';
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
  undefined,
  {
    extra: AxiosInstance;
  }
>('cameras/fetchCameras', async (_, { extra: api }) => {
  const { data } = await api.get<Cameras>(ApiRout.Cameras);

  return data;
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
