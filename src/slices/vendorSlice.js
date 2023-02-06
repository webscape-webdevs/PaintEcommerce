import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getVendorData = createAsyncThunk("vendor/get-vendor-data", async () => {
  try {
    const { data } = await axios.get("/api/vendor/get-vendor-data");
    return data;
  } catch (error) {
    throw new Error(error);
  }
});

export const createProduct = createAsyncThunk(
  "vendor/create-vendor-product",
  async ({ productName, description, category, brand, availableColors, sizes, productCalculationMultiplier, unit, stock, images }) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      let payload = {};

      if (category === "paint") {
        payload = { productName, description, category, brand, availableColors, sizes, productCalculationMultiplier, unit, stock, images };
      } else {
        payload = { productName, description, category, brand, sizes, productCalculationMultiplier, unit, stock, images };
      }

      const { data } = await axios.post("/api/vendor/create-vendor-product", payload, config);
      return data.createdProduct;
    } catch (error) {
      throw new Error(error);
    }
  }
);

export const updateProduct = createAsyncThunk("vendor/update-vendor-product", async () => {
  try {
    const { data } = await axios.put("/api/vendor/update-vendor-product");
    return data.updatedProduct;
  } catch (error) {
    throw new Error(error);
  }
});

export const deleteProduct = createAsyncThunk("vendor/delete-vendor-product", async () => {
  try {
    const { data } = await axios.put("/api/vendor/delete-vendor-product");
    return data.deletedProduct;
  } catch (error) {
    throw new Error(error);
  }
});

export const vendorSlice = createSlice({
  name: "vendorData",
  initialState: {
    vendorProductList: [],
    vendorOrderList: [],
    loading: false,
    error: "",
  },
  reducers: {
    setVendorData: (state, action) => {
      const { payload } = action;

      state.vendorProductList.push(payload);
      state.vendorOrderList.push(payload);
    },
  },

  extraReducers: {
    [getVendorData.pending]: (state, { payload }) => {
      state.loading = true;
    },
    [getVendorData.fulfilled]: (state, { payload }) => {
      state.vendorProductList = payload.vendorProductList;
      state.vendorOrderList = payload.vendorOrderList;
      state.loading = false;
    },
    [getVendorData.rejected]: (state, { error }) => {
      state.error = error.message;
      state.loading = false;
    },

    [createProduct.pending]: (state, { payload }) => {
      state.loading = true;
    },
    [createProduct.fulfilled]: (state, { payload }) => {
      let newList = { ...state.vendorProductList, payload };
      state.vendorProductList = newList;
      state.loading = false;
    },
    [createProduct.rejected]: (state, { error }) => {
      state.error = error.message;
      state.loading = false;
    },

    [updateProduct.pending]: (state, { payload }) => {
      state.loading = true;
    },
    [updateProduct.fulfilled]: (state, { payload }) => {
      let list = state.vendorProductList.filter((e) => e._id !== payload._id);
      let newList = { ...list, payload };
      state.vendorProductList = newList;
      state.loading = false;
    },
    [updateProduct.rejected]: (state, { error }) => {
      state.error = error.message;
      state.loading = false;
    },

    [deleteProduct.pending]: (state, { payload }) => {
      state.loading = true;
    },
    [deleteProduct.fulfilled]: (state, { payload }) => {
      let newList = state.vendorProductList.filter((e) => e._id !== payload._id);
      state.vendorProductList = newList;
      state.loading = false;
    },
    [deleteProduct.rejected]: (state, { error }) => {
      state.error = error.message;
      state.loading = false;
    },
  },
});

// Export Actions
export const { setVendorData } = vendorSlice.actions;

// Export Reducer
export default vendorSlice.reducer;
