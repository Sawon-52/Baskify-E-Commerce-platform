import { configureStore } from "@reduxjs/toolkit";
import productReducer from "./slices/productsSlice";
import productDetailsReducer from "./slices/productDetailsSlice";
import cartSliceReducer from "./slices/cartSlice";
import authSliceReducer from "./slices/authSlice";
import loginReducer from "./slices/loginSlice";
import registerReducer from "./slices/registerSlice";
import ordersReducer from "./slices/OrdersApiSlice";

const store = configureStore({
  reducer: {
    products: productReducer,
    productDetails: productDetailsReducer,
    cart: cartSliceReducer,
    auth: authSliceReducer,
    login: loginReducer,
    register: registerReducer,
    orders: ordersReducer,
  },
});

export default store;
