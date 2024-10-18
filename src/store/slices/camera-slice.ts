import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Camera } from '../../types/cameras-types/cameras-types';
import { AxiosError, AxiosInstance } from 'axios';
import { ApiRout } from '../../const';
import { clearError, setError } from './error-slice';
import { OrdersCamera } from '../../types/send-data-types/orders-type';

interface CameraState {
  camera: Camera | null;
  isLoading: boolean;
  orderStatus: 'idle' | 'loading' | 'succeeded' | 'failed';
  orderError: string | null;
}

const initialState: CameraState = {
  camera: null,
  isLoading: false,
  orderStatus: 'idle',
  orderError: null,
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

export const sendOrderCameraAction = createAsyncThunk<
  void,
  OrdersCamera,
  { extra: AxiosInstance; rejectValue: string }
>(
  'order/sendOrder',
  async (
    { camerasIds, coupon = null, tel },
    { extra: api, dispatch, rejectWithValue }
  ) => {
    dispatch(clearError());
    try {
      await api.post(ApiRout.Orders, {
        camerasIds,
        coupon,
        tel,
      });
    } catch (error) {
      if (error instanceof AxiosError) {
        const errorMessage = error.message || 'Не удалось отправить заказ';
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

    builder
      .addCase(sendOrderCameraAction.pending, (state) => {
        state.orderStatus = 'loading';
        state.orderError = null;
      })
      .addCase(sendOrderCameraAction.fulfilled, (state) => {
        state.orderStatus = 'succeeded';
      })
      .addCase(sendOrderCameraAction.rejected, (state, action) => {
        state.orderStatus = 'failed';
        state.orderError = action.payload as string;
      });
  },
});

export default cameraSlice.reducer;
