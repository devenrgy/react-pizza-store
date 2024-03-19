import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

export type CartItem = {
  id: number;
  imageUrl: string;
  title: string;
  types: string;
  sizes: number;
  price: number;
  quantity: number;
}

export interface CartState {
  items: CartItem[];
}

const initialState: CartState = {
  items: [],
};

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    add: (state, action: PayloadAction<CartItem>) => {
      const isExists = state.items.some(item => item.id === action.payload.id);

      if (isExists) {
        state.items = state.items.map(item => item.id === action.payload.id ? {
          ...item,
          quantity: item.quantity + 1,
        } : item);
      } else {
        state.items.push(action.payload);
      }
    },
    remove: (state, action: PayloadAction<number>) => {
      state.items = state.items.filter(item => item.id !== action.payload);
    },
  },
});

export const { add, remove } = cartSlice.actions;

export default cartSlice.reducer;