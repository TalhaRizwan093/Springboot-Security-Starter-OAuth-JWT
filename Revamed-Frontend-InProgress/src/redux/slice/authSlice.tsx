import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  token: localStorage.getItem("token") || null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    addAuth: (state, action) => {
      state.token = action.payload;
    },
    deleteAuth: (state) => {
      state.token = null;
      localStorage.removeItem("token");
    },
  },
});

export const { addAuth, deleteAuth } = authSlice.actions;

export default authSlice.reducer;
