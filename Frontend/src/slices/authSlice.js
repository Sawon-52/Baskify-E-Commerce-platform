import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { USERS_URL } from "../constant";

const initialState = {
  userInfo: localStorage.getItem("userInfo") ? JSON.parse(localStorage.getItem("userInfo")) : null,
  error: null,
};

//async thunk for logout user
export const logout = createAsyncThunk("login/loginUser", async (_, { rejectWithValue }) => {
  try {
    const response = await axios.post(`${USERS_URL}/logout`);
    return {};
  } catch (error) {
    return rejectWithValue(error.response ? error.response.data : error.message);
  }
});

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      state.userInfo = action.payload;
      localStorage.setItem("userInfo", JSON.stringify(action.payload));
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(logout.pending, (state) => {
        state.error = null;
      })
      .addCase(logout.fulfilled, (state, action) => {
        state.userInfo = null;
        localStorage.removeItem("userInfo");
      })
      .addCase(logout.rejected, (state, action) => {
        state.error = action.payload;
      });
  },
});

export const { setCredentials } = authSlice.actions;
export default authSlice.reducer;
