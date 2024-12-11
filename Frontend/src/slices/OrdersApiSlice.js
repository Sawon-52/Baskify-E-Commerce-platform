import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { ORDER_URL } from "../constant.js";

// Async Thunks for API Calls
export const createOrder = createAsyncThunk("orders/createOrder", async (orderData, { rejectWithValue }) => {
  try {
    const response = await axios.post(`${ORDER_URL}`, orderData);
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});

// get order details using API calls
export const getOrderDetails = createAsyncThunk("orders/getOrderDetails", async (orderId, { rejectWithValue }) => {
  try {
    const response = await axios.get(`${ORDER_URL}/${orderId}`);
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});

// create orders slice
const ordersSlice = createSlice({
  name: "orders",
  initialState: {
    orders: [],
    isLoading: false,
    isError: null,
  },
  reducers: {
    // Add any non-async reducers if needed
  },
  extraReducers: (builder) => {
    builder
      // create orders
      .addCase(createOrder.pending, (state) => {
        state.isLoading = true;
        state.isError = null;
      })
      .addCase(createOrder.fulfilled, (state, action) => {
        state.isLoading = false;
        state.orders = action.payload;
      })
      .addCase(createOrder.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = action.payload;
      })

      // get order details
      .addCase(getOrderDetails.pending, (state) => {
        state.isLoading = true;
        state.isError = null;
      })
      .addCase(getOrderDetails.fulfilled, (state, action) => {
        state.isLoading = false;
        state.orders = action.payload;
      })
      .addCase(getOrderDetails.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = action.payload;
      });
  },
});

export default ordersSlice.reducer;
