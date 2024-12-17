import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Camera } from '../../../types/cameras-types/cameras-types';
import { clearError, setError } from '../error-slice/error-slice';
import { BasketItems } from '../../../types/basket-types/basket-types';
import { AxiosInstance, AxiosError } from 'axios';
import { ApiRout } from '../../../const';
import { OrdersCamera } from '../../../types/send-data-types/orders-type';

export interface BasketState {
  basketItems: BasketItems;
  loading: boolean;
}

const loadBasketFromStorage = (): BasketItems => {
  const storedBasket = localStorage.getItem('basket');
  if (storedBasket) {
    try {
      const parsedBasket: unknown = JSON.parse(storedBasket);
      if (Array.isArray(parsedBasket)) {
        return parsedBasket as BasketItems;
      }
    } catch {
      return [];
    }
  }
  return [];
};

const saveBasketToStorage = (basket: BasketItems): void => {
  try {
    localStorage.setItem('basket', JSON.stringify(basket));
  } catch {
    setError('Ошибка при сохранении корзины в локальное хранилище.');
  }
};

const initialState: BasketState = {
  basketItems: loadBasketFromStorage(),
  loading: false,
};

const basketSlice = createSlice({
  name: 'basket',
  initialState,
  reducers: {
    setBasketSendLoader(state, action: PayloadAction<boolean>) {
      state.loading = action.payload;
    },

    addToBasket(state, action: PayloadAction<Camera>) {
      try {
        const existingItem = state.basketItems.find(
          (item) => item.id === action.payload.id
        );
        if (existingItem) {
          existingItem.quantity += 1;
        } else {
          state.basketItems.push({ ...action.payload, quantity: 1 });
        }
        saveBasketToStorage(state.basketItems);
        clearError();
      } catch {
        setError('Ошибка при добавлении товара в корзину.');
      }
    },

    removeFromBasket(state, action: PayloadAction<number>) {
      try {
        state.basketItems = state.basketItems.filter(
          (item) => item.id !== action.payload
        );
        saveBasketToStorage(state.basketItems);
        clearError();
      } catch {
        setError('Ошибка при удалении товара из корзины.');
      }
    },

    updateQuantity(
      state,
      action: PayloadAction<{ id: number; quantity: number }>
    ) {
      try {
        const existingItem = state.basketItems.find(
          (item) => item.id === action.payload.id
        );
        if (existingItem) {
          existingItem.quantity = action.payload.quantity;
          saveBasketToStorage(state.basketItems);
          clearError();
        }
      } catch {
        setError('Ошибка при обновлении количества товара.');
      }
    },

    clearBasket(state, action: PayloadAction<number | undefined>) {
      try {
        const idToClear = action.payload;
        if (idToClear) {
          state.basketItems = state.basketItems.filter(
            (item) => item.id !== idToClear
          );
        } else {
          state.basketItems = [];
        }

        saveBasketToStorage(state.basketItems);
        clearError();
      } catch {
        setError('Ошибка при очистке корзины.');
      }
    },
  },
});

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

export const {
  setBasketSendLoader,
  addToBasket,
  removeFromBasket,
  updateQuantity,
  clearBasket,
} = basketSlice.actions;

export default basketSlice.reducer;
