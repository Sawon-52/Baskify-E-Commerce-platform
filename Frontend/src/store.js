import { configureStore } from "@reduxjs/toolkit";
import productReducer from "./slices/productsSlice";
import productDetailsReducer from "./slices/productDetailsSlice";
import cartSliceReducer from "./slices/cartSlice";

const store = configureStore({
  reducer: {
    products: productReducer,
    productDetails: productDetailsReducer,
    cart: cartSliceReducer,
  },
});

export default store;
