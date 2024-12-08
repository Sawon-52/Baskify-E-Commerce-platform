import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { USERS_URL } from "../constant.js";
import axios from "axios";
import { useSelector } from "react-redux";

//async thunk for logout user
export const logout = createAsyncThunk("login/loginUser", async (_, { rejectWithValue }) => {
  try {
    const response = await axios.post(`${USERS_URL}/logout`);
    return {};
  } catch (error) {
    return rejectWithValue(error.response ? error.response.data : error.message);
  }
});

// const { userInfo } = useSelector((state) => state.auth);
//slice
const logoutSlice = createSlice({
  name: "logout",
  initialState: {
    isLoading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(logout.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(logout.fulfilled, (state, action) => {
        state.isLoading = false;
        state.userInfo = null;
        localStorage.removeItem(userInfo);
        state.error = null;
      })
      .addCase(logout.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export default logoutSlice.reducer;
