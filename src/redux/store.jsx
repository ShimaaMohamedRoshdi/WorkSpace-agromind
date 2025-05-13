import { configureStore } from '@reduxjs/toolkit';
//configureStore is a function from Redux Toolkit that:
//Creates the Redux store.
//Automatically sets up middleware (like Redux DevTools & thunk for async operations).
//Combines multiple reducers into one.

import cartReducer from './cartSlice';
import wishlistReducer from './WishlistSlice'; // Example
import productReducer from './productSlice';
const store = configureStore({
  reducer: {
    cart: cartReducer,
    product: productReducer,
    wishlist: wishlistReducer,
  },
});

export default store;


// (configue store) A utility provided by Redux Toolkit that simplifies the creation of a Redux store.
// It automatically combines reducers, adds middleware, and sets up development tools like the Redux DevTools.




//cartSlice: Manages the state related to the shopping cart.
//productSlice: Handles the product data and search functionality.
//wishlistReducer: Manages the state for the wishlist feature.