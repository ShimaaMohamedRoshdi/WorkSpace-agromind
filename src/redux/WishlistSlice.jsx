
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  wishlist: [],
  totalItems: 0, // ✅ Added this to track wishlist count
};

const wishlistSlice = createSlice({
  name: 'wishlist',
  initialState,
  reducers: {
  //Purpose: Adds a product to the wishlist if it's not already there.
//Check if the product already exists in the wishlist using find.
//If the product doesn't exist, it is added to the wishlist array using push.
//If it already exists, no action is taken (avoiding duplicates).
   
    addToWishlist: (state, action) => {
      const itemExists = state.wishlist.find(item => item.id === action.payload.id);
      if (!itemExists) {
        state.wishlist.push(action.payload);
        state.totalItems = state.wishlist.length; // ✅ Update count
      }
    },


     //Purpose: Removes a product from the wishlist.
//Filter out the product with the matching id (provided in the action.payload).
    removeFromWishlist: (state, action) => {
      state.wishlist = state.wishlist.filter(item => item.id !== action.payload.id);
      state.totalItems = state.wishlist.length; // ✅ Update count
    },

    // Clears the wishlist
    clearWishlist: (state) => {
      state.wishlist = [];
      state.totalItems = 0; // ✅ Reset count
    },
  },
});

export const { addToWishlist, removeFromWishlist, clearWishlist } = wishlistSlice.actions;
export default wishlistSlice.reducer;

///for me (From any component, use useDispatch to call these actions:)
// import { useDispatch } from 'react-redux';
// import { addToWishlist, removeFromWishlist, clearWishlist } from './wishlistSlice';

// const dispatch = useDispatch();

 // Add an item to the wishlist
// dispatch(addToWishlist({ id: 1, name: 'Product Name', price: 100 }));

 // Remove an item from the wishlist
// dispatch(removeFromWishlist({ id: 1 }));
// Clear the wishlist