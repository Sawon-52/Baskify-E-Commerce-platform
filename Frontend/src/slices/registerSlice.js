import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { USERS_URL } from "../constant.js";
import axios from "axios";

//async thunk for login user
export const registerUser = createAsyncThunk("login/loginUser", async (credentials, { rejectWithValue }) => {
  try {
    const response = await axios.post(`${USERS_URL}`, credentials);

    return response.data;
  } catch (error) {
    return rejectWithValue(error.response ? error.response.data : error.message);
  }
});

//slice
const registerSlice = createSlice({
  name: "register",
  initialState: {
    user: {},
    isLoading: false,
    isAuthenticated: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload;
        state.isAuthenticated = true;
        state.error = null;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export default registerSlice.reducer;
