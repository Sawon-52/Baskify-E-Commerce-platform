import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { USERS_URL } from "../constant.js";
import axios from "axios";

const initialState = {
  userInfo: [],
  isLoading: false,
  isAuthenticated: false,
  isError: null,
};

//async thunk for login user
export const loginUser = createAsyncThunk("user/loginUser", async (credentials, { rejectWithValue }) => {
  try {
    const response = await axios.post(`${USERS_URL}/auth`, credentials);
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response ? error.response.data : error.message);
  }
});

//async thunk for Register user
export const registerUser = createAsyncThunk("users/registerUser", async (credentials, { rejectWithValue }) => {
  try {
    const response = await axios.post(`${USERS_URL}`, credentials);

    return response.data;
  } catch (error) {
    return rejectWithValue(error.response ? error.response.data : error.message);
  }
});

//async thunk for logout user
export const logoutUser = createAsyncThunk("users/logoutUser", async (_, { rejectWithValue }) => {
  try {
    const response = await axios.post(`${USERS_URL}/logout`);
    return {};
  } catch (error) {
    return rejectWithValue(error.response ? error.response.data : error.message);
  }
});
//async thunk for update profile
export const UpdateProfile = createAsyncThunk("users/profile", async (data, { rejectWithValue }) => {
  try {
    const response = await axios.put(`${USERS_URL}/profile`, data);
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response ? error.response.data : error.message);
  }
});

//async thunk for get all user by admin
export const getUsers = createAsyncThunk("users/getUsers", async (_, { rejectWithValue }) => {
  try {
    const response = await axios.get(`${USERS_URL}`);
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response ? error.response.data : error.message);
  }
});

//User slice
const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
        state.isError = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.userInfo = action.payload;
        state.isAuthenticated = true;
        state.isError = null;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = action.payload;
      })

      //For register user
      .addCase(registerUser.pending, (state) => {
        state.isLoading = true;
        state.isError = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.userInfo = action.payload;
        state.isAuthenticated = true;
        state.isError = null;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = action.payload;
      })

      //For Logout user
      .addCase(logoutUser.pending, (state) => {
        state.isError = null;
      })
      .addCase(logoutUser.fulfilled, (state, action) => {
        state.userInfo = null;
      })
      .addCase(logoutUser.rejected, (state, action) => {
        state.isError = action.payload;
      })

      //For Update profile
      .addCase(UpdateProfile.pending, (state) => {
        state.isLoading = true;
        state.isError = null;
      })
      .addCase(UpdateProfile.fulfilled, (state, action) => {
        state.isLoading = false;
        state.userInfo = action.payload;
        state.isAuthenticated = true;
        state.isError = null;
      })
      .addCase(UpdateProfile.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = action.payload;
      })

      //For Update profile
      .addCase(getUsers.pending, (state) => {
        state.isLoading = true;
        state.isError = null;
      })
      .addCase(getUsers.fulfilled, (state, action) => {
        state.isLoading = false;
        state.userInfo = action.payload;
        state.isAuthenticated = true;
        state.isError = null;
      })
      .addCase(getUsers.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = action.payload;
      });
  },
});

export default userSlice.reducer;
