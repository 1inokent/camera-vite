import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { AxiosInstance, AxiosError } from 'axios';
import { ApiRout } from '../../../const';
import { OrdersCamera } from '../../../types/send-data-types/orders-type';
import { clearError, setError } from '../error-slice/error-slice';

interface OrderState {
  loading: boolean;
  success: boolean;
}

const initialState: OrderState = {
  loading: false,
  success: false,
};

export const sendOrderAction = createAsyncThunk<
  void,
  OrdersCamera,
  { extra: AxiosInstance; rejectValue: string }
>(
  'order/sendOrder',
  async (
    { camerasIds, coupon = null },
    { extra: api, dispatch, rejectWithValue }
  ) => {
    dispatch(clearError());
    try {
      await api.post(ApiRout.Orders, {
        camerasIds,
        coupon,
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

const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    resetOrderState(state) {
      state.loading = false;
      state.success = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(sendOrderAction.pending, (state) => {
        state.loading = true;
        state.success = false;
      })
      .addCase(sendOrderAction.fulfilled, (state) => {
        state.loading = false;
        state.success = true;
      })
      .addCase(sendOrderAction.rejected, (state) => {
        state.loading = false;
        state.success = false;
      });
  },
});

export const { resetOrderState } = orderSlice.actions;
export default orderSlice.reducer;
