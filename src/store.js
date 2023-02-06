import { configureStore } from "@reduxjs/toolkit";

import userSlice from "./slices/userSlice";
import sessionSlice from "./slices/sessionSlice";
import productSlice from "./slices/productSlice";
import cartSlice from "./slices/cartSlice";
import orderSlice from "./slices/orderSlice";
import vendorSlice from "./slices/vendorSlice";

const store = configureStore({
  reducer: {
    userSlice: userSlice,
    sessionSlice: sessionSlice,
    productSlice: productSlice,
    cartSlice: cartSlice,
    orderSlice: orderSlice,
    vendorSlice: vendorSlice,
  },
});

export default store;
