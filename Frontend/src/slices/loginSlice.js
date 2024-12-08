import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { USERS_URL } from "../constant.js";
import axios from "axios";

//async thunk for login user
export const loginUser = createAsyncThunk("login/loginUser", async (credentials, { rejectWithValue }) => {
  try {
    const response = await axios.post(`${USERS_URL}/auth`, credentials);

    return response.data;
  } catch (error) {
    return rejectWithValue(error.response ? error.response.data : error.message);
  }
});

//slice
const loginSlice = createSlice({
  name: "login",
  initialState: {
    user: {},
    isLoading: false,
    isAuthenticated: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload;
        state.isAuthenticated = true;
        state.error = null;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export default loginSlice.reducer;
