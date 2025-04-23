// import { createSlice } from '@reduxjs/toolkit';
// import { mockData } from '../assets/images/mockData'; // Adjust the path based on your project structure

// const initialState = {
//   products: mockData, // Set initial products from the mockData
// };

// const productSlice = createSlice({
//   name: 'product',
//   initialState,
//   reducers: {},
// });

// export default productSlice.reducer;

/////////////////////////////////
/////////////////////////////////
/////////////////////////////////
/////////////////////////////////
import { createSlice } from '@reduxjs/toolkit';
import { mockData, mockData2 } from '../assets/images/mockData';

const initialState = {
  products: mockData,   // from mockData
  products2: mockData2, // from mockData2
};

const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {},
});

export default productSlice.reducer;
/////////////////////////////////
/////////////////////////////////
/////////////////////////////////
/////////////////////////////////