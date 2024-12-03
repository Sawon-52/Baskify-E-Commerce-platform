import { configureStore } from "@reduxjs/toolkit";
import productReducer from "./slices/productsSlice";
import productDetailsReducer from "./slices/productDetailsSlice";

const store = configureStore({
  reducer: {
    products: productReducer,
    productDetails: productDetailsReducer,
  },
});

export default store;
