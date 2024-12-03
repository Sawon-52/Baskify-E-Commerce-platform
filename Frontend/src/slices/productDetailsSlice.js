import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { PRODUCTS_URL } from "../constant.js";

//Async thunk to fetch product details by ID
export const fetchProductDetails = createAsyncThunk("products/fetchDetails", async (productId) => {
  const response = await axios.get(`${PRODUCTS_URL}/${productId}`);
  return response.data;
});

const productDetailsSlice = createSlice({
  name: "productDetails",
  initialState: {
    product: {},
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) =>{
    builder
    .addCase(fetchProductDetails.pending, (state) =>{
        state.status = 'loading';
        state.error = null;
    })
    .addCase(fetchProductDetails.fulfilled, (state, action) =>{
        state.status = 'succeeded';
        state.product = action.payload;
    })
    .addCase(fetchProductDetails.rejected, (state, action) =>{
        state.status = 'failed';
        state.error = action.error.message
    })
  }
});

export default productDetailsSlice.reducer;
