import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Camera } from '../../../types/cameras-types/cameras-types';
import { clearError, setError } from '../error-slice/error-slice';

export interface BasketItem extends Camera {
  quantity: number;
}

export interface BasketState {
  basketItems: BasketItem[];
}

const loadBasketFromStorage = (): BasketItem[] => {
  const storedBasket = localStorage.getItem('basket');
  if (storedBasket) {
    try {
      const parsedBasket: unknown = JSON.parse(storedBasket);
      if (Array.isArray(parsedBasket)) {
        return parsedBasket as BasketItem[];
      }
    } catch {
      return [];
    }
  }
  return [];
};

const saveBasketToStorage = (basket: BasketItem[]): void => {
  try {
    localStorage.setItem('basket', JSON.stringify(basket));
  } catch {
    setError('Ошибка при сохранении корзины в локальное хранилище.');
  }
};

const initialState: BasketState = {
  basketItems: loadBasketFromStorage(),
};

const basketSlice = createSlice({
  name: 'basket',
  initialState,
  reducers: {
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
    clearBasket(state, action: PayloadAction<number>) {
      try {
        state.basketItems = state.basketItems.filter(
          (item) => item.id !== action.payload
        );
        saveBasketToStorage(state.basketItems);
        clearError();
      } catch {
        setError('Ошибка при очистке корзины.');
      }
    },
  },
});

export const { addToBasket, removeFromBasket, updateQuantity, clearBasket } =
  basketSlice.actions;

export default basketSlice.reducer;
