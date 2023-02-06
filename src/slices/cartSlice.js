import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getUserCart = createAsyncThunk("cart/get-user-cart", async () => {
  try {
    const { data } = await axios.get("/api/cart/get-user-cart");
    return data.userCart;
  } catch (error) {
    throw new Error(error);
  }
});

export const addToCart = createAsyncThunk("cart/add-to-cart", async (myForm) => {
  try {
    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    };
    const { data } = await axios.post("/api/cart/add-to-cart", myForm, config);
    return data.addedProduct;
  } catch (error) {
    throw new Error(error);
  }
});

export const removeFromCart = createAsyncThunk("cart/remove-from-cart", async (cartId) => {
  try {
    const { data } = await axios.put(`/api/cart/remove-from-cart?cartId=${cartId}`);
    return data.removedProduct;
  } catch (error) {
    throw new Error(error);
  }
});

export const cartSlice = createSlice({
  name: "cart",
  initialState: {
    cartItems: [],
    loading: false,
    error: "",
  },
  reducers: {
    setCartData: (state, action) => {
      const { payload } = action;

      state.cartItems.push(payload);
    },
  },

  extraReducers: {
    [getUserCart.pending]: (state, { payload }) => {
      state.loading = true;
    },
    [getUserCart.fulfilled]: (state, { payload }) => {
      state.cartItems = payload;
      state.loading = false;
    },
    [getUserCart.rejected]: (state, { error }) => {
      state.error = error.message;
      state.loading = false;
    },

    [addToCart.pending]: (state, { payload }) => {
      state.loading = true;
    },
    [addToCart.fulfilled]: (state, { payload }) => {
      let newCart = [...state.cartItems, payload];
      state.cartItems = newCart;
      state.loading = false;
    },
    [addToCart.rejected]: (state, { error }) => {
      state.error = error.message;
      state.loading = false;
    },

    [removeFromCart.pending]: (state, { payload }) => {
      state.loading = true;
    },
    [removeFromCart.fulfilled]: (state, { payload }) => {
      let newCart = state.cartItems.filter((e) => e._id !== payload._id);
      state.cartItems = newCart;
      state.loading = false;
    },
    [removeFromCart.rejected]: (state, { error }) => {
      state.error = error.message;
      state.loading = false;
    },
  },
});

// Export Actions
export const { setCartData } = cartSlice.actions;

// Export Reducer
export default cartSlice.reducer;
