import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { PRODUCTS_URL, UPLOAD_URL } from "../constant.js";
import axios from "axios";

const initialState = {
  data: [],
  productInfo: [],
  createdProduct: [],
  productImage: [],
  reviews: [],
  topProducts: [],
  isLoading: false,
  isError: null,
};

//async thunk for fetching products
export const fetchProducts = createAsyncThunk("products/fetchAllProducts", async ({ keyword, pageNumber, category }, { rejectWithValue }) => {
  try {
    const response = await axios.get(`${PRODUCTS_URL}`, {
      params: { keyword, pageNumber, category },
    });
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response ? error.response.data : error.message);
  }
});

//Async thunk to fetch product details by ID
export const fetchProductDetails = createAsyncThunk("products/fetchDetails", async (productId, { rejectWithValue }) => {
  try {
    const response = await axios.get(`${PRODUCTS_URL}/${productId}`);
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response ? error.response.data : error.message);
  }
});

//Async thunk to create product
export const createProduct = createAsyncThunk("products/createProduct", async (_, { rejectWithValue }) => {
  try {
    const response = await axios.post(`${PRODUCTS_URL}`);
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response ? error.response.data : error.message);
  }
});

//Async thunk to update product
export const updateProduct = createAsyncThunk("products/updateProduct", async (data, { rejectWithValue }) => {
  try {
    const response = await axios.put(`${PRODUCTS_URL}/${data.productId}`, data);
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response ? error.response.data : error.message);
  }
});

//Async thunk to Upload image
export const uploadProductImage = createAsyncThunk("products/uploadProductImage", async (data, { rejectWithValue }) => {
  try {
    const response = await axios.post(`${UPLOAD_URL}`, data);
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response ? error.response.data : error.message);
  }
});

//Async thunk to delete product
export const deleteProduct = createAsyncThunk("products/deleteProduct", async (productId, { rejectWithValue }) => {
  try {
    const response = await axios.delete(`${PRODUCTS_URL}/${productId}`);
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response ? error.response.data : error.message);
  }
});

//Async thunk to created review
export const createReview = createAsyncThunk("products/createReview", async (data, { rejectWithValue }) => {
  try {
    const response = await axios.post(`${PRODUCTS_URL}/${data.productId}/review`, data);
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response ? error.response.data : error.message);
  }
});

//Async thunk to get reviews
export const getReview = createAsyncThunk("products/getReviews", async (productId, { rejectWithValue }) => {
  try {
    const response = await axios.get(`${PRODUCTS_URL}/${productId}/reviews`);
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response ? error.response.data : error.message);
  }
});

//Async thunk to get top products
export const getTopProducts = createAsyncThunk("products/topProducts", async (_, { rejectWithValue }) => {
  try {
    const response = await axios.get(`${PRODUCTS_URL}/top`);
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response ? error.response.data : error.message);
  }
});

//slice
const productsApiSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    clearProductInfo: (state, action) => {
      state.productInfo = null;
    },

    cleardata: (state, action) => {
      state.data = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = action.payload;
      })

      // for Products Details
      .addCase(fetchProductDetails.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchProductDetails.fulfilled, (state, action) => {
        state.isLoading = false;
        state.productInfo = action.payload;
      })
      .addCase(fetchProductDetails.rejected, (state, action) => {
        state.isError = action.error.message;
      })

      // for create Product
      .addCase(createProduct.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createProduct.fulfilled, (state, action) => {
        state.isLoading = false;
        state.createdProduct = action.payload;
      })
      .addCase(createProduct.rejected, (state, action) => {
        state.isError = action.error.message;
        state.isLoading = false;
      })

      // for Update product
      .addCase(updateProduct.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateProduct.fulfilled, (state, action) => {
        state.isLoading = false;
        state.productInfo = action.payload;
      })
      .addCase(updateProduct.rejected, (state, action) => {
        state.isError = action.error.message;
        state.isLoading = false;
      })

      // for image upload
      .addCase(uploadProductImage.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(uploadProductImage.fulfilled, (state, action) => {
        state.isLoading = false;
        state.productImage = action.payload;
      })
      .addCase(uploadProductImage.rejected, (state, action) => {
        state.isError = action.error.message;
      })

      // product delete case
      .addCase(deleteProduct.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteProduct.fulfilled, (state, action) => {
        state.isLoading = false;
      })
      .addCase(deleteProduct.rejected, (state, action) => {
        state.isError = action.error.message;
        state.isLoading = false;
      })

      // create review section
      .addCase(createReview.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createReview.fulfilled, (state, action) => {
        state.isLoading = false;
      })
      .addCase(createReview.rejected, (state, action) => {
        state.isError = action.error.message;
      })

      // create review section
      .addCase(getReview.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getReview.fulfilled, (state, action) => {
        state.isLoading = false;
        state.reviews = action.payload;
      })
      .addCase(getReview.rejected, (state, action) => {
        state.isError = action.error.message;
      })

      // get top products
      .addCase(getTopProducts.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getTopProducts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.topProducts = action.payload;
      })
      .addCase(getTopProducts.rejected, (state, action) => {
        state.isError = action.error.message;
      });
  },
});
export const { clearProductInfo, cleardata } = productsApiSlice.actions;
export default productsApiSlice.reducer;
