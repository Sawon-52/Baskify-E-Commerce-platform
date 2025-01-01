import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { USERS_URL } from "../constant.js";
import axios from "axios";

const initialState = {
  userInfo: [],
  singleUser: [],
  users:[],
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

//async thunk for get all users by admin
export const getUsers = createAsyncThunk("users/getUsers", async (_, { rejectWithValue }) => {
  try {
    const response = await axios.get(`${USERS_URL}`);
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response ? error.response.data : error.message);
  }
});

//async thunk for delete user by admin
export const deleteUser = createAsyncThunk("users/deleteUser", async (userId, { rejectWithValue }) => {
  try {
    const response = await axios.delete(`${USERS_URL}/${userId}`);
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response ? error.response.data : error.message);
  }
});

//async thunk for get user details
export const getUser = createAsyncThunk("users/getUser", async (userId, { rejectWithValue }) => {
  try {
    const response = await axios.get(`${USERS_URL}/${userId}`);
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response ? error.response.data : error.message);
  }
});

//async thunk for update user
export const updateUser = createAsyncThunk("users/updateUser", async (data, { rejectWithValue }) => {
  try {
    const response = await axios.put(`${USERS_URL}/${data.userId}`, data);
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
        state.isAuthenticated = true;
        state.isError = null;
      })
      .addCase(UpdateProfile.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = action.payload;
      })

      //For get users
      .addCase(getUsers.pending, (state) => {
        state.isLoading = true;
        state.isError = null;
      })
      .addCase(getUsers.fulfilled, (state, action) => {
        state.isLoading = false;
        state.users = action.payload;
        state.isAuthenticated = true;
        state.isError = null;
      })
      .addCase(getUsers.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = action.payload;
      })

      //For delete user
      .addCase(deleteUser.pending, (state) => {
        state.isLoading = true;
        state.isError = null;
      })
      .addCase(deleteUser.fulfilled, (state, action) => {
        state.isLoading = false;
      })
      .addCase(deleteUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = action.payload;
      })

      //for get user
      .addCase(getUser.pending, (state) => {
        state.isLoading = true;
        state.isError = null;
      })
      .addCase(getUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.singleUser = action.payload;
        state.isAuthenticated = true;
        state.isError = null;
      })
      .addCase(getUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = action.payload;
      })

      // update user
      .addCase(updateUser.pending, (state) => {
        state.isLoading = true;
        state.isError = null;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.singleUser = action.payload;
        state.isAuthenticated = true;
        state.isError = null;
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = action.payload;
      });
  },
});

export default userSlice.reducer;
