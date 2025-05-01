
import { createSlice } from '@reduxjs/toolkit';
import { mockData, mockData2,mockData3, mockData4 , } from '../assets/images/mockData';

const initialState = {
  products: mockData,   // from mockData
  products2: mockData2, // from mockData
  products3: mockData3, // from mockData
  products4: mockData4, // from mockData
  products4: mockData5, // from mockData
};

const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {},
});

export default productSlice.reducer;
