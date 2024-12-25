import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { PRODUCTS_URL } from "../constant.js";
import axios from "axios";

const initialState = {
  allProducts: [],
  productInfo: [],
  createdProduct: [],
  isLoading: false,
  isError: null,
};

//async thunk for fetching products
export const fetchProducts = createAsyncThunk("products/fetchAllProducts", async (_, { rejectWithValue }) => {
  try {
    const response = await axios.get(`${PRODUCTS_URL}`);
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response ? error.response.data : error.message);
  }
});

//Async thunk to fetch product details by ID
export const fetchProductDetails = createAsyncThunk("products/fetchDetails", async (productId, { rejectWithValue }) => {
  try {
    const response = await axios.get(`${PRODUCTS_URL}/${productId}`);
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response ? error.response.data : error.message);
  }
});

//Async thunk to create product
export const createProduct = createAsyncThunk("products/createProduct", async (_, { rejectWithValue }) => {
  try {
    const response = await axios.post(`${PRODUCTS_URL}`);
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response ? error.response.data : error.message);
  }
});

//slice
const productsApiSlice = createSlice({
  name: "products",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.allProducts = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = action.payload;
      })

      // for Products Details
      .addCase(fetchProductDetails.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchProductDetails.fulfilled, (state, action) => {
        state.isLoading = false;
        state.productInfo = action.payload;
      })
      .addCase(fetchProductDetails.rejected, (state, action) => {
        state.isError = action.error.message;
      })

      // for create Product
      .addCase(createProduct.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createProduct.fulfilled, (state, action) => {
        state.isLoading = false;
        state.createdProduct = action.payload;
      })
      .addCase(createProduct.rejected, (state, action) => {
        state.isError = action.error.message;
      });
  },
});

export default productsApiSlice.reducer;
