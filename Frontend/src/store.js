import { configureStore } from "@reduxjs/toolkit";
import productsReducer from "./slices/productsApiSlice";
import cartSliceReducer from "./slices/cartSlice";
import authSliceReducer from "./slices/authSlice";
import ordersReducer from "./slices/OrdersApiSlice";
import userReducer from "./slices/usersApiSlice";

const store = configureStore({
  reducer: {
    products: productsReducer,
    cart: cartSliceReducer,
    auth: authSliceReducer,
    orders: ordersReducer,
    users: userReducer,
  },
});

export default store;
