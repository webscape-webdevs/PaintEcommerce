import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getProducts = createAsyncThunk("product/get-products", async () => {
  try {
    const { data } = await axios.get("/api/product/get-products");
    return data.products;
  } catch (error) {
    throw new Error(error);
  }
});

export const productSlice = createSlice({
  name: "products",
  initialState: {
    products: [],
    loading: false,
    error: "",
  },
  reducers: {
    setProductData: (state, action) => {
      const { payload } = action;

      state.products.push(payload);
    },
  },

  extraReducers: {
    [getProducts.pending]: (state, { payload }) => {
      state.loading = true;
    },
    [getProducts.fulfilled]: (state, { payload }) => {
      state.products = payload;
      state.loading = false;
    },
    [getProducts.rejected]: (state, { error }) => {
      state.error = error.message;
      state.loading = false;
    },
  },
});

// Export Actions
export const { setProductData } = productSlice.actions;

// Export Reducer
export default productSlice.reducer;
