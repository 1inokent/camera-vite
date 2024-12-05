import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Camera } from '../../../types/cameras-types/cameras-types';

export interface BasketItem extends Camera {
  quantity: number;
}

export interface BasketState {
  basketItems: BasketItem[];
}

const initialState: BasketState = {
  basketItems: [],
};

const basketSlice = createSlice({
  name: 'basket',
  initialState,
  reducers: {
    addToBasket: (state, action: PayloadAction<Camera>) => {
      const existingItem = state.basketItems.find(
        (item) => item.id === action.payload.id
      );

      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.basketItems.push({ ...action.payload, quantity: 1 });
      }
    },
    removeFromBasket: (state, action: PayloadAction<number>) => {
      state.basketItems = state.basketItems.filter(
        (basketItem) => basketItem.id !== action.payload
      );
    },
    updateQuantity: (
      state,
      action: PayloadAction<{ id: number; quantity: number }>
    ) => {
      const existingItem = state.basketItems.find(
        (item) => item.id === action.payload.id
      );

      if (existingItem) {
        existingItem.quantity = action.payload.quantity;
      }
    },
    clearBasket: (state) => {
      state.basketItems = [];
    },
  },
});

export const { addToBasket, clearBasket, removeFromBasket, updateQuantity } =
  basketSlice.actions;

export default basketSlice.reducer;
