import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AxiosError, AxiosInstance } from 'axios';
import { clearError, setError } from '../error-slice/error-slice';
import { ApiRout } from '../../../const';

interface CouponState {
  discount: number | null;
  coupon: string | null;
  loading: boolean;
}

const loadCouponFromStorage = (): {
  coupon: string | null;
  discount: number | null;
} => {
  const storedCoupon = localStorage.getItem('coupon');
  if (storedCoupon) {
    try {
      const parsetCoupon: unknown = JSON.parse(storedCoupon);
      return parsetCoupon as { coupon: string | null; discount: number | null };
    } catch {
      return { coupon: null, discount: null };
    }
  }
  return { coupon: null, discount: null };
};

const saveCouponToStorage = (coupon: string, discount: number) => {
  localStorage.setItem('coupon', JSON.stringify({ coupon, discount }));
};

const initialState: CouponState = {
  ...loadCouponFromStorage(),
  loading: false,
};

export const sendCouponAction = createAsyncThunk<
  number,
  string,
  { extra: AxiosInstance; rejectValue: string }
>(
  'coupon/sendCoupon',
  async (coupon, { extra: api, dispatch, rejectWithValue }) => {
    dispatch(clearError());
    const cleanedCoupon = coupon.trim();
    if (!/^\S+$/.test(cleanedCoupon)) {
      const error = 'Промокод не должен содержать пробелов.';
      dispatch(setError(error));
      return rejectWithValue(error);
    }

    try {
      const respons = await api.post<number>(ApiRout.Coupons, {
        coupon: cleanedCoupon,
      });
      return respons.data;
    } catch (error) {
      if (error instanceof AxiosError && error.response) {
        const errorMessage =
          error.response.status === 400
            ? 'Промокод недействителен.'
            : 'Не удалось применить промокод.';
        dispatch(setError(errorMessage));
        return rejectWithValue(errorMessage);
      }
      const fallbackError = 'Произошла неизвестная ошибка';
      dispatch(setError(fallbackError));
      return rejectWithValue(fallbackError);
    }
  }
);

const couponSlice = createSlice({
  name: 'coupon',
  initialState,
  reducers: {
    clearCoupon(state) {
      state.coupon = null;
      state.discount = null;
      localStorage.removeItem('coupon');
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(sendCouponAction.pending, (state) => {
        state.loading = true;
      })
      .addCase(
        sendCouponAction.fulfilled,
        (state, action: PayloadAction<number>) => {
          state.loading = false;
          state.discount = action.payload;
          state.coupon = state.coupon ?? '';
          saveCouponToStorage(state.coupon, action.payload);
        }
      )
      .addCase(sendCouponAction.rejected, (state) => {
        state.loading = false;
      });
  },
});

export const { clearCoupon } = couponSlice.actions;
export default couponSlice.reducer;
