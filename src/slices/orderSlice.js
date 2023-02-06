import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getOrdersUser = createAsyncThunk("order/get-orders-user", async () => {
  try {
    const { data } = await axios.get("/api/order/get-orders-user");
    return data.userOrders;
  } catch (error) {
    throw new Error(error);
  }
});

export const createOrder = createAsyncThunk("order/create-order", async () => {
  try {
    const { data } = await axios.get("/api/order/create-order");
    return data.createdOrder;
  } catch (error) {
    throw new Error(error);
  }
});

export const orderSlice = createSlice({
  name: "orders",
  initialState: {
    orders: [],
    loading: false,
    error: "",
  },
  reducers: {
    setOrderData: (state, action) => {
      const { payload } = action;

      state.orders.push(payload);
    },
  },

  extraReducers: {
    [getOrdersUser.pending]: (state, { payload }) => {
      state.loading = true;
    },
    [getOrdersUser.fulfilled]: (state, { payload }) => {
      state.orders = payload;
      state.loading = false;
    },
    [getOrdersUser.rejected]: (state, { error }) => {
      state.error = error.message;
      state.loading = false;
    },
  },
});

// Export Actions
export const { setOrderData } = orderSlice.actions;

// Export Reducer
export default orderSlice.reducer;
