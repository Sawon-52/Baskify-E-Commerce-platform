import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { CATEGORY_URL } from "../constant";

// asyncThunk for create category
export const createCategory = createAsyncThunk("category/createCategory", async (category, { rejectWithValue }) => {
  try {
    const response = await axios.post(`${CATEGORY_URL}`, category);
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});

// asyncThunk for get category
export const getCategory = createAsyncThunk("category/getCategory", async (_, { rejectWithValue }) => {
  try {
    const response = await axios.get(`${CATEGORY_URL}`);
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});

// create category slice
const categorySlice = createSlice({
  name: "category",
  initialState: {
    categories: [],
    category: [],
    isLoading: false,
    isError: null,
  },

  reducers: {},

  extraReducers: (builder) => {
    builder
      // create category
      .addCase(createCategory.pending, (state, action) => {
        state.isLoading = true;
        state.isError = null;
      })
      .addCase(createCategory.fulfilled, (state, action) => {
        state.category = action.payload;
        state.isLoading = false;
        state.isError = null;
      })

      .addCase(createCategory.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = action.payload;
      })

      // get category
      .addCase(getCategory.pending, (state, action) => {
        state.isLoading = true;
        state.isError = null;
      })
      .addCase(getCategory.fulfilled, (state, action) => {
        state.categories = action.payload;
        state.isLoading = false;
        state.isError = null;
      })

      .addCase(getCategory.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = action.payload;
      });
  },
});

export default categorySlice.reducer;
