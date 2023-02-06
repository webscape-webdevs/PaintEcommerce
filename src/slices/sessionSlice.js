import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getSession = createAsyncThunk("session/get-session", async () => {
  try {
    const { data } = await axios.get(`/api/session/get-session`);

    return data.user;
  } catch (error) {
    throw new Error(error);
  }
});

export const register = createAsyncThunk("session/register", async ({ registerEmail, registerPassword }) => {
  try {
    const { data } = await axios.post(`/api/session/register?email=${registerEmail}&password=${registerPassword}`);

    return data.user;
  } catch (error) {
    throw new Error(error);
  }
});

export const login = createAsyncThunk("session/login", async ({ loginEmail, loginPassword }) => {
  try {
    const { data } = await axios.post(`/api/session/login?email=${loginEmail}&password=${loginPassword}`);

    return data.user;
  } catch (error) {
    throw new Error(error);
  }
});

export const googleLogin = createAsyncThunk("session/googleLogin", async ({ email, firstName, lastName }) => {
  try {
    console.log(email, firstName, lastName);
    const { data } = await axios.post(`/api/session/googleLogin?email=${email}&firstName=${firstName}&lastName=${lastName}`);

    return data.user;
  } catch (error) {
    throw new Error(error);
  }
});

export const logout = createAsyncThunk("session/logout", async () => {
  try {
    const { data } = await axios.get(`/api/session/logout`);

    return data;
  } catch (error) {
    throw new Error(error);
  }
});

export const sessionSlice = createSlice({
  name: "session",
  initialState: {
    sessionUser: [],
    isAuthenticated: false,
    loading: false,
    error: "",
  },
  reducers: {
    setSessionUser: (state, action) => {
      const { payload } = action;

      state.sessionUser.push(payload);
    },
  },

  extraReducers: {
    [getSession.pending]: (state, { payload }) => {
      state.loading = true;
      state.isAuthenticated = false;
    },
    [getSession.fulfilled]: (state, { payload }) => {
      state.sessionUser = payload;
      state.isAuthenticated = true;
      state.loading = false;
    },
    [getSession.rejected]: (state, { error }) => {
      state.error = error.message;
      state.isAuthenticated = false;
      state.loading = false;
    },

    [register.pending]: (state, { payload }) => {
      state.loading = true;
      state.isAuthenticated = false;
    },
    [register.fulfilled]: (state, { payload }) => {
      state.sessionUser = payload;
      state.isAuthenticated = true;
      state.loading = false;
    },
    [register.rejected]: (state, { error }) => {
      state.error = error.message;
      state.isAuthenticated = false;
      state.loading = false;
    },

    [login.pending]: (state, { payload }) => {
      state.loading = true;
      state.isAuthenticated = false;
    },
    [login.fulfilled]: (state, { payload }) => {
      state.sessionUser = payload;
      state.isAuthenticated = true;
      state.loading = false;
    },
    [login.rejected]: (state, { error }) => {
      state.error = error.message;
      state.isAuthenticated = false;
      state.loading = false;
    },

    [googleLogin.pending]: (state, { payload }) => {
      state.loading = true;
      state.isAuthenticated = false;
    },
    [googleLogin.fulfilled]: (state, { payload }) => {
      state.sessionUser = payload;
      state.isAuthenticated = true;
      state.loading = false;
    },
    [googleLogin.rejected]: (state, { error }) => {
      state.error = error.message;
      state.isAuthenticated = false;
      state.loading = false;
    },

    [logout.pending]: (state, { payload }) => {
      state.loading = true;
    },
    [logout.fulfilled]: (state, { payload }) => {
      state.sessionUser = [];
      state.isAuthenticated = false;
      state.loading = false;
    },
    [logout.rejected]: (state, { error }) => {
      state.error = error.message;
      state.loading = false;
    },
  },
});

// Export Actions
export const { setSessionUser } = sessionSlice.actions;

// Export Reducer
export default sessionSlice.reducer;
