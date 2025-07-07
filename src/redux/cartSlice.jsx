
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  products: [],  //stors an array of products  added to cart
  totalQuantity: 0, // Track total quantity of items in cart
  totalPrice: 0,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const product = action.payload;//contains the product the user wants to add to the cart.

      //Find existing product: Looks for a product with the same id in the cart.(searches for a product with the same id as the one being added.)
      //if i found it i will store it in exsitingproduct
      const existingProduct = state.products.find((p) => p.id === product.id);
      
      if (existingProduct) {
        // If product exists, increase its quantity
        existingProduct.quantity += 1;
      } else {
        //else Add the product to the products array with a quantity of 1.
        state.products.push({ ...product, quantity: 1 });
      }
      //reduce bt return single value (sum(accumulatoe),p(current value)) , 0 initial value
      state.totalQuantity = state.products.reduce((sum, p) => sum + p.quantity, 0);
      state.totalPrice = state.products.reduce((sum, p) => sum + p.price * p.quantity, 0);
    },
    decreaseQuantity: (state, action) => {
      //We find the product in the cart that matches action.payload (which is the product ID).
      const product = state.products.find((p) => p.id === action.payload);
      if (product && product.quantity > 1) {
        product.quantity -= 1;
      }
      state.totalQuantity = state.products.reduce((sum, p) => sum + p.quantity, 0);
      state.totalPrice = state.products.reduce((sum, p) => sum + p.price * p.quantity, 0);
    },
    increaseQuantity: (state, action) => {
      const product = state.products.find((p) => p.id === action.payload);
      if (product) {
        product.quantity += 1;
      }
      state.totalQuantity = state.products.reduce((sum, p) => sum + p.quantity, 0);
      state.totalPrice = state.products.reduce((sum, p) => sum + p.price * p.quantity, 0);
    },
    removeFromCart: (state, action) => {
      //.filter():
//This creates a new array that includes only the products whose id does not match the action.payload (the id of the product to remove).
      state.products = state.products.filter((p) => p.id !== action.payload);
      state.totalQuantity = state.products.reduce((sum, p) => sum + p.quantity, 0);
      state.totalPrice = state.products.reduce((sum, p) => sum + p.price * p.quantity, 0);
    },
  },
});
//Export the action creators so they can be used inside React components.
export const { addToCart, decreaseQuantity, increaseQuantity, removeFromCart } = cartSlice.actions;
//Export the reducer (cartSlice.reducer) so it can be added to the Redux store.
export default cartSlice.reducer;
