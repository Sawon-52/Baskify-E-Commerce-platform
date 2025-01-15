import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { PAYMENT_URL } from "../constant.js";

const initialState = {
  paymentInfo: [],
};
// Async Thunks for order to pay
export const paymentCreate = createAsyncThunk("payment/createPayment", async (orderId, { rejectWithValue }) => {
  try {
    const response = await axios.put(`${PAYMENT_URL}/${orderId}/pay`, orderId);
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});

// Async Thunks for payment success
export const paymentSuccess = createAsyncThunk("payment/paymentSuccess", async (_, { rejectWithValue }) => {
  try {
    const response = await axios.post(`${PAYMENT_URL}/pay/success`);
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});

// create slice
const paymentSlice = createSlice({
  name: "payment",
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder
      // create payment
      .addCase(paymentCreate.pending, (state) => {
        state.isLoading = true;
        state.isError = null;
      })
      .addCase(paymentCreate.fulfilled, (state, action) => {
        state.isLoading = false;
        state.paymentInfo = action.payload;
      })
      .addCase(paymentCreate.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = action.payload;
      })

      // for payment success
      .addCase(paymentSuccess.pending, (state) => {
        state.isLoading = true;
        state.isError = null;
      })
      .addCase(paymentSuccess.fulfilled, (state, action) => {
        state.isLoading = false;
        state.paymentInfo = action.payload;
      })
      .addCase(paymentSuccess.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = action.payload;
      });
  },
});

export default paymentSlice.reducer;
