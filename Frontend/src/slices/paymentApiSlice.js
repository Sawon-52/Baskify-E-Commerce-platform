import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { PAYMENT_URL } from "../constant.js";

const initialState = {
  paymentInfo: [],
};
// Async Thunks for order to pay
export const paymentCreate = createAsyncThunk("payment/createPayment", async (orderId, { rejectWithValue }) => {
  try {
    const response = await axios.post(`${PAYMENT_URL}/${orderId}/pay`, orderId);
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
      });
  },
});

export default paymentSlice.reducer;
