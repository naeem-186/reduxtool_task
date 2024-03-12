
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../store';
import { Product } from '../../models/Product';

interface CartState {
  items: Product[];
}

const initialState: CartState = {
  items: []
};

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<Product>) => {
      const existingProductIndex = state.items.findIndex(item => item.id === action.payload.id);
      if (existingProductIndex !== -1) {
        // If product already exists in cart, update its quantity
        state.items[existingProductIndex].quantity += 1;
      } else {
        // If product doesn't exist, add it to cart with quantity 1
        state.items.push({ ...action.payload, quantity: 1 });
      }
    },
    removeFromCart: (state, action: PayloadAction<number>) => {
      state.items = state.items.filter(item => item.id !== action.payload);
    },
    updateCartItemQuantity: (state, action: PayloadAction<{ productId: number; quantity: number }>) => {
      const { productId, quantity } = action.payload;
      const productToUpdate = state.items.find(item => item.id === productId);
      if (productToUpdate) {
        productToUpdate.quantity = quantity;
      }
    }
  }
});

export const { addToCart, removeFromCart, updateCartItemQuantity } = cartSlice.actions;

export const selectCartItems = (state: RootState) => state.cart.items;

export default cartSlice.reducer;

